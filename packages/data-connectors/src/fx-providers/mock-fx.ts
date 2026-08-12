// Mock des taux de change pour le développement
import { FXRate } from '../../../schemas/src/db/fx-rates';

// Données de démonstration pour les taux de change
export const mockFXRates: FXRate[] = [
  { id: 'fx_1', from_currency: 'EUR', to_currency: 'USD', rate: 1.1, source: 'ECB', observed_at: '2026-08-12', is_demo: true, confidence: 1.0 },
  { id: 'fx_2', from_currency: 'EUR', to_currency: 'GBP', rate: 0.85, source: 'ECB', observed_at: '2026-08-12', is_demo: true, confidence: 1.0 },
  { id: 'fx_3', from_currency: 'USD', to_currency: 'EUR', rate: 0.91, source: 'FED', observed_at: '2026-08-12', is_demo: true, confidence: 1.0 },
  { id: 'fx_4', from_currency: 'USD', to_currency: 'GBP', rate: 0.77, source: 'FED', observed_at: '2026-08-12', is_demo: true, confidence: 1.0 },
  { id: 'fx_5', from_currency: 'GBP', to_currency: 'EUR', rate: 1.18, source: 'BoE', observed_at: '2026-08-12', is_demo: true, confidence: 1.0 },
  { id: 'fx_6', from_currency: 'GBP', to_currency: 'USD', rate: 1.3, source: 'BoE', observed_at: '2026-08-12', is_demo: true, confidence: 1.0 },
  { id: 'fx_7', from_currency: 'EUR', to_currency: 'JPY', rate: 160, source: 'ECB', observed_at: '2026-08-12', is_demo: true, confidence: 1.0 },
  { id: 'fx_8', from_currency: 'USD', to_currency: 'JPY', rate: 145, source: 'FED', observed_at: '2026-08-12', is_demo: true, confidence: 1.0 },
  { id: 'fx_9', from_currency: 'EUR', to_currency: 'CAD', rate: 1.45, source: 'ECB', observed_at: '2026-08-12', is_demo: true, confidence: 1.0 },
  { id: 'fx_10', from_currency: 'EUR', to_currency: 'AUD', rate: 1.6, source: 'ECB', observed_at: '2026-08-12', is_demo: true, confidence: 1.0 },
];

// Fonction pour récupérer tous les taux de change (mock)
export const getMockFXRates = async (): Promise<FXRate[]> => {
  return mockFXRates;
};

// Fonction pour récupérer un taux de change spécifique (mock)
export const getMockFXRate = async (fromCurrency: string, toCurrency: string): Promise<FXRate | null> => {
  return mockFXRates.find(rate => rate.from_currency === fromCurrency && rate.to_currency === toCurrency) || null;
};

// Fonction pour convertir un montant d'une devise à une autre (mock)
export const convertCurrency = async (amount: number, fromCurrency: string, toCurrency: string): Promise<number> => {
  if (fromCurrency === toCurrency) return amount;

  const rate = await getMockFXRate(fromCurrency, toCurrency);
  if (!rate) {
    throw new Error(`Taux de change non trouvé pour ${fromCurrency} -> ${toCurrency}`);
  }

  return amount * rate.rate;
};