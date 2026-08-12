import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

const words = ['SOURIS', 'DENT', 'PIÈCE', 'CROQ', 'JEU', 'PAYS', 'TRADITION', 'ENFANT'];

export const HangmanGame: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [word, setWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const startGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters([]);
    setMistakes(0);
    setMessage('');
  };

  const guessLetter = (letter: string) => {
    if (guessedLetters.includes(letter) || mistakes >= 6) return;

    setGuessedLetters([...guessedLetters, letter]);

    if (!word.includes(letter)) {
      setMistakes(mistakes + 1);
      if (mistakes + 1 >= 6) {
        setMessage(`Perdu ! Le mot était : ${word}.`);
      }
    } else {
      if (word.split('').every(l => guessedLetters.includes(l) || l === letter)) {
        setMessage('Félicitations ! Tu as gagné 30 CROQ Credits !');
        onWin(30);
      }
    }
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <Card title="Le Jeu du Pendu (Version Souris)" subtitle="Devine le mot avant que la souris ne soit pendue !">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2 text-2xl font-bold">
          {word.split('').map((letter, index) => (
            <span key={index} className="min-w-[24px] text-center">
              {guessedLetters.includes(letter) ? letter : '_'}
            </span>
          ))}
        </div>

        <div className="h-24 w-24 relative">
          {/* Dessin du pendu */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Potence */}
            <line x1="10" y1="90" x2="30" y2="90" stroke="black" strokeWidth="2" />
            <line x1="20" y1="90" x2="20" y2="10" stroke="black" strokeWidth="2" />
            <line x1="20" y1="10" x2="60" y2="10" stroke="black" strokeWidth="2" />
            <line x1="60" y1="10" x2="60" y2="20" stroke="black" strokeWidth="2" />

            {/* Tête */}
            {mistakes >= 1 && <circle cx="60" cy="30" r="10" stroke="black" strokeWidth="2" fill="transparent" />}
            {/* Corps */}
            {mistakes >= 2 && <line x1="60" y1="40" x2="60" y2="60" stroke="black" strokeWidth="2" />}
            {/* Bras gauche */}
            {mistakes >= 3 && <line x1="60" y1="50" x2="50" y2="55" stroke="black" strokeWidth="2" />}
            {/* Bras droit */}
            {mistakes >= 4 && <line x1="60" y1="50" x2="70" y2="55" stroke="black" strokeWidth="2" />}
            {/* Jambe gauche */}
            {mistakes >= 5 && <line x1="60" y1="60" x2="50" y2="75" stroke="black" strokeWidth="2" />}
            {/* Jambe droite */}
            {mistakes >= 6 && <line x1="60" y1="60" x2="70" y2="75" stroke="black" strokeWidth="2" />}
          </svg>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {alphabet.map(letter => (
            <Button
              key={letter}
              onClick={() => guessLetter(letter)}
              disabled={guessedLetters.includes(letter) || mistakes >= 6}
              size="sm"
            >
              {letter}
            </Button>
          ))}
        </div>

        {message && <p className="text-center">{message}</p>}
        <Button onClick={startGame} className="mt-2">
          Nouveau mot
        </Button>
      </div>
    </Card>
  );
};