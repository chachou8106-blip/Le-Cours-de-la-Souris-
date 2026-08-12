import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

const mimeWords = ['SOURIS', 'DENT', 'CROQ', 'JOUER', 'GAGNER', 'ENFANT', 'PARENT', 'TRADITION'];

interface MimeGameProps {
  onWin: (reward: number) => void;
}

export const MimeGame: React.FC<MimeGameProps> = ({ onWin }) => {
  const [word, setWord] = useState<string>('');
  const [guessedWord, setGuessedWord] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        setIsPlaying(false);
        if (guessedWord.toUpperCase() === word) {
          setHasWon(true);
          onWin(20);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft, guessedWord, word, onWin]);

  const startGame = () => {
    setWord(mimeWords[Math.floor(Math.random() * mimeWords.length)]);
    setGuessedWord('');
    setTimeLeft(30);
    setIsPlaying(true);
    setHasWon(false);
  };

  const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuessedWord(e.target.value.toUpperCase());
  };

  return (
    <Card title="Le Jeu des Mimes" subtitle="Devine le mot mimé !">
      {!isPlaying ? (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={startGame}>Commencer le jeu</Button>
          <p>Tu as 30 secondes pour deviner le mot.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl">Mot à deviner : <span className="font-bold text-[var(--primary)]">???</span></p>
          <p>Temps restant : {timeLeft}s</p>
          <input
            type="text"
            value={guessedWord}
            onChange={handleGuessChange}
            placeholder="Entrez votre réponse"
            className="input"
          />
          <Button onClick={() => {
            if (guessedWord.toUpperCase() === word) {
              setHasWon(true);
              setIsPlaying(false);
              onWin(20);
            }
          }}>
            Valider
          </Button>
          {hasWon && <p className="text-green-600 font-bold">Félicitations ! Le mot était bien {word}.</p>}
        </div>
      )}
    </Card>
  );
};