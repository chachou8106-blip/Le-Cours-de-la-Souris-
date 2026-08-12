import { z } from 'zod';

export const CountrySchema = z.object({
  iso2: z.string().length(2),
  name_fr: z.string(),
  name_en: z.string(),
  currency_code: z.string().length(3),
  currency_name: z.string(),
  currency_symbol: z.string(),
  tradition_fr: z.string().optional(),
  tradition_en: z.string().optional(),
  is_active: z.boolean().default(true),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const CountriesResponseSchema = z.array(CountrySchema);

export type Country = z.infer<typeof CountrySchema>;