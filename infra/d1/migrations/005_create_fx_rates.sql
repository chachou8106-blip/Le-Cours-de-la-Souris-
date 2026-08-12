-- Migration: Créer la table des taux de change
-- Up

CREATE TABLE IF NOT EXISTS fx_rates (
    id TEXT PRIMARY KEY,
    from_currency TEXT NOT NULL,
    to_currency TEXT NOT NULL,
    rate REAL NOT NULL,
    source TEXT NOT NULL,
    observed_at TEXT NOT NULL,
    retrieved_at TEXT DEFAULT (datetime('now')),
    is_demo BOOLEAN DEFAULT FALSE,
    confidence REAL DEFAULT 1.0
);

CREATE INDEX IF NOT EXISTS idx_fx_rates_from ON fx_rates(from_currency);
CREATE INDEX IF NOT EXISTS idx_fx_rates_to ON fx_rates(to_currency);
CREATE INDEX IF NOT EXISTS idx_fx_rates_observed ON fx_rates(observed_at);

-- Down
-- DROP TABLE fx_rates;