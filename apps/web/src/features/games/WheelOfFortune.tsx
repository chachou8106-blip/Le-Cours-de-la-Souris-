import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

interface WheelOfFortuneProps {
  onWin: (reward: number) => void;
}

const prizes = [
  { id: 1, label: '5 CROQ', value: 5, color: '#8B7D6B' },
  { id: 2, label: '10 CROQ', value: 10, color: '#0F6E56' },
  { id: 3, label: '20 CROQ', value: 20, color: '#FFD700' },
  { id: 4, label: '50 CROQ', value: 50, color: '#ef4444' },
  { id: 5, label: '100 CROQ', value: 100, color: '#3a3a3a' },
  { id: 6, label: 'Perdu !', value: 0, color: '#f7f3ec' },
];

export const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({ onWin }) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [result, setResult] = useState<{ label: string; value: number } | null>(null);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    // Simulation du spin (durée : 3 secondes)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * prizes.length);
      const prize = prizes[randomIndex];
      setResult(prize);
      setIsSpinning(false);
      if (prize.value > 0) {
        onWin(prize.value);
      }
    }, 3000);
  };

  return (
    <Card title="La Roue de la Souris" subtitle="Tourne pour gagner des CROQ Credits !">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-64 h-64">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            style={{ transform: isSpinning ? 'rotate(3600deg)' : 'rotate(0deg)', transition: 'transform 3s ease-out' }}
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke="#0F6E56" strokeWidth="2" />
            {prizes.map((prize, index) => {
              const angle = (index * 360) / prizes.length;
              const nextAngle = ((index + 1) * 360) / prizes.length;
              const largeArcFlag = nextAngle - angle <= 180 ? 0 : 1;
              const x1 = 50 + 40 * Math.cos((angle * Math.PI) / 180);
              const y1 = 50 + 40 * Math.sin((angle * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos((nextAngle * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin((nextAngle * Math.PI) / 180);
              return (
                <path
                  key={prize.id}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={prize.color}
                  stroke="#fff"
                  strokeWidth="1"
                />
              );
            })}
            <circle cx="50" cy="50" r="5" fill="#0F6E56" />
          </svg>
          {!isSpinning && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center text-white cursor-pointer" onClick={spinWheel}>
              ▶
            </div>
          )}
        </div>
        {result && (
          <p className="text-xl font-bold mt-4">
            {result.value > 0 ? `Félicitations ! Tu as gagné ${result.label} !` : 'Dommage, réessaye !'}
          </p>
        )}
        <Button onClick={spinWheel} disabled={isSpinning} className="mt-4">
          {isSpinning ? 'En cours...' : 'Tourner la roue'}
        </Button>
      </div>
    </Card>
  );
};