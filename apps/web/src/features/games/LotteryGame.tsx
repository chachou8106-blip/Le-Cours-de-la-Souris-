import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

interface LotteryGameProps {
  onWin: (reward: number) => void;
}

export const LotteryGame: React.FC<LotteryGameProps> = ({ onWin }) => {
  const [tickets, setTickets] = useState<number>(0);
  const [hasWon, setHasWon] = useState<boolean>(false);
  const [winningNumber, setWinningNumber] = useState<number | null>(null);
  const [userNumber, setUserNumber] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Générer un numéro gagnant aléatoire entre 1 et 100
  const drawWinningNumber = () => {
    setIsDrawing(true);
    setHasWon(false);
    
    const timer = setTimeout(() => {
      const winningNum = Math.floor(Math.random() * 100) + 1;
      setWinningNumber(winningNum);
      setIsDrawing(false);
      
      if (userNumber === winningNum) {
        setHasWon(true);
        onWin(500); // Gros lot pour le gagnant
      }
    }, 3000);

    return () => clearTimeout(timer);
  };

  const buyTicket = () => {
    if (tickets >= 5) {
      alert("Tu as déjà 5 tickets !");
      return;
    }
    setTickets(tickets + 1);
    if (userNumber === null) {
      setUserNumber(Math.floor(Math.random() * 100) + 1);
    }
  };

  const startLottery = () => {
    if (tickets === 0) {
      alert("Achète au moins un ticket pour participer !");
      return;
    }
    drawWinningNumber();
  };

  return (
    <Card title="La Loterie de la Souris" subtitle="Gagne jusqu'à 500 CROQ Credits !">
      <div className="flex flex-col items-center gap-4">
        <p>Tickets achetés : {tickets}/5</p>
        {userNumber && <p>Ton numéro : {userNumber}</p>}
        
        <div className="flex gap-2">
          <Button onClick={buyTicket} disabled={tickets >= 5}>
            Acheter un ticket (10 CROQ)
          </Button>
          <Button onClick={startLottery} disabled={tickets === 0 || isDrawing}>
            {isDrawing ? 'Tirage en cours...' : 'Lancer le tirage'}
          </Button>
        </div>

        {winningNumber !== null && (
          <div className="mt-4 p-4 bg-[var(--light)] rounded-lg">
            <p className="font-bold">Numéro gagnant : {winningNumber}</p>
            {hasWon ? (
              <p className="text-green-600 font-bold">Félicitations ! Tu as gagné 500 CROQ Credits !</p>
            ) : (
              <p className="text-[var(--secondary)]">Désolé, ce n'était pas ton numéro. Réessaye !</p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};