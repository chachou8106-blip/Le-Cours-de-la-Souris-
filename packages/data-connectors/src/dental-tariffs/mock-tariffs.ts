/**
 * Mock des tarifs dentaires officiels
 * 
 * Ce fichier fournit des données de démonstration pour les tarifs dentaires officiels.
 * Ces données sont utilisées pour le développement et les tests.
 */

import { OfficialDentalTariff } from '@cours-de-la-souris/index-engine/src/official-index';

// Tarifs de démonstration pour différents pays
export const mockDentalTariffs: OfficialDentalTariff[] = [
  // France
  {
    id: 'tariff_fr_001',
    countryIso2: 'FR',
    procedureCode: 'EXTR_SIMPLE',
    procedureName: 'Extraction dentaire simple',
    cost: 30,
    currency: 'EUR',
    source: 'Conseil National de l\'Ordre des Chirurgiens-Dentistes',
    sourceUrl: 'https://www.ordres-cd.fr',
    year: 2026,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'tariff_fr_002',
    countryIso2: 'FR',
    procedureCode: 'EXTR_SURGICAL',
    procedureName: 'Extraction chirurgicale',
    cost: 80,
    currency: 'EUR',
    source: 'Conseil National de l\'Ordre des Chirurgiens-Dentistes',
    sourceUrl: 'https://www.ordres-cd.fr',
    year: 2026,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  
  // États-Unis
  {
    id: 'tariff_us_001',
    countryIso2: 'US',
    procedureCode: 'EXTR_SIMPLE',
    procedureName: 'Simple tooth extraction',
    cost: 150,
    currency: 'USD',
    source: 'American Dental Association',
    sourceUrl: 'https://www.ada.org',
    year: 2026,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  {
    id: 'tariff_us_002',
    countryIso2: 'US',
    procedureCode: 'EXTR_SURGICAL',
    procedureName: 'Surgical tooth extraction',
    cost: 300,
    currency: 'USD',
    source: 'American Dental Association',
    sourceUrl: 'https://www.ada.org',
    year: 2026,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  
  // Royaume-Uni
  {
    id: 'tariff_gb_001',
    countryIso2: 'GB',
    procedureCode: 'EXTR_SIMPLE',
    procedureName: 'Simple extraction',
    cost: 80,
    currency: 'GBP',
    source: 'NHS Dental Tariffs',
    sourceUrl: 'https://www.nhs.uk',
    year: 2026,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  
  // Allemagne
  {
    id: 'tariff_de_001',
    countryIso2: 'DE',
    procedureCode: 'EXTR_SIMPLE',
    procedureName: 'Einfache Zahnentfernung',
    cost: 60,
    currency: 'EUR',
    source: 'Bundeszahnärztekammer',
    sourceUrl: 'https://www.bzaek.de',
    year: 2026,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  
  // Espagne
  {
    id: 'tariff_es_001',
    countryIso2: 'ES',
    procedureCode: 'EXTR_SIMPLE',
    procedureName: 'Extracción dental simple',
    cost: 50,
    currency: 'EUR',
    source: 'Consejo General de Dentistas',
    sourceUrl: 'https://www.dentistas.org',
    year: 2026,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  
  // Italie
  {
    id: 'tariff_it_001',
    countryIso2: 'IT',
    procedureCode: 'EXTR_SIMPLE',
    procedureName: 'Estrazione dentale semplice',
    cost: 70,
    currency: 'EUR',
    source: 'Ordine Nazionale dei Medici Chirurghi e degli Odontoiatri',
    sourceUrl: 'https://www.fnomoceo.it',
    year: 2026,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  
  // Japon
  {
    id: 'tariff_jp_001',
    countryIso2: 'JP',
    procedureCode: 'EXTR_SIMPLE',
    procedureName: '歯の抜歯',
    cost: 10000,
    currency: 'JPY',
    source: 'Japan Dental Association',
    sourceUrl: 'https://www.jda.or.jp',
    year: 2026,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  
  // Canada
  {
    id: 'tariff_ca_001',
    countryIso2: 'CA',
    procedureCode: 'EXTR_SIMPLE',
    procedureName: 'Simple tooth extraction',
    cost: 120,
    currency: 'CAD',
    source: 'Canadian Dental Association',
    sourceUrl: 'https://www.cda-adc.ca',
    year: 2026,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  
  // Australie
  {
    id: 'tariff_au_001',
    countryIso2: 'AU',
    procedureCode: 'EXTR_SIMPLE',
    procedureName: 'Simple extraction',
    cost: 150,
    currency: 'AUD',
    source: 'Australian Dental Association',
    sourceUrl: 'https://www.ada.org.au',
    year: 2026,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
  
  // Brésil
  {
    id: 'tariff_br_001',
    countryIso2: 'BR',
    procedureCode: 'EXTR_SIMPLE',
    procedureName: 'Extração dental simples',
    cost: 150,
    currency: 'BRL',
    source: 'Conselho Federal de Odontologia',
    sourceUrl: 'https://www.cfo.org.br',
    year: 2026,
    isActive: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-08-01T00:00:00Z',
  },
];

// Fonctions utilitaires pour les mocks
/**
 * Obtenir les tarifs pour un pays spécifique
 */
export function getMockTariffsByCountry(countryIso2: string): OfficialDentalTariff[] {
  return mockDentalTariffs.filter((tariff) => tariff.countryIso2 === countryIso2);
}

/**
 * Obtenir tous les pays avec des tarifs mock
 */
export function getMockCountriesWithTariffs(): string[] {
  return [...new Set(mockDentalTariffs.map((tariff) => tariff.countryIso2))];
}

/**
 * Obtenir tous les tarifs mock
 */
export function getAllMockTariffs(): OfficialDentalTariff[] {
  return [...mockDentalTariffs];
}

// Exporter les tarifs par défaut
export default mockDentalTariffs;