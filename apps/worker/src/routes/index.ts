import { Hono } from 'hono';
import { Env } from '../bindings/d1';

const indexRouter = new Hono<{ Bindings: Env }>();

// Récupérer l'indice mondial (communautaire)
indexRouter.get('/world', async (c) => {
  try {
    // Récupérer tous les rapports publiés
    const query = `
      SELECT 
        country_iso2,
        amount,
        currency,
        created_at
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

    // Grouper par pays et calculer la médiane pour chaque pays
    const countryGroups: Record<string, number[]> = {};
    for (const row of results as any) {
      if (!countryGroups[row.country_iso2]) {
        countryGroups[row.country_iso2] = [];
      }
      countryGroups[row.country_iso2].push(row.amount);
    }

    // Calculer la médiane pour chaque pays
    const countryMedians: Record<string, number> = {};
    for (const [countryIso2, amounts] of Object.entries(countryGroups)) {
      const sorted = [...amounts].sort((a, b) => a - b);
      const middle = Math.floor(sorted.length / 2);
      countryMedians[countryIso2] = sorted.length % 2 === 0
        ? (sorted[middle - 1] + sorted[middle]) / 2
        : sorted[middle];
    }

    // Calculer l'indice mondial (moyenne simple des médianes)
    const medians = Object.values(countryMedians);
    const globalIndex = medians.reduce((sum, median) => sum + median, 0) / medians.length;

    return c.json({
      success: true,
      data: {
        globalIndex,
        countriesCount: Object.keys(countryMedians).length,
        totalReports: results.length,
        countryMedians,
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

// Récupérer l'historique de l'indice mondial
indexRouter.get('/history', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '12');

    // Récupérer l'historique des rapports (par jour)
    const query = `
      SELECT 
        DATE(created_at) as date,
        country_iso2,
        amount
      FROM family_payout_reports 
      WHERE status = 'published'
      ORDER BY created_at DESC
      LIMIT ?
    `;
    const { results } = await c.env.DB.prepare(query).bind(limit * 100).all(); // Limite arbitraire

    // Grouper par date et calculer la médiane mondiale pour chaque jour
    const dailyIndices: Record<string, { globalIndex: number; countries: Record<string, number> }> = {};

    for (const row of results as any) {
      const date = row.date;
      if (!dailyIndices[date]) {
        dailyIndices[date] = { globalIndex: 0, countries: {} };
      }

      if (!dailyIndices[date].countries[row.country_iso2]) {
        dailyIndices[date].countries[row.country_iso2] = [];
      }
      dailyIndices[date].countries[row.country_iso2].push(row.amount);
    }

    // Calculer l'indice pour chaque jour
    const history: Array<{ date: string; globalIndex: number; countriesCount: number }> = [];
    for (const [date, data] of Object.entries(dailyIndices)) {
      const countryMedians: number[] = [];
      for (const [countryIso2, amounts] of Object.entries(data.countries)) {
        const sorted = [...amounts as number[]].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        const median = sorted.length % 2 === 0
          ? (sorted[middle - 1] + sorted[middle]) / 2
          : sorted[middle];
        countryMedians.push(median);
      }

      const globalIndex = countryMedians.length > 0
        ? countryMedians.reduce((sum, median) => sum + median, 0) / countryMedians.length
        : 0;

      history.push({
        date,
        globalIndex,
        countriesCount: countryMedians.length,
      });
    }

    // Trier par date (ascendant)
    history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return c.json({
      success: true,
      data: history,
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

// Récupérer l'indice officiel mondial
indexRouter.get('/official', async (c) => {
  try {
    // Dans une implémentation réelle, on récupérerait les tarifs officiels depuis une table dédiée
    // Pour l'instant, on retourne des données mock
    const mockOfficialIndex = {
      value: 75.50, // Valeur fictive en USD
      countriesCount: 10,
      averageCost: 75.50,
      lastUpdated: new Date().toISOString(),
      details: {
        FR: { cost: 30, currency: 'EUR' },
        US: { cost: 150, currency: 'USD' },
        GB: { cost: 80, currency: 'GBP' },
        DE: { cost: 60, currency: 'EUR' },
      },
    };

    return c.json({
      success: true,
      data: mockOfficialIndex,
      timestamp: new Date().toISOString(),
    });
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

export default indexRouter;