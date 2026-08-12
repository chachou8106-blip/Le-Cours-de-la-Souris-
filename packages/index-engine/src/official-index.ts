/**
 * Moteur de calcul de l'indice officiel
 * 
 * Ce module gère les tarifs officiels des actes dentaires et calcule les indices associés.
 * Les données proviennent de sources officielles (ministères, associations dentaires).
 */

// Interface pour un tarif dentaire officiel
export interface OfficialDentalTariff {
  id: string;
  countryIso2: string;
  procedureCode: string;
  procedureName: string;
  cost: number;
  currency: string;
  source: string;
  sourceUrl: string;
  year: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Interface pour les métriques officielles d'un pays
export interface CountryOfficialMetrics {
  countryIso2: string;
  countryName: string;
  tariffs: OfficialDentalTariff[];
  averageCost: number;
  currency: string;
  lastUpdated: string;
}

// Interface pour l'indice officiel mondial
export interface OfficialIndex {
  value: number;
  countriesCount: number;
  averageCost: number;
  lastUpdated: string;
}

// Données de démonstration pour les tarifs officiels
const demoOfficialTariffs: OfficialDentalTariff[] = [
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
];

// Données pour les pays (simplifiées)
const demoCountries = [
  { iso2: 'FR', name: 'France' },
  { iso2: 'US', name: 'États-Unis' },
  { iso2: 'GB', name: 'Royaume-Uni' },
  { iso2: 'DE', name: 'Allemagne' },
];

/**
 * Calculer la moyenne des coûts pour un pays
 */
export function calculateAverageCost(tariffs: OfficialDentalTariff[]): number {
  if (tariffs.length === 0) return 0;
  return tariffs.reduce((sum, tariff) => sum + tariff.cost, 0) / tariffs.length;
}

/**
 * Calculer les métriques officielles pour un pays
 */
export function calculateCountryOfficialMetrics(
  countryIso2: string,
  tariffs: OfficialDentalTariff[]
): CountryOfficialMetrics | null {
  const countryTariffs = tariffs.filter((t) => t.countryIso2 === countryIso2);
  if (countryTariffs.length === 0) return null;

  const country = demoCountries.find((c) => c.iso2 === countryIso2);
  const averageCost = calculateAverageCost(countryTariffs);
  const lastUpdated = new Date(
    Math.max(...countryTariffs.map((t) => new Date(t.updatedAt).getTime()))
  ).toISOString();

  return {
    countryIso2,
    countryName: country ? country.name : countryIso2,
    tariffs: countryTariffs,
    averageCost,
    currency: countryTariffs[0].currency,
    lastUpdated,
  };
}

/**
 * Calculer l'indice officiel mondial
 */
export function calculateOfficialIndex(
  countryMetrics: CountryOfficialMetrics[]
): OfficialIndex {
  if (countryMetrics.length === 0) {
    return {
      value: 0,
      countriesCount: 0,
      averageCost: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  // Calculer la moyenne des coûts (en USD pour comparaison)
  // Dans une implémentation réelle, on utiliserait les taux de change
  const fxRates: Record<string, number> = {
    EUR: 1.1, // 1 EUR = 1.1 USD
    USD: 1.0,
    GBP: 1.3, // 1 GBP = 1.3 USD
  };

  let totalCostInUSD = 0;
  let totalCountries = 0;
  let maxDate = new Date(0);

  for (const cm of countryMetrics) {
    const fxRate = fxRates[cm.currency] || 1;
    totalCostInUSD += cm.averageCost / fxRate; // Convertir en USD
    totalCountries++;
    
    const lastUpdatedDate = new Date(cm.lastUpdated);
    if (lastUpdatedDate > maxDate) {
      maxDate = lastUpdatedDate;
    }
  }

  const averageCost = totalCostInUSD / totalCountries;

  return {
    value: averageCost,
    countriesCount: totalCountries,
    averageCost,
    lastUpdated: maxDate.toISOString(),
  };
}

/**
 * Obtenir tous les tarifs officiels pour un pays
 */
export function getTariffsByCountry(
  countryIso2: string,
  tariffs: OfficialDentalTariff[] = demoOfficialTariffs
): OfficialDentalTariff[] {
  return tariffs.filter((t) => t.countryIso2 === countryIso2 && t.isActive);
}

/**
 * Obtenir tous les pays avec des tarifs officiels
 */
export function getCountriesWithOfficialTariffs(
  tariffs: OfficialDentalTariff[] = demoOfficialTariffs
): string[] {
  return [...new Set(tariffs.map((t) => t.countryIso2))];
}

/**
 * Obtenir les métriques officielles pour tous les pays
 */
export function getAllCountryOfficialMetrics(
  tariffs: OfficialDentalTariff[] = demoOfficialTariffs
): CountryOfficialMetrics[] {
  const countries = getCountriesWithOfficialTariffs(tariffs);
  const metrics: CountryOfficialMetrics[] = [];

  for (const countryIso2 of countries) {
    const countryMetric = calculateCountryOfficialMetrics(countryIso2, tariffs);
    if (countryMetric) {
      metrics.push(countryMetric);
    }
  }

  return metrics;
}

// Exporter les données de démonstration
export { demoOfficialTariffs, demoCountries };