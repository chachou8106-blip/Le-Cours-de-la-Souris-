import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

// Numéros de loterie (1 à 50)
const numbers = Array.from({ length: 50 }, (_, i) => i + 1);

export const LotteryGame: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [winningNumbers, setWinningNumbers] = useState<number[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (winningNumbers.length > 0 && selectedNumbers.length === 5) {
      const matches = selectedNumbers.filter(num => winningNumbers.includes(num)).length;
      let reward = 0;
      let newMessage = '';

      if (matches === 5) {
        reward = 500;
        newMessage = 'Félicitations ! Tu as gagné 500 CROQ Credits avec un JACKPOT !';
      } else if (matches === 4) {
        reward = 100;
        newMessage = `Félicitations ! 4 numéros correspondants : +100 CROQ Credits`;
      } else if (matches === 3) {
        reward = 50;
        newMessage = `3 numéros correspondants : +50 CROQ Credits`;
      } else if (matches === 2) {
        reward = 10;
        newMessage = `2 numéros correspondants : +10 CROQ Credits`;
      } else {
        newMessage = 'Dommage, réessaye la prochaine fois !';
      }

      setMessage(newMessage);
      if (reward > 0) {
        onWin(reward);
      }
    }
  }, [winningNumbers, selectedNumbers, onWin]);

  const selectNumber = (num: number) => {
    if (selectedNumbers.length >= 5 || isPlaying) return;
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else {
      setSelectedNumbers([...selectedNumbers, num]);
    }
  };

  const playLottery = () => {
    if (selectedNumbers.length !== 5) {
      setMessage('Veuillez sélectionner 5 numéros.');
      return;
    }

    setIsPlaying(true);
    // Générer 5 numéros gagnants aléatoires
    const winning = [];
    while (winning.length < 5) {
      const randomNum = Math.floor(Math.random() * 50) + 1;
      if (!winning.includes(randomNum)) {
        winning.push(randomNum);
      }
    }
    setWinningNumbers(winning);
  };

  const resetGame = () => {
    setSelectedNumbers([]);
    setWinningNumbers([]);
    setMessage('');
    setIsPlaying(false);
  };

  return (
    <Card title="La Loterie de la Souris" subtitle="Sélectionne 5 numéros pour gagner !">
      {!isPlaying ? (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-10 gap-1">
            {numbers.map(num => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                  selectedNumbers.includes(num)
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--light)] border border-[var(--primary)]'
                }`}
                onClick={() => selectNumber(num)}
              >
                {num}
              </div>
            ))}
          </div>
          <p>Numéros sélectionnés : {selectedNumbers.length}/5</p>
          <Button onClick={playLottery} disabled={selectedNumbers.length !== 5}>
            Jouer (Coût : 10 CROQ)
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="font-bold">Numéros gagnants :</p>
          <div className="flex gap-2">
            {winningNumbers.map(num => (
              <div key={num} className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                {num}
              </div>
            ))}
          </div>
          {message && <p className="text-center">{message}</p>}
          <Button onClick={resetGame} className="mt-2">
            Rejouer
          </Button>
        </div>
      )}
    </Card>
  );
};