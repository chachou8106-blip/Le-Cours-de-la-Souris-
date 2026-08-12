import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

const currencies = [
  { id: 1, code: 'EUR', symbol: '€', name: 'Euro' },
  { id: 2, code: 'USD', symbol: '$', name: 'Dollar' },
  { id: 3, code: 'GBP', symbol: '£', name: 'Livre' },
  { id: 4, code: 'JPY', symbol: '¥', name: 'Yen' },
  { id: 5, code: 'CAD', symbol: 'C$', name: 'Dollar Canadien' },
  { id: 6, code: 'AUD', symbol: 'A$', name: 'Dollar Australien' },
];

interface CurrencyMemoryProps {
  onWin: (reward: number) => void;
}

export const CurrencyMemory: React.FC<CurrencyMemoryProps> = ({ onWin }) => {
  const [cards, setCards] = useState<Array<{ id: number; code: string; symbol: string; name: string; flipped: boolean; matched: boolean }>>([]);
  const [firstCard, setFirstCard] = useState<number | null>(null);
  const [secondCard, setSecondCard] = useState<number | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [pairsFound, setPairsFound] = useState<number>(0);

  useEffect(() => {
    const shuffledCards = [...currencies, ...currencies]
      .sort(() => Math.random() - 0.5)
      .map((currency) => ({ ...currency, flipped: false, matched: false }));
    setCards(shuffledCards);
    setMoves(0);
    setPairsFound(0);
  }, []);

  useEffect(() => {
    if (firstCard !== null && secondCard !== null) {
      const timer = setTimeout(() => {
        if (cards[firstCard].code === cards[secondCard].code) {
          const newCards = [...cards];
          newCards[firstCard].matched = true;
          newCards[secondCard].matched = true;
          setCards(newCards);
          setPairsFound(pairsFound + 1);
          if (pairsFound + 1 === currencies.length) {
            onWin(40);
          }
        } else {
          const newCards = [...cards];
          newCards[firstCard].flipped = false;
          newCards[secondCard].flipped = false;
          setCards(newCards);
        }
        setFirstCard(null);
        setSecondCard(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [firstCard, secondCard, pairsFound, onWin, cards]);

  const handleCardClick = (index: number) => {
    if (cards[index].flipped || cards[index].matched || firstCard !== null && secondCard !== null) {
      return;
    }

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    if (firstCard === null) {
      setFirstCard(index);
    } else {
      setSecondCard(index);
      setMoves(moves + 1);
    }
  };

  return (
    <Card title="Memory des Devises" subtitle="Trouve les paires de devises !">
      <p className="mb-4">Trouve toutes les paires pour gagner 40 CROQ Credits !</p>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(index)}
            className={`w-16 h-16 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
              card.flipped || card.matched ? 'bg-[var(--light)]' : 'bg-[var(--primary)]'
            } ${card.matched ? 'opacity-50' : ''}`}
          >
            {card.flipped || card.matched ? (
              <span className="text-2xl">{card.symbol}</span>
            ) : (
              <span className="text-2xl">❓</span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4">Coups : {moves}</p>
    </Card>
  );
};