import React from 'react';
import { Card } from '../../components/ui';
import { GuessTheAmount, DentalQuiz, ToothHunt } from '../../features/games';

export const GamesPage: React.FC = () => {
  const handleWin = (reward: number) => {
    alert(`Félicitations ! Tu as gagné ${reward} CROQ Credits !`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🎮 Mini-Jeux</h1>
      <p className="text-lg mb-8">
        Jouez à nos mini-jeux pour gagner des CROQ Credits !
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GuessTheAmount onWin={handleWin} />
        <DentalQuiz onWin={handleWin} />
        <ToothHunt onWin={handleWin} />
      </div>

      <Card title="📢 Plus de jeux à venir !" className="mt-8">
        <p>Nous ajoutons régulièrement de nouveaux jeux. Restez à l'affût !</p>
      </Card>
    </div>
  );
};