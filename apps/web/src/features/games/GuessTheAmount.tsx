import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';
import { useCountries } from '../../hooks/useCountries';

interface GuessTheAmountProps {
  onWin: (reward: number) => void;
}

export const GuessTheAmount: React.FC<GuessTheAmountProps> = ({ onWin }) => {
  const { countries } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [guess, setGuess] = useState<number | ''>('');
  const [message, setMessage] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const startGame = () => {
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    setSelectedCountry(randomCountry.iso2);
    setIsPlaying(true);
    setMessage('');
    setGuess('');
  };

  const handleGuess = () => {
    if (guess === '' || !selectedCountry) return;

    const country = countries.find(c => c.iso2 === selectedCountry);
    if (!country) return;

    const actualAmount = 5;
    const difference = Math.abs(Number(guess) - actualAmount);

    if (difference === 0) {
      setMessage(`🎉 Bravo ! Le montant exact était ${actualAmount}€. Tu as gagné 50 CROQ Credits !`);
      onWin(50);
    } else if (difference <= 1) {
      setMessage(`👍 Presque ! Le montant était ${actualAmount}€. Tu as gagné 20 CROQ Credits.`);
      onWin(20);
    } else if (difference <= 2) {
      setMessage(`😊 Pas mal ! Le montant était ${actualAmount}€. Tu as gagné 10 CROQ Credits.`);
      onWin(10);
    } else {
      setMessage(`❌ Dommage ! Le montant était ${actualAmount}€. Réessaye !`);
    }

    setIsPlaying(false);
  };

  return (
    <Card title="Devine le Montant" subtitle="Trouve le montant médian pour ce pays">
      {!isPlaying ? (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={startGame}>Commencer le jeu</Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p>Devine le montant pour : {selectedCountry && countries.find(c => c.iso2 === selectedCountry)?.name}</p>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(Number(e.target.value) || '')}
            className="p-2 border border-gray-300 rounded"
            placeholder="Montant en €"
          />
          <Button onClick={handleGuess}>Valider</Button>
        </div>
      )}
      {message && <p className="mt-4 text-center">{message}</p>}
    </Card>
  );
};