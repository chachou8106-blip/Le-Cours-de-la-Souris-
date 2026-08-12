import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

// Génération d'un labyrinthe simple (5x5)
const generateMaze = () => {
  const size = 5;
  const maze = Array(size).fill().map(() => Array(size).fill(1));
  
  // Chemin de départ à l'arrivée (simplifié)
  for (let i = 0; i < size; i++) {
    maze[i][0] = 0; // Colonne de gauche ouverte
    maze[i][size - 1] = 0; // Colonne de droite ouverte
  }
  
  // Ajouter quelques murs aléatoires
  for (let i = 1; i < size - 1; i++) {
    for (let j = 1; j < size - 1; j++) {
      if (Math.random() > 0.7) {
        maze[i][j] = 1;
      } else {
        maze[i][j] = 0;
      }
    }
  }
  
  // Assurer un chemin de la gauche à la droite
  for (let i = 0; i < size; i++) {
    maze[Math.floor(size / 2)][i] = 0;
  }
  
  return maze;
};

interface MazeGameProps {
  onWin: (reward: number) => void;
}

export const MazeGame: React.FC<MazeGameProps> = ({ onWin }) => {
  const [maze, setMaze] = useState<number[][]>([]);
  const [playerPosition, setPlayerPosition] = useState<{ x: number; y: number }>({ x: 0, y: 2 });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  useEffect(() => {
    setMaze(generateMaze());
    setPlayerPosition({ x: 0, y: 2 });
    setHasWon(false);
  }, []);

  const startGame = () => {
    setMaze(generateMaze());
    setPlayerPosition({ x: 0, y: 2 });
    setIsPlaying(true);
    setHasWon(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isPlaying || hasWon) return;

    const newPosition = { ...playerPosition };
    switch (e.key) {
      case 'ArrowUp':
        newPosition.y -= 1;
        break;
      case 'ArrowDown':
        newPosition.y += 1;
        break;
      case 'ArrowRight':
        newPosition.x += 1;
        break;
      case 'ArrowLeft':
        newPosition.x -= 1;
        break;
      default:
        return;
    }

    // Vérifier si la nouvelle position est valide
    if (
      newPosition.x >= 0 && 
      newPosition.x < maze[0].length && 
      newPosition.y >= 0 && 
      newPosition.y < maze.length && 
      maze[newPosition.y][newPosition.x] === 0
    ) {
      setPlayerPosition(newPosition);
      
      // Vérifier si le joueur a atteint la fin
      if (newPosition.x === maze[0].length - 1) {
        setHasWon(true);
        setIsPlaying(false);
        onWin(30);
      }
    }
  };

  return (
    <Card title="Le Labyrinthe de la Souris" subtitle="Trouve la sortie !">
      {!isPlaying ? (
        <div className="flex flex-col items-center gap-4">
          <Button onClick={startGame}>Commencer le jeu</Button>
          <p>Utilise les flèches pour te déplacer.</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div
            className="grid grid-cols-5 gap-1 border-2 border-[var(--primary)] p-1"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {maze.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-8 h-8 flex items-center justify-center ${
                    cell === 1 ? 'bg-[var(--primary)]' : 'bg-[var(--light)]'
                  }`}
                >
                  {playerPosition.x === colIndex && playerPosition.y === rowIndex && (
                    <span>🐭</span>
                  )}
                  {colIndex === maze[0].length - 1 && rowIndex === playerPosition.y && (
                    <span>🧀</span>
                  )}
                </div>
              ))
            )}
          </div>
          {hasWon && <p className="text-green-600 font-bold">Félicitations ! Tu as gagné 30 CROQ Credits !</p>}
        </div>
      )}
    </Card>
  );
};