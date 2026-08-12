import { z } from 'zod';

// Schéma pour la table fx_rates en base de données
export const FXRateSchema = z.object({
  id: z.string(),
  from_currency: z.string().length(3),
  to_currency: z.string().length(3),
  rate: z.number().positive(),
  source: z.string(),
  observed_at: z.string().datetime(),
  retrieved_at: z.string().datetime(),
  is_demo: z.boolean().default(false),
  confidence: z.number().min(0).max(1).default(1.0),
});

export type FXRate = z.infer<typeof FXRateSchema>;