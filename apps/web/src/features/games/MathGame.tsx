import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

interface MathQuestion {
  id: number;
  question: string;
  answer: number;
}

const questions: MathQuestion[] = [
  { id: 1, question: 'Si 1 dent = 5€, combien pour 3 dents ?', answer: 15 },
  { id: 2, question: 'Si la Petite Souris donne 2€ par dent, combien pour 4 dents ?', answer: 8 },
  { id: 3, question: 'Un enfant a 20 dents. Si chaque dent vaut 3€, combien vaut son sourire ?', answer: 60 },
  { id: 4, question: 'La Petite Souris donne 10€ pour 2 dents. Combien pour 5 dents ?', answer: 25 },
  { id: 5, question: 'Si 1€ = 1.1$, combien de $ pour 5€ ?', answer: 5.5 },
];

export const MathGame: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [score, setScore] = useState<number>(0);

  const startGame = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setUserAnswer('');
    setMessage('');
  };

  const handleSubmit = () => {
    if (!currentQuestion || userAnswer === '') return;

    const answer = parseFloat(userAnswer);
    if (answer === currentQuestion.answer) {
      setScore(score + 30);
      setMessage('Bravo ! Tu as gagné 30 CROQ Credits !');
      onWin(30);
    } else {
      setMessage(`Dommage ! La bonne réponse était : ${currentQuestion.answer}`);
    }
  };

  return (
    <Card title="Le Jeu des Maths" subtitle="Résous les énigmes mathématiques !">
      {!currentQuestion ? (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={startGame}>Commencer le jeu</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-center font-bold">{currentQuestion.question}</p>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Ta réponse"
          />
          <Button onClick={handleSubmit}>Valider</Button>
          {message && <p className="text-center mt-2">{message}</p>}
          <Button onClick={startGame} className="mt-2">
            Nouvelle question
          </Button>
        </div>
      )}
      {score > 0 && <p className="text-center mt-2">Score : {score} CROQ</p>}
    </Card>
  );
};