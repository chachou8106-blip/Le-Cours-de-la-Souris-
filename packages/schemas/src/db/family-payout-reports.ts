import { z } from 'zod';

// Schéma pour la table family_payout_reports en base de données
export const FamilyPayoutReportDBSchema = z.object({
  id: z.string(),
  country_iso2: z.string().length(2),
  amount: z.number().positive(),
  currency: z.string().length(3),
  month: z.number().min(1).max(12),
  year: z.number().min(2000).max(2100),
  age_range: z.string().nullable().optional(),
  tradition: z.string().nullable().optional(),
  comment: z.string().max(500).nullable().optional(),
  status: z.enum(['pending', 'auto_approved', 'quarantined', 'rejected', 'published']),
  risk_score: z.number().min(0).max(1).default(0),
  is_demo: z.boolean().default(false),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type FamilyPayoutReportDB = z.infer<typeof FamilyPayoutReportDBSchema>;