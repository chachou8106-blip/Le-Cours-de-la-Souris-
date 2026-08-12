import { D1Database } from '@cloudflare/workers-types';

export interface Env {
  DB: D1Database;
}

// Exemple de requête pour récupérer tous les pays
export const getAllCountries = async (db: D1Database) => {
  const query = 'SELECT * FROM countries WHERE is_active = 1';
  const { results } = await db.prepare(query).all();
  return results;
};

// Exemple de requête pour insérer un rapport de paiement
export const insertPayoutReport = async (
  db: D1Database,
  report: {
    countryIso2: string;
    amount: number;
    currency: string;
    month: number;
    year: number;
    ageRange?: string;
    tradition?: string;
    comment?: string;
  }
) => {
  const query = `
    INSERT INTO family_payout_reports 
    (country_iso2, amount, currency, month, year, age_range, tradition, comment, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'))
  `;
  await db
    .prepare(query)
    .bind(
      report.countryIso2,
      report.amount,
      report.currency,
      report.month,
      report.year,
      report.ageRange || null,
      report.tradition || null,
      report.comment || null
    )
    .run();
};