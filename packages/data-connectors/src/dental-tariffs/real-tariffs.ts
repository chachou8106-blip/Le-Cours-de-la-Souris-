/**
 * Adaptateur pour les tarifs dentaires officiels (réels)
 * 
 * Ce module fournit des fonctions pour récupérer les tarifs officiels
 * depuis des sources externes (APIs, bases de données publiques).
 * 
 * Note: Les appels réels aux APIs sont désactivés par défaut.
 *       Ils doivent être activés via des variables d'environnement.
 */

import axios from 'axios';
import { OfficialDentalTariff } from '@cours-de-la-souris/index-engine/src/official-index';

// Interface pour les paramètres de configuration
interface DentalTariffConfig {
  apiUrl: string;
  apiKey?: string;
  cacheTtl: number; // Durée de cache en millisecondes
  enabled: boolean; // Si l'adaptateur est activé
}

// Configuration par défaut (désactivée)
const defaultConfig: DentalTariffConfig = {
  apiUrl: '',
  apiKey: undefined,
  cacheTtl: 1000 * 60 * 60, // 1 heure
  enabled: false,
};

// Cache local pour les tarifs
let tariffCache: Record<string, { data: OfficialDentalTariff[]; timestamp: number }> = {};

/**
 * Récupérer les tarifs dentaires depuis une API externe
 * 
 * @param countryIso2 - Code ISO2 du pays
 * @param config - Configuration de l'API (optionnelle)
 * @returns Promise<OfficialDentalTariff[]>
 */
export async function fetchDentalTariffs(
  countryIso2: string,
  config: DentalTariffConfig = defaultConfig
): Promise<OfficialDentalTariff[]> {
  if (!config.enabled) {
    console.warn(`L'adaptateur dental-tariffs est désactivé pour ${countryIso2}.`);
    return [];
  }

  // Vérifier le cache
  const cached = tariffCache[countryIso2];
  if (cached && Date.now() - cached.timestamp < config.cacheTtl) {
    return cached.data;
  }

  try {
    // Exemple d'appel API (à adapter selon la source réelle)
    const response = await axios.get(`${config.apiUrl}/tariffs/${countryIso2}`, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Transformer les données de l'API au format OfficialDentalTariff
    const tariffs: OfficialDentalTariff[] = response.data.map((item: any) => ({
      id: item.id || `${countryIso2}_${Date.now()}`,
      countryIso2,
      procedureCode: item.procedureCode || item.code,
      procedureName: item.procedureName || item.name,
      cost: parseFloat(item.cost) || 0,
      currency: item.currency || 'EUR',
      source: item.source || 'API Externe',
      sourceUrl: item.sourceUrl || config.apiUrl,
      year: item.year || new Date().getFullYear(),
      isActive: item.isActive !== undefined ? item.isActive : true,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
    }));

    // Mettre en cache
    tariffCache[countryIso2] = {
      data: tariffs,
      timestamp: Date.now(),
    };

    return tariffs;
  } catch (error) {
    console.error(`Erreur lors de la récupération des tarifs pour ${countryIso2}:`, error);
    
    // Retourner les données en cache si disponibles
    if (cached) {
      return cached.data;
    }
    
    return [];
  }
}

/**
 * Récupérer les tarifs pour plusieurs pays
 */
export async function fetchDentalTariffsForCountries(
  countryIso2List: string[],
  config: DentalTariffConfig = defaultConfig
): Promise<Record<string, OfficialDentalTariff[]>> {
  const results: Record<string, OfficialDentalTariff[]> = {};

  for (const countryIso2 of countryIso2List) {
    results[countryIso2] = await fetchDentalTariffs(countryIso2, config);
  }

  return results;
}

/**
 * Récupérer tous les tarifs disponibles
 */
export async function fetchAllDentalTariffs(
  config: DentalTariffConfig = defaultConfig
): Promise<OfficialDentalTariff[]> {
  if (!config.enabled) {
    console.warn('L\'adaptateur dental-tariffs est désactivé. Impossible de récupérer tous les tarifs.');
    return [];
  }

  try {
    const response = await axios.get(`${config.apiUrl}/tariffs`, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const tariffs: OfficialDentalTariff[] = response.data.map((item: any) => ({
      id: item.id || `${item.countryIso2}_${Date.now()}`,
      countryIso2: item.countryIso2,
      procedureCode: item.procedureCode || item.code,
      procedureName: item.procedureName || item.name,
      cost: parseFloat(item.cost) || 0,
      currency: item.currency || 'EUR',
      source: item.source || 'API Externe',
      sourceUrl: item.sourceUrl || config.apiUrl,
      year: item.year || new Date().getFullYear(),
      isActive: item.isActive !== undefined ? item.isActive : true,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
    }));

    return tariffs;
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les tarifs:', error);
    return [];
  }
}

/**
 * Effacer le cache des tarifs
 */
export function clearDentalTariffsCache(): void {
  tariffCache = {};
}

/**
 * Configurer l'adaptateur
 */
export function configureDentalTariffsAdapter(
  config: Partial<DentalTariffConfig>
): DentalTariffConfig {
  return {
    ...defaultConfig,
    ...config,
  };
}

// Exporter la configuration par défaut
export { defaultConfig as dentalTariffsConfig };