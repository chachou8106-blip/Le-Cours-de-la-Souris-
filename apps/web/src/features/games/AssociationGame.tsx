import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

interface Association {
  id: number;
  country: string;
  tradition: string;
}

const associations: Association[] = [
  { id: 1, country: 'France', tradition: 'La Petite Souris' },
  { id: 2, country: 'États-Unis', tradition: 'The Tooth Fairy' },
  { id: 3, country: 'Espagne', tradition: 'El Ratoncito Pérez' },
  { id: 4, country: 'Allemagne', tradition: 'La Zahnfee' },
  { id: 5, country: 'Japon', tradition: 'Shigatsu-san' },
];

interface AssociationGameProps {
  onWin: (reward: number) => void;
}

export const AssociationGame: React.FC<AssociationGameProps> = ({ onWin }) => {
  const [currentPair, setCurrentPair] = useState<Association | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [remainingAssociations, setRemainingAssociations] = useState<Association[]>([]);

  useEffect(() => {
    const shuffled = [...associations].sort(() => Math.random() - 0.5);
    setRemainingAssociations(shuffled);
    if (shuffled.length > 0) {
      setCurrentPair(shuffled[0]);
      const allTraditions = shuffled.map((a) => a.tradition);
      const shuffledOptions = [...allTraditions].sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions.slice(0, 3));
    }
  }, []);

  const handleAnswer = (selectedTradition: string) => {
    if (!currentPair) return;

    if (selectedTradition === currentPair.tradition) {
      setScore(score + 10);
    }

    const newRemaining = remainingAssociations.slice(1);
    setRemainingAssociations(newRemaining);

    if (newRemaining.length > 0) {
      setCurrentPair(newRemaining[0]);
      const allTraditions = associations.map((a) => a.tradition);
      const shuffledOptions = [...allTraditions].sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions.slice(0, 3));
    } else {
      onWin(score);
    }
  };

  return (
    <Card title="Le Jeu des Associations" subtitle="Associe les pays à leurs traditions !">
      {currentPair ? (
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl font-bold">{currentPair.country}</p>
          <p>Quelle est la tradition de ce pays ?</p>
          <div className="flex gap-2">
            {options.map((option, index) => (
              <Button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </Button>
            ))}
          </div>
          <p>Score : {score}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl font-bold">Félicitations !</p>
          <p>Tu as gagné {score} CROQ Credits !</p>
        </div>
      )}
    </Card>
  );
};