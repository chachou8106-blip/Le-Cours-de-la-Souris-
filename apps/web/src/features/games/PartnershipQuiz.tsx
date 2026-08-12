import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  sponsor: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Quel est le sponsor du jeu 'Devine le Montant' ?",
    options: ["Colgate", "Oral-B", "Amazon", "Lego"],
    correctAnswer: 2,
    sponsor: "Amazon",
  },
  {
    id: 2,
    question: "Quelle marque sponsorise le 'Quizz Dentaire' ?",
    options: ["Colgate", "Oral-B", "Disney", "Pampers"],
    correctAnswer: 0,
    sponsor: "Colgate",
  },
  {
    id: 3,
    question: "Quel partenaire propose des brosses à dents pour enfants ?",
    options: ["Nike", "Oral-B", "Adidas", "Samsung"],
    correctAnswer: 1,
    sponsor: "Oral-B",
  },
];

export const PartnershipQuiz: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 25);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
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
    <Card title="Le Quiz des Partenariats" subtitle={`Sponsorisé par ${questions[currentQuestion]?.sponsor || 'nos partenaires'}`}>
      {isFinished ? (
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-xl font-bold">Score : {score} CROQ</h3>
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