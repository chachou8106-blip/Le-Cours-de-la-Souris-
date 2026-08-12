-- Migration: Créer la table des sources officielles
-- Up

CREATE TABLE IF NOT EXISTS official_sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    country_iso2 TEXT,
    source_type TEXT NOT NULL, -- 'government', 'association', 'study', 'other'
    url TEXT,
    license TEXT,
    last_retrieved_at TEXT,
    data_format TEXT, -- 'json', 'csv', 'html', 'api'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_official_sources_country ON official_sources(country_iso2);
CREATE INDEX IF NOT EXISTS idx_official_sources_type ON official_sources(source_type);
CREATE INDEX IF NOT EXISTS idx_official_sources_active ON official_sources(is_active);

-- Down
-- DROP TABLE official_sources;