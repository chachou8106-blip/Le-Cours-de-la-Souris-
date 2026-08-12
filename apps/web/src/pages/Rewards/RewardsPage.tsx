import React, { useState } from 'react';
import { Rewards } from '../../features/rewards/Rewards';

export const RewardsPage: React.FC = () => {
  // Dans une implémentation réelle, on récupérerait le solde depuis l'API
  const [balance, setBalance] = useState<number>(500);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🎁 Récompenses et Boutique</h1>
      <p className="text-lg mb-8">
        Découvre toutes les récompenses disponibles et utilise tes CROQ Credits pour les acheter.
      </p>
      <Rewards balance={balance} />
    </div>
  );
};