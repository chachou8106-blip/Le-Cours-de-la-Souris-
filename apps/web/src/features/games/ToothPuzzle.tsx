import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

// Image de dent découpée en 9 morceaux (3x3)
const puzzlePieces = [
  { id: 1, row: 0, col: 0, correctPos: { row: 0, col: 0 } },
  { id: 2, row: 0, col: 1, correctPos: { row: 0, col: 1 } },
  { id: 3, row: 0, col: 2, correctPos: { row: 0, col: 2 } },
  { id: 4, row: 1, col: 0, correctPos: { row: 1, col: 0 } },
  { id: 5, row: 1, col: 1, correctPos: { row: 1, col: 1 } },
  { id: 6, row: 1, col: 2, correctPos: { row: 1, col: 2 } },
  { id: 7, row: 2, col: 0, correctPos: { row: 2, col: 0 } },
  { id: 8, row: 2, col: 1, correctPos: { row: 2, col: 1 } },
  { id: 9, row: 2, col: 2, correctPos: { row: 2, col: 2 } },
];

export const ToothPuzzle: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [pieces, setPieces] = useState(() => {
    // Mélanger les pièces au démarrage
    return puzzlePieces.sort(() => Math.random() - 0.5);
  });
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);

  const swapPieces = (index: number) => {
    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else {
      const newPieces = [...pieces];
      const temp = newPieces[selectedPiece];
      newPieces[selectedPiece] = newPieces[index];
      newPieces[index] = temp;
      setPieces(newPieces);
      setSelectedPiece(null);

      // Vérifier si le puzzle est terminé
      if (isPuzzleComplete(newPieces)) {
        onWin(30);
      }
    }
  };

  const isPuzzleComplete = (currentPieces: typeof pieces) => {
    return currentPieces.every((piece, index) => {
      const expectedPiece = puzzlePieces[index];
      return piece.id === expectedPiece.id;
    });
  };

  const resetGame = () => {
    setPieces(puzzlePieces.sort(() => Math.random() - 0.5));
    setSelectedPiece(null);
  };

  return (
    <Card title="Puzzle de la Dent" subtitle="Reconstitue l'image de la dent !">
      <div className="grid grid-cols-3 gap-1 mb-4">
        {pieces.map((piece, index) => (
          <div
            key={piece.id}
            className={`w-20 h-20 bg-[var(--primary)] rounded-lg flex items-center justify-center cursor-pointer transition-all ${
              selectedPiece === index ? 'ring-2 ring-yellow-400' : ''
            }`}
            onClick={() => swapPieces(index)}
          >
            <span className="text-white">{piece.id}</span>
          </div>
        ))}
      </div>
      <Button onClick={resetGame} className="w-full">
        Mélanger à nouveau
      </Button>
    </Card>
  );
};