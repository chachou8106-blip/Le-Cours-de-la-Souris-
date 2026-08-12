/**
 * Adaptateur pour les taux de change réels (FX)
 * 
 * Ce module fournit des fonctions pour récupérer les taux de change
 * depuis des APIs externes comme ExchangeRate-API, Fixer.io, etc.
 * 
 * Note: Les appels réels aux APIs sont désactivés par défaut.
 *       Ils doivent être activés via des variables d'environnement.
 */

import axios from 'axios';

// Interface pour un taux de change
export interface FXRate {
  from: string;
  to: string;
  rate: number;
  source: string;
  observedAt: string;
  retrievedAt: string;
}

// Interface pour les paramètres de configuration
interface FXProviderConfig {
  apiUrl: string;
  apiKey?: string;
  cacheTtl: number; // Durée de cache en millisecondes
  enabled: boolean; // Si l'adaptateur est activé
  baseCurrency?: string; // Devise de base par défaut
}

// Configuration par défaut (désactivée)
const defaultConfig: FXProviderConfig = {
  apiUrl: '',
  apiKey: undefined,
  cacheTtl: 1000 * 60 * 60, // 1 heure
  enabled: false,
  baseCurrency: 'EUR',
};

// Cache local pour les taux
let fxCache: Record<string, { rate: number; timestamp: number }> = {};

/**
 * Générer une clé de cache pour une paire de devises
 */
function generateCacheKey(from: string, to: string): string {
  return `${from.toUpperCase()}_${to.toUpperCase()}`;
}

/**
 * Récupérer le taux de change entre deux devises
 * 
 * @param from - Devise source (ex: 'EUR')
 * @param to - Devise cible (ex: 'USD')
 * @param config - Configuration de l'API (optionnelle)
 * @returns Promise<FXRate | null>
 */
export async function fetchFXRate(
  from: string,
  to: string,
  config: FXProviderConfig = defaultConfig
): Promise<FXRate | null> {
  if (!config.enabled) {
    console.warn(`L'adaptateur FX est désactivé pour ${from} -> ${to}.`);
    return null;
  }

  // Normaliser les devises
  from = from.toUpperCase();
  to = to.toUpperCase();

  // Vérifier le cache
  const cacheKey = generateCacheKey(from, to);
  const cached = fxCache[cacheKey];
  if (cached && Date.now() - cached.timestamp < config.cacheTtl) {
    return {
      from,
      to,
      rate: cached.rate,
      source: 'Cache',
      observedAt: new Date().toISOString(),
      retrievedAt: new Date().toISOString(),
    };
  }

  try {
    // Exemple d'appel API (à adapter selon la source réelle)
    // Pour ExchangeRate-API: https://www.exchangerate-api.com/docs/overview
    const response = await axios.get(`${config.apiUrl}/pair/${from}/${to}`, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const rate = parseFloat(response.data.rate) || 0;

    // Mettre en cache
    fxCache[cacheKey] = {
      rate,
      timestamp: Date.now(),
    };

    return {
      from,
      to,
      rate,
      source: config.apiUrl,
      observedAt: response.data.time_last_update_unix ? new Date(response.data.time_last_update_unix * 1000).toISOString() : new Date().toISOString(),
      retrievedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération du taux ${from} -> ${to}:`, error);
    
    // Retourner le taux en cache si disponible
    if (cached) {
      return {
        from,
        to,
        rate: cached.rate,
        source: 'Cache (fallback)',
        observedAt: new Date().toISOString(),
        retrievedAt: new Date().toISOString(),
      };
    }
    
    return null;
  }
}

/**
 * Récupérer les taux de change pour une devise de base
 * 
 * @param base - Devise de base (ex: 'EUR')
 * @param config - Configuration de l'API (optionnelle)
 * @returns Promise<FXRate[]>
 */
export async function fetchFXRatesForBase(
  base: string,
  config: FXProviderConfig = defaultConfig
): Promise<FXRate[]> {
  if (!config.enabled) {
    console.warn(`L'adaptateur FX est désactivé pour la base ${base}.`);
    return [];
  }

  base = base.toUpperCase();

  try {
    // Exemple d'appel API pour obtenir tous les taux pour une base
    const response = await axios.get(`${config.apiUrl}/latest/${base}`, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const rates: FXRate[] = [];
    const ratesData = response.data.rates || {};

    for (const [to, rate] of Object.entries(ratesData)) {
      rates.push({
        from: base,
        to: to.toUpperCase(),
        rate: parseFloat(rate as string) || 0,
        source: config.apiUrl,
        observedAt: response.data.time_last_update_unix ? new Date(response.data.time_last_update_unix * 1000).toISOString() : new Date().toISOString(),
        retrievedAt: new Date().toISOString(),
      });

      // Mettre en cache
      const cacheKey = generateCacheKey(base, to);
      fxCache[cacheKey] = {
        rate: parseFloat(rate as string) || 0,
        timestamp: Date.now(),
      };
    }

    return rates;
  } catch (error) {
    console.error(`Erreur lors de la récupération des taux pour la base ${base}:`, error);
    return [];
  }
}

/**
 * Convertir un montant d'une devise à une autre
 * 
 * @param amount - Montant à convertir
 * @param from - Devise source
 * @param to - Devise cible
 * @param config - Configuration de l'API (optionnelle)
 * @returns Promise<number | null>
 */
export async function convertCurrency(
  amount: number,
  from: string,
  to: string,
  config: FXProviderConfig = defaultConfig
): Promise<number | null> {
  if (from === to) return amount;

  const fxRate = await fetchFXRate(from, to, config);
  if (!fxRate) return null;

  return amount * fxRate.rate;
}

/**
 * Effacer le cache des taux de change
 */
export function clearFXCache(): void {
  fxCache = {};
}

/**
 * Configurer l'adaptateur FX
 */
export function configureFXProvider(
  config: Partial<FXProviderConfig>
): FXProviderConfig {
  return {
    ...defaultConfig,
    ...config,
  };
}

// Exporter la configuration par défaut
export { defaultConfig as fxProviderConfig };