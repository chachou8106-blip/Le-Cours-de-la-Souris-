-- Migration: Créer la table des décisions de modération
-- Up

CREATE TABLE IF NOT EXISTS moderation_decisions (
    id TEXT PRIMARY KEY,
    report_id TEXT NOT NULL,
    decision TEXT NOT NULL, -- 'approve', 'quarantine', 'reject'
    reason TEXT,
    moderator_id TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (report_id) REFERENCES family_payout_reports(id)
);

CREATE INDEX IF NOT EXISTS idx_moderation_decisions_report ON moderation_decisions(report_id);
CREATE INDEX IF NOT EXISTS idx_moderation_decisions_moderator ON moderation_decisions(moderator_id);

-- Down
-- DROP TABLE moderation_decisions;