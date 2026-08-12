import { Hono } from 'hono';
import { Env } from '../bindings/d1';

const adminRouter = new Hono<{ Bindings: Env }>();

// Middleware pour vérifier l'authentification admin (à implémenter)
const adminAuthMiddleware = async (c: any, next: any) => {
  // Dans une implémentation réelle, on vérifierait un token JWT ou une session
  const isAdmin = c.req.header('X-Admin-Token') === 'SECRET_ADMIN_TOKEN';
  if (!isAdmin) {
    return c.json(
      {
        success: false,
        error: 'Accès non autorisé',
        timestamp: new Date().toISOString(),
      },
      401
    );
  }
  return next();
};

// Appliquer le middleware à toutes les routes admin
adminRouter.use('*', adminAuthMiddleware);

// Récupérer les rapports en attente de modération
adminRouter.get('/moderation/queue', async (c) => {
  try {
    const query = `
      SELECT * FROM family_payout_reports 
      WHERE status IN ('pending', 'quarantined')
      ORDER BY created_at ASC
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
        error: 'Échec de la récupération de la file de modération',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Mettre à jour le statut d'un rapport
adminRouter.post('/moderation/:reportId', async (c) => {
  try {
    const reportId = c.req.param('reportId');
    const { status, reason } = await c.req.json();

    if (!['auto_approved', 'quarantined', 'rejected', 'published'].includes(status)) {
      return c.json(
        {
          success: false,
          error: 'Statut invalide',
          timestamp: new Date().toISOString(),
        },
        400
      );
    }

    const query = `
      UPDATE family_payout_reports 
      SET status = ?, updated_at = datetime('now')
      WHERE id = ?
    `;
    await c.env.DB.prepare(query).bind(status, reportId).run();

    // Insérer la décision de modération dans la base
    const insertQuery = `
      INSERT INTO moderation_decisions 
      (id, report_id, decision, reason, moderator_id, created_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `;
    const decisionId = `decision_${Date.now()}`;
    await c.env.DB.prepare(insertQuery).bind(
      decisionId,
      reportId,
      status,
      reason || null,
      'admin_1' // À remplacer par l'ID du modérateur
    ).run();

    return c.json({
      success: true,
      message: 'Statut du rapport mis à jour avec succès',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la mise à jour du statut',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Récupérer les statistiques globales
adminRouter.get('/stats', async (c) => {
  try {
    const statsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM family_payout_reports) as total_reports,
        (SELECT COUNT(*) FROM family_payout_reports WHERE status = 'published') as published_reports,
        (SELECT COUNT(*) FROM family_payout_reports WHERE status = 'pending') as pending_reports,
        (SELECT COUNT(*) FROM countries) as total_countries
    `;
    const { results } = await c.env.DB.prepare(statsQuery).all();

    return c.json({
      success: true,
      data: results[0],
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

export default adminRouter;