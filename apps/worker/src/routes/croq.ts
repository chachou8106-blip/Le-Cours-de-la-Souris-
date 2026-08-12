import { Hono } from 'hono';
import { Env } from '../bindings/d1';

const croqRouter = new Hono<{ Bindings: Env }>();

// Récupérer les informations sur les CROQ Credits
croqRouter.get('/', async (c) => {
  try {
    return c.json({
      success: true,
      data: {
        name: 'CROQ Credits',
        description: 'Crédits virtuels pour récompenser les contributions au projet Le Cours de la Souris.',
        warning: 'Les CROQ Credits ne sont pas une cryptomonnaie et n\'ont aucune valeur monétaire.',
        uses: [
          'Acheter des cosmétiques (skins, décors)',
          'Participer à des loteries',
          'Débloquer des contenus premium',
          'Staker pour valider des données (bientôt)',
        ],
        howToEarn: [
          'Déclarer un montant pour la Petite Souris (+10 à 50 CROQ)',
          'Jouer aux mini-jeux (+5 à 500 CROQ)',
          'Contribuer à la modération ou aux traductions (+20 à 200 CROQ)',
          'Se connecter quotidiennement (+5 CROQ)',
          'Partager le Service avec des amis (+20 CROQ par inscription)',
        ],
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la récupération des informations CROQ',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

// Récupérer le solde CROQ d'un utilisateur (mock)
croqRouter.get('/balance/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    // Dans une implémentation réelle, on récupérerait le solde depuis la base de données
    const mockBalance = Math.floor(Math.random() * 1000);

    return c.json({
      success: true,
      data: {
        userId,
        balance: mockBalance,
        lastUpdated: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return c.json(
      {
        success: false,
        error: 'Échec de la récupération du solde',
        timestamp: new Date().toISOString(),
      },
      500
    );
  }
});

export default croqRouter;