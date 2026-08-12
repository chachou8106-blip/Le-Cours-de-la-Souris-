import React from 'react';
import { CommunityRates } from '../../features/community-rates/CommunityRates';

export const CommunityRatesPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🌍 Cours Communautaire de la Petite Souris</h1>
      <p className="text-lg mb-8">
        Découvrez les montants moyens laissés par la Petite Souris dans le monde, basés sur les déclarations des utilisateurs.
      </p>
      <CommunityRates />
    </div>
  );
};