-- Seed: Données initiales pour les sources officielles

INSERT OR IGNORE INTO official_sources (id, name, description, country_iso2, source_type, url, license, last_retrieved_at, data_format, is_active)
VALUES
    -- France
    ('source_fr_001', 'Conseil National de l\'Ordre des Chirurgiens-Dentistes', 'Tarifs officiels des actes dentaires en France', 'FR', 'association', 'https://www.ordres-cd.fr', 'Open Data', '2026-08-01T00:00:00Z', 'html', TRUE),
    ('source_fr_002', 'Ameli - Assurance Maladie', 'Tarifs de remboursement des soins dentaires', 'FR', 'government', 'https://www.ameli.fr', 'Open Data', '2026-08-01T00:00:00Z', 'html', TRUE),
    
    -- États-Unis
    ('source_us_001', 'American Dental Association', 'Tarifs moyens des soins dentaires aux États-Unis', 'US', 'association', 'https://www.ada.org', 'Proprietary', '2026-08-01T00:00:00Z', 'html', TRUE),
    ('source_us_002', 'Centers for Medicare & Medicaid Services', 'Tarifs de remboursement Medicare/Medicaid', 'US', 'government', 'https://www.cms.gov', 'Open Data', '2026-08-01T00:00:00Z', 'json', TRUE),
    
    -- Royaume-Uni
    ('source_gb_001', 'NHS Dental Tariffs', 'Tarifs officiels des soins dentaires du NHS', 'GB', 'government', 'https://www.nhs.uk', 'Open Data', '2026-08-01T00:00:00Z', 'html', TRUE),
    
    -- Allemagne
    ('source_de_001', 'Bundeszahnärztekammer', 'Tarifs des soins dentaires en Allemagne', 'DE', 'association', 'https://www.bzaek.de', 'Open Data', '2026-08-01T00:00:00Z', 'html', TRUE),
    
    -- Espagne
    ('source_es_001', 'Consejo General de Dentistas', 'Tarifs des soins dentaires en Espagne', 'ES', 'association', 'https://www.dentistas.org', 'Open Data', '2026-08-01T00:00:00Z', 'html', TRUE),
    
    -- Italie
    ('source_it_001', 'Ordine Nazionale dei Medici Chirurghi e degli Odontoiatri', 'Tarifs des soins dentaires en Italie', 'IT', 'association', 'https://www.fnomoceo.it', 'Open Data', '2026-08-01T00:00:00Z', 'html', TRUE),
    
    -- Japon
    ('source_jp_001', 'Japan Dental Association', 'Tarifs des soins dentaires au Japon', 'JP', 'association', 'https://www.jda.or.jp', 'Proprietary', '2026-08-01T00:00:00Z', 'html', TRUE),
    
    -- Canada
    ('source_ca_001', 'Canadian Dental Association', 'Tarifs des soins dentaires au Canada', 'CA', 'association', 'https://www.cda-adc.ca', 'Open Data', '2026-08-01T00:00:00Z', 'html', TRUE),
    
    -- Australie
    ('source_au_001', 'Australian Dental Association', 'Tarifs des soins dentaires en Australie', 'AU', 'association', 'https://www.ada.org.au', 'Open Data', '2026-08-01T00:00:00Z', 'html', TRUE),
    
    -- Brésil
    ('source_br_001', 'Conselho Federal de Odontologia', 'Tarifs des soins dentaires au Brésil', 'BR', 'association', 'https://www.cfo.org.br', 'Open Data', '2026-08-01T00:00:00Z', 'html', TRUE);

-- Observations de démonstration pour les sources
INSERT OR IGNORE INTO source_observations (id, source_id, observed_at, data, parsed_data, status, is_demo, confidence)
VALUES
    ('obs_fr_001', 'source_fr_001', '2026-08-01T00:00:00Z', '{"EXTR_SIMPLE": 30, "EXTR_SURGICAL": 80}', '{"procedures": {"EXTR_SIMPLE": {"cost": 30, "currency": "EUR"}, "EXTR_SURGICAL": {"cost": 80, "currency": "EUR"}}}', 'parsed', TRUE, 1.0),
    ('obs_us_001', 'source_us_001', '2026-08-01T00:00:00Z', '{"EXTR_SIMPLE": 150, "EXTR_SURGICAL": 300}', '{"procedures": {"EXTR_SIMPLE": {"cost": 150, "currency": "USD"}, "EXTR_SURGICAL": {"cost": 300, "currency": "USD"}}}', 'parsed', TRUE, 1.0);