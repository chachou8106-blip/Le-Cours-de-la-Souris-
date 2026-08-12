-- Migration: Créer la table des rapports de paiement familial
-- Up

CREATE TABLE IF NOT EXISTS family_payout_reports (
    id TEXT PRIMARY KEY,
    country_iso2 TEXT NOT NULL,
    amount REAL NOT NULL,
    currency TEXT NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    age_range TEXT,
    tradition TEXT,
    comment TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    risk_score REAL DEFAULT 0.0,
    is_demo BOOLEAN DEFAULT FALSE,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (country_iso2) REFERENCES countries(iso2)
);

CREATE INDEX IF NOT EXISTS idx_family_payout_reports_country ON family_payout_reports(country_iso2);
CREATE INDEX IF NOT EXISTS idx_family_payout_reports_status ON family_payout_reports(status);
CREATE INDEX IF NOT EXISTS idx_family_payout_reports_created ON family_payout_reports(created_at);

-- Down
-- DROP TABLE family_payout_reports;