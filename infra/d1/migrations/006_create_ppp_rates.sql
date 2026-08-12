-- Migration: Créer la table des taux PPA (Parité de Pouvoir d'Achat)
-- Up

CREATE TABLE IF NOT EXISTS ppp_rates (
    id TEXT PRIMARY KEY,
    country_iso2 TEXT NOT NULL,
    rate REAL NOT NULL,
    base_currency TEXT NOT NULL DEFAULT 'USD',
    source TEXT NOT NULL,
    year INTEGER NOT NULL,
    observed_at TEXT NOT NULL,
    retrieved_at TEXT DEFAULT (datetime('now')),
    is_demo BOOLEAN DEFAULT FALSE,
    confidence REAL DEFAULT 1.0,
    FOREIGN KEY (country_iso2) REFERENCES countries(iso2)
);

CREATE INDEX IF NOT EXISTS idx_ppp_rates_country ON ppp_rates(country_iso2);
CREATE INDEX IF NOT EXISTS idx_ppp_rates_year ON ppp_rates(year);

-- Down
-- DROP TABLE ppp_rates;