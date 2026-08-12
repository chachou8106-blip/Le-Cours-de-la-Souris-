/**
 * Moteur de calcul de l'indice communautaire
 * 
 * Ce module calcule les indices communautaires (médiane, IQR, confiance) pour chaque pays
 * et génère l'indice mondial pondéré.
 */

import { FamilyPayoutReportDB } from '@cours-de-la-souris/schemas/src/db/family-payout-reports';

// Interface pour les métriques d'un pays
export interface CountryMetrics {
  countryIso2: string;
  median: number;
  mean: number;
  min: number;
  max: number;
  q1: number; // Premier quartile
  q3: number; // Troisième quartile
  iqr: number; // Interquartile Range
  sampleSize: number;
  confidenceScore: number;
  lastUpdated: string;
}

// Interface pour l'indice mondial
export interface GlobalIndex {
  value: number;
  countriesCount: number;
  totalReports: number;
  averageConfidence: number;
  lastUpdated: string;
  weights: Record<string, number>; // Poids par pays
}

// Interface pour les données FX (taux de change)
export interface FXRate {
  from: string;
  to: string;
  rate: number;
}

// Interface pour les données PPA (parité de pouvoir d'achat)
export interface PPPRate {
  countryIso2: string;
  rate: number; // Taux par rapport à l'USD
  baseCurrency: string;
  year: number;
}

/**
 * Calculer la médiane d'une liste de nombres
 */
export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
}

/**
 * Calculer la moyenne d'une liste de nombres
 */
export function calculateMean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/**
 * Calculer les quartiles (Q1, Q3) et l'IQR
 */
export function calculateQuartiles(values: number[]): { q1: number; q3: number; iqr: number } {
  if (values.length === 0) return { q1: 0, q3: 0, iqr: 0 };
  
  const sorted = [...values].sort((a, b) => a - b);
  const q1Index = Math.floor((sorted.length - 1) * 0.25);
  const q3Index = Math.floor((sorted.length - 1) * 0.75);
  
  const q1 = sorted[q1Index];
  const q3 = sorted[q3Index];
  const iqr = q3 - q1;
  
  return { q1, q3, iqr };
}

/**
 * Calculer le score de confiance pour un pays
 */
export function calculateConfidenceScore(
  sampleSize: number,
  recentnessDays: number,
  dispersion: number
): number {
  // Pénalité pour la taille de l'échantillon (max 0.3)
  const sizeScore = Math.min(0.3, sampleSize / 1000);
  
  // Pénalité pour la récence (max 0.4)
  // recentnessDays = nombre de jours depuis la dernière mise à jour
  const recentnessScore = Math.max(0, 0.4 * (1 - Math.min(1, recentnessDays / 30)));
  
  // Pénalité pour la dispersion (max 0.3)
  // dispersion = IQR / médiane
  const dispersionScore = Math.max(0, 0.3 * (1 - Math.min(1, dispersion)));
  
  const confidence = sizeScore + recentnessScore + dispersionScore;
  return Math.min(1, confidence);
}

/**
 * Calculer les métriques pour un pays
 */
