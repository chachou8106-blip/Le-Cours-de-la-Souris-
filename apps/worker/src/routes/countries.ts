import { Hono } from 'hono';
import { getAllCountries } from '../bindings/d1';
import { Env } from '../bindings/d1';

const countriesRouter = new Hono<{ Bindings: Env }>();

// Récupérer tous les pays
countriesRouter.get('/', async (c) => {
  try {
    const countries = await getAllCountries(c.env.DB);
    return c.json({
      success: true,
      data: countries,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la récupération des pays',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Récupérer un pays spécifique
countriesRouter.get('/:iso2', async (c) => {
  try {
    const iso2 = c.req.param('iso2');
    const query = 'SELECT * FROM countries WHERE iso2 = ? AND is_active = 1';
    const { results } = await c.env.DB.prepare(query).bind(iso2).all();

    if (results.length === 0) {
      return c.json(
        {
          success: false,
          error: 'Pays non trouvé',
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
        error: 'Échec de la récupération du pays',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Récupérer les métriques d'un pays (montants, etc.)
countriesRouter.get('/:iso2/metrics', async (c) => {
  try {
    const iso2 = c.req.param('iso2');
    const query = `
      SELECT 
        AVG(amount) as avg_amount,
        COUNT(*) as sample_size,
        MIN(amount) as min_amount,
        MAX(amount) as max_amount
      FROM family_payout_reports 
      WHERE country_iso2 = ? AND status = 'published'
    `;
    const { results } = await c.env.DB.prepare(query).bind(iso2).all();

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

    return c.json({
      success: true,
      data: results[0],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la récupération des métriques',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

export default countriesRouter;