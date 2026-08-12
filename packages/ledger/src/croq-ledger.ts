// Ledger CROQ (Append-Only)
// Ce fichier gère le ledger des événements CROQ (crédits virtuels).
// Chaque événement est chaîné cryptographiquement pour garantir l'intégrité.

import { D1Database } from '@cloudflare/workers-types';
import { createHash } from 'crypto';

// Types pour les événements du ledger
export type CROQEventType = 'mint' | 'burn' | 'transfer' | 'reward' | 'stake' | 'unstake';

export interface CROQEvent {
  event_id: string;
  sequence: number;
  event_type: CROQEventType;
  account_pseudonym: string; // Pseudonyme (hash de l'email ou ID utilisateur)
  amount: number;
  reason_code: string;
  related_entity?: string; // Ex: ID de rapport, ID de jeu, etc.
  prev_hash: string;
  event_hash: string;
  batch_id?: string;
  created_at: string;
}

// Fonction pour générer un hash SHA-256
export const generateHash = (data: string): string => {
  return createHash('sha256').update(data).digest('hex');
};

// Fonction pour créer un nouvel événement
export const createCROQEvent = (
  db: D1Database,
  event: Omit<CROQEvent, 'event_id' | 'sequence' | 'prev_hash' | 'event_hash' | 'created_at'>
): Promise<CROQEvent> => {
  return db.transaction(async (tx) => {
    // 1. Récupérer le dernier événement pour obtenir le sequence et prev_hash
    const lastEventQuery = 'SELECT sequence, event_hash FROM croq_ledger_events ORDER BY sequence DESC LIMIT 1';
    const { results } = await tx.prepare(lastEventQuery).all();
    const lastEvent = results[0] as { sequence: number; event_hash: string } | undefined;

    const sequence = lastEvent ? lastEvent.sequence + 1 : 1;
    const prev_hash = lastEvent ? lastEvent.event_hash : 'genesis';

    // 2. Créer le hash de l'événement actuel
    const eventData = JSON.stringify({
      ...event,
      sequence,
      prev_hash,
    });
    const event_hash = generateHash(eventData);

    // 3. Insérer l'événement dans la base
    const insertQuery = `
      INSERT INTO croq_ledger_events 
      (event_id, sequence, event_type, account_pseudonym, amount, reason_code, related_entity, prev_hash, event_hash, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `;
    const event_id = `event_${Date.now()}_${sequence}`;

    await tx.prepare(insertQuery).bind(
      event_id,
      sequence,
      event.event_type,
      event.account_pseudonym,
      event.amount,
      event.reason_code,
      event.related_entity || null,
      prev_hash,
      event_hash
    ).run();

    // 4. Retourner l'événement créé
    return {
      event_id,
      sequence,
      event_type: event.event_type,
      account_pseudonym: event.account_pseudonym,
      amount: event.amount,
      reason_code: event.reason_code,
      related_entity: event.related_entity,
      prev_hash,
      event_hash,
      created_at: new Date().toISOString(),
    };
  });
};

// Fonction pour vérifier l'intégrité du ledger
export const verifyLedgerIntegrity = async (db: D1Database): Promise<boolean> => {
  const query = 'SELECT * FROM croq_ledger_events ORDER BY sequence ASC';
  const { results } = await db.prepare(query).all();
  const events = results as CROQEvent[];

  if (events.length === 0) return true; // Ledger vide = valide

  // Vérifier que le premier événement a prev_hash = 'genesis'
  if (events[0].prev_hash !== 'genesis') {
    return false;
  }

  // Vérifier que chaque événement est bien chaîné
  for (let i = 1; i < events.length; i++) {
    const current = events[i];
    const previous = events[i - 1];

    // Vérifier que prev_hash correspond au hash de l'événement précédent
    const expectedPrevHash = previous.event_hash;
    if (current.prev_hash !== expectedPrevHash) {
      return false;
    }

    // Vérifier que le hash de l'événement actuel est valide
    const eventData = JSON.stringify({
      sequence: current.sequence,
      event_type: current.event_type,
      account_pseudonym: current.account_pseudonym,
      amount: current.amount,
      reason_code: current.reason_code,
      related_entity: current.related_entity,
      prev_hash: current.prev_hash,
    });
    const expectedHash = generateHash(eventData);
    if (current.event_hash !== expectedHash) {
      return false;
    }
  }

  return true;
};

// Fonction pour obtenir le solde d'un compte
export const getAccountBalance = async (db: D1Database, accountPseudonym: string): Promise<number> => {
  const query = `
    SELECT SUM(amount) as balance 
    FROM croq_ledger_events 
    WHERE account_pseudonym = ? 
    AND event_type IN ('mint', 'reward', 'transfer')
  `;
  const { results } = await db.prepare(query).bind(accountPseudonym).all();
  const balance = results[0]?.balance || 0;

  const burnQuery = `
    SELECT SUM(amount) as burned 
    FROM croq_ledger_events 
    WHERE account_pseudonym = ? 
    AND event_type IN ('burn', 'transfer')
  `;
  const { results: burnResults } = await db.prepare(burnQuery).bind(accountPseudonym).all();
  const burned = burnResults[0]?.burned || 0;

  return balance - burned;
};

// Fonction pour obtenir l'historique d'un compte
export const getAccountHistory = async (db: D1Database, accountPseudonym: string): Promise<CROQEvent[]> => {
  const query = `
    SELECT * FROM croq_ledger_events 
    WHERE account_pseudonym = ? 
    ORDER BY sequence DESC
  `;
  const { results } = await db.prepare(query).bind(accountPseudonym).all();
  return results as CROQEvent[];
};

// Fonction pour créer un snapshot Merkle (simplifiée)
export const createMerkleSnapshot = async (db: D1Database): Promise<{ rootHash: string; totalAmount: number; totalEvents: number }> => {
  const query = 'SELECT * FROM croq_ledger_events ORDER BY sequence ASC';
  const { results } = await db.prepare(query).all();
  const events = results as CROQEvent[];

  if (events.length === 0) {
    return { rootHash: generateHash('empty'), totalAmount: 0, totalEvents: 0 };
  }

  // Calculer le total des montants (mint + reward) - (burn)
  let totalAmount = 0;
  for (const event of events) {
    if (event.event_type === 'mint' || event.event_type === 'reward') {
      totalAmount += event.amount;
    } else if (event.event_type === 'burn') {
      totalAmount -= event.amount;
    }
  }

  // Créer un hash simple pour le snapshot (à remplacer par un vrai Merkle Tree)
  const snapshotData = JSON.stringify({
    events: events.map(e => e.event_hash),
    totalAmount,
    totalEvents: events.length,
  });
  const rootHash = generateHash(snapshotData);

  return { rootHash, totalAmount, totalEvents: events.length };
};