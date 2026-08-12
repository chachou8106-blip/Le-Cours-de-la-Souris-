-- Seed: Données de démonstration pour les rapports de paiement familial

INSERT OR IGNORE INTO family_payout_reports 
(id, country_iso2, amount, currency, month, year, age_range, tradition, comment, status, is_demo, created_at)
VALUES
    ('report_001', 'FR', 5.00, 'EUR', 8, 2026, '6-8', 'La Petite Souris', 'Premier rapport de test', 'published', TRUE, datetime('now')),
    ('report_002', 'US', 7.00, 'USD', 8, 2026, '6-8', 'The Tooth Fairy', 'Test report from USA', 'published', TRUE, datetime('now')),
    ('report_003', 'GB', 4.50, 'GBP', 8, 2026, '3-5', 'The Tooth Fairy', 'UK test report', 'published', TRUE, datetime('now')),
    ('report_004', 'DE', 6.00, 'EUR', 8, 2026, '9-12', 'La Zahnfee', 'German test report', 'pending', TRUE, datetime('now')),
    ('report_005', 'ES', 4.00, 'EUR', 8, 2026, '6-8', 'El Ratoncito Pérez', 'Spanish test report', 'auto_approved', TRUE, datetime('now'));