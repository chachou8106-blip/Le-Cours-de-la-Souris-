import { Hono } from 'hono';
import { Env } from '../bindings/d1';

const officialRatesRouter = new Hono<{ Bindings: Env }>();

// Récupérer tous les tarifs officiels
officialRatesRouter.get('/', async (c) => {
  try {
    const query = `
      SELECT 
        country_iso2,
        extraction_cost,
        currency,
        source,
        year,
        is_demo
      FROM official_dental_tariffs
      ORDER BY country_iso2
    `;
    const { results } = await c.env.DB.prepare(query).all();

    return c.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la récupération des tarifs officiels',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Récupérer les tarifs pour un pays spécifique
officialRatesRouter.get('/:iso2', async (c) => {
  try {
    const iso2 = c.req.param('iso2');
    const query = `
      SELECT 
        country_iso2,
        extraction_cost,
        currency,
        source,
        year,
        is_demo
      FROM official_dental_tariffs
      WHERE country_iso2 = ?
    `;
    const { results } = await c.env.DB.prepare(query).bind(iso2).all();

    if (results.length === 0) {
      return c.json(
        {
          success: false,
          error: 'Aucun tarif officiel trouvé pour ce pays',
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
        error: 'Échec de la récupération du tarif officiel',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Mettre à jour un tarif officiel (admin uniquement)
officialRatesRouter.post('/:iso2', async (c) => {
  try {
    const iso2 = c.req.param('iso2');
    const { extractionCost, currency, source, year } = await c.req.json();

    const query = `
      INSERT OR REPLACE INTO official_dental_tariffs 
      (country_iso2, extraction_cost, currency, source, year, is_demo, updated_at)
      VALUES (?, ?, ?, ?, ?, FALSE, datetime('now'))
    `;
    await c.env.DB.prepare(query).bind(
      iso2,
      extractionCost,
      currency,
      source,
      year
    ).run();

    return c.json({
      success: true,
      message: 'Tarif officiel mis à jour avec succès',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la mise à jour du tarif officiel',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

export default officialRatesRouter;