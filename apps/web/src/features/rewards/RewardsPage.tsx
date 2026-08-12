import React, { useState } from 'react';
import { Card, Button } from '../../components/ui';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';

// Types pour les récompenses
export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'cosmetic' | 'premium' | 'lottery' | 'badge';
  image?: string;
  owned: boolean;
}

// Données de démonstration pour les récompenses
const rewardsData: Reward[] = [
  {
    id: 'skin_golden_mouse',
    name: 'Skin Souris Dorée',
    description: 'Un design élégant pour votre profil de souris.',
    cost: 50,
    type: 'cosmetic',
    image: '🐭',
    owned: false,
  },
  {
    id: 'hat_magician',
    name: 'Chapeau de Magicien',
    description: 'Un chapeau magique pour votre souris.',
    cost: 30,
    type: 'cosmetic',
    image: '🎩',
    owned: false,
  },
  {
    id: 'sword_gold',
    name: 'Épée en Or',
    description: 'Une épée légendaire pour votre collection.',
    cost: 100,
    type: 'cosmetic',
    image: '⚔️',
    owned: false,
  },
  {
    id: 'shield_mouse',
    name: 'Bouclier de la Souris',
    description: 'Un bouclier pour protéger vos CROQ Credits.',
    cost: 70,
    type: 'cosmetic',
    image: '🛡️',
    owned: false,
  },
  {
    id: 'cape_invisible',
    name: 'Cape Invisible',
    description: 'Devenez invisible aux yeux des autres joueurs.',
    cost: 200,
    type: 'cosmetic',
    image: '👗',
    owned: false,
  },
  {
    id: 'guide_premium',
    name: 'Guide Premium : Traditions Dentaires',
    description: 'Un guide complet sur les traditions dentaires dans le monde.',
    cost: 50,
    type: 'premium',
    image: '📖',
    owned: false,
  },
  {
    id: 'analysis_advanced',
    name: 'Analyse Avancée',
    description: 'Accès aux statistiques avancées et aux tendances.',
    cost: 100,
    type: 'premium',
    image: '📊',
    owned: false,
  },
  {
    id: 'lottery_ticket',
    name: 'Ticket de Loterie',
    description: 'Participez à la loterie quotidienne pour gagner jusqu\'à 500 CROQ !',
    cost: 10,
    type: 'lottery',
    image: '🎟️',
    owned: false,
  },
  {
    id: 'badge_contributor',
    name: 'Badge Contributeur Actif',
    description: 'Récompense pour vos contributions à la communauté.',
    cost: 0,
    type: 'badge',
    image: '🏅',
    owned: false,
  },
  {
    id: 'badge_validator',
    name: 'Badge Validateur',
    description: 'Récompense pour la validation de déclarations.',
    cost: 0,
    type: 'badge',
    image: '✅',
    owned: false,
  },
];

// Données de démonstration pour l'historique des récompenses
export interface RewardHistory {
  id: string;
  rewardId: string;
  rewardName: string;
  amount: number;
  type: 'earn' | 'spend';
  date: string;
  reason: string;
}

const historyData: RewardHistory[] = [
  { id: '1', rewardId: 'skin_golden_mouse', rewardName: 'Skin Souris Dorée', amount: 50, type: 'spend', date: '2026-08-10', reason: 'Achat cosmétique' },
  { id: '2', rewardId: 'report_001', rewardName: 'Déclaration validée', amount: 20, type: 'earn', date: '2026-08-09', reason: 'Déclaration pour la France' },
  { id: '3', rewardId: 'game_guess_amount', rewardName: 'Devine le Montant', amount: 30, type: 'earn', date: '2026-08-08', reason: 'Victoire au jeu' },
  { id: '4', rewardId: 'badge_contributor', rewardName: 'Badge Contributeur Actif', amount: 0, type: 'earn', date: '2026-08-07', reason: '10 contributions validées' },
];

