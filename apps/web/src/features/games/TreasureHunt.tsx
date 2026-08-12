import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

interface Treasure {
  id: number;
  x: number;
  y: number;
  found: boolean;
}

export const TreasureHunt: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [treasures, setTreasures] = useState<Treasure[]>([]);
  const [clues, setClues] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
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
    const newTreasures: Treasure[] = [];
    const newClues: string[] = [];
    for (let i = 0; i < 5; i++) {
      newTreasures.push({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        found: false,
      });
      newClues.push(`Indice ${i + 1} : Cherche près du coin ${i === 0 ? 'supérieur gauche' : i === 1 ? 'supérieur droit' : i === 2 ? 'inférieur gauche' : i === 3 ? 'inférieur droit' : 'centre'}`);
    }
    setTreasures(newTreasures);
    setClues(newClues);
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
  };

  const findTreasure = (id: number) => {
    const newTreasures = treasures.map(treasure =>
      treasure.id === id ? { ...treasure, found: true } : treasure
    );
    setTreasures(newTreasures);
    setScore(score + 50);
  };

  return (
    <Card title="La Chasse au Trésor" subtitle={`Score : ${score} | Temps : ${timeLeft}s`}>
      {!isPlaying ? (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={startGame}>Commencer la chasse</Button>
        </div>
      ) : (
        <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
          {treasures.map(treasure => (
            !treasure.found && (
              <div
                key={treasure.id}
                className="absolute w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  left: `${treasure.x}%`,
                  top: `${treasure.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => findTreasure(treasure.id)}
              >
                💰
              </div>
            )
          ))}
          <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-lg">
            <p className="text-sm">Indice : {clues[score / 50] || 'Trouve tous les trésors !'}</p>
          </div>
        </div>
      )}
    </Card>
  );
};