-- Migration: Créer la table des tarifs dentaires officiels
-- Up

CREATE TABLE IF NOT EXISTS official_dental_tariffs (
    id TEXT PRIMARY KEY,
    country_iso2 TEXT NOT NULL,
    procedure_code TEXT NOT NULL,
    procedure_name TEXT NOT NULL,
    cost REAL NOT NULL,
    currency TEXT NOT NULL,
    source TEXT NOT NULL,
    source_url TEXT,
    year INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (country_iso2) REFERENCES countries(iso2)
);

CREATE INDEX IF NOT EXISTS idx_official_dental_tariffs_country ON official_dental_tariffs(country_iso2);
CREATE INDEX IF NOT EXISTS idx_official_dental_tariffs_procedure ON official_dental_tariffs(procedure_code);
CREATE INDEX IF NOT EXISTS idx_official_dental_tariffs_year ON official_dental_tariffs(year);
CREATE INDEX IF NOT EXISTS idx_official_dental_tariffs_active ON official_dental_tariffs(is_active);

-- Down
-- DROP TABLE official_dental_tariffs;