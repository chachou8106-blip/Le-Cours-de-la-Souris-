import React from 'react';
import { Card } from '../../components/ui';
import {
  GuessTheAmount,
  DentalQuiz,
  ToothHunt,
  WheelOfFortune,
  TraditionMemory,
  CoinRace,
  MazeGame,
  ToothPuzzle,
  MarketGame,
  CountryTrivia,
  LotteryGame,
  GooseGame,
  CurrencyMemory,
  PartnershipQuiz,
  TreasureHunt,
  SevenErrors,
  HangmanGame,
  AssociationGame,
  MathGame,
  MimeGame
} from '../../features/games';

export const GamesPage: React.FC = () => {
  const handleWin = (reward: number) => {
    alert(`Félicitations ! Tu as gagné ${reward} CROQ Credits !`);
  };

  const games = [
    { name: 'Devine le Montant', component: <GuessTheAmount onWin={handleWin} /> },
    { name: 'Quizz Dentaire', component: <DentalQuiz onWin={handleWin} /> },
    { name: 'Chasse aux Dents', component: <ToothHunt onWin={handleWin} /> },
    { name: 'La Roue de la Souris', component: <WheelOfFortune onWin={handleWin} /> },
    { name: 'Memory des Traditions', component: <TraditionMemory onWin={handleWin} /> },
    { name: 'Course aux Pièces', component: <CoinRace onWin={handleWin} /> },
    { name: 'Le Labyrinthe de la Souris', component: <MazeGame onWin={handleWin} /> },
    { name: 'Puzzle de la Dent', component: <ToothPuzzle onWin={handleWin} /> },
    { name: 'Le Marché de la Souris', component: <MarketGame onWin={handleWin} /> },
    { name: 'Trivia des Pays', component: <CountryTrivia onWin={handleWin} /> },
    { name: 'La Loterie de la Souris', component: <LotteryGame onWin={handleWin} /> },
    { name: "Le Jeu de l'Oie", component: <GooseGame onWin={handleWin} /> },
    { name: 'Memory des Devises', component: <CurrencyMemory onWin={handleWin} /> },
    { name: 'Le Quiz des Partenariats', component: <PartnershipQuiz onWin={handleWin} /> },
    { name: 'La Chasse au Trésor', component: <TreasureHunt onWin={handleWin} /> },
    { name: 'Le Jeu des 7 Erreurs', component: <SevenErrors onWin={handleWin} /> },
    { name: 'Le Jeu du Pendu', component: <HangmanGame onWin={handleWin} /> },
    { name: 'Le Jeu des Associations', component: <AssociationGame onWin={handleWin} /> },
    { name: 'Le Jeu des Maths', component: <MathGame onWin={handleWin} /> },
    { name: 'Le Jeu des Mimes', component: <MimeGame onWin={handleWin} /> },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🎮 Mini-Jeux</h1>
      <p className="text-lg mb-8">
        Jouez à nos 20 mini-jeux pour gagner des CROQ Credits !
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-center">{game.name}</h3>
            {game.component}
          </div>
        ))}
      </div>

      <Card title="📢 Plus de jeux à venir !" className="mt-8">
        <p>Nous ajoutons régulièrement de nouveaux jeux. Restez à l'affût !</p>
      </Card>
    </div>
  );
};