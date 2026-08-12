import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

const wheelOptions = [
  { label: '10 CROQ', value: 10, color: '#0F6E56' },
  { label: '20 CROQ', value: 20, color: '#8B7D6B' },
  { label: '50 CROQ', value: 50, color: '#FFD700' },
  { label: '100 CROQ', value: 100, color: '#0F6E56' },
  { label: '5 CROQ', value: 5, color: '#8B7D6B' },
  { label: '30 CROQ', value: 30, color: '#FFD700' },
];

interface WheelOfFortuneProps {
  onWin: (reward: number) => void;
}

export const WheelOfFortune: React.FC<WheelOfFortuneProps> = ({ onWin }) => {
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * wheelOptions.length);
      const selectedOption = wheelOptions[randomIndex];
      setResult(selectedOption.label);
      onWin(selectedOption.value);
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <Card title="La Roue de la Souris" subtitle="Tourne pour gagner des CROQ !">
      <div className="flex flex-col items-center gap-4">
        <div
          className={`relative w-64 h-64 rounded-full border-8 border-[var(--primary)] flex items-center justify-center transition-transform duration-3000 ${
            isSpinning ? 'animate-spin' : ''
          }`}
          style={{
            background: `conic-gradient(
              ${wheelOptions.map((option, index) => `
                ${option.color} 0% ${(index + 1) * (100 / wheelOptions.length)}%
              `).join(', ')}
            )`,
          }}
        >
          {!isSpinning && result && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[var(--light)] p-4 rounded-lg shadow-lg">
                <p className="text-2xl font-bold text-[var(--primary)]">{result}</p>
              </div>
            </div>
          )}
          <div className="absolute top-0 left-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-[var(--primary)] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <Button onClick={spinWheel} disabled={isSpinning}>
          {isSpinning ? 'En cours...' : 'Tourner la roue'}
        </Button>
      </div>
    </Card>
  );
};