import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

const words = ['SOURIS', 'DENT', 'CROQ', 'JEU', 'ENFANT', 'PARENT', 'TRADITION', 'MONNAIE'];

interface HangmanGameProps {
  onWin: (reward: number) => void;
}

export const HangmanGame: React.FC<HangmanGameProps> = ({ onWin }) => {
  const [word, setWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const maxIncorrectGuesses = 6;

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setIncorrectGuesses(0);
    setGameOver(false);
    setHasWon(false);
  }, []);

  useEffect(() => {
    if (incorrectGuesses >= maxIncorrectGuesses) {
      setGameOver(true);
    }
  }, [incorrectGuesses]);

  useEffect(() => {
    const allLettersGuessed = word.split('').every((letter) => guessedLetters.includes(letter));
    if (allLettersGuessed) {
      setHasWon(true);
      setGameOver(true);
      onWin(25);
    }
  }, [guessedLetters, word, onWin]);

  const handleGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || gameOver) return;

    setGuessedLetters([...guessedLetters, letter]);
    if (!word.includes(letter)) {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
  };

  const restartGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setGuessedLetters([]);
    setIncorrectGuesses(0);
    setGameOver(false);
    setHasWon(false);
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const renderHangman = () => {
    const stages = [
      '  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========',
      '  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========',
      '  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========',
      '  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========',
      '  +---+\n  |   |\n  O   |\n /|\  |\n      |\n      |\n=========',
      '  +---+\n  |   |\n  O   |\n /|\  |\n /    |\n      |\n=========',
      '  +---+\n  |   |\n  O   |\n /|\  |\n / \  |\n      |\n=========',
    ];
    return <pre className="text-xs text-[var(--secondary)]">{stages[incorrectGuesses]}</pre>;
  };

  return (
    <Card title="Le Jeu du Pendu (Version Souris)" subtitle="Devine le mot !">
      <div className="flex flex-col items-center gap-4">
        {renderHangman()}
        <div className="flex gap-2 flex-wrap justify-center">
          {word.split('').map((letter, index) => (
            <span key={index} className="text-2xl font-bold">
              {guessedLetters.includes(letter) ? letter : '_'}
            </span>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap justify-center">
          {alphabet.map((letter) => (
            <Button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter) || gameOver}
              className="w-8 h-8 p-0"
            >
              {letter}
            </Button>
          ))}
        </div>
        {gameOver && (
          <div className="mt-4 text-center">
            {hasWon ? (
              <p className="text-green-600 font-bold">Félicitations ! Tu as deviné le mot : {word}</p>
            ) : (
              <p className="text-red-600 font-bold">Désolé, tu as perdu ! Le mot était : {word}</p>
            )}
            <Button onClick={restartGame} className="mt-2">
              Rejouer
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};