/**
 * Ledger CROQ - Gestion des événements CROQ (append-only)
 * 
 * Ce module gère le ledger des événements CROQ (crédits virtuels).
 * Chaque événement est stocké de manière immuable et peut être vérifié via des preuves Merkle.
 */

import { createHash } from 'crypto';

// Types pour les événements du ledger
export interface CROQLedgerEvent {
  eventId: string;
  sequence: number;
  eventType: 'mint' | 'burn' | 'transfer' | 'reward' | 'purchase';
  accountPseudonym: string; // Pseudonyme de l'utilisateur (pas de PII)
  amount: number;
  reasonCode: string;
  relatedEntity: string | null; // Ex: ID d'un rapport, ID d'une récompense
  prevHash: string;
  eventHash: string;
  batchId: string | null;
  createdAt: string;
}

// Types pour les batches
export interface CROQLedgerBatch {
  batchId: string;
  events: CROQLedgerEvent[];
  rootHash: string;
  createdAt: string;
}

// Classe pour gérer le ledger
export class CROQLedger {
  private events: CROQLedgerEvent[];
  private batches: CROQLedgerBatch[];
  private sequenceCounter: number;

  constructor() {
    this.events = [];
    this.batches = [];
    this.sequenceCounter = 0;
  }

  /**
   * Ajouter un événement au ledger
   */
  addEvent(
    eventType: CROQLedgerEvent['eventType'],
    accountPseudonym: string,
    amount: number,
    reasonCode: string,
    relatedEntity: string | null = null,
    batchId: string | null = null
  ): CROQLedgerEvent {
    this.sequenceCounter++;

    const prevHash = this.events.length > 0 ? this.events[this.events.length - 1].eventHash : 'genesis';
    const eventId = `event_${Date.now()}_${this.sequenceCounter}`;
    
    const event: CROQLedgerEvent = {
      eventId,
      sequence: this.sequenceCounter,
      eventType,
      accountPseudonym,
      amount,
      reasonCode,
      relatedEntity,
      prevHash,
      eventHash: this.calculateEventHash(eventId, prevHash, accountPseudonym, amount, reasonCode, relatedEntity),
      batchId,
      createdAt: new Date().toISOString(),
    };

    this.events.push(event);
    return event;
  }

  /**
   * Calculer le hash d'un événement
   */
  private calculateEventHash(
    eventId: string,
    prevHash: string,
    accountPseudonym: string,
    amount: number,
    reasonCode: string,
    relatedEntity: string | null
  ): string {
    const data = `${eventId}:${prevHash}:${accountPseudonym}:${amount}:${reasonCode}:${relatedEntity || ''}`;
    return createHash('sha256').update(data).digest('hex');
  }

  /**
   * Créer un batch d'événements
   */
  createBatch(events: CROQLedgerEvent[]): CROQLedgerBatch {
    const batchId = `batch_${Date.now()}`;
    const rootHash = this.calculateMerkleRoot(events.map((e) => e.eventHash));
    
    const batch: CROQLedgerBatch = {
      batchId,
      events,
      rootHash,
      createdAt: new Date().toISOString(),
    };

    this.batches.push(batch);
    return batch;
  }

  /**
   * Calculer la racine Merkle pour une liste de hashs
   */
  calculateMerkleRoot(leafHashes: string[]): string {
    if (leafHashes.length === 0) {
      return createHash('sha256').update('').digest('hex');
    }

    if (leafHashes.length === 1) {
      return leafHashes[0];
    }

    let currentLevel = leafHashes;
    
    while (currentLevel.length > 1) {
      const nextLevel: string[] = [];
      
      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = i + 1 < currentLevel.length ? currentLevel[i + 1] : currentLevel[i];
        const combined = createHash('sha256').update(left + right).digest('hex');
        nextLevel.push(combined);
      }
      
      currentLevel = nextLevel;
    }

