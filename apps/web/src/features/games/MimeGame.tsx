import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

const mimeWords = [
  'SOURIS', 'DENT', 'PIÈCE', 'CROQ', 'JOUER', 'PAYS', 'TRADITION', 'ENFANT', 'PETITE', 'OR'
];

// Emojis pour représenter les mots (simulation)
const emojiMap: Record<string, string> = {
  SOURIS: '🐭',
  DENT: '🦷',
  PIÈCE: '🪙',
  CROQ: '💰',
  JOUER: '🎮',
  PAYS: '🌍',
  TRADITION: '🎭',
  ENFANT: '👶',
  PETITE: '👧',
  OR: '🟡',
};

export const MimeGame: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [currentWord, setCurrentWord] = useState<string>('');
  const [guessedWord, setGuessedWord] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        setIsPlaying(false);
        setMessage(`Temps écoulé ! Le mot était : ${currentWord}`);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft, currentWord]);

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * mimeWords.length);
    setCurrentWord(mimeWords[randomIndex]);
    setGuessedWord('');
    setTimeLeft(30);
    setIsPlaying(true);
    setMessage('');
  };

  const handleGuess = () => {
    if (guessedWord.toUpperCase() === currentWord) {
      setIsPlaying(false);
      setMessage('Bravo ! Tu as gagné 40 CROQ Credits !');
      onWin(40);
    } else {
      setMessage('Essaie encore !');
    }
  };

  return (
    <Card title="Le Jeu des Mimes" subtitle={`Temps restant : ${timeLeft}s`}>
      {!isPlaying ? (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={startGame}>Commencer le jeu</Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl mb-4">
            {emojiMap[currentWord] || '❓'}
          </div>
          <p className="text-center mb-2">Devine le mot mimé :</p>
          <input
            type="text"
            value={guessedWord}
            onChange={(e) => setGuessedWord(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
            placeholder="Ton guess"
          />
          <Button onClick={handleGuess} className="w-full">
            Valider
          </Button>
          {message && <p className="text-center">{message}</p>}
        </div>
      )}
    </Card>
  );
};