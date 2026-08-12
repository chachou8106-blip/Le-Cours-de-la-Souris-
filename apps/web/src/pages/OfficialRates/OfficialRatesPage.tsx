import React from 'react';
import { OfficialRates } from '../../features/official-rates/OfficialRates';

export const OfficialRatesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-4">
      <OfficialRates />
    </div>
  );
};