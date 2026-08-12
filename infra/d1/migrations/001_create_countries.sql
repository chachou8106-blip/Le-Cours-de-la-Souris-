-- Migration: Créer la table des pays
-- Up

CREATE TABLE IF NOT EXISTS countries (
    iso2 TEXT PRIMARY KEY,
    name_fr TEXT NOT NULL,
    name_en TEXT NOT NULL,
    currency_code TEXT NOT NULL,
    currency_name TEXT NOT NULL,
    currency_symbol TEXT NOT NULL,
    tradition_fr TEXT,
    tradition_en TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_countries_iso2 ON countries(iso2);
CREATE INDEX IF NOT EXISTS idx_countries_active ON countries(is_active);

-- Down
-- DROP TABLE countries;