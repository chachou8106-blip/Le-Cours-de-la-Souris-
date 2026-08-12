import { D1Database } from '@cloudflare/workers-types';

// Interface pour l'environnement
export interface Env {
  DB: D1Database;
  R2: R2Bucket;
  KV: KVNamespace;
  TURNSTILE_SECRET: string;
}

// ========== Fonctions pour la table countries ==========

// Récupérer tous les pays actifs
export const getAllCountries = async (db: D1Database) => {
  const query = 'SELECT * FROM countries WHERE is_active = 1';
  const { results } = await db.prepare(query).all();
  return results;
};

// Récupérer un pays par son code ISO2
export const getCountryByIso2 = async (db: D1Database, iso2: string) => {
  const query = 'SELECT * FROM countries WHERE iso2 = ? AND is_active = 1';
  const { results } = await db.prepare(query).bind(iso2).all();
  return results[0] || null;
};

// ========== Fonctions pour la table family_payout_reports ==========

// Insérer un nouveau rapport de paiement
export const insertPayoutReport = async (
  db: D1Database,
  report: {
    countryIso2: string;
    amount: number;
    currency: string;
    month: number;
    year: number;
    ageRange?: string;
    tradition?: string;
    comment?: string;
  }
) => {
  const query = `
    INSERT INTO family_payout_reports 
    (id, country_iso2, amount, currency, month, year, age_range, tradition, comment, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'))
  `;
  const reportId = `report_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  await db
    .prepare(query)
    .bind(
      reportId,
      report.countryIso2,
      report.amount,
      report.currency,
      report.month,
      report.year,
      report.ageRange || null,
      report.tradition || null,
      report.comment || null
    )
    .run();
  return reportId;
};

// Récupérer les rapports pour un pays
export const getReportsByCountry = async (db: D1Database, countryIso2: string, status?: string) => {
  let query = `
    SELECT * FROM family_payout_reports 
    WHERE country_iso2 = ?
  `;
  const params: any[] = [countryIso2];

  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC';
  const { results } = await db.prepare(query).bind(...params).all();
  return results;
};

// Récupérer tous les rapports (avec pagination)
export const getAllReports = async (db: D1Database, limit: number = 50, offset: number = 0, status?: string) => {
  let query = `
    SELECT * FROM family_payout_reports 
    WHERE 1=1
  `;
  const params: any[] = [limit, offset];

  if (status) {
    query += ' AND status = ?';
    params.unshift(status);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  const { results } = await db.prepare(query).bind(...params).all();
  return results;
};

// Mettre à jour le statut d'un rapport
export const updateReportStatus = async (
  db: D1Database,
  reportId: string,
  status: 'pending' | 'auto_approved' | 'quarantined' | 'rejected' | 'published'
) => {
  const query = `
    UPDATE family_payout_reports 
    SET status = ?, updated_at = datetime('now')
    WHERE id = ?
  `;
  await db.prepare(query).bind(status, reportId).run();
};

// ========== Fonctions pour la table official_dental_tariffs ==========

// Récupérer tous les tarifs officiels
export const getAllOfficialTariffs = async (db: D1Database) => {
  const query = 'SELECT * FROM official_dental_tariffs';
  const { results } = await db.prepare(query).all();
  return results;
};

// Récupérer un tarif officiel par pays
export const getOfficialTariffByCountry = async (db: D1Database, countryIso2: string) => {
  const query = 'SELECT * FROM official_dental_tariffs WHERE country_iso2 = ?';
  const { results } = await db.prepare(query).bind(countryIso2).all();
  return results[0] || null;
};

// ========== Fonctions pour la table croq_ledger_events ==========

// Ajouter un événement au ledger CROQ
export const addCROQEvent = async (
  db: D1Database,
  event: {
    event_type: string;
    account_pseudonym: string;
    amount: number;
    reason_code: string;
    related_entity?: string;
    batch_id?: string;
  }
) => {
  // Récupérer le dernier événement pour obtenir le sequence et prev_hash
  const lastEventQuery = 'SELECT sequence, event_hash FROM croq_ledger_events ORDER BY sequence DESC LIMIT 1';
  const { results } = await db.prepare(lastEventQuery).all();
  const lastEvent = results[0] as { sequence: number; event_hash: string } | undefined;

  const sequence = lastEvent ? lastEvent.sequence + 1 : 1;
  const prev_hash = lastEvent ? lastEvent.event_hash : 'genesis';

  // Créer le hash de l'événement (simplifié)
  const eventData = JSON.stringify({
    ...event,
    sequence,
    prev_hash,
  });
  const event_hash = require('crypto').createHash('sha256').update(eventData).digest('hex');

  // Insérer l'événement
  const query = `
    INSERT INTO croq_ledger_events 
    (event_id, sequence, event_type, account_pseudonym, amount, reason_code, related_entity, prev_hash, event_hash, batch_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `;
  const event_id = `event_${Date.now()}_${sequence}`;
  await db
    .prepare(query)
    .bind(
      event_id,
      sequence,
      event.event_type,
      event.account_pseudonym,
      event.amount,
      event.reason_code,
      event.related_entity || null,
      prev_hash,
      event_hash,
      event.batch_id || null
    )
    .run();

  return { event_id, sequence, event_hash };
};

// Récupérer le solde d'un compte
export const getAccountBalance = async (db: D1Database, accountPseudonym: string): Promise<number> => {
  const query = `
    SELECT SUM(CASE WHEN event_type IN ('mint', 'reward') THEN amount ELSE 0 END) as credit,
           SUM(CASE WHEN event_type IN ('burn', 'transfer') THEN amount ELSE 0 END) as debit
    FROM croq_ledger_events 
    WHERE account_pseudonym = ?
  `;
  const { results } = await db.prepare(query).bind(accountPseudonym).all();
  const balance = (results[0]?.credit || 0) - (results[0]?.debit || 0);
  return balance;
};

// ========== Fonctions pour la table merkle_snapshots ==========

// Créer un snapshot Merkle
export const createMerkleSnapshot = async (db: D1Database) => {
  const query = 'SELECT event_hash FROM croq_ledger_events ORDER BY sequence ASC';
  const { results } = await db.prepare(query).all();
  const eventHashes = results.map((r: any) => r.event_hash);

  if (eventHashes.length === 0) {
    return { rootHash: '', totalAmount: 0, totalEvents: 0 };
  }

  // Calculer un hash simple pour le snapshot (à remplacer par un vrai Merkle Tree)
  const snapshotData = JSON.stringify(eventHashes);
  const rootHash = require('crypto').createHash('sha256').update(snapshotData).digest('hex');

  // Insérer le snapshot dans la base
  const epoch = Math.floor(Date.now() / 1000);
  const insertQuery = `
    INSERT INTO merkle_snapshots 
    (snapshot_id, root_hash, epoch, total_events, created_at)
    VALUES (?, ?, ?, ?, datetime('now'))
  `;
  await db.prepare(insertQuery).bind(
    `snapshot_${epoch}`,
    rootHash,
    epoch,
    eventHashes.length
  ).run();

  return { rootHash, totalEvents: eventHashes.length };
};