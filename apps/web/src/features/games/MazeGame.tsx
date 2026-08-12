import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

// Grille du labyrinthe (0 = chemin, 1 = mur, 2 = départ, 3 = arrivée)
const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 3, 1, 1, 1, 1, 1, 1, 1, 1],
];

const CELL_SIZE = 40;

export const MazeGame: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [playerPos, setPlayerPos] = useState<{ x: number; y: number }>({ x: 1, y: 1 }); // Position de départ
  const [hasWon, setHasWon] = useState<boolean>(false);

  useEffect(() => {
    if (hasWon) {
      onWin(50);
    }
  }, [hasWon, onWin]);

  const movePlayer = (dx: number, dy: number) => {
    if (hasWon) return;
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    // Vérifier si la nouvelle position est valide (pas un mur et dans les limites)
    if (
      newX >= 0 && newX < maze[0].length &&
      newY >= 0 && newY < maze.length &&
      maze[newY][newX] !== 1
    ) {
      setPlayerPos({ x: newX, y: newY });
      if (maze[newY][newX] === 3) {
        setHasWon(true);
      }
    }
  };

  const resetGame = () => {
    setPlayerPos({ x: 1, y: 1 });
    setHasWon(false);
  };

  return (
    <Card title="Le Labyrinthe de la Souris" subtitle="Trouve la sortie !">
      <div className="flex flex-col items-center gap-4">
        <div
          className="border-2 border-[var(--primary)] rounded-lg overflow-hidden"
          style={{ width: maze[0].length * CELL_SIZE, height: maze.length * CELL_SIZE }}
        >
          {maze.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className={`w-[${CELL_SIZE}px] h-[${CELL_SIZE}px] flex items-center justify-center`}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor:
                    cell === 1 ? '#3a3a3a' :
                    cell === 2 ? '#0F6E56' :
                    cell === 3 ? '#FFD700' :
                    '#f7f3ec',
                }}
              >
                {playerPos.x === x && playerPos.y === y && '🐭'}
                {cell === 3 && !hasWon && '🧀'}
              </div>
            ))
          )}
        </div>
        {hasWon ? (
          <p className="text-xl font-bold text-green-600">Félicitations ! Tu as trouvé la sortie !</p>
        ) : (
          <div className="flex gap-2">
            <Button onClick={() => movePlayer(0, -1)}>↑</Button>
            <div className="flex flex-col gap-2">
              <Button onClick={() => movePlayer(-1, 0)}>←</Button>
              <Button onClick={() => movePlayer(1, 0)}>→</Button>
            </div>
            <Button onClick={() => movePlayer(0, 1)}>↓</Button>
          </div>
        )}
        <Button onClick={resetGame} className="mt-2">
          Recommencer
        </Button>
      </div>
    </Card>
  );
};