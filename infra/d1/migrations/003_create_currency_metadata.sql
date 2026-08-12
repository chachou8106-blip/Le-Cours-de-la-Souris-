-- Migration: Créer la table des métadonnées des devises
-- Up

CREATE TABLE IF NOT EXISTS currency_metadata (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    symbol TEXT NOT NULL,
    decimal_digits INTEGER NOT NULL DEFAULT 2,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_currency_metadata_code ON currency_metadata(code);

-- Down
-- DROP TABLE currency_metadata;