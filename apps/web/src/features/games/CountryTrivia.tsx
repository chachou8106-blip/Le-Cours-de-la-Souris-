import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  country: string;
}

const triviaQuestions: TriviaQuestion[] = [
  {
    id: 1,
    question: "Quel pays a la tradition du 'Ratoncito Pérez' ?",
    options: ["Espagne", "France", "Mexique", "Italie"],
    correctAnswer: 0,
    country: "ES",
  },
  {
    id: 2,
    question: "Dans quel pays la Petite Souris laisse-t-elle le plus d'argent en moyenne ?",
    options: ["États-Unis", "France", "Japon", "Allemagne"],
    correctAnswer: 0,
    country: "US",
  },
  {
    id: 3,
    question: "Quel pays utilise la livre sterling pour les montants de la Petite Souris ?",
    options: ["Royaume-Uni", "Australie", "Canada", "Nouvelle-Zélande"],
    correctAnswer: 0,
    country: "GB",
  },
  {
    id: 4,
    question: "Quel est le nom de la Petite Souris au Japon ?",
    options: ["Shigatsu-san", "Tooth Fairy", "Kodomo no Ha", "Nezumi-san"],
    correctAnswer: 0,
    country: "JP",
  },
  {
    id: 5,
    question: "Dans quel pays la tradition de la Petite Souris est-elle la plus ancienne ?",
    options: ["Europe", "Asie", "Amérique", "Afrique"],
    correctAnswer: 0,
    country: "EU",
  },
];

interface CountryTriviaProps {
  onWin: (reward: number) => void;
}

export const CountryTrivia: React.FC<CountryTriviaProps> = ({ onWin }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === triviaQuestions[currentQuestion].correctAnswer) {
      setScore(score + 20);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < triviaQuestions.length - 1) {
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
    <Card title="Trivia des Pays" subtitle="Teste tes connaissances géographiques !">
      {isFinished ? (
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-xl font-bold">Score : {score} points</h3>
          <p>Tu as gagné {score} CROQ Credits !</p>
          <Button onClick={restartGame}>Recommencer</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">{triviaQuestions[currentQuestion].question}</h3>
          <div className="flex flex-col gap-2">
            {triviaQuestions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                variant={selectedAnswer === index ? (index === triviaQuestions[currentQuestion].correctAnswer ? 'accent' : 'secondary') : 'primary'}
                disabled={selectedAnswer !== null}
              >
                {option}
              </Button>
            ))}
          </div>
          {selectedAnswer !== null && (
            <Button onClick={nextQuestion} className="mt-4">
              {currentQuestion < triviaQuestions.length - 1 ? 'Suivant' : 'Terminer'}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};