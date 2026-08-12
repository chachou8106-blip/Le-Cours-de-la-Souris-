import { Hono } from 'hono';
import { Env } from '../bindings/d1';

const indexRouter = new Hono<{ Bindings: Env }>();

// Récupérer l'indice mondial
indexRouter.get('/world', async (c) => {
  try {
    // Calculer l'indice mondial (simplifié pour l'exemple)
    const query = `
      SELECT 
        AVG(amount) as global_avg,
        COUNT(*) as total_reports,
        COUNT(DISTINCT country_iso2) as countries_count
      FROM family_payout_reports 
      WHERE status = 'published'
    `;
    const { results } = await c.env.DB.prepare(query).all();

    if (results.length === 0) {
      return c.json(
        {
          success: false,
          error: 'Aucune donnée disponible pour l\'indice mondial',
          timestamp: new Date().toISOString(),
        },
        404
      );
    }

    return c.json({
      success: true,
      data: {
        globalIndex: results[0].global_avg || 0,
        totalReports: results[0].total_reports || 0,
        countriesCount: results[0].countries_count || 0,
        lastUpdated: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
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

// Récupérer l'historique de l'indice
indexRouter.get('/history', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '12');
    const query = `
      SELECT 
        DATE(created_at) as date,
        AVG(amount) as avg_amount,
        COUNT(*) as reports_count
      FROM family_payout_reports 
      WHERE status = 'published'
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