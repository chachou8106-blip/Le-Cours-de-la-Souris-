import React, { useState } from 'react';
import { Card, Button } from '../../components/ui';
import { formatCurrency } from '../../utils/formatters';

// Types pour les récompenses et cosmétiques
interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'cosmetic' | 'lottery' | 'premium';
  image?: string;
}

interface UserReward {
  id: string;
  rewardId: string;
  purchasedAt: string;
  used: boolean;
}

// Récompenses disponibles
const availableRewards: Reward[] = [
  // Cosmétiques
  { id: 'skin_001', name: 'Chapeau de Souris Doré', description: 'Un chapeau élégant pour ta souris', cost: 50, type: 'cosmetic', image: '🎩' },
  { id: 'skin_002', name: 'Cape de Super-Souris', description: 'Une cape pour voler comme un super-héros', cost: 100, type: 'cosmetic', image: '🦸' },
  { id: 'skin_003', name: 'Lunettes de Souris', description: 'Des lunettes stylées pour ta souris', cost: 75, type: 'cosmetic', image: '👓' },
  { id: 'skin_004', name: 'Épée en Or', description: 'Une épée pour combattre les caries', cost: 150, type: 'cosmetic', image: '⚔️' },
  { id: 'skin_005', name: 'Bouclier de la Souris', description: 'Un bouclier pour te protéger', cost: 120, type: 'cosmetic', image: '🛡️' },
  
  // Loteries
  { id: 'lottery_001', name: 'Loterie Quotidienne', description: 'Participe pour gagner jusqu\'à 500 CROQ', cost: 10, type: 'lottery', image: '🎟️' },
  { id: 'lottery_002', name: 'Loterie Hebdomadaire', description: 'Participe pour gagner jusqu\'à 2000 CROQ', cost: 50, type: 'lottery', image: '🎟️' },
  { id: 'lottery_003', name: 'Loterie Mensuelle', description: 'Participe pour gagner jusqu\'à 10000 CROQ', cost: 200, type: 'lottery', image: '🎟️' },
  
  // Contenus Premium
  { id: 'premium_001', name: 'Guide des Traditions', description: 'Découvre les traditions dentaires dans le monde', cost: 100, type: 'premium', image: '📖' },
  { id: 'premium_002', name: 'Analyse Avancée', description: 'Accède à des analyses détaillées par pays', cost: 200, type: 'premium', image: '📊' },
  { id: 'premium_003', name: 'Rapport Annuel', description: 'Télécharge le rapport annuel complet', cost: 500, type: 'premium', image: '📄' },
];

// Récompenses de l'utilisateur (simulées)
const userRewards: UserReward[] = [
  { id: 'user_reward_001', rewardId: 'skin_001', purchasedAt: '2026-08-01', used: false },
  { id: 'user_reward_002', rewardId: 'lottery_001', purchasedAt: '2026-08-05', used: true },
];

interface RewardsProps {
  balance: number;
}

export const Rewards: React.FC<RewardsProps> = ({ balance }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cosmetic' | 'lottery' | 'premium'>('all');
  const [purchasedRewards, setPurchasedRewards] = useState<UserReward[]>(userRewards);

  const filterRewards = () => {
    if (selectedCategory === 'all') {
      return availableRewards;
    }
    return availableRewards.filter((reward) => reward.type === selectedCategory);
  };

  const purchaseReward = (reward: Reward) => {
    if (balance < reward.cost) {
      alert("Tu n'as pas assez de CROQ Credits !");
      return;
    }
    
    // Dans une implémentation réelle, on appellerait une API pour déduire le montant
    const newReward: UserReward = {
      id: `user_reward_${Date.now()}`,
      rewardId: reward.id,
      purchasedAt: new Date().toISOString(),
      used: false,
    };
    
    setPurchasedRewards([...purchasedRewards, newReward]);
    alert(`Félicitations ! Tu as acheté : ${reward.name}`);
  };

  const getPurchasedReward = (rewardId: string) => {
    return purchasedRewards.find((r) => r.rewardId === rewardId);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🎁 Récompenses et Boutique</h2>
      <p className="mb-6">
        Utilise tes CROQ Credits pour acheter des cosmétiques, participer à des loteries, ou débloquer des contenus premium.
      </p>

      {/* Solde */}
      <Card title="💰 Ton Solde" className="mb-6">
        <p className="text-4xl font-bold text-[var(--primary)] text-center">
          {balance} CROQ Credits
        </p>
      </Card>

      {/* Catégories */}
      <Card title="📂 Catégories" className="mb-6">
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => setSelectedCategory('all')}
            variant={selectedCategory === 'all' ? 'accent' : 'primary'}
          >
            Tout
          </Button>
          <Button
            onClick={() => setSelectedCategory('cosmetic')}
            variant={selectedCategory === 'cosmetic' ? 'accent' : 'primary'}
          >
            Cosmétiques
          </Button>
          <Button
            onClick={() => setSelectedCategory('lottery')}
            variant={selectedCategory === 'lottery' ? 'accent' : 'primary'}
          >
            Loteries
          </Button>
          <Button
            onClick={() => setSelectedCategory('premium')}
            variant={selectedCategory === 'premium' ? 'accent' : 'primary'}
          >
            Premium
          </Button>
        </div>
      </Card>

      {/* Liste des récompenses */}
      <Card title="🛒 Boutique">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filterRewards().map((reward) => {
            const isPurchased = getPurchasedReward(reward.id);
            return (
              <div key={reward.id} className="border border-[var(--primary)] p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl mb-2">{reward.image}</div>
                  <h3 className="font-bold text-lg">{reward.name}</h3>
                  <p className="text-sm text-[var(--secondary)] mb-2">{reward.description}</p>
                  <p className="font-bold text-[var(--primary)]">
                    {reward.cost} CROQ Credits
                  </p>
                  <Button
                    onClick={() => purchaseReward(reward)}
                    disabled={isPurchased !== undefined || balance < reward.cost}
                    className="mt-2 w-full"
                  >
                    {isPurchased ? 'Déjà acheté' : 'Acheter'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Récompenses achetées */}
      <Card title="📦 Tes Récompenses" className="mt-6">
        {purchasedRewards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {purchasedRewards.map((userReward) => {
              const reward = availableRewards.find((r) => r.id === userReward.rewardId);
              return reward ? (
                <div key={userReward.id} className="border border-[var(--primary)] p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{reward.image}</div>
                    <h3 className="font-bold text-lg">{reward.name}</h3>
                    <p className="text-sm text-[var(--secondary)] mb-2">
                      Acheté le : {new Date(userReward.purchasedAt).toLocaleDateString()}
                    </p>
                    <Button
                      variant={userReward.used ? 'secondary' : 'primary'}
                      disabled={userReward.used}
                      className="mt-2 w-full"
                    >
                      {userReward.used ? 'Utilisé' : 'Utiliser'}
                    </Button>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        ) : (
          <p className="text-center text-[var(--secondary)]">
            Tu n'as pas encore acheté de récompenses.
          </p>
        )}
      </Card>

      {/* Avertissement */}
      <Card title="⚠️ Avertissement" className="mt-6">
        <p className="text-[var(--secondary)]">
          Les CROQ Credits <strong>n'ont aucune valeur monétaire</strong> et ne peuvent être échangés contre de l'argent réel.
          Les récompenses sont <strong>virtuelles</strong> et destinées à un usage dans l'application uniquement.
        </p>
      </Card>
    </div>
  );
};