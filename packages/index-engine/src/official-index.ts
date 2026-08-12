// Moteur de calcul de l'indice officiel (tarifs dentaires)
// Ce fichier contient la logique pour agréger et analyser les tarifs officiels d'extraction dentaire.

import { OfficialDentalTariff } from '../../schemas/src/db/official-dental-tariffs';
import { D1Database } from '@cloudflare/workers-types';

// Interface pour les métriques officielles d'un pays
export interface OfficialCountryMetrics {
  countryIso2: string;
  countryName: string;
  extractionCost: number;
  currency: string;
  source: string;
  year: number;
  isDemo: boolean;
}

// Interface pour l'indice officiel mondial
export interface OfficialGlobalIndex {
  avgExtractionCost: number;
  minExtractionCost: number;
  maxExtractionCost: number;
  countriesCount: number;
  lastUpdated: string;
  mostExpensiveCountry: OfficialCountryMetrics | null;
  leastExpensiveCountry: OfficialCountryMetrics | null;
}

// Fonction pour calculer les métriques officielles d'un pays
export const calculateOfficialCountryMetrics = (
  tariff: OfficialDentalTariff
): OfficialCountryMetrics => {
  return {
    countryIso2: tariff.country_iso2,
    countryName: '', // À remplir avec le nom du pays depuis la table countries
    extractionCost: tariff.extraction_cost,
    currency: tariff.currency,
    source: tariff.source,
    year: tariff.year,
    isDemo: tariff.is_demo,
  };
};

// Fonction pour calculer l'indice officiel mondial
export const calculateOfficialGlobalIndex = (
  tariffs: OfficialDentalTariff[]
): OfficialGlobalIndex => {
  if (tariffs.length === 0) {
    return {
      avgExtractionCost: 0,
      minExtractionCost: 0,
      maxExtractionCost: 0,
      countriesCount: 0,
      lastUpdated: new Date().toISOString(),
      mostExpensiveCountry: null,
      leastExpensiveCountry: null,
    };
  }

  // Filtrer les tarifs non-demo
  const validTariffs = tariffs.filter(t => !t.is_demo);

  if (validTariffs.length === 0) {
    return {
      avgExtractionCost: 0,
      minExtractionCost: 0,
      maxExtractionCost: 0,
      countriesCount: 0,
      lastUpdated: new Date().toISOString(),
      mostExpensiveCountry: null,
      leastExpensiveCountry: null,
    };
  }

  // Calculer les statistiques de base
  const extractionCosts = validTariffs.map(t => t.extraction_cost);
  const avgExtractionCost = extractionCosts.reduce((a, b) => a + b, 0) / extractionCosts.length;
  const minExtractionCost = Math.min(...extractionCosts);
  const maxExtractionCost = Math.max(...extractionCosts);

  // Trouver les pays les plus chers et les moins chers
  const mostExpensive = validTariffs.reduce((max, t) =>
    t.extraction_cost > max.extraction_cost ? t : max
  );
  const leastExpensive = validTariffs.reduce((min, t) =>
    t.extraction_cost < min.extraction_cost ? t : min
  );

  // Trouver la date de dernière mise à jour
  const lastUpdated = new Date(
    Math.max(...validTariffs.map(t => new Date(t.updated_at).getTime()))
  ).toISOString();

  return {
    avgExtractionCost,
    minExtractionCost,
    maxExtractionCost,
    countriesCount: validTariffs.length,
    lastUpdated,
    mostExpensiveCountry: calculateOfficialCountryMetrics(mostExpensive),
    leastExpensiveCountry: calculateOfficialCountryMetrics(leastExpensive),
  };
};

// Fonction pour récupérer tous les tarifs officiels depuis la base de données
export const getAllOfficialTariffs = async (db: D1Database): Promise<OfficialDentalTariff[]> => {
  const query = 'SELECT * FROM official_dental_tariffs';
  const { results } = await db.prepare(query).all();
  return results as OfficialDentalTariff[];
};

// Fonction pour calculer l'indice officiel mondial complet
export const calculateFullOfficialGlobalIndex = async (
  db: D1Database
): Promise<OfficialGlobalIndex> => {
  const tariffs = await getAllOfficialTariffs(db);
  return calculateOfficialGlobalIndex(tariffs);
};

// Fonction pour comparer les indices officiel et communautaire
export const compareIndices = (
  officialIndex: OfficialGlobalIndex,
  communityIndex: {
    value: number;
    countriesCount: number;
    totalReports: number;
  }
): {
  ratio: number;
  difference: number;
  description: string;
} => {
  const ratio = communityIndex.value / officialIndex.avgExtractionCost;
  const difference = officialIndex.avgExtractionCost - communityIndex.value;

  let description = '';
  if (ratio < 0.1) {
    description = 'Le cours communautaire est très inférieur au coût officiel d\'extraction dentaire.';
  } else if (ratio < 0.3) {
    description = 'Le cours communautaire est inférieur au coût officiel, ce qui est normal (tradition vs. réalité économique).';
  } else if (ratio < 0.5) {
    description = 'Le cours communautaire représente environ la moitié du coût officiel.';
  } else if (ratio < 0.8) {
    description = 'Le cours communautaire est proche du coût officiel, ce qui est surprenant !';
  } else {
    description = 'Le cours communautaire dépasse le coût officiel, ce qui est très inhabituel.';
  }

  return {
    ratio,
    difference,
    description,
  };
};