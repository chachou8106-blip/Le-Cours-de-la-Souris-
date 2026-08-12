import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

// Deux images avec 7 différences (simulées par des positions)
const imageA = [
  { id: 1, x: 10, y: 20, found: false },
  { id: 2, x: 30, y: 40, found: false },
  { id: 3, x: 50, y: 10, found: false },
  { id: 4, x: 70, y: 30, found: false },
  { id: 5, x: 20, y: 60, found: false },
  { id: 6, x: 80, y: 70, found: false },
  { id: 7, x: 40, y: 80, found: false },
];

const imageB = [
  { id: 1, x: 10, y: 20, found: false },
  { id: 2, x: 30, y: 40, found: false },
  { id: 3, x: 50, y: 10, found: false },
  { id: 4, x: 70, y: 30, found: false },
  { id: 5, x: 20, y: 60, found: false },
  { id: 6, x: 80, y: 70, found: false },
  { id: 7, x: 40, y: 80, found: false },
];

interface SevenErrorsProps {
  onWin: (reward: number) => void;
}

export const SevenErrors: React.FC<SevenErrorsProps> = ({ onWin }) => {
  const [errors, setErrors] = useState<{ id: number; x: number; y: number; found: boolean }[]>(imageA);
  const [currentImage, setCurrentImage] = useState<'A' | 'B'>('A');
  const [foundCount, setFoundCount] = useState<number>(0);

  const toggleImage = () => {
    setCurrentImage(currentImage === 'A' ? 'B' : 'A');
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (foundCount >= 7) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    errors.forEach((error, index) => {
      if (!error.found) {
        const distance = Math.sqrt(
          Math.pow(x - error.x, 2) + Math.pow(y - error.y, 2)
        );
        if (distance <= 5) {
          const newErrors = [...errors];
          newErrors[index].found = true;
          setErrors(newErrors);
          setFoundCount(foundCount + 1);
          if (foundCount + 1 === 7) {
            onWin(35);
          }
        }
      }
    });
  };

  return (
    <Card title="Le Jeu des 7 Erreurs" subtitle="Trouve les 7 différences !">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div
            className="w-64 h-64 bg-gray-200 rounded-lg cursor-crosshair relative overflow-hidden"
            onClick={handleClick}
          >
            {currentImage === 'A' ? (
              <>
                <div className="absolute bg-red-500 w-4 h-4 rounded-full" style={{ left: '10%', top: '20%' }} />
                <div className="absolute bg-blue-500 w-4 h-4 rounded-full" style={{ left: '30%', top: '40%' }} />
                <div className="absolute bg-green-500 w-4 h-4 rounded-full" style={{ left: '50%', top: '10%' }} />
                <div className="absolute bg-yellow-500 w-4 h-4 rounded-full" style={{ left: '70%', top: '30%' }} />
                <div className="absolute bg-purple-500 w-4 h-4 rounded-full" style={{ left: '20%', top: '60%' }} />
                <div className="absolute bg-pink-500 w-4 h-4 rounded-full" style={{ left: '80%', top: '70%' }} />
                <div className="absolute bg-indigo-500 w-4 h-4 rounded-full" style={{ left: '40%', top: '80%' }} />
                <p className="absolute inset-0 flex items-center justify-center text-lg font-bold">Image A</p>
              </>
            ) : (
              <>
                <div className="absolute bg-red-500 w-4 h-4 rounded-full" style={{ left: '10%', top: '20%' }} />
                <div className="absolute bg-blue-500 w-4 h-4 rounded-full" style={{ left: '30%', top: '40%' }} />
                <div className="absolute bg-green-500 w-4 h-4 rounded-full" style={{ left: '50%', top: '10%' }} />
                <div className="absolute bg-yellow-500 w-4 h-4 rounded-full" style={{ left: '70%', top: '30%' }} />
                <div className="absolute bg-purple-500 w-4 h-4 rounded-full" style={{ left: '20%', top: '60%' }} />
                <div className="absolute bg-pink-500 w-4 h-4 rounded-full" style={{ left: '80%', top: '70%' }} />
                <div className="absolute bg-indigo-500 w-4 h-4 rounded-full" style={{ left: '40%', top: '80%' }} />
                <p className="absolute inset-0 flex items-center justify-center text-lg font-bold">Image B</p>
              </>
            )}
          </div>
          <p className="text-center mt-2">Erreurs trouvées : {foundCount}/7</p>
        </div>
        <Button onClick={toggleImage}>
          Basculer entre Image A et B
        </Button>
        {foundCount === 7 && <p className="text-green-600 font-bold">Félicitations ! Tu as trouvé toutes les erreurs.</p>}
      </div>
    </Card>
  );
};