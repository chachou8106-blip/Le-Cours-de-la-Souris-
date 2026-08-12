import React from 'react';
import { RewardsPage as RewardsContent } from '../../features/rewards/RewardsPage';

export const RewardsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg)] p-4">
      <RewardsContent />
    </div>
  );
};