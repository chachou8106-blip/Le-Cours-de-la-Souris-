import React from 'react';
import { OfficialRates } from '../../features/official-rates/OfficialRates';

export const OfficialRatesPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🏥 Cours Officiels des Actes Dentaires</h1>
      <p className="text-lg mb-8">
        Découvrez les tarifs officiels des extractions dentaires dans le monde, et comparez-les avec les montants laissés par la Petite Souris.
      </p>
      <OfficialRates />
    </div>
  );
};