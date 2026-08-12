// Moteur de calcul de l'indice communautaire
// Ce fichier contient la logique pour calculer les indices à partir des déclarations utilisateurs.

import { FamilyPayoutReportDB } from '../../schemas/src/db/family-payout-reports';
import { D1Database } from '@cloudflare/workers-types';

// Interface pour les métriques d'un pays
export interface CountryMetrics {
  countryIso2: string;
  medianAmount: number;
  avgAmount: number;
  minAmount: number;
  maxAmount: number;
  sampleSize: number;
  confidenceScore: number;
  iqr: number; // Interquartile Range
  lastUpdated: string;
}

// Interface pour l'indice mondial
export interface GlobalIndex {
  value: number;
  previousValue: number;
  change: number;
  changePercentage: number;
  countriesCount: number;
  totalReports: number;
  confidenceScore: number;
  lastUpdated: string;
}

// Fonction pour calculer la médiane
export const calculateMedian = (values: number[]): number => {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
};

// Fonction pour calculer l'IQR (Interquartile Range)
export const calculateIQR = (values: number[]): { q1: number; q3: number; iqr: number } => {
  if (values.length === 0) return { q1: 0, q3: 0, iqr: 0 };

  const sorted = [...values].sort((a, b) => a - b);
  const q1Index = Math.floor(sorted.length * 0.25);
  const q3Index = Math.floor(sorted.length * 0.75);

  const q1 = sorted[q1Index];
  const q3 = sorted[q3Index];
  const iqr = q3 - q1;

  return { q1, q3, iqr };
};

// Fonction pour calculer le score de confiance
export const calculateConfidenceScore = (
  sampleSize: number,
  recentnessDays: number,
  dispersion: number
): number => {
  // Poids pour chaque critère
  const sampleSizeWeight = 0.3;
  const recentnessWeight = 0.4;
  const dispersionWeight = 0.3;

  // Normalisation des critères (0 à 1)
  const normalizedSampleSize = Math.min(1, sampleSize / 100);
  const normalizedRecentness = Math.max(0, 1 - recentnessDays / 30); // 0 si > 30 jours
  const normalizedDispersion = Math.max(0, 1 - dispersion); // 0 si dispersion >= 1

  // Calcul du score
  const score =
    normalizedSampleSize * sampleSizeWeight +
    normalizedRecentness * recentnessWeight +
    normalizedDispersion * dispersionWeight;

  return Math.min(1, Math.max(0, score));
};

// Fonction pour calculer les métriques d'un pays
export const calculateCountryMetrics = (reports: FamilyPayoutReportDB[]): CountryMetrics => {
  if (reports.length === 0) {
    return {
      countryIso2: '',
      medianAmount: 0,
      avgAmount: 0,
      minAmount: 0,
      maxAmount: 0,
      sampleSize: 0,
      confidenceScore: 0,
      iqr: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  const amounts = reports.map(r => r.amount);
  const countryIso2 = reports[0].country_iso2;
  const lastUpdated = new Date(Math.max(...reports.map(r => new Date(r.created_at).getTime()))).toISOString();

  // Calculs de base
  const medianAmount = calculateMedian(amounts);
  const avgAmount = amounts.reduce((a, b) => a + b, 0) / amounts.length;
  const minAmount = Math.min(...amounts);
  const maxAmount = Math.max(...amounts);
  const sampleSize = amounts.length;

  // Calcul de l'IQR
  const { iqr } = calculateIQR(amounts);

  // Calcul de la dispersion (IQR / médiane)
  const dispersion = medianAmount > 0 ? iqr / medianAmount : 0;

  // Calcul du score de confiance
  const recentnessDays = (new Date().getTime() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24);
  const confidenceScore = calculateConfidenceScore(sampleSize, recentnessDays, dispersion);

  return {
    countryIso2,
    medianAmount,
    avgAmount,
    minAmount,
    maxAmount,
    sampleSize,
    confidenceScore,
    iqr,
    lastUpdated,
  };
};

// Fonction pour calculer l'indice mondial
export const calculateGlobalIndex = (countryMetrics: CountryMetrics[]): GlobalIndex => {
  if (countryMetrics.length === 0) {
    return {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercentage: 0,
      countriesCount: 0,
      totalReports: 0,
      confidenceScore: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  // Filtrer les pays avec suffisamment de données (sampleSize >= 10)
  const validCountries = countryMetrics.filter(c => c.sampleSize >= 10);

  if (validCountries.length === 0) {
    return {
      value: 0,
      previousValue: 0,
      change: 0,
      changePercentage: 0,
      countriesCount: 0,
      totalReports: 0,
      confidenceScore: 0,
      lastUpdated: new Date().toISOString(),
    };
  }

  // Calculer le poids de chaque pays (plafonné à 20%)
  const totalSampleSize = validCountries.reduce((sum, c) => sum + c.sampleSize, 0);
  const countryWeights = validCountries.map(c => ({
    ...c,
    weight: Math.min(0.2, c.sampleSize / totalSampleSize),
  }));

  // Calculer la valeur de l'indice (moyenne pondérée des médianes)
  // Note: Dans une implémentation réelle, on convertirait toutes les devises en USD via PPA
  const globalValue = countryWeights.reduce(
    (sum, c) => sum + c.medianAmount * c.weight,
    0
  );

  // Calculer le score de confiance global (moyenne pondérée)
  const globalConfidenceScore = countryWeights.reduce(
    (sum, c) => sum + c.confidenceScore * c.weight,
    0
  );

  // Calculer le total des rapports
  const totalReports = countryWeights.reduce((sum, c) => sum + c.sampleSize, 0);

  // Pour simplifier, on retourne un changement fictif (à remplacer par des données historiques)
  const previousValue = globalValue * 0.95; // -5% par rapport à la valeur actuelle
  const change = globalValue - previousValue;
  const changePercentage = (change / previousValue) * 100;

  return {
    value: globalValue,
    previousValue,
    change,
    changePercentage,
    countriesCount: validCountries.length,
    totalReports,
    confidenceScore: globalConfidenceScore,
    lastUpdated: new Date().toISOString(),
  };
};

// Fonction pour récupérer les métriques de tous les pays depuis la base de données
export const getAllCountryMetrics = async (db: D1Database): Promise<CountryMetrics[]> => {
  const query = `
    SELECT * FROM family_payout_reports 
    WHERE status = 'published' AND is_demo = FALSE
  `;
  const { results } = await db.prepare(query).all();
  const reports = results as FamilyPayoutReportDB[];

  // Grouper les rapports par pays
  const reportsByCountry: Record<string, FamilyPayoutReportDB[]> = {};
  for (const report of reports) {
    if (!reportsByCountry[report.country_iso2]) {
      reportsByCountry[report.country_iso2] = [];
    }
    reportsByCountry[report.country_iso2].push(report);
  }

  // Calculer les métriques pour chaque pays
  const countryMetrics = Object.entries(reportsByCountry).map(([countryIso2, reports]) =>
    calculateCountryMetrics(reports)
  );

  return countryMetrics;
};

// Fonction pour calculer l'indice mondial complet
export const calculateFullGlobalIndex = async (db: D1Database): Promise<GlobalIndex> => {
  const countryMetrics = await getAllCountryMetrics(db);
  return calculateGlobalIndex(countryMetrics);
};