import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

interface Association {
  country: string;
  tradition: string;
}

const associations: Association[] = [
  { country: 'France', tradition: 'La Petite Souris' },
  { country: 'États-Unis', tradition: 'The Tooth Fairy' },
  { country: 'Espagne', tradition: 'El Ratoncito Pérez' },
  { country: 'Allemagne', tradition: 'La Zahnfee' },
  { country: 'Italie', tradition: 'La Fatina dei Denti' },
  { country: 'Japon', tradition: 'Shigatsu-san' },
];

export const AssociationGame: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [currentPair, setCurrentPair] = useState<Association | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * associations.length);
    const pair = associations[randomIndex];
    setCurrentPair(pair);

    const allTraditions = associations.map(a => a.tradition);
    const correctOption = pair.tradition;
    const shuffledOptions = [correctOption];

    while (shuffledOptions.length < 3) {
      const randomOption = allTraditions[Math.floor(Math.random() * allTraditions.length)];
      if (!shuffledOptions.includes(randomOption)) {
        shuffledOptions.push(randomOption);
      }
    }

    setOptions(shuffledOptions.sort(() => Math.random() - 0.5));
    setSelectedOption(null);
    setMessage('');
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    if (!currentPair) return;

    if (option === currentPair.tradition) {
      setScore(score + 20);
      setMessage('Bravo ! Tu as gagné 20 CROQ Credits !');
      onWin(20);
    } else {
      setMessage(`Dommage ! La bonne réponse était : ${currentPair.tradition}`);
    }
  };

  return (
    <Card title="Le Jeu des Associations" subtitle="Associe le pays à sa tradition dentaire">
      {!currentPair ? (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={startGame}>Commencer le jeu</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-center font-bold">{currentPair.country}</p>
          <p className="text-center text-sm">Quelle est sa tradition dentaire ?</p>
          <div className="flex flex-col gap-2">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleSelect(option)}
                variant={selectedOption === option ? (option === currentPair.tradition ? 'accent' : 'secondary') : 'primary'}
                disabled={selectedOption !== null}
              >
                {option}
              </Button>
            ))}
          </div>
          {message && <p className="text-center mt-2">{message}</p>}
          <Button onClick={startGame} className="mt-4">
            Nouvelle question
          </Button>
        </div>
      )}
      {score > 0 && <p className="text-center mt-2">Score : {score} CROQ</p>}
    </Card>
  );
};