export function calculateCountryMetrics(
  reports: FamilyPayoutReportDB[],
  fxRates: FXRate[],
  currentDate: Date = new Date()
): CountryMetrics | null {
  if (reports.length === 0) return null;
  
  const countryIso2 = reports[0].country_iso2;
  const amounts = reports.map((r) => r.amount);
  
  // Filtrer les rapports publiés
  const publishedReports = reports.filter((r) => r.status === 'published');
  if (publishedReports.length === 0) return null;
  
  const publishedAmounts = publishedReports.map((r) => r.amount);
  
  // Convertir tous les montants en EUR (simplifié)
  // Dans une implémentation réelle, on utiliserait les taux de change
  const amountsInEUR = publishedAmounts; // Supposons que tout est déjà en EUR
  
  const median = calculateMedian(amountsInEUR);
  const mean = calculateMean(amountsInEUR);
  const min = Math.min(...amountsInEUR);
  const max = Math.max(...amountsInEUR);
  const { q1, q3, iqr } = calculateQuartiles(amountsInEUR);
  
  // Calculer la dispersion (IQR / médiane)
  const dispersion = median > 0 ? iqr / median : 0;
  
  // Calculer la récence (nombre de jours depuis la dernière mise à jour)
  const lastUpdated = new Date(Math.max(...reports.map((r) => new Date(r.updated_at).getTime())));
  const recentnessDays = (currentDate.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
  
  // Calculer le score de confiance
  const confidenceScore = calculateConfidenceScore(
    publishedReports.length,
    recentnessDays,
    dispersion
  );
  
  return {
    countryIso2,
    median,
    mean,
    min,
    max,
    q1,
    q3,
    iqr,
    sampleSize: publishedReports.length,
    confidenceScore,
    lastUpdated: lastUpdated.toISOString(),
  };
}

/**
 * Calculer l'indice mondial pondéré
 */
export function calculateGlobalIndex(
  countryMetrics: CountryMetrics[],
  pppRates: PPPRate[]
): GlobalIndex {
  if (countryMetrics.length === 0) {
    return {
      value: 0,
      countriesCount: 0,
      totalReports: 0,
      averageConfidence: 0,
      lastUpdated: new Date().toISOString(),
      weights: {},
    };
  }
  
  // Calculer le poids de chaque pays (plafonné à 20%)
  const totalSampleSize = countryMetrics.reduce((sum, cm) => sum + cm.sampleSize, 0);
  const weights: Record<string, number> = {};
  let totalWeight = 0;
  
  for (const cm of countryMetrics) {
    const rawWeight = cm.sampleSize / totalSampleSize;
    weights[cm.countryIso2] = Math.min(0.2, rawWeight);
    totalWeight += weights[cm.countryIso2];
  }
  
  // Normaliser les poids pour qu'ils fassent 1
  for (const countryIso2 in weights) {
    weights[countryIso2] = weights[countryIso2] / totalWeight;
  }
  
  // Calculer la valeur de l'indice mondial
  // Convertir chaque médiane en USD via PPA, puis pondérer
  let globalValue = 0;
  let totalReports = 0;
  let confidenceSum = 0;
  
  for (const cm of countryMetrics) {
    const pppRate = pppRates.find((r) => r.countryIso2 === cm.countryIso2);
    const pppFactor = pppRate ? pppRate.rate : 1; // Par défaut 1 si pas de taux PPA
    
    // Convertir la médiane en USD (simplifié)
    // Dans une implémentation réelle, on utiliserait les taux de change
    const medianInUSD = cm.median / pppFactor; // Approximation
    
    globalValue += medianInUSD * weights[cm.countryIso2];
    totalReports += cm.sampleSize;
    confidenceSum += cm.confidenceScore;
  }
  
  const averageConfidence = confidenceSum / countryMetrics.length;
  
  return {
    value: globalValue,
    countriesCount: countryMetrics.length,
    totalReports,
    averageConfidence,
    lastUpdated: new Date().toISOString(),
    weights,
  };
}

/**
 * Filtrer les rapports pour une période donnée
 */
export function filterReportsByPeriod(
  reports: FamilyPayoutReportDB[],
  startDate: Date,
  endDate: Date
): FamilyPayoutReportDB[] {
  return reports.filter((r) => {
    const reportDate = new Date(r.created_at);
    return reportDate >= startDate && reportDate <= endDate;
  });
}

/**
 * Calculer les métriques pour tous les pays
 */
export function calculateAllCountryMetrics(
  allReports: FamilyPayoutReportDB[],
  fxRates: FXRate[],
  currentDate: Date = new Date()
): CountryMetrics[] {
  const countries = [...new Set(allReports.map((r) => r.country_iso2))];
  const metrics: CountryMetrics[] = [];
  
  for (const countryIso2 of countries) {
    const countryReports = allReports.filter((r) => r.country_iso2 === countryIso2);
    const countryMetric = calculateCountryMetrics(countryReports, fxRates, currentDate);
    
    if (countryMetric) {
      metrics.push(countryMetric);
    }
  }
  
  return metrics;
}

// Exporter les fonctions principales
export {
  calculateMedian as median,
  calculateMean as mean,
  calculateQuartiles as quartiles,
  calculateConfidenceScore as confidenceScore,
};