import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

interface Tooth {
  id: number;
  x: number;
  y: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

const generateRandomTooth = (): Tooth => {
  const rarities = [
    { type: 'common' as const, weight: 0.7, points: 1 },
    { type: 'rare' as const, weight: 0.2, points: 5 },
    { type: 'epic' as const, weight: 0.08, points: 10 },
    { type: 'legendary' as const, weight: 0.02, points: 50 },
  ];

  const random = Math.random();
  let cumulativeWeight = 0;
  let selectedRarity = rarities[0];

  for (const rarity of rarities) {
    cumulativeWeight += rarity.weight;
    if (random <= cumulativeWeight) {
      selectedRarity = rarity;
      break;
    }
  }

  return {
    id: Math.floor(Math.random() * 10000),
    x: Math.floor(Math.random() * 80),
    y: Math.floor(Math.random() * 80),
    rarity: selectedRarity.type,
    points: selectedRarity.points,
  };
};

interface ToothHuntProps {
  onWin: (reward: number) => void;
}

export const ToothHunt: React.FC<ToothHuntProps> = ({ onWin }) => {
  const [tooth, setTooth] = useState<Tooth | null>(null);
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
    setTooth(generateRandomTooth());
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tooth || !isPlaying) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const distance = Math.sqrt(
      Math.pow(x - tooth.x, 2) + Math.pow(y - tooth.y, 2)
    );

    if (distance <= 5) {
      setScore(score + tooth.points);
      setTooth(generateRandomTooth());
    }
  };

  const rarityColors = {
    common: 'bg-gray-400',
    rare: 'bg-blue-500',
    epic: 'bg-purple-500',
    legendary: 'bg-yellow-500',
  };

  return (
    <Card title="Chasse aux Dents" subtitle={`Score : ${score} | Temps : ${timeLeft}s`}>
      {!isPlaying ? (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={startGame}>Commencer le jeu</Button>
        </div>
      ) : (
        <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden" onClick={handleClick}>
          {tooth && (
            <div
              className={`absolute w-8 h-8 rounded-full ${rarityColors[tooth.rarity]} flex items-center justify-center text-white`}
              style={{
                left: `${tooth.x}%`,
                top: `${tooth.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              🦷
            </div>
          )}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm">
            Trouve la dent pour gagner {tooth?.points} points !
          </p>
        </div>
      )}
    </Card>
  );
};