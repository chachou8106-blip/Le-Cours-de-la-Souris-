import { z } from 'zod';

export const FamilyPayoutReportSchema = z.object({
  id: z.string(),
  country_iso2: z.string().length(2),
  amount: z.number().positive(),
  currency: z.string().length(3),
  month: z.number().min(1).max(12),
  year: z.number().min(2000).max(2100),
  age_range: z.string().optional(),
  tradition: z.string().optional(),
  comment: z.string().max(500).optional(),
  status: z.enum(['pending', 'auto_approved', 'quarantined', 'rejected', 'published']),
  risk_score: z.number().min(0).max(1).default(0),
  is_demo: z.boolean().default(false),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const CreateReportSchema = z.object({
  country_iso2: z.string().length(2),
  amount: z.number().positive(),
  currency: z.string().length(3),
  month: z.number().min(1).max(12),
  year: z.number().min(2000).max(2100),
  age_range: z.string().optional(),
  tradition: z.string().optional(),
  comment: z.string().max(500).optional(),
  turnstile_token: z.string(),
});

export type FamilyPayoutReport = z.infer<typeof FamilyPayoutReportSchema>;
export type CreateReportInput = z.infer<typeof CreateReportSchema>;