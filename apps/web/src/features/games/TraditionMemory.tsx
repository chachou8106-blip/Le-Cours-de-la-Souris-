import React, { useState, useEffect } from 'react';
import { Button, Card } from '../../components/ui';

const traditions = [
  { id: 1, name: 'La Petite Souris', country: 'FR', image: '🇫🇷' },
  { id: 2, name: 'The Tooth Fairy', country: 'US', image: '🇺🇸' },
  { id: 3, name: 'El Ratoncito Pérez', country: 'ES', image: '🇪🇸' },
  { id: 4, name: 'La Zahnfee', country: 'DE', image: '🇩🇪' },
  { id: 5, name: 'Shigatsu-san', country: 'JP', image: '🇯🇵' },
  { id: 6, name: 'La Fée des Dents', country: 'CA', image: '🇨🇦' },
];

interface TraditionMemoryProps {
  onWin: (reward: number) => void;
}

export const TraditionMemory: React.FC<TraditionMemoryProps> = ({ onWin }) => {
  const [cards, setCards] = useState<Array<{ id: number; name: string; country: string; image: string; flipped: boolean; matched: boolean }>>([]);
  const [firstCard, setFirstCard] = useState<number | null>(null);
  const [secondCard, setSecondCard] = useState<number | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [pairsFound, setPairsFound] = useState<number>(0);

  useEffect(() => {
    const shuffledCards = [...traditions, ...traditions]
      .sort(() => Math.random() - 0.5)
      .map((tradition) => ({ ...tradition, flipped: false, matched: false }));
    setCards(shuffledCards);
    setMoves(0);
    setPairsFound(0);
  }, []);

  useEffect(() => {
    if (firstCard !== null && secondCard !== null) {
      const timer = setTimeout(() => {
        if (cards[firstCard].name === cards[secondCard].name) {
          const newCards = [...cards];
          newCards[firstCard].matched = true;
          newCards[secondCard].matched = true;
          setCards(newCards);
          setPairsFound(pairsFound + 1);
          if (pairsFound + 1 === traditions.length) {
            onWin(50); // Récompense pour avoir trouvé toutes les paires
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
    <Card title="Memory des Traditions" subtitle="Trouve les paires de traditions !">
      <p className="mb-4">Trouve toutes les paires pour gagner 50 CROQ Credits !</p>
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
              <span className="text-2xl">{card.image}</span>
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