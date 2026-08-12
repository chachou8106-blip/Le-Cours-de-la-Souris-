import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

// Cases du jeu de l'oie (simplifié)
const gooseBoard = [
  { id: 1, type: 'normal' },
  { id: 2, type: 'normal' },
  { id: 3, type: 'bridge', to: 6 },
  { id: 4, type: 'normal' },
  { id: 5, type: 'normal' },
  { id: 6, type: 'normal' },
  { id: 7, type: 'normal' },
  { id: 8, type: 'normal' },
  { id: 9, type: 'goose', move: 9 },
  { id: 10, type: 'normal' },
  { id: 11, type: 'normal' },
  { id: 12, type: 'normal' },
  { id: 13, type: 'normal' },
  { id: 14, type: 'normal' },
  { id: 15, type: 'goose', move: 15 },
  { id: 16, type: 'normal' },
  { id: 17, type: 'normal' },
  { id: 18, type: 'normal' },
  { id: 19, type: 'normal' },
  { id: 20, type: 'finish' },
];

interface GooseGameProps {
  onWin: (reward: number) => void;
}

export const GooseGame: React.FC<GooseGameProps> = ({ onWin }) => {
  const [playerPosition, setPlayerPosition] = useState<number>(0);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    
    let newPosition = playerPosition + roll;
    
    // Appliquer les règles spéciales (ex: case 3 = pont vers 6)
    if (newPosition < gooseBoard.length) {
      const newCase = gooseBoard[newPosition];
      if (newCase.type === 'bridge') {
        newPosition = newCase.to - 1; // -1 car index commence à 0
        setMessage(`Tu as pris le pont jusqu'à la case ${newCase.to}!`);
      } else if (newCase.type === 'goose') {
        newPosition += newCase.move;
        setMessage(`Tu es tombé sur une oie ! Avance de ${newCase.move} cases.`);
      }
    }

    if (newPosition >= gooseBoard.length - 1) {
      newPosition = gooseBoard.length - 1;
      setIsPlaying(false);
      onWin(100);
      setMessage('Félicitations ! Tu as gagné 100 CROQ Credits !');
    }

    setPlayerPosition(newPosition);
  };

  const startGame = () => {
    setPlayerPosition(0);
    setDiceRoll(null);
    setIsPlaying(true);
    setMessage('');
  };

  return (
    <Card title="Le Jeu de l'Oie (Version Souris)" subtitle="Lance le dé et avance !">
      {!isPlaying ? (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={startGame}>Commencer le jeu</Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap gap-1 justify-center">
            {gooseBoard.map((space, index) => (
              <div
                key={space.id}
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                  index === playerPosition ? 'bg-[var(--accent)]' : 'bg-[var(--light)]'
                } border border-[var(--primary)]`}
              >
                {index === playerPosition ? '🐭' : space.id}
              </div>
            ))}
          </div>
          <Button onClick={rollDice}>Lancer le dé</Button>
          {diceRoll !== null && <p>Tu as lancé : {diceRoll}</p>}
          {message && <p className="text-center">{message}</p>}
        </div>
      )}
    </Card>
  );
};