import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Quel est le nom de la Petite Souris en Espagne ?",
    options: ["La Petite Souris", "El Ratoncito Pérez", "La Fée des Dents", "Tooth Fairy"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Combien de dents de lait un enfant a-t-il en général ?",
    options: ["16", "20", "24", "28"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "À quel âge les enfants commencent-ils à perdre leurs dents de lait ?",
    options: ["3 ans", "5 ans", "6 ans", "8 ans"],
    correctAnswer: 2,
  },
];

interface DentalQuizProps {
  onWin: (reward: number) => void;
}

export const DentalQuiz: React.FC<DentalQuizProps> = ({ onWin }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setIsFinished(true);
      onWin(score * 10);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <Card title="Quizz Dentaire" subtitle="Teste tes connaissances sur les dents !">
      {isFinished ? (
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-xl font-bold">Score : {score} / {questions.length}</h3>
          <p>Tu as gagné {score * 10} CROQ Credits !</p>
          <Button onClick={restartGame}>Recommencer</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">{questions[currentQuestion].question}</h3>
          <div className="flex flex-col gap-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                variant={selectedAnswer === index ? (index === questions[currentQuestion].correctAnswer ? 'accent' : 'secondary') : 'primary'}
                disabled={selectedAnswer !== null}
              >
                {option}
              </Button>
            ))}
          </div>
          {selectedAnswer !== null && (
            <Button onClick={nextQuestion} className="mt-4">
              {currentQuestion < questions.length - 1 ? 'Suivant' : 'Terminer'}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};