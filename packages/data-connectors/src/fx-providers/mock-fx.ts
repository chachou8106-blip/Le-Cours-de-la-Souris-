/**
 * Mock des taux de change (FX)
 * 
 * Ce fichier fournit des données de démonstration pour les taux de change.
 * Ces données sont utilisées pour le développement et les tests.
 */

import { FXRate } from './real-fx';

// Taux de change de démonstration (par rapport à l'EUR)
export const mockFXRates: FXRate[] = [
  { from: 'EUR', to: 'USD', rate: 1.1, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  { from: 'EUR', to: 'GBP', rate: 0.85, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  { from: 'EUR', to: 'JPY', rate: 160, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  { from: 'EUR', to: 'CAD', rate: 1.45, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  { from: 'EUR', to: 'AUD', rate: 1.6, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  { from: 'EUR', to: 'BRL', rate: 5.5, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  
  // Taux inverses (par rapport à l'USD)
  { from: 'USD', to: 'EUR', rate: 0.91, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  { from: 'USD', to: 'GBP', rate: 0.77, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  { from: 'USD', to: 'JPY', rate: 145, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  { from: 'USD', to: 'CAD', rate: 1.32, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  { from: 'USD', to: 'AUD', rate: 1.45, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  { from: 'USD', to: 'BRL', rate: 5, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  
  // Autres paires
  { from: 'GBP', to: 'USD', rate: 1.3, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  { from: 'GBP', to: 'EUR', rate: 1.18, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  { from: 'JPY', to: 'USD', rate: 0.0069, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
  { from: 'JPY', to: 'EUR', rate: 0.0063, source: 'Mock', observedAt: '2026-08-01T00:00:00Z', retrievedAt: '2026-08-12T00:00:00Z' },
];

// Fonctions utilitaires pour les mocks
/**
 * Obtenir le taux de change entre deux devises (mock)
 */
export function getMockFXRate(from: string, to: string): FXRate | null {
  from = from.toUpperCase();
  to = to.toUpperCase();
  
  // Cas spécial: même devise
  if (from === to) {
    return {
      from,
      to,
      rate: 1,
      source: 'Mock',
      observedAt: '2026-08-01T00:00:00Z',
      retrievedAt: new Date().toISOString(),
    };
  }
  
  // Rechercher le taux direct
  const directRate = mockFXRates.find(
    (rate) => rate.from === from && rate.to === to
  );
  if (directRate) {
    return directRate;
  }
  
  // Rechercher le taux inverse
  const inverseRate = mockFXRates.find(
    (rate) => rate.from === to && rate.to === from
  );
  if (inverseRate) {
    return {
      ...inverseRate,
      from,
      to: inverseRate.from,
      rate: 1 / inverseRate.rate,
    };
  }
  
  // Si aucun taux trouvé, retourner null
  return null;
}

/**
 * Obtenir tous les taux pour une devise de base (mock)
 */
export function getMockFXRatesForBase(base: string): FXRate[] {
  base = base.toUpperCase();
  return mockFXRates.filter((rate) => rate.from === base);
}

/**
 * Convertir un montant d'une devise à une autre (mock)
 */
export function mockConvertCurrency(
  amount: number,
  from: string,
  to: string
): number | null {
  if (from === to) return amount;
  
  const fxRate = getMockFXRate(from, to);
  if (!fxRate) return null;
  
  return amount * fxRate.rate;
}

// Exporter les taux par défaut
export default mockFXRates;