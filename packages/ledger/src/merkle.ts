/**
 * Preuves Merkle pour le ledger CROQ
 * 
 * Ce module fournit des utilitaires pour générer et vérifier des preuves Merkle.
 */

import { createHash } from 'crypto';

/**
 * Générer une racine Merkle à partir d'une liste de feuilles
 */
export function generateMerkleRoot(leaves: string[]): string {
  if (leaves.length === 0) {
    return createHash('sha256').update('').digest('hex');
  }

  if (leaves.length === 1) {
    return leaves[0];
  }

  let currentLevel = leaves;
  
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
 * Générer une preuve Merkle pour une feuille donnée
 */
export function generateMerkleProof(
  leaves: string[],
  leafIndex: number
): { proof: string[]; leaf: string } {
  if (leafIndex < 0 || leafIndex >= leaves.length) {
    throw new Error('Index de feuille invalide');
  }

  const leaf = leaves[leafIndex];
  const proof: string[] = [];
  
  let currentIndex = leafIndex;
  let currentLevel = leaves;
  
  while (currentLevel.length > 1) {
    const isRightNode = currentIndex % 2 === 1;
    const siblingIndex = isRightNode ? currentIndex - 1 : currentIndex + 1;
    
    if (siblingIndex < currentLevel.length) {
      proof.push(currentLevel[siblingIndex]);
    } else {
      proof.push(currentLevel[currentIndex]); // Dupliquer si pas de sibling
    }
    
    currentIndex = Math.floor(currentIndex / 2);
    currentLevel = getNextMerkleLevel(currentLevel);
  }

  return { proof, leaf };
}

/**
 * Obtenir le niveau suivant dans l'arbre Merkle
 */
function getNextMerkleLevel(level: string[]): string[] {
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
export function verifyMerkleProof(
  leaf: string,
  proof: string[],
  root: string
): boolean {
  let currentHash = leaf;
  
  for (const siblingHash of proof) {
    const combined = createHash('sha256').update(
      currentHash < siblingHash ? currentHash + siblingHash : siblingHash + currentHash
    ).digest('hex');
    currentHash = combined;
  }
  
  return currentHash === root;
}

/**
 * Créer un snapshot Merkle pour une liste de transactions
 */
export interface MerkleSnapshot {
  snapshotId: string;
  rootHash: string;
  leafCount: number;
  createdAt: string;
  metadata?: Record<string, any>;
}

export function createMerkleSnapshot(
  leaves: string[],
  metadata?: Record<string, any>
): MerkleSnapshot {
  const rootHash = generateMerkleRoot(leaves);
  
  return {
    snapshotId: `snapshot_${Date.now()}`,
    rootHash,
    leafCount: leaves.length,
    createdAt: new Date().toISOString(),
    metadata,
  };
}

/**
 * Vérifier l'intégrité d'un snapshot Merkle
 */
export function verifyMerkleSnapshot(
  snapshot: MerkleSnapshot,
  leaves: string[]
): boolean {
  const calculatedRoot = generateMerkleRoot(leaves);
  return calculatedRoot === snapshot.rootHash && leaves.length === snapshot.leafCount;
}