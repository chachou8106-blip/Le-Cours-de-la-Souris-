import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

interface Treasure {
  id: number;
  x: number;
  y: number;
  found: boolean;
}

interface TreasureHuntProps {
  onWin: (reward: number) => void;
}

export const TreasureHunt: React.FC<TreasureHuntProps> = ({ onWin }) => {
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [clues, setClues] = useState<string[]>([]);

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
    const newTreasures: Treasure[] = [];
    for (let i = 0; i < 5; i++) {
      newTreasures.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        found: false,
      });
    }
    setTreasures(newTreasures);
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    setClues([]);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlaying) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    treasures.forEach((treasure, index) => {
      if (!treasure.found) {
        const distance = Math.sqrt(
          Math.pow(x - treasure.x, 2) + Math.pow(y - treasure.y, 2)
        );
        if (distance <= 8) {
          const newTreasures = [...treasures];
          newTreasures[index].found = true;
          setTreasures(newTreasures);
          setScore(score + 20);
          setClues([...clues, `Trésor ${index + 1} trouvé !`]);
        }
      }
    });
  };

  return (
    <Card title="La Chasse au Trésor" subtitle={`Score : ${score} | Temps : ${timeLeft}s`}>
      {!isPlaying ? (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={startGame}>Commencer le jeu</Button>
          <p>Trouve tous les trésors en 60 secondes !</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div
            className="relative h-64 bg-gray-100 rounded-lg overflow-hidden cursor-crosshair"
            onClick={handleClick}
          >
            {treasures.map((treasure, index) => (
              !treasure.found && (
                <div
                  key={index}
                  className="absolute w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white"
                  style={{
                    left: `${treasure.x}%`,
                    top: `${treasure.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  💰
                </div>
              )
            ))}
          </div>
          <div className="h-16 overflow-y-auto border border-[var(--primary)] p-2 rounded-lg">
            {clues.length > 0 ? (
              clues.map((clue, index) => (
                <p key={index} className="text-sm">{clue}</p>
              ))
            ) : (
              <p className="text-sm text-[var(--secondary)]">Aucun trésor trouvé pour l'instant...</p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};