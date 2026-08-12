// Mock des taux PPA (Parité de Pouvoir d'Achat) pour le développement
import { PPPRate } from '../../../schemas/src/db/ppp-rates';

// Données de démonstration pour les taux PPA (base USD)
export const mockPPPRates: PPPRate[] = [
  { id: 'ppp_1', country_iso2: 'FR', rate: 0.85, base_currency: 'USD', source: 'World Bank', year: 2026, is_demo: true, confidence: 1.0 },
  { id: 'ppp_2', country_iso2: 'DE', rate: 0.92, base_currency: 'USD', source: 'World Bank', year: 2026, is_demo: true, confidence: 1.0 },
  { id: 'ppp_3', country_iso2: 'GB', rate: 0.75, base_currency: 'USD', source: 'World Bank', year: 2026, is_demo: true, confidence: 1.0 },
  { id: 'ppp_4', country_iso2: 'ES', rate: 0.72, base_currency: 'USD', source: 'World Bank', year: 2026, is_demo: true, confidence: 1.0 },
  { id: 'ppp_5', country_iso2: 'IT', rate: 0.78, base_currency: 'USD', source: 'World Bank', year: 2026, is_demo: true, confidence: 1.0 },
  { id: 'ppp_6', country_iso2: 'JP', rate: 120, base_currency: 'USD', source: 'World Bank', year: 2026, is_demo: true, confidence: 1.0 },
  { id: 'ppp_7', country_iso2: 'CA', rate: 1.25, base_currency: 'USD', source: 'World Bank', year: 2026, is_demo: true, confidence: 1.0 },
  { id: 'ppp_8', country_iso2: 'AU', rate: 1.35, base_currency: 'USD', source: 'World Bank', year: 2026, is_demo: true, confidence: 1.0 },
  { id: 'ppp_9', country_iso2: 'BR', rate: 2.1, base_currency: 'USD', source: 'World Bank', year: 2026, is_demo: true, confidence: 1.0 },
  { id: 'ppp_10', country_iso2: 'IN', rate: 25, base_currency: 'USD', source: 'World Bank', year: 2026, is_demo: true, confidence: 1.0 },
];

// Fonction pour récupérer tous les taux PPA (mock)
export const getMockPPPRates = async (): Promise<PPPRate[]> => {
  return mockPPPRates;
};

// Fonction pour récupérer un taux PPA spécifique (mock)
export const getMockPPPRate = async (countryIso2: string): Promise<PPPRate | null> => {
  return mockPPPRates.find(rate => rate.country_iso2 === countryIso2) || null;
};

// Fonction pour convertir un montant via PPA (mock)
export const convertViaPPP = async (amount: number, countryIso2: string, toCurrency: string = 'USD'): Promise<number> => {
  const rate = await getMockPPPRate(countryIso2);
  if (!rate) {
    throw new Error(`Taux PPA non trouvé pour ${countryIso2}`);
  }

  // Si toCurrency est USD, on utilise directement le taux PPA
  if (toCurrency === 'USD') {
    return amount / rate.rate;
  }

  // Sinon, on convertit d'abord en USD, puis vers la devise cible
  // (nécessite un taux de change USD -> toCurrency)
  throw new Error('Conversion via PPA vers une devise autre que USD non implémentée dans ce mock');
};