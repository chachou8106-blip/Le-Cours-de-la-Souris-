import { Hono } from 'hono';
import { Env } from '../bindings/d1';

const countriesRouter = new Hono<{ Bindings: Env }>();

// Récupérer tous les pays actifs
countriesRouter.get('/', async (c) => {
  try {
    const query = 'SELECT * FROM countries WHERE is_active = 1 ORDER BY name_fr';
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

// Récupérer les métriques pour un pays (montants communautaires)
countriesRouter.get('/:iso2/metrics', async (c) => {
  try {
    const iso2 = c.req.param('iso2');

    // Vérifier que le pays existe
    const countryQuery = 'SELECT * FROM countries WHERE iso2 = ?';
    const countryResult = await c.env.DB.prepare(countryQuery).bind(iso2).all();
    if (countryResult.results.length === 0) {
      return c.json(
        {
          success: false,
          error: 'Pays non trouvé',
          timestamp: new Date().toISOString(),
        },
        404
      );
    }

    // Récupérer les rapports publiés pour ce pays
    const reportsQuery = `
      SELECT amount, currency, created_at 
      FROM family_payout_reports 
      WHERE country_iso2 = ? AND status = 'published'
      ORDER BY created_at DESC
    `;
    const { results } = await c.env.DB.prepare(reportsQuery).bind(iso2).all();

    if (results.length === 0) {
      return c.json(
        {
          success: true,
          data: {
            country: iso2,
            message: 'Aucune donnée communautaire disponible pour ce pays',
          },
          timestamp: new Date().toISOString(),
        }
      );
    }

    // Calculer les métriques
    const amounts = results.map((r: any) => r.amount);
    const currencies = [...new Set(results.map((r: any) => r.currency))];
    const sampleSize = results.length;

    // Calculer la médiane
    const sortedAmounts = [...amounts].sort((a, b) => a - b);
    const middle = Math.floor(sortedAmounts.length / 2);
    const median = sortedAmounts.length % 2 === 0
      ? (sortedAmounts[middle - 1] + sortedAmounts[middle]) / 2
      : sortedAmounts[middle];

    // Calculer la moyenne
    const mean = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length;

    // Calculer Q1 et Q3 pour l'IQR
    const q1Index = Math.floor((sortedAmounts.length - 1) * 0.25);
    const q3Index = Math.floor((sortedAmounts.length - 1) * 0.75);
    const q1 = sortedAmounts[q1Index];
    const q3 = sortedAmounts[q3Index];
    const iqr = q3 - q1;

    // Calculer la dispersion (IQR / médiane)
    const dispersion = median > 0 ? iqr / median : 0;

    // Calculer la récence (nombre de jours depuis la dernière mise à jour)
    const lastUpdated = new Date(Math.max(...results.map((r: any) => new Date(r.created_at).getTime())));
    const recentnessDays = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);

    // Calculer le score de confiance
    const sizeScore = Math.min(0.3, sampleSize / 100);
    const recentnessScore = Math.max(0, 0.4 * (1 - Math.min(1, recentnessDays / 30)));
    const dispersionScore = Math.max(0, 0.3 * (1 - Math.min(1, dispersion)));
    const confidenceScore = sizeScore + recentnessScore + dispersionScore;

    return c.json({
      success: true,
      data: {
        country: iso2,
        sampleSize,
        currencies,
        median,
        mean,
        min: Math.min(...amounts),
        max: Math.max(...amounts),
        q1,
        q3,
        iqr,
        dispersion,
        confidenceScore: Math.min(1, confidenceScore),
        lastUpdated: lastUpdated.toISOString(),
      },
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

// Récupérer les tarifs officiels pour un pays
countriesRouter.get('/:iso2/official-tariffs', async (c) => {
  try {
    const iso2 = c.req.param('iso2');

    // Dans une implémentation réelle, on récupérerait les tarifs depuis une table dédiée
    // Pour l'instant, on retourne des données mock
    const mockOfficialTariffs = {
      FR: [
        { procedure: 'Extraction dentaire simple', cost: 30, currency: 'EUR', source: 'Conseil National de l\'Ordre des Chirurgiens-Dentistes' },
        { procedure: 'Extraction chirurgicale', cost: 80, currency: 'EUR', source: 'Conseil National de l\'Ordre des Chirurgiens-Dentistes' },
      ],
      US: [
        { procedure: 'Simple tooth extraction', cost: 150, currency: 'USD', source: 'American Dental Association' },
        { procedure: 'Surgical tooth extraction', cost: 300, currency: 'USD', source: 'American Dental Association' },
      ],
      GB: [
        { procedure: 'Simple extraction', cost: 80, currency: 'GBP', source: 'NHS Dental Tariffs' },
      ],
      DE: [
        { procedure: 'Einfache Zahnentfernung', cost: 60, currency: 'EUR', source: 'Bundeszahnärztekammer' },
      ],
    };

    const tariffs = mockOfficialTariffs[iso2 as keyof typeof mockOfficialTariffs] || [];

    if (tariffs.length === 0) {
      return c.json(
        {
          success: false,
          error: 'Aucun tarif officiel disponible pour ce pays',
          timestamp: new Date().toISOString(),
        },
        404
      );
    }

    return c.json({
      success: true,
      data: {
        country: iso2,
        tariffs,
        averageCost: tariffs.reduce((sum: number, t: any) => sum + t.cost, 0) / tariffs.length,
        currency: tariffs[0].currency,
      },
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

export default countriesRouter;