-- Seed: Données de démonstration pour les tarifs dentaires officiels (coût d'extraction)

INSERT OR IGNORE INTO official_dental_tariffs 
(country_iso2, extraction_cost, currency, source, year, is_demo)
VALUES
    -- Europe
    ('FR', 50.00, 'EUR', 'Conseil National de l\'Ordre des Chirurgiens-Dentistes (France)', 2026, TRUE),
    ('DE', 60.00, 'EUR', 'Bundeszahnärztekammer (Allemagne)', 2026, TRUE),
    ('ES', 40.00, 'EUR', 'Consejo General de Dentistas (Espagne)', 2026, TRUE),
    ('IT', 45.00, 'EUR', 'Consiglio Nazionale degli Odontoiatri (Italie)', 2026, TRUE),
    ('GB', 80.00, 'GBP', 'British Dental Association (Royaume-Uni)', 2026, TRUE),
    
    -- Amérique
    ('US', 150.00, 'USD', 'American Dental Association (ADA)', 2026, TRUE),
    ('CA', 120.00, 'CAD', 'Canadian Dental Association', 2026, TRUE),
    ('BR', 200.00, 'BRL', 'Conselho Federal de Odontologia (Brésil)', 2026, TRUE),
    
    -- Asie
    ('JP', 5000.00, 'JPY', 'Japan Dental Association', 2026, TRUE),
    ('CN', 300.00, 'CNY', 'Chinese Stomatological Association', 2026, TRUE),
    ('IN', 1500.00, 'INR', 'Dental Council of India', 2026, TRUE),
    
    -- Océanie
    ('AU', 180.00, 'AUD', 'Australian Dental Association', 2026, TRUE),
    ('NZ', 150.00, 'NZD', 'New Zealand Dental Association', 2026, TRUE),
    
    -- Afrique
    ('ZA', 800.00, 'ZAR', 'South African Dental Association', 2026, TRUE),
    ('EG', 500.00, 'EGP', 'Egyptian Dental Syndicate', 2026, TRUE);