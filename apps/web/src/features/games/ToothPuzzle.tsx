import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

// Image de dent découpée en 9 morceaux (3x3)
const toothPieces = [
  { id: 1, image: '🦷', position: 0 },
  { id: 2, image: '🦷', position: 1 },
  { id: 3, image: '🦷', position: 2 },
  { id: 4, image: '🦷', position: 3 },
  { id: 5, image: '🦷', position: 4 },
  { id: 6, image: '🦷', position: 5 },
  { id: 7, image: '🦷', position: 6 },
  { id: 8, image: '🦷', position: 7 },
  { id: 9, image: '', position: 8 }, // Case vide
];

interface ToothPuzzleProps {
  onWin: (reward: number) => void;
}

export const ToothPuzzle: React.FC<ToothPuzzleProps> = ({ onWin }) => {
  const [pieces, setPieces] = useState<{ id: number; image: string; position: number }[]>([]);
  const [moves, setMoves] = useState<number>(0);

  const initializeGame = () => {
    const shuffledPieces = [...toothPieces].sort(() => Math.random() - 0.5);
    setPieces(shuffledPieces);
    setMoves(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handlePieceClick = (index: number) => {
    const emptyIndex = pieces.findIndex((piece) => piece.image === '');
    
    // Vérifier si la pièce cliquée est adjacente à la case vide
    const rowDiff = Math.abs(Math.floor(index / 3) - Math.floor(emptyIndex / 3));
    const colDiff = Math.abs((index % 3) - (emptyIndex % 3));
    
    if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
      const newPieces = [...pieces];
      [newPieces[index], newPieces[emptyIndex]] = [newPieces[emptyIndex], newPieces[index]];
      setPieces(newPieces);
      setMoves(moves + 1);
      
      // Vérifier si le puzzle est résolu
      const isSolved = newPieces.every((piece, i) => {
        if (i === 8) return piece.image === '';
        return piece.id === i + 1;
      });
      
      if (isSolved) {
        onWin(25);
      }
    }
  };

  return (
    <Card title="Puzzle de la Dent" subtitle="Reconstitue l'image !">
      <div className="flex flex-col items-center gap-4">
        <div className="grid grid-cols-3 gap-1">
          {pieces.map((piece, index) => (
            <div
              key={piece.id}
              onClick={() => handlePieceClick(index)}
              className={`w-16 h-16 flex items-center justify-center bg-[var(--light)] border border-[var(--primary)] cursor-pointer ${
                piece.image === '' ? 'bg-transparent' : ''
              }`}
            >
              {piece.image}
            </div>
          ))}
        </div>
        <p>Coups : {moves}</p>
        <Button onClick={initializeGame}>Recommencer</Button>
      </div>
    </Card>
  );
};