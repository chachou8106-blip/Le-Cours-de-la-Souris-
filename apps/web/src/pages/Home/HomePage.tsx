import React from 'react';
import { Card } from '../../components/ui';
import { DailyHumor } from '../../features/daily-humor';
import { GuessTheAmount, DentalQuiz, ToothHunt } from '../../features/games';

export const HomePage: React.FC = () => {
  const handleWin = (reward: number) => {
    alert(`Félicitations ! Tu as gagné ${reward} CROQ Credits !`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🦷 Le Cours de la Souris</h1>
      <p className="text-lg mb-8">
        L’indice mondial communautaire des dents de lait. Découvrez, déclarez, et jouez !
      </p>

      <DailyHumor />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="📊 Indice Mondial" subtitle="Découvrez les montants moyens">
          <p>Consultez les cours officiels et communautaires par pays.</p>
          <a href="/index" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            Voir l'indice →
          </a>
        </Card>

        <Card title="🌍 Pays" subtitle="Explorez les traditions">
          <p>Voir les montants et traditions par pays.</p>
          <a href="/countries" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            Voir les pays →
          </a>
        </Card>

        <Card title="🪙 CROQ" subtitle="En savoir plus sur les crédits">
          <p>Découvrez comment gagner et utiliser des CROQ Credits.</p>
          <a href="/croq" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            En savoir plus →
          </a>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-4">🎮 Mini-Jeux</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GuessTheAmount onWin={handleWin} />
        <DentalQuiz onWin={handleWin} />
        <ToothHunt onWin={handleWin} />
      </div>
    </div>
  );
};