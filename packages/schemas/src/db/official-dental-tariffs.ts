import { z } from 'zod';

// Schéma pour la table official_dental_tariffs en base de données
export const OfficialDentalTariffSchema = z.object({
  id: z.number().int().positive(),
  country_iso2: z.string().length(2),
  extraction_cost: z.number().positive(),
  currency: z.string().length(3),
  source: z.string(),
  year: z.number().int().min(2000).max(2100),
  is_demo: z.boolean().default(false),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type OfficialDentalTariff = z.infer<typeof OfficialDentalTariffSchema>;