import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

interface CardType {
  id: number;
  name: string;
  matched: boolean;
}

const traditions = [
  { id: 1, name: 'La Petite Souris', country: 'FR' },
  { id: 2, name: 'The Tooth Fairy', country: 'US' },
  { id: 3, name: 'El Ratoncito Pérez', country: 'ES' },
  { id: 4, name: 'La Zahnfee', country: 'DE' },
  { id: 5, name: 'La Fatina dei Denti', country: 'IT' },
  { id: 6, name: 'Shigatsu-san', country: 'JP' },
];

export const TraditionMemory: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    // Créer des paires de cartes
    const pairs = [...traditions, ...traditions].map((trad, index) => ({
      id: index,
      name: trad.name,
      matched: false,
    }));
    // Mélanger les cartes
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const flipCard = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].matched || flippedIndices.includes(index)) return;

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    setMoves(moves + 1);

    if (newFlippedIndices.length === 2) {
      const [first, second] = newFlippedIndices;
      if (cards[first].name === cards[second].name) {
        const newCards = [...cards];
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setScore(score + 10);
        if (newCards.filter(card => !card.matched).length === 0) {
          onWin(score + 50); // Bonus pour avoir terminé
        }
      } else {
        setTimeout(() => setFlippedIndices([]), 1000);
      }
    }
  };

  const resetGame = () => {
    const pairs = [...traditions, ...traditions].map((trad, index) => ({
      id: index,
      name: trad.name,
      matched: false,
    }));
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMoves(0);
    setScore(0);
  };

  return (
    <Card title="Memory des Traditions" subtitle="Trouve les paires de traditions !">
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
            {(flippedIndices.includes(index) || card.matched) && card.name}
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