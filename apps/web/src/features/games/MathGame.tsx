import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

interface MathQuestion {
  id: number;
  question: string;
  answer: number;
  options: number[];
}

const mathQuestions: MathQuestion[] = [
  {
    id: 1,
    question: "Si 1 dent = 5€, combien pour 3 dents ?",
    answer: 15,
    options: [10, 15, 20, 25],
  },
  {
    id: 2,
    question: "La Petite Souris laisse 2€ par dent. Combien pour 4 dents ?",
    answer: 8,
    options: [4, 6, 8, 10],
  },
  {
    id: 3,
    question: "Un enfant a 20 dents. S'il en perd la moitié, combien en perd-il ?",
    answer: 10,
    options: [5, 10, 15, 20],
  },
  {
    id: 4,
    question: "Si une dent vaut 3 CROQ Credits, combien valent 5 dents ?",
    answer: 15,
    options: [10, 12, 15, 18],
  },
  {
    id: 5,
    question: "La Petite Souris donne 10€ par dent. Combien pour 2 dents et demie ?",
    answer: 25,
    options: [20, 25, 30, 35],
  },
];

interface MathGameProps {
  onWin: (reward: number) => void;
}

export const MathGame: React.FC<MathGameProps> = ({ onWin }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    if (answer === mathQuestions[currentQuestion].answer) {
      setScore(score + 10);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < mathQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
      onWin(score);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <Card title="Le Jeu des Maths" subtitle="Résous les énigmes mathématiques !">
      {isFinished ? (
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-xl font-bold">Score : {score} / {mathQuestions.length}</h3>
          <p>Tu as gagné {score * 10} CROQ Credits !</p>
          <Button onClick={restartGame}>Recommencer</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">{mathQuestions[currentQuestion].question}</h3>
          <div className="flex flex-col gap-2">
            {mathQuestions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                variant={selectedAnswer === option ? (option === mathQuestions[currentQuestion].answer ? 'accent' : 'secondary') : 'primary'}
                disabled={selectedAnswer !== null}
              >
                {option}
              </Button>
            ))}
          </div>
          {selectedAnswer !== null && (
            <Button onClick={nextQuestion} className="mt-4">
              {currentQuestion < mathQuestions.length - 1 ? 'Suivant' : 'Terminer'}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};