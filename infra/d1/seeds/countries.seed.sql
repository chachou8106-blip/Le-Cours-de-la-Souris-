-- Seed: Données initiales pour les pays

INSERT OR IGNORE INTO countries (iso2, name_fr, name_en, currency_code, currency_name, currency_symbol, tradition_fr, tradition_en, is_active)
VALUES
    ('FR', 'France', 'France', 'EUR', 'Euro', '€', 'La Petite Souris', 'The Tooth Fairy', TRUE),
    ('US', 'États-Unis', 'United States', 'USD', 'US Dollar', '$', 'La Fée des Dents', 'The Tooth Fairy', TRUE),
    ('GB', 'Royaume-Uni', 'United Kingdom', 'GBP', 'British Pound', '£', 'La Petite Souris', 'The Tooth Fairy', TRUE),
    ('DE', 'Allemagne', 'Germany', 'EUR', 'Euro', '€', 'La Zahnfee', 'The Tooth Fairy', TRUE),
    ('ES', 'Espagne', 'Spain', 'EUR', 'Euro', '€', 'El Ratoncito Pérez', 'The Tooth Fairy', TRUE),
    ('IT', 'Italie', 'Italy', 'EUR', 'Euro', '€', 'La Fatina dei Denti', 'The Tooth Fairy', TRUE),
    ('JP', 'Japon', 'Japan', 'JPY', 'Japanese Yen', '¥', 'Shigatsu-san', 'The Tooth Fairy', TRUE),
    ('CA', 'Canada', 'Canada', 'CAD', 'Canadian Dollar', 'C$', 'La Petite Souris', 'The Tooth Fairy', TRUE),
    ('AU', 'Australie', 'Australia', 'AUD', 'Australian Dollar', 'A$', 'La Petite Souris', 'The Tooth Fairy', TRUE),
    ('BR', 'Brésil', 'Brazil', 'BRL', 'Brazilian Real', 'R$', 'O Ratinho Pérez', 'The Tooth Fairy', TRUE);

INSERT OR IGNORE INTO currency_metadata (code, name, symbol, decimal_digits, is_active)
VALUES
    ('EUR', 'Euro', '€', 2, TRUE),
    ('USD', 'US Dollar', '$', 2, TRUE),
    ('GBP', 'British Pound', '£', 2, TRUE),
    ('JPY', 'Japanese Yen', '¥', 0, TRUE),
    ('CAD', 'Canadian Dollar', 'C$', 2, TRUE),
    ('AUD', 'Australian Dollar', 'A$', 2, TRUE),
    ('BRL', 'Brazilian Real', 'R$', 2, TRUE);