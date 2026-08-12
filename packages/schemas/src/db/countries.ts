import { z } from 'zod';

// Schéma pour la table countries en base de données
export const CountryDBSchema = z.object({
  iso2: z.string().length(2),
  name_fr: z.string(),
  name_en: z.string(),
  currency_code: z.string().length(3),
  currency_name: z.string(),
  currency_symbol: z.string(),
  tradition_fr: z.string().nullable().optional(),
  tradition_en: z.string().nullable().optional(),
  is_active: z.boolean().default(true),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type CountryDB = z.infer<typeof CountryDBSchema>;