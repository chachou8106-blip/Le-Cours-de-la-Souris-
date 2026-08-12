-- Migration: Créer la table du ledger CROQ (append-only)
-- Up

CREATE TABLE IF NOT EXISTS croq_ledger_events (
    event_id TEXT PRIMARY KEY,
    sequence INTEGER NOT NULL UNIQUE,
    event_type TEXT NOT NULL, -- 'mint', 'burn', 'transfer', 'reward'
    account_pseudonym TEXT NOT NULL,
    amount REAL NOT NULL,
    reason_code TEXT NOT NULL,
    related_entity TEXT,
    prev_hash TEXT NOT NULL,
    event_hash TEXT NOT NULL,
    batch_id TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_croq_ledger_sequence ON croq_ledger_events(sequence);
CREATE INDEX IF NOT EXISTS idx_croq_ledger_account ON croq_ledger_events(account_pseudonym);
CREATE INDEX IF NOT EXISTS idx_croq_ledger_batch ON croq_ledger_events(batch_id);

-- Down
-- DROP TABLE croq_ledger_events;