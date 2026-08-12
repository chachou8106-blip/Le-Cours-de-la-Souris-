import { Hono } from 'hono';
import { z } from 'zod';
import { insertPayoutReport } from '../bindings/d1';
import { turnstileMiddleware } from '../middleware/turnstile';
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
});

// Soumettre un nouveau rapport
reportsRouter.post('/', turnstileMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = CreateReportSchema.parse(body);

    // Insérer le rapport en base de données
    await insertPayoutReport(c.env.DB, validatedData);

    return c.json(
      {
        success: true,
        message: 'Rapport soumis avec succès !',
        data: validatedData,
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

// Récupérer tous les rapports (avec pagination)
reportsRouter.get('/', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '50');
    const offset = parseInt(c.req.query('offset') || '0');
    const status = c.req.query('status');

    let query = `
      SELECT * FROM family_payout_reports 
      WHERE 1=1
    `;
    const params: any[] = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const { results } = await c.env.DB.prepare(query).bind(...params).all();

    return c.json({
      success: true,
      data: results,
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

export default reportsRouter;