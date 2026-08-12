// Preuves Merkle pour le ledger CROQ
// Ce fichier implémente un arbre de Merkle pour vérifier l'intégrité des snapshots du ledger.

import { createHash } from 'crypto';

// Fonction pour hasher une paire de nœuds
export const hashPair = (a: string, b: string): string => {
  return createHash('sha256').update(a + b).digest('hex');
};

// Fonction pour construire un arbre de Merkle
export const buildMerkleTree = (leaves: string[]): { root: string; tree: string[][] } => {
  if (leaves.length === 0) {
    return { root: '', tree: [] };
  }

  let currentLevel = leaves.map(leaf => createHash('sha256').update(leaf).digest('hex'));
  const tree: string[][] = [currentLevel];

  while (currentLevel.length > 1) {
    const nextLevel: string[] = [];
    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i];
      const right = i + 1 < currentLevel.length ? currentLevel[i + 1] : currentLevel[i];
      nextLevel.push(hashPair(left, right));
    }
    tree.push(nextLevel);
    currentLevel = nextLevel;
  }

  return { root: currentLevel[0], tree };
};

// Fonction pour générer une preuve Merkle pour une feuille
export const getMerkleProof = (leaves: string[], index: number): { proof: string[]; leaf: string } => {
  if (index < 0 || index >= leaves.length) {
    throw new Error('Index out of bounds');
  }

  const leaf = createHash('sha256').update(leaves[index]).digest('hex');
  const proof: string[] = [];
  let currentIndex = index;
  let currentLevel = leaves.map(l => createHash('sha256').update(l).digest('hex'));

  while (currentLevel.length > 1) {
    const isRightNode = currentIndex % 2 === 1;
    const siblingIndex = isRightNode ? currentIndex - 1 : currentIndex + 1;

    if (siblingIndex < currentLevel.length) {
      proof.push(currentLevel[siblingIndex]);
    } else {
      proof.push(currentLevel[currentIndex]); // Dupliquer si pas de sibling
    }

    currentIndex = Math.floor(currentIndex / 2);
    const nextLevel: string[] = [];
    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i];
      const right = i + 1 < currentLevel.length ? currentLevel[i + 1] : currentLevel[i];
      nextLevel.push(hashPair(left, right));
    }
    currentLevel = nextLevel;
  }

  return { proof, leaf };
};

// Fonction pour vérifier une preuve Merkle
export const verifyMerkleProof = (
  leaf: string,
  proof: string[],
  root: string
): boolean => {
  let currentHash = leaf;

  for (const sibling of proof) {
    currentHash = hashPair(currentHash, sibling);
  }

  return currentHash === root;
};

// Fonction pour créer un snapshot Merkle du ledger
export const createLedgerMerkleSnapshot = (events: { event_hash: string }[]): { root: string; tree: string[][] } => {
  const leaves = events.map(e => e.event_hash);
  return buildMerkleTree(leaves);
};

// Fonction pour vérifier l'appartenance d'un événement au ledger via Merkle
export const verifyEventInLedger = (
  eventHash: string,
  proof: string[],
  root: string
): boolean => {
  const leaf = createHash('sha256').update(eventHash).digest('hex');
  return verifyMerkleProof(leaf, proof, root);
};