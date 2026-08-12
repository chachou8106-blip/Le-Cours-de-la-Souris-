import { Hono } from 'hono';
import { Env } from '../bindings/d1';
import { calculateCommunityIndex, calculateOfficialIndex, compareCommunityAndOfficialIndices } from '../handlers/index-engine';

const indexRouter = new Hono<{ Bindings: Env }>();

// Récupérer l'indice communautaire mondial
indexRouter.get('/world', async (c) => {
  try {
    const result = await calculateCommunityIndex(c.env);
    if (!result.success) {
      return c.json(result, 500);
    }
    return c.json(result);
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la récupération de l\'indice mondial',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Récupérer l'indice officiel mondial
indexRouter.get('/official', async (c) => {
  try {
    const result = await calculateOfficialIndex(c.env);
    if (!result.success) {
      return c.json(result, 500);
    }
    return c.json(result);
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la récupération de l\'indice officiel',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Récupérer la comparaison entre les indices
indexRouter.get('/comparison', async (c) => {
  try {
    const result = await compareCommunityAndOfficialIndices(c.env);
    if (!result.success) {
      return c.json(result, 500);
    }
    return c.json(result);
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la récupération de la comparaison',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Récupérer l'historique de l'indice communautaire
indexRouter.get('/history', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '12');
    const query = `
      SELECT 
        DATE(created_at) as date,
        AVG(amount) as avg_amount,
        COUNT(*) as reports_count
      FROM family_payout_reports 
      WHERE status = 'published' AND is_demo = FALSE
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT ?
    `;
    const { results } = await c.env.DB.prepare(query).bind(limit).all();

    return c.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la récupération de l\'historique',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

export default indexRouter;