-- Migration: Créer la table des snapshots Merkle
-- Up

CREATE TABLE IF NOT EXISTS merkle_snapshots (
    snapshot_id TEXT PRIMARY KEY,
    root_hash TEXT NOT NULL,
    epoch INTEGER NOT NULL,
    total_amount REAL NOT NULL,
    total_events INTEGER NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_merkle_snapshots_epoch ON merkle_snapshots(epoch);

-- Down
-- DROP TABLE merkle_snapshots;