    return currentLevel[0];
  }

  /**
   * Vérifier l'intégrité de la chaîne
   */
  verifyChainIntegrity(): boolean {
    for (let i = 1; i < this.events.length; i++) {
      const current = this.events[i];
      const prev = this.events[i - 1];
      
      if (current.prevHash !== prev.eventHash) {
        return false;
      }
      
      const expectedHash = this.calculateEventHash(
        current.eventId,
        current.prevHash,
        current.accountPseudonym,
        current.amount,
        current.reasonCode,
        current.relatedEntity
      );
      
      if (current.eventHash !== expectedHash) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Générer une preuve Merkle pour un événement
   */
  generateMerkleProof(eventId: string): { proof: string[]; index: number } | null {
    const event = this.events.find((e) => e.eventId === eventId);
    if (!event) return null;

    const batch = this.batches.find((b) => b.batchId === event.batchId);
    if (!batch) return null;

    const leafIndex = batch.events.findIndex((e) => e.eventId === eventId);
    if (leafIndex === -1) return null;

    const leafHashes = batch.events.map((e) => e.eventHash);
    const proof: string[] = [];
    
    let currentIndex = leafIndex;
    let currentLevel = leafHashes;
    
    while (currentLevel.length > 1) {
      const isRightNode = currentIndex % 2 === 1;
      const siblingIndex = isRightNode ? currentIndex - 1 : currentIndex + 1;
      
      if (siblingIndex < currentLevel.length) {
        proof.push(currentLevel[siblingIndex]);
      } else {
        proof.push(currentLevel[currentIndex]); // Dupliquer si pas de sibling
      }
      
      currentIndex = Math.floor(currentIndex / 2);
      currentLevel = this.getNextMerkleLevel(currentLevel);
    }

    return { proof, index: leafIndex };
  }

  /**
   * Obtenir le niveau suivant dans l'arbre Merkle
   */
  private getNextMerkleLevel(level: string[]): string[] {
    const nextLevel: string[] = [];
    
    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = i + 1 < level.length ? level[i + 1] : level[i];
      const combined = createHash('sha256').update(left + right).digest('hex');
      nextLevel.push(combined);
    }
    
    return nextLevel;
  }

  /**
   * Vérifier une preuve Merkle
   */
  verifyMerkleProof(
    leafHash: string,
    proof: string[],
    rootHash: string
  ): boolean {
    let currentHash = leafHash;
    
    for (const siblingHash of proof) {
      const combined = createHash('sha256').update(
        currentHash < siblingHash ? currentHash + siblingHash : siblingHash + currentHash
      ).digest('hex');
      currentHash = combined;
    }
    
    return currentHash === rootHash;
  }

  /**
   * Obtenir tous les événements
   */
  getEvents(): CROQLedgerEvent[] {
    return [...this.events];
  }

  /**
   * Obtenir tous les batches
   */
  getBatches(): CROQLedgerBatch[] {
    return [...this.batches];
  }

  /**
   * Obtenir le solde d'un compte (pseudonyme)
   */
  getAccountBalance(accountPseudonym: string): number {
    return this.events
      .filter((e) => e.accountPseudonym === accountPseudonym)
      .reduce((sum, event) => {
        if (event.eventType === 'mint' || event.eventType === 'reward') {
          return sum + event.amount;
        } else if (event.eventType === 'burn' || event.eventType === 'purchase' || event.eventType === 'transfer') {
          return sum - event.amount;
        }
        return sum;
      }, 0);
  }

  /**
   * Exporter le ledger au format JSON
   */
  exportLedger(): { events: CROQLedgerEvent[]; batches: CROQLedgerBatch[] } {
    return {
      events: this.events,
      batches: this.batches,
    };
  }

  /**
   * Importer le ledger depuis un export JSON
   */
  importLedger(data: { events: CROQLedgerEvent[]; batches: CROQLedgerBatch[] }): void {
    this.events = data.events;
    this.batches = data.batches;
    this.sequenceCounter = this.events.length > 0 ? Math.max(...this.events.map((e) => e.sequence)) : 0;
  }
}

// Exporter une instance par défaut pour les tests
export const croqLedger = new CROQLedger();