// Mock des tarifs dentaires officiels pour le développement
import { OfficialDentalTariff } from '../../../schemas/src/db/official-dental-tariffs';

export const mockOfficialDentalTariffs: OfficialDentalTariff[] = [
  { id: 1, country_iso2: 'FR', extraction_cost: 50, currency: 'EUR', source: 'Conseil National de l\'Ordre des Chirurgiens-Dentistes', year: 2026, is_demo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, country_iso2: 'US', extraction_cost: 150, currency: 'USD', source: 'American Dental Association (ADA)', year: 2026, is_demo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, country_iso2: 'GB', extraction_cost: 80, currency: 'GBP', source: 'British Dental Association', year: 2026, is_demo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 4, country_iso2: 'DE', extraction_cost: 60, currency: 'EUR', source: 'Bundeszahnärztekammer', year: 2026, is_demo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 5, country_iso2: 'ES', extraction_cost: 40, currency: 'EUR', source: 'Consejo General de Dentistas', year: 2026, is_demo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 6, country_iso2: 'JP', extraction_cost: 5000, currency: 'JPY', source: 'Japan Dental Association', year: 2026, is_demo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 7, country_iso2: 'CA', extraction_cost: 120, currency: 'CAD', source: 'Canadian Dental Association', year: 2026, is_demo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 8, country_iso2: 'AU', extraction_cost: 180, currency: 'AUD', source: 'Australian Dental Association', year: 2026, is_demo: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

// Fonction pour récupérer les tarifs officiels (mock)
export const getMockOfficialDentalTariffs = async (): Promise<OfficialDentalTariff[]> => {
  return mockOfficialDentalTariffs;
};

// Fonction pour récupérer les tarifs pour un pays spécifique (mock)
export const getMockOfficialDentalTariffByCountry = async (countryIso2: string): Promise<OfficialDentalTariff | null> => {
  return mockOfficialDentalTariffs.find(tariff => tariff.country_iso2 === countryIso2) || null;
};