/**
 * Mock des taux de Parité de Pouvoir d'Achat (PPA)
 * 
 * Ce fichier fournit des données de démonstration pour les taux PPA.
 * Ces données sont utilisées pour le développement et les tests.
 */

import { PPPRate } from './real-ppp';

// Taux PPA de démonstration (par rapport à l'USD)
// Source: Banque Mondiale (données fictives pour 2026)
export const mockPPPRates: PPPRate[] = [
  { countryIso2: 'US', rate: 1.0, baseCurrency: 'USD', source: 'Banque Mondiale (Mock)', year: 2026, observedAt: '2026-01-01', retrievedAt: '2026-08-12T00:00:00Z' },
  { countryIso2: 'FR', rate: 0.85, baseCurrency: 'USD', source: 'Banque Mondiale (Mock)', year: 2026, observedAt: '2026-01-01', retrievedAt: '2026-08-12T00:00:00Z' },
  { countryIso2: 'GB', rate: 0.75, baseCurrency: 'USD', source: 'Banque Mondiale (Mock)', year: 2026, observedAt: '2026-01-01', retrievedAt: '2026-08-12T00:00:00Z' },
  { countryIso2: 'DE', rate: 0.90, baseCurrency: 'USD', source: 'Banque Mondiale (Mock)', year: 2026, observedAt: '2026-01-01', retrievedAt: '2026-08-12T00:00:00Z' },
  { countryIso2: 'ES', rate: 0.70, baseCurrency: 'USD', source: 'Banque Mondiale (Mock)', year: 2026, observedAt: '2026-01-01', retrievedAt: '2026-08-12T00:00:00Z' },
  { countryIso2: 'IT', rate: 0.72, baseCurrency: 'USD', source: 'Banque Mondiale (Mock)', year: 2026, observedAt: '2026-01-01', retrievedAt: '2026-08-12T00:00:00Z' },
  { countryIso2: 'JP', rate: 0.65, baseCurrency: 'USD', source: 'Banque Mondiale (Mock)', year: 2026, observedAt: '2026-01-01', retrievedAt: '2026-08-12T00:00:00Z' },
  { countryIso2: 'CA', rate: 0.78, baseCurrency: 'USD', source: 'Banque Mondiale (Mock)', year: 2026, observedAt: '2026-01-01', retrievedAt: '2026-08-12T00:00:00Z' },
  { countryIso2: 'AU', rate: 0.70, baseCurrency: 'USD', source: 'Banque Mondiale (Mock)', year: 2026, observedAt: '2026-01-01', retrievedAt: '2026-08-12T00:00:00Z' },
  { countryIso2: 'BR', rate: 0.20, baseCurrency: 'USD', source: 'Banque Mondiale (Mock)', year: 2026, observedAt: '2026-01-01', retrievedAt: '2026-08-12T00:00:00Z' },
];

// Fonctions utilitaires pour les mocks
/**
 * Obtenir le taux PPA pour un pays (mock)
 */
export function getMockPPPRate(countryIso2: string, year?: number): PPPRate | null {
  countryIso2 = countryIso2.toUpperCase();
  const targetYear = year || new Date().getFullYear();
  
  const rate = mockPPPRates.find(
    (r) => r.countryIso2 === countryIso2 && r.year === targetYear
  );
  
  if (!rate) return null;
  
  return rate;
}

/**
 * Obtenir les taux PPA pour plusieurs pays (mock)
 */
export function getMockPPPRatesForCountries(
  countryIso2List: string[],
  year?: number
): Record<string, PPPRate | null> {
  const results: Record<string, PPPRate | null> = {};
  
  for (const countryIso2 of countryIso2List) {
    results[countryIso2] = getMockPPPRate(countryIso2, year);
  }
  
  return results;
}

/**
 * Obtenir tous les taux PPA (mock)
 */
export function getAllMockPPPRates(year?: number): PPPRate[] {
  const targetYear = year || new Date().getFullYear();
  return mockPPPRates.filter((r) => r.year === targetYear);
}

/**
 * Convertir un montant en USD via PPA (mock)
 */
export function mockConvertToUSDViaPPP(
  amount: number,
  countryIso2: string,
  year?: number
): number | null {
  const pppRate = getMockPPPRate(countryIso2, year);
  if (!pppRate || pppRate.rate === 0) return null;
  
  // Convertir en USD: montant / taux PPA
  return amount / pppRate.rate;
}

// Exporter les taux par défaut
export default mockPPPRates;