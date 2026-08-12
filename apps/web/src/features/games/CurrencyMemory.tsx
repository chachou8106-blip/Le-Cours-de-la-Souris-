import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

interface CurrencyCard {
  id: number;
  code: string;
  symbol: string;
  matched: boolean;
}

const currencies = [
  { code: 'EUR', symbol: '€' },
  { code: 'USD', symbol: '$' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'AUD', symbol: 'A$' },
];

export const CurrencyMemory: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [cards, setCards] = useState<CurrencyCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const pairs = [...currencies, ...currencies].map((curr, index) => ({
      id: index,
      code: curr.code,
      symbol: curr.symbol,
      matched: false,
    }));
    setCards(pairs.sort(() => Math.random() - 0.5));
  }, []);

  const flipCard = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].matched || flippedIndices.includes(index)) return;

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    setMoves(moves + 1);

    if (newFlippedIndices.length === 2) {
      const [first, second] = newFlippedIndices;
      if (cards[first].code === cards[second].code) {
        const newCards = [...cards];
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setScore(score + 15);
        if (newCards.filter(card => !card.matched).length === 0) {
          onWin(score + 50);
        }
      } else {
        setTimeout(() => setFlippedIndices([]), 1000);
      }
    }
  };

  const resetGame = () => {
    const pairs = [...currencies, ...currencies].map((curr, index) => ({
      id: index,
      code: curr.code,
      symbol: curr.symbol,
      matched: false,
    }));
    setCards(pairs.sort(() => Math.random() - 0.5));
    setFlippedIndices([]);
    setMoves(0);
    setScore(0);
  };

  return (
    <Card title="Memory des Devises" subtitle="Trouve les paires de devises !">
      <div className="grid grid-cols-4 gap-2 mb-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`h-16 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
              flippedIndices.includes(index) || card.matched
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--light)] border border-[var(--primary)]'
            }`}
            onClick={() => flipCard(index)}
          >
            {(flippedIndices.includes(index) || card.matched) && card.symbol}
          </div>
        ))}
      </div>
      <p className="mb-2">Mouvements : {moves} | Score : {score}</p>
      <Button onClick={resetGame} className="w-full">
        Recommencer
      </Button>
    </Card>
  );
};