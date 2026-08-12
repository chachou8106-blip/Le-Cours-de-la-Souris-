import { Hono } from 'hono';
import { z } from 'zod';
import { insertPayoutReport } from '../bindings/d1';
import { turnstileMiddleware } from '../middleware/turnstile';
import { rateLimitMiddleware } from '../middleware/rate-limit';
import { Env } from '../bindings/d1';

const reportsRouter = new Hono<{ Bindings: Env }>();

// Schéma de validation pour les rapports
const CreateReportSchema = z.object({
  countryIso2: z.string().length(2),
  amount: z.number().positive(),
  currency: z.string().length(3),
  month: z.number().min(1).max(12),
  year: z.number().min(2000).max(2100),
  ageRange: z.string().optional(),
  tradition: z.string().optional(),
  comment: z.string().max(500).optional(),
  turnstileToken: z.string(),
});

// Soumettre un nouveau rapport
reportsRouter.post('/', turnstileMiddleware, rateLimitMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = CreateReportSchema.parse(body);

    // Vérifier que le pays existe
    const countryQuery = 'SELECT * FROM countries WHERE iso2 = ?';
    const countryResult = await c.env.DB.prepare(countryQuery)
      .bind(validatedData.countryIso2)
      .all();

    if (countryResult.results.length === 0) {
      return c.json(
        {
          success: false,
          error: 'Pays non trouvé',
          timestamp: new Date().toISOString(),
        },
        400
      );
    }

    // Insérer le rapport en base de données
    await insertPayoutReport(c.env.DB, {
      countryIso2: validatedData.countryIso2,
      amount: validatedData.amount,
      currency: validatedData.currency,
      month: validatedData.month,
      year: validatedData.year,
      ageRange: validatedData.ageRange,
      tradition: validatedData.tradition,
      comment: validatedData.comment,
    });

    return c.json(
      {
        success: true,
        message: 'Rapport soumis avec succès ! Il sera modéré avant publication.',
        data: {
          country: validatedData.countryIso2,
          amount: validatedData.amount,
          currency: validatedData.currency,
        },
        reward: 10, // Récompense de base pour une déclaration
        timestamp: new Date().toISOString(),
      },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json(
        {
          success: false,
          error: 'Données invalides',
          details: error.errors,
          timestamp: new Date().toISOString(),
        },
        400
      );
    }
    return c.json(
      {
        success: false,
        error: 'Échec de la soumission du rapport',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Récupérer tous les rapports (avec pagination et filtres)
reportsRouter.get('/', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '50');
    const offset = parseInt(c.req.query('offset') || '0');
    const status = c.req.query('status');
    const countryIso2 = c.req.query('country');

    let query = `
      SELECT * FROM family_payout_reports 
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (countryIso2) {
      query += ' AND country_iso2 = ?';
      params.push(countryIso2);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const { results } = await c.env.DB.prepare(query).bind(...params).all();

    // Obtenir le nombre total de rapports
    let countQuery = 'SELECT COUNT(*) as count FROM family_payout_reports WHERE 1=1';
    const countParams: any[] = [];

    if (status) {
      countQuery += ' AND status = ?';
      countParams.push(status);
    }

    if (countryIso2) {
      countQuery += ' AND country_iso2 = ?';
      countParams.push(countryIso2);
    }

    const countResult = await c.env.DB.prepare(countQuery).bind(...countParams).all();
    const total = countResult.results[0]?.count || 0;

    return c.json({
      success: true,
      data: results,
      pagination: {
        limit,
        offset,
        total,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la récupération des rapports',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Récupérer un rapport spécifique
reportsRouter.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const query = 'SELECT * FROM family_payout_reports WHERE id = ?';
    const { results } = await c.env.DB.prepare(query).bind(id).all();

    if (results.length === 0) {
      return c.json(
        {
          success: false,
          error: 'Rapport non trouvé',
          timestamp: new Date().toISOString(),
        },
        404
      );
    }

    return c.json({
      success: true,
      data: results[0],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la récupération du rapport',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Récupérer les statistiques pour un pays
reportsRouter.get('/:iso2/stats', async (c) => {
  try {
    const iso2 = c.req.param('iso2');

    const statsQuery = `
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'published' THEN 1 END) as published,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'quarantined' THEN 1 END) as quarantined,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected,
        AVG(amount) as avg_amount,
        MIN(amount) as min_amount,
        MAX(amount) as max_amount,
        COUNT(DISTINCT currency) as currency_count
      FROM family_payout_reports 
      WHERE country_iso2 = ?
    `;

    const { results } = await c.env.DB.prepare(statsQuery).bind(iso2).all();

    if (results.length === 0) {
      return c.json(
        {
          success: false,
          error: 'Aucune donnée disponible pour ce pays',
          timestamp: new Date().toISOString(),
        },
        404
      );
    }

    const stats = results[0];

    // Calculer la médiane (simplifié)
    const medianQuery = `
      SELECT amount FROM family_payout_reports 
      WHERE country_iso2 = ? AND status = 'published'
      ORDER BY amount
    `;
    const medianResults = await c.env.DB.prepare(medianQuery).bind(iso2).all();
    const amounts = medianResults.results.map((r: any) => r.amount);
    const median = amounts.length > 0 ? calculateMedian(amounts) : 0;

    return c.json({
      success: true,
      data: {
        country: iso2,
        total: stats.total,
        published: stats.published,
        pending: stats.pending,
        quarantined: stats.quarantined,
        rejected: stats.rejected,
        avgAmount: stats.avg_amount,
        minAmount: stats.min_amount,
        maxAmount: stats.max_amount,
        medianAmount: median,
        currencyCount: stats.currency_count,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la récupération des statistiques',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Fonction utilitaire pour calculer la médiane
function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
}

export default reportsRouter;