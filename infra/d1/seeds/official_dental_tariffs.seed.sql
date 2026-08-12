-- Seed: Données initiales pour les tarifs dentaires officiels

-- France
INSERT OR IGNORE INTO official_dental_tariffs (id, country_iso2, procedure_code, procedure_name, cost, currency, source, source_url, year, is_active)
VALUES
    ('tariff_fr_001', 'FR', 'EXTR_SIMPLE', 'Extraction dentaire simple', 30.00, 'EUR', 'Conseil National de l\'Ordre des Chirurgiens-Dentistes', 'https://www.ordres-cd.fr', 2026, TRUE),
    ('tariff_fr_002', 'FR', 'EXTR_SURGICAL', 'Extraction chirurgicale', 80.00, 'EUR', 'Conseil National de l\'Ordre des Chirurgiens-Dentistes', 'https://www.ordres-cd.fr', 2026, TRUE),
    ('tariff_fr_003', 'FR', 'FILLING_1', 'Plaquage 1 face', 45.00, 'EUR', 'Conseil National de l\'Ordre des Chirurgiens-Dentistes', 'https://www.ordres-cd.fr', 2026, TRUE);

-- États-Unis
INSERT OR IGNORE INTO official_dental_tariffs (id, country_iso2, procedure_code, procedure_name, cost, currency, source, source_url, year, is_active)
VALUES
    ('tariff_us_001', 'US', 'EXTR_SIMPLE', 'Simple tooth extraction', 150.00, 'USD', 'American Dental Association', 'https://www.ada.org', 2026, TRUE),
    ('tariff_us_002', 'US', 'EXTR_SURGICAL', 'Surgical tooth extraction', 300.00, 'USD', 'American Dental Association', 'https://www.ada.org', 2026, TRUE),
    ('tariff_us_003', 'US', 'FILLING_1', '1-surface filling', 100.00, 'USD', 'American Dental Association', 'https://www.ada.org', 2026, TRUE);

-- Royaume-Uni
INSERT OR IGNORE INTO official_dental_tariffs (id, country_iso2, procedure_code, procedure_name, cost, currency, source, source_url, year, is_active)
VALUES
    ('tariff_gb_001', 'GB', 'EXTR_SIMPLE', 'Simple extraction', 80.00, 'GBP', 'NHS Dental Tariffs', 'https://www.nhs.uk', 2026, TRUE),
    ('tariff_gb_002', 'GB', 'EXTR_SURGICAL', 'Surgical extraction', 150.00, 'GBP', 'NHS Dental Tariffs', 'https://www.nhs.uk', 2026, TRUE);

-- Allemagne
INSERT OR IGNORE INTO official_dental_tariffs (id, country_iso2, procedure_code, procedure_name, cost, currency, source, source_url, year, is_active)
VALUES
    ('tariff_de_001', 'DE', 'EXTR_SIMPLE', 'Einfache Zahnentfernung', 60.00, 'EUR', 'Bundeszahnärztekammer', 'https://www.bzaek.de', 2026, TRUE),
    ('tariff_de_002', 'DE', 'EXTR_SURGICAL', 'Chirurgische Zahnentfernung', 120.00, 'EUR', 'Bundeszahnärztekammer', 'https://www.bzaek.de', 2026, TRUE);

-- Espagne
INSERT OR IGNORE INTO official_dental_tariffs (id, country_iso2, procedure_code, procedure_name, cost, currency, source, source_url, year, is_active)
VALUES
    ('tariff_es_001', 'ES', 'EXTR_SIMPLE', 'Extracción dental simple', 50.00, 'EUR', 'Consejo General de Dentistas', 'https://www.dentistas.org', 2026, TRUE);

-- Italie
INSERT OR IGNORE INTO official_dental_tariffs (id, country_iso2, procedure_code, procedure_name, cost, currency, source, source_url, year, is_active)
VALUES
    ('tariff_it_001', 'IT', 'EXTR_SIMPLE', 'Estrazione dentale semplice', 70.00, 'EUR', 'Ordine Nazionale dei Medici Chirurghi e degli Odontoiatri', 'https://www.fnomoceo.it', 2026, TRUE);

-- Japon
INSERT OR IGNORE INTO official_dental_tariffs (id, country_iso2, procedure_code, procedure_name, cost, currency, source, source_url, year, is_active)
VALUES
    ('tariff_jp_001', 'JP', 'EXTR_SIMPLE', '歯の抜歯', 10000.00, 'JPY', 'Japan Dental Association', 'https://www.jda.or.jp', 2026, TRUE);

-- Canada
INSERT OR IGNORE INTO official_dental_tariffs (id, country_iso2, procedure_code, procedure_name, cost, currency, source, source_url, year, is_active)
VALUES
    ('tariff_ca_001', 'CA', 'EXTR_SIMPLE', 'Simple tooth extraction', 120.00, 'CAD', 'Canadian Dental Association', 'https://www.cda-adc.ca', 2026, TRUE);

-- Australie
INSERT OR IGNORE INTO official_dental_tariffs (id, country_iso2, procedure_code, procedure_name, cost, currency, source, source_url, year, is_active)
VALUES
    ('tariff_au_001', 'AU', 'EXTR_SIMPLE', 'Simple extraction', 150.00, 'AUD', 'Australian Dental Association', 'https://www.ada.org.au', 2026, TRUE);

-- Brésil
INSERT OR IGNORE INTO official_dental_tariffs (id, country_iso2, procedure_code, procedure_name, cost, currency, source, source_url, year, is_active)
VALUES
    ('tariff_br_001', 'BR', 'EXTR_SIMPLE', 'Extração dental simples', 150.00, 'BRL', 'Conselho Federal de Odontologia', 'https://www.cfo.org.br', 2026, TRUE);