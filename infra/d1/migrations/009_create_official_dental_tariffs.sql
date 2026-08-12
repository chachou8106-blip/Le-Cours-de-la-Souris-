-- Migration: Créer la table des tarifs dentaires officiels (coût d'extraction par pays)
-- Up

CREATE TABLE IF NOT EXISTS official_dental_tariffs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country_iso2 TEXT NOT NULL,
    extraction_cost REAL NOT NULL, -- Coût moyen d'une extraction dentaire
    currency TEXT NOT NULL,
    source TEXT NOT NULL, -- Source (ex: "Conseil National de l'Ordre des Chirurgiens-Dentistes")
    year INTEGER NOT NULL,
    is_demo BOOLEAN DEFAULT FALSE,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (country_iso2) REFERENCES countries(iso2),
    UNIQUE (country_iso2, year)
);

CREATE INDEX IF NOT EXISTS idx_official_dental_tariffs_country ON official_dental_tariffs(country_iso2);
CREATE INDEX IF NOT EXISTS idx_official_dental_tariffs_year ON official_dental_tariffs(year);

-- Down
-- DROP TABLE official_dental_tariffs;