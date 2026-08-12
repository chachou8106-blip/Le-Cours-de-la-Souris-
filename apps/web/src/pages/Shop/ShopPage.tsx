import React from 'react';
import { ShopPage as ShopContent } from '../../features/rewards/ShopPage';

export const ShopPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-4">
      <ShopContent />
    </div>
  );
};