import { z } from 'zod';

// Schéma pour la table ppp_rates en base de données
export const PPPRateSchema = z.object({
  id: z.string(),
  country_iso2: z.string().length(2),
  rate: z.number().positive(),
  base_currency: z.string().length(3).default('USD'),
  source: z.string(),
  year: z.number().int().min(2000).max(2100),
  observed_at: z.string().datetime(),
  retrieved_at: z.string().datetime(),
  is_demo: z.boolean().default(false),
  confidence: z.number().min(0).max(1).default(1.0),
});

export type PPPRate = z.infer<typeof PPPRateSchema>;