import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

interface Coin {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

export const CoinRace: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        setIsPlaying(false);
        onWin(score);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft, score, onWin]);

  const startGame = () => {
    const newCoins: Coin[] = [];
    for (let i = 0; i < 20; i++) {
      newCoins.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        collected: false,
      });
    }
    setCoins(newCoins);
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
  };

  const collectCoin = (id: number) => {
    if (!isPlaying) return;
    const newCoins = coins.map(coin =>
      coin.id === id ? { ...coin, collected: true } : coin
    );
    setCoins(newCoins);
    setScore(score + 1);
  };

  return (
    <Card title="Course aux Pièces" subtitle={`Score : ${score} | Temps : ${timeLeft}s`}>
      {!isPlaying ? (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={startGame}>Commencer le jeu</Button>
        </div>
      ) : (
        <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
          {coins.map(coin => (
            !coin.collected && (
              <div
                key={coin.id}
                className="absolute w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  left: `${coin.x}%`,
                  top: `${coin.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => collectCoin(coin.id)}
              >
                🪙
              </div>
            )
          ))}
        </div>
      )}
    </Card>
  );
};