import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

interface Coin {
  id: number;
  x: number;
  y: number;
}

interface CoinRaceProps {
  onWin: (reward: number) => void;
}

export const CoinRace: React.FC<CoinRaceProps> = ({ onWin }) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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

  useEffect(() => {
    if (!isPlaying) return;

    const coinTimer = setInterval(() => {
      const newCoin: Coin = {
        id: Date.now(),
        x: Math.random() * 80,
        y: Math.random() * 80,
      };
      setCoins((prevCoins) => [...prevCoins, newCoin]);
    }, 1000);

    return () => clearInterval(coinTimer);
  }, [isPlaying]);

  const startGame = () => {
    setCoins([]);
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlaying) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });

    // Vérifier si la souris touche une pièce
    coins.forEach((coin) => {
      const distance = Math.sqrt(
        Math.pow(x - coin.x, 2) + Math.pow(y - coin.y, 2)
      );
      if (distance <= 5) {
        setCoins((prevCoins) => prevCoins.filter((c) => c.id !== coin.id));
        setScore(score + 1);
      }
    });
  };

  return (
    <Card title="Course aux Pièces" subtitle={`Score : ${score} | Temps : ${timeLeft}s`}>
      {!isPlaying ? (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={startGame}>Commencer le jeu</Button>
          <p>Attrape le plus de pièces possible en 30 secondes !</p>
        </div>
      ) : (
        <div
          className="relative h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
          onMouseMove={handleMouseMove}
        >
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="absolute w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white"
              style={{
                left: `${coin.x}%`,
                top: `${coin.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              🪙
            </div>
          ))}
          <div
            className="absolute w-4 h-4 rounded-full bg-red-500"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}
    </Card>
  );
};