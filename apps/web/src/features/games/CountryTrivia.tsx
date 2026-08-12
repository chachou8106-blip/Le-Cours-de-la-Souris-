import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';
import { useCountries } from '../../hooks/useCountries';

interface CountryTriviaProps {
  onWin: (reward: number) => void;
}

export const CountryTrivia: React.FC<CountryTriviaProps> = ({ onWin }) => {
  const { countries } = useCountries();
  const [currentCountry, setCurrentCountry] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const startGame = () => {
    if (countries.length === 0) return;

    const randomIndex = Math.floor(Math.random() * countries.length);
    const country = countries[randomIndex];
    setCurrentCountry(country.iso2);

    // Générer 3 options aléatoires (1 correcte, 2 incorrectes)
    const allOptions = countries.map(c => c.name_fr);
    const correctOption = country.name_fr;
    const shuffledOptions = [correctOption];

    while (shuffledOptions.length < 3) {
      const randomOption = allOptions[Math.floor(Math.random() * allOptions.length)];
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
    const country = countries.find(c => c.iso2 === currentCountry);
    if (!country) return;

    if (option === country.name_fr) {
      setScore(score + 20);
      setMessage('Bravo ! Tu as gagné 20 CROQ Credits !');
      onWin(20);
    } else {
      setMessage(`Dommage ! La bonne réponse était : ${country.name_fr}`);
    }
  };

  return (
    <Card title="Trivia des Pays" subtitle="Devine le pays à partir de sa tradition dentaire">
      {!currentCountry ? (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={startGame}>Commencer le jeu</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-center">Quel est ce pays ?</p>
          <div className="flex flex-col gap-2">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleSelect(option)}
                variant={selectedOption === option ? (option === countries.find(c => c.iso2 === currentCountry)?.name_fr ? 'accent' : 'secondary') : 'primary'}
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