export const RewardsPage: React.FC = () => {
  const [userBalance, setUserBalance] = useState<number>(150); // Solde de démonstration
  const [rewards, setRewards] = useState<Reward[]>(rewardsData);
  const [history, setHistory] = useState<RewardHistory[]>(historyData);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cosmetic' | 'premium' | 'lottery' | 'badge'>('all');

  const buyReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || userBalance < reward.cost || reward.owned) return;

    setUserBalance(userBalance - reward.cost);
    setRewards(rewards.map(r => r.id === rewardId ? { ...r, owned: true } : r));
    setHistory([
      ...history,
      {
        id: Date.now().toString(),
        rewardId,
        rewardName: reward.name,
        amount: reward.cost,
        type: 'spend',
        date: new Date().toISOString().split('T')[0],
        reason: `Achat : ${reward.name}`,
      },
    ]);
  };

  const filteredRewards = selectedCategory === 'all'
    ? rewards
    : rewards.filter(r => r.type === selectedCategory);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🎁 Récompenses et Boutique</h1>
      <p className="text-lg mb-8">
        Utilisez vos CROQ Credits pour acheter des **cosmétiques**, débloquer des **contenus premium**, 
        ou participer à des **loteries** !
      </p>

      {/* Solde */}
      <Card title="💰 Votre Solde" className="mb-8">
        <p className="text-4xl font-bold text-[var(--primary)] text-center">
          {userBalance} CROQ
        </p>
        <p className="text-center text-sm text-[var(--secondary)] mt-2">
          Utilisez vos crédits pour acheter des récompenses ci-dessous.
        </p>
      </Card>

      {/* Catégories */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
          onClick={() => setSelectedCategory('all')}
        >
          Toutes
        </Button>
        <Button
          variant={selectedCategory === 'cosmetic' ? 'primary' : 'secondary'}
          onClick={() => setSelectedCategory('cosmetic')}
        >
          Cosmétiques
        </Button>
        <Button
          variant={selectedCategory === 'premium' ? 'primary' : 'secondary'}
          onClick={() => setSelectedCategory('premium')}
        >
          Premium
        </Button>
        <Button
          variant={selectedCategory === 'lottery' ? 'primary' : 'secondary'}
          onClick={() => setSelectedCategory('lottery')}
        >
          Loteries
        </Button>
        <Button
          variant={selectedCategory === 'badge' ? 'primary' : 'secondary'}
          onClick={() => setSelectedCategory('badge')}
        >
          Badges
        </Button>
      </div>

      {/* Récompenses disponibles */}
      <h2 className="text-2xl font-bold mb-4">🛒 Boutique</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredRewards.map(reward => (
          <Card key={reward.id} title={reward.name} subtitle={formatCurrency(reward.cost, 'CROQ')}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{reward.image}</span>
              <div>
                <p className="text-sm">{reward.description}</p>
                <p className="text-xs text-[var(--secondary)]">
                  Type : {reward.type}
                </p>
              </div>
            </div>
            {reward.owned ? (
              <Button disabled className="w-full">
                Déjà acheté ✅
              </Button>
            ) : (
              <Button
                onClick={() => buyReward(reward.id)}
                disabled={userBalance < reward.cost}
                className="w-full"
              >
                Acheter pour {reward.cost} CROQ
              </Button>
            )}
          </Card>
        ))}
      </div>

      {/* Historique des récompenses */}
      <h2 className="text-2xl font-bold mb-4">📜 Historique</h2>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--primary)]">
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Récompense</th>
                <th className="text-right p-2">Montant</th>
                <th className="text-left p-2">Type</th>
                <th className="text-left p-2">Raison</th>
              </tr>
            </thead>
            <tbody>
              {history.map(item => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="p-2">{item.date}</td>
                  <td className="p-2">{item.rewardName}</td>
                  <td className={`p-2 text-right ${item.type === 'earn' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.type === 'earn' ? '+' : '-'}{item.amount} CROQ
                  </td>
                  <td className="p-2">{item.type === 'earn' ? 'Gain' : 'Dépense'}</td>
                  <td className="p-2 text-sm">{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Comment gagner plus de CROQ */}
      <Card title="💡 Comment gagner plus de CROQ Credits ?" className="mt-8">
        <p className="mb-4">
          Voici comment accumuler des CROQ Credits pour acheter plus de récompenses :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-2">🎮 Jeux :</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Devine le Montant : +5 à 50 CROQ</li>
              <li>Quizz Dentaire : +10 à 30 CROQ</li>
              <li>Chasse aux Dents : +1 à 100 CROQ</li>
              <li>La Roue de la Souris : +5 à 200 CROQ</li>
              <li>Loterie : Jusqu'à +500 CROQ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">📝 Contributions :</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Déclaration validée : +10 à 50 CROQ</li>
              <li>Modération de contenu : +20 à 100 CROQ</li>
              <li>Traduction : +50 à 200 CROQ</li>
              <li>Signalement de bug : +10 à 50 CROQ</li>
              <li>Connexion quotidienne : +5 CROQ</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-center">
          <Link to="/games" className="text-[var(--primary)] hover:underline">
            Jouer maintenant →
          </Link>
        </p>
      </Card>

      {/* Avertissement */}
      <Card title="⚠️ Avertissement" className="mt-8">
        <p className="text-sm text-red-600">
          <strong>Les CROQ Credits ne sont pas une cryptomonnaie.</strong> Ils n'ont aucune valeur monétaire 
          et ne peuvent être ni achetés ni vendus. Ils sont uniquement utilisables dans cette application 
          pour des récompenses virtuelles.
        </p>
        <p className="text-sm text-[var(--secondary)] mt-2">
          Pour en savoir plus, consultez notre 
          <Link to="/legal/token-disclaimer" className="text-[var(--primary)] hover:underline">
            avertissement complet
          </Link>.
        </p>
      </Card>
    </div>
  );
};