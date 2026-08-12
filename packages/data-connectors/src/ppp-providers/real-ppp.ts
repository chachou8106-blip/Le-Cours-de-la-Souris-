/**
 * Adaptateur pour les taux de Parité de Pouvoir d'Achat (PPA)
 * 
 * Ce module fournit des fonctions pour récupérer les taux PPA
 * depuis des sources comme la Banque Mondiale, le FMI, etc.
 * 
 * Note: Les appels réels aux APIs sont désactivés par défaut.
 *       Ils doivent être activés via des variables d'environnement.
 */

import axios from 'axios';

// Interface pour un taux PPA
export interface PPPRate {
  countryIso2: string;
  rate: number; // Taux par rapport à l'USD
  baseCurrency: string; // Devise de base (généralement USD)
  source: string;
  year: number;
  observedAt: string;
  retrievedAt: string;
}

// Interface pour les paramètres de configuration
interface PPPProviderConfig {
  apiUrl: string;
  apiKey?: string;
  cacheTtl: number; // Durée de cache en millisecondes
  enabled: boolean; // Si l'adaptateur est activé
}

// Configuration par défaut (désactivée)
const defaultConfig: PPPProviderConfig = {
  apiUrl: '',
  apiKey: undefined,
  cacheTtl: 1000 * 60 * 60 * 24, // 24 heures (les données PPA sont mises à jour moins fréquemment)
  enabled: false,
};

// Cache local pour les taux PPA
let pppCache: Record<string, { rate: number; year: number; timestamp: number }> = {};

/**
 * Récupérer le taux PPA pour un pays
 * 
 * @param countryIso2 - Code ISO2 du pays
 * @param year - Année (optionnelle, par défaut l'année en cours)
 * @param config - Configuration de l'API (optionnelle)
 * @returns Promise<PPPRate | null>
 */
export async function fetchPPPRate(
  countryIso2: string,
  year?: number,
  config: PPPProviderConfig = defaultConfig
): Promise<PPPRate | null> {
  if (!config.enabled) {
    console.warn(`L'adaptateur PPA est désactivé pour ${countryIso2}.`);
    return null;
  }

  countryIso2 = countryIso2.toUpperCase();
  const targetYear = year || new Date().getFullYear();

  // Vérifier le cache
  const cacheKey = `${countryIso2}_${targetYear}`;
  const cached = pppCache[cacheKey];
  if (cached && cached.year === targetYear && Date.now() - cached.timestamp < config.cacheTtl) {
    return {
      countryIso2,
      rate: cached.rate,
      baseCurrency: 'USD',
      source: 'Cache',
      year: targetYear,
      observedAt: new Date().toISOString(),
      retrievedAt: new Date().toISOString(),
    };
  }

  try {
    // Exemple d'appel API pour la Banque Mondiale
    // URL réelle: https://api.worldbank.org/v2/country/{country}/indicator/PA.NUS.FCRF?format=json
    const response = await axios.get(
      `${config.apiUrl}/country/${countryIso2}/indicator/PA.NUS.FCRF?date=${targetYear}&format=json`,
      {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Extraire le taux PPA des données de réponse
    // Les données de la Banque Mondiale sont complexes, il faut les parser
    const pppData = response.data[1]?.[0];
    if (!pppData) {
      console.warn(`Aucune donnée PPA trouvée pour ${countryIso2} en ${targetYear}.`);
      return null;
    }

    const rate = parseFloat(pppData.value) || 0;

    // Mettre en cache
    pppCache[cacheKey] = {
      rate,
      year: targetYear,
      timestamp: Date.now(),
    };

    return {
      countryIso2,
      rate,
      baseCurrency: 'USD',
      source: config.apiUrl,
      year: targetYear,
      observedAt: pppData.date || new Date().toISOString(),
      retrievedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération du taux PPA pour ${countryIso2}:`, error);
    
    // Retourner le taux en cache si disponible
    if (cached) {
      return {
        countryIso2,
        rate: cached.rate,
        baseCurrency: 'USD',
        source: 'Cache (fallback)',
        year: targetYear,
        observedAt: new Date().toISOString(),
        retrievedAt: new Date().toISOString(),
      };
    }
    
    return null;
  }
}

/**
 * Récupérer les taux PPA pour plusieurs pays
 * 
 * @param countryIso2List - Liste des codes ISO2 des pays
 * @param year - Année (optionnelle)
 * @param config - Configuration de l'API (optionnelle)
 * @returns Promise<Record<string, PPPRate | null>>
 */
export async function fetchPPPRatesForCountries(
  countryIso2List: string[],
  year?: number,
  config: PPPProviderConfig = defaultConfig
): Promise<Record<string, PPPRate | null>> {
  const results: Record<string, PPPRate | null> = {};

  for (const countryIso2 of countryIso2List) {
    results[countryIso2] = await fetchPPPRate(countryIso2, year, config);
  }

  return results;
}

/**
 * Récupérer tous les taux PPA disponibles
 * 
 * @param year - Année (optionnelle)
 * @param config - Configuration de l'API (optionnelle)
 * @returns Promise<PPPRate[]>
 */
export async function fetchAllPPPRates(
  year?: number,
  config: PPPProviderConfig = defaultConfig
): Promise<PPPRate[]> {
  if (!config.enabled) {
    console.warn('L\'adaptateur PPA est désactivé. Impossible de récupérer tous les taux.');
    return [];
  }

  const targetYear = year || new Date().getFullYear();

  try {
    // Exemple d'appel API pour obtenir tous les taux PPA
    // Cette URL est fictive et doit être adaptée à l'API réelle
    const response = await axios.get(
      `${config.apiUrl}/indicator/PA.NUS.FCRF?date=${targetYear}&format=json&per_page=1000`,
      {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const rates: PPPRate[] = [];
    const pppData = response.data[1] || [];

    for (const data of pppData) {
      const countryIso2 = data.countryiso3code || data.country.code;
      const rate = parseFloat(data.value) || 0;

      rates.push({
        countryIso2,
        rate,
        baseCurrency: 'USD',
        source: config.apiUrl,
        year: targetYear,
        observedAt: data.date || new Date().toISOString(),
        retrievedAt: new Date().toISOString(),
      });

      // Mettre en cache
      const cacheKey = `${countryIso2}_${targetYear}`;
      pppCache[cacheKey] = {
        rate,
        year: targetYear,
        timestamp: Date.now(),
      };
    }

    return rates;
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les taux PPA:', error);
    return [];
  }
}

/**
 * Convertir un montant en USD via PPA
 * 
 * @param amount - Montant à convertir
 * @param countryIso2 - Code ISO2 du pays
 * @param year - Année (optionnelle)
 * @param config - Configuration de l'API (optionnelle)
 * @returns Promise<number | null>
 */
export async function convertToUSDViaPPP(
  amount: number,
  countryIso2: string,
  year?: number,
  config: PPPProviderConfig = defaultConfig
): Promise<number | null> {
  const pppRate = await fetchPPPRate(countryIso2, year, config);
  if (!pppRate || pppRate.rate === 0) return null;

  // Convertir en USD: montant / taux PPA
  // Exemple: Si le taux PPA est 0.8 (1 USD = 0.8 EUR en PPA), alors 1 EUR = 1 / 0.8 USD
  return amount / pppRate.rate;
}

/**
 * Effacer le cache des taux PPA
 */
export function clearPPPCache(): void {
  pppCache = {};
}

/**
 * Configurer l'adaptateur PPA
 */
export function configurePPPProvider(
  config: Partial<PPPProviderConfig>
): PPPProviderConfig {
  return {
    ...defaultConfig,
    ...config,
  };
}

// Exporter la configuration par défaut
export { defaultConfig as pppProviderConfig };