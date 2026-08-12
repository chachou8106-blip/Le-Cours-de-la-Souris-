import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

interface PartnershipQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  partner: string;
}

const partnershipQuestions: PartnershipQuestion[] = [
  {
    id: 1,
    question: "Quel est le partenaire officiel pour les brosses à dents dans notre application ?",
    options: ["Colgate", "Oral-B", "Sensodyne", "Signal"],
    correctAnswer: 1,
    partner: "Oral-B",
  },
  {
    id: 2,
    question: "Quel code d'affiliation Amazon utilisons-nous ?",
    options: ["zencheztoi-20", "zencheztoi-21", "zencheztoi-22", "zencheztoi-23"],
    correctAnswer: 1,
    partner: "Amazon",
  },
  {
    id: 3,
    question: "Quel partenaire propose des jouets éducatifs pour les enfants ?",
    options: ["Lego", "Playmobil", "Mattel", "Hasbro"],
    correctAnswer: 0,
    partner: "Lego",
  },
  {
    id: 4,
    question: "Quel est le sponsor du jeu 'La Roue de la Souris' ?",
    options: ["Colgate", "Disney", "Amazon", "Oral-B"],
    correctAnswer: 2,
    partner: "Amazon",
  },
  {
    id: 5,
    question: "Quel partenaire nous aide à promouvoir l'hygiène bucco-dentaire ?",
    options: ["Colgate", "Lego", "Amazon", "Disney"],
    correctAnswer: 0,
    partner: "Colgate",
  },
];

interface PartnershipQuizProps {
  onWin: (reward: number) => void;
}

export const PartnershipQuiz: React.FC<PartnershipQuizProps> = ({ onWin }) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === partnershipQuestions[currentQuestion].correctAnswer) {
      setScore(score + 15);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < partnershipQuestions.length - 1) {
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
    <Card title="Le Quiz des Partenariats" subtitle="Teste tes connaissances sur nos partenaires !">
      {isFinished ? (
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-xl font-bold">Score : {score} / {partnershipQuestions.length}</h3>
          <p>Tu as gagné {score * 15} CROQ Credits !</p>
          <Button onClick={restartGame}>Recommencer</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium">{partnershipQuestions[currentQuestion].question}</h3>
          <div className="flex flex-col gap-2">
            {partnershipQuestions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(index)}
                variant={selectedAnswer === index ? (index === partnershipQuestions[currentQuestion].correctAnswer ? 'accent' : 'secondary') : 'primary'}
                disabled={selectedAnswer !== null}
              >
                {option}
              </Button>
            ))}
          </div>
          {selectedAnswer !== null && (
            <Button onClick={nextQuestion} className="mt-4">
              {currentQuestion < partnershipQuestions.length - 1 ? 'Suivant' : 'Terminer'}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};