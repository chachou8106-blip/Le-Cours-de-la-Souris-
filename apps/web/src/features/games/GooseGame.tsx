import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

// Cases du jeu de l'oie (0 = normale, 1 = piège, 2 = bonus)
const board = [
  0, 0, 1, 0, 2, 0, 0, 1, 0, 2,
  0, 1, 0, 0, 0, 1, 0, 2, 0, 0,
  1, 0, 0, 2, 0, 1, 0, 0, 1, 0,
  0, 2, 0, 1, 0, 0, 2, 0, 1, 0,
  0, 0, 1, 0, 2, 0, 1, 0, 0, 2,
];

export const GooseGame: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [playerPos, setPlayerPos] = useState<number>(0);
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const rollDice = () => {
    if (isGameOver || diceRoll !== null) return;
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);

    setTimeout(() => {
      let newPos = playerPos + roll;
      if (newPos >= board.length) {
        newPos = board.length - 1;
        setIsGameOver(true);
        setMessage('Félicitations ! Tu as gagné 100 CROQ Credits !');
        onWin(100);
      } else {
        // Appliquer les effets des cases
        if (board[newPos] === 1) {
          newPos -= 2;
          setMessage('Oh non ! Tu tombes sur un piège et recules de 2 cases.');
        } else if (board[newPos] === 2) {
          newPos += 2;
          setMessage('Super ! Tu tombes sur un bonus et avances de 2 cases.');
        }
        if (newPos < 0) newPos = 0;
        if (newPos >= board.length) newPos = board.length - 1;
        setPlayerPos(newPos);
      }
      setDiceRoll(null);
    }, 1000);
  };

  const resetGame = () => {
    setPlayerPos(0);
    setDiceRoll(null);
    setMessage('');
    setIsGameOver(false);
  };

  return (
    <Card title="Le Jeu de l’Oie (Version Souris)" subtitle="Lance le dé pour avancer !">
      <div className="flex flex-col items-center gap-4">
        <div className="grid grid-cols-5 gap-1">
          {board.map((cell, index) => (
            <div
              key={index}
              className={`w-12 h-12 flex items-center justify-center border border-gray-300 ${
                index === playerPos ? 'bg-[var(--primary)] text-white' : 'bg-[var(--light)]'
              }`}
            >
              {index === board.length - 1 ? '🧀' : cell === 1 ? '⚠️' : cell === 2 ? '⭐' : ''}
            </div>
          ))}
        </div>
        {diceRoll && (
          <div className="w-12 h-12 bg-white border-2 border-[var(--primary)] rounded-lg flex items-center justify-center text-xl font-bold">
            {diceRoll}
          </div>
        )}
        <Button onClick={rollDice} disabled={diceRoll !== null || isGameOver}>
          Lancer le dé
        </Button>
        {message && <p className="text-center">{message}</p>}
        {isGameOver && (
          <Button onClick={resetGame} className="mt-2">
            Rejouer
          </Button>
        )}
      </div>
    </Card>
  );
};