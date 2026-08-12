import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

// Deux images avec 7 différences (simulées par des positions de cercles)
const image1 = [
  { x: 10, y: 10 },
  { x: 30, y: 20 },
  { x: 50, y: 30 },
  { x: 70, y: 40 },
  { x: 90, y: 50 },
  { x: 20, y: 60 },
  { x: 40, y: 70 },
  { x: 60, y: 80 },
  { x: 80, y: 90 },
];

const image2 = [
  { x: 10, y: 10 },
  { x: 30, y: 25 }, // Différence 1
  { x: 50, y: 30 },
  { x: 70, y: 45 }, // Différence 2
  { x: 90, y: 50 },
  { x: 20, y: 60 },
  { x: 45, y: 70 }, // Différence 3
  { x: 60, y: 80 },
  { x: 80, y: 95 }, // Différence 4
];

// Positions des différences (pour la vérification)
const differences = [
  { x: 30, y: 22.5 },
  { x: 70, y: 42.5 },
  { x: 42.5, y: 70 },
  { x: 80, y: 92.5 },
  { x: 15, y: 30 }, // Différence 5
  { x: 55, y: 50 }, // Différence 6
  { x: 25, y: 80 }, // Différence 7
];

export const SevenErrors: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [foundDifferences, setFoundDifferences] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');

  const findDifference = (index: number) => {
    if (foundDifferences.includes(index)) return;
    setFoundDifferences([...foundDifferences, index]);
    if (foundDifferences.length + 1 === differences.length) {
      setMessage('Félicitations ! Tu as trouvé toutes les différences et gagné 100 CROQ Credits !');
      onWin(100);
    }
  };

  const resetGame = () => {
    setFoundDifferences([]);
    setMessage('');
  };

  return (
    <Card title="Le Jeu des 7 Erreurs" subtitle="Trouve les 7 différences entre les deux images !">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="relative h-64 bg-blue-100 rounded-lg">
          {image1.map((circle, index) => (
            <div
              key={index}
              className="absolute w-4 h-4 bg-red-500 rounded-full"
              style={{
                left: `${circle.x}%`,
                top: `${circle.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>
        <div className="relative h-64 bg-blue-100 rounded-lg">
          {image2.map((circle, index) => (
            <div
              key={index}
              className="absolute w-4 h-4 bg-red-500 rounded-full"
              style={{
                left: `${circle.x}%`,
                top: `${circle.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
          {differences.map((diff, index) => (
            !foundDifferences.includes(index) && (
              <div
                key={index}
                className="absolute w-6 h-6 bg-yellow-400 rounded-full opacity-50 cursor-pointer"
                style={{
                  left: `${diff.x}%`,
                  top: `${diff.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => findDifference(index)}
              />
            )
          ))}
        </div>
      </div>
      {message ? (
        <p className="text-center mb-2">{message}</p>
      ) : (
        <p className="text-center mb-2">
          Différences trouvées : {foundDifferences.length}/{differences.length}
        </p>
      )}
      <Button onClick={resetGame} className="w-full">
        Recommencer
      </Button>
    </Card>
  );
};