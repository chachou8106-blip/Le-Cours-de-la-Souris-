-- Migration: Créer la table des observations des sources
-- Up

CREATE TABLE IF NOT EXISTS source_observations (
    id TEXT PRIMARY KEY,
    source_id TEXT NOT NULL,
    observed_at TEXT NOT NULL,
    retrieved_at TEXT DEFAULT (datetime('now')),
    data TEXT, -- Données brutes ou transformées
    parsed_data TEXT, -- Données parsées (JSON)
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'parsed', 'error'
    error_message TEXT,
    is_demo BOOLEAN DEFAULT FALSE,
    confidence REAL DEFAULT 1.0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (source_id) REFERENCES official_sources(id)
);

CREATE INDEX IF NOT EXISTS idx_source_observations_source ON source_observations(source_id);
CREATE INDEX IF NOT EXISTS idx_source_observations_observed ON source_observations(observed_at);
CREATE INDEX IF NOT EXISTS idx_source_observations_status ON source_observations(status);

-- Down
-- DROP TABLE source_observations;