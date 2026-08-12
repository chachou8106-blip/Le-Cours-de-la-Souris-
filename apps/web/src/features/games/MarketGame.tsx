import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

interface Item {
  id: number;
  name: string;
  price: number;
  owned: boolean;
}

const items: Item[] = [
  { id: 1, name: 'Skin Souris Dorée', price: 50, owned: false },
  { id: 2, name: 'Chapeau de Magicien', price: 30, owned: false },
  { id: 3, name: 'Épée en Or', price: 100, owned: false },
  { id: 4, name: 'Bouclier de la Souris', price: 70, owned: false },
  { id: 5, name: 'Cape Invisible', price: 200, owned: false },
];

export const MarketGame: React.FC<{ onWin: (reward: number) => void }> = ({ onWin }) => {
  const [userCredits, setUserCredits] = useState<number>(100);
  const [marketItems, setMarketItems] = useState<Item[]>(items);

  const buyItem = (id: number) => {
    const item = marketItems.find(i => i.id === id);
    if (!item || userCredits < item.price || item.owned) return;

    setUserCredits(userCredits - item.price);
    setMarketItems(marketItems.map(i =>
      i.id === id ? { ...i, owned: true } : i
    ));
    onWin(5); // Récompense pour l'achat
  };

  const sellItem = (id: number) => {
    const item = marketItems.find(i => i.id === id);
    if (!item || !item.owned) return;

    setUserCredits(userCredits + Math.floor(item.price * 0.8)); // 80% du prix
    setMarketItems(marketItems.map(i =>
      i.id === id ? { ...i, owned: false } : i
    ));
  };

  return (
    <Card title="Le Marché de la Souris" subtitle={`Crédits : ${userCredits}`}>
      <div className="grid grid-cols-2 gap-2">
        {marketItems.map(item => (
          <div key={item.id} className="border border-[var(--primary)] rounded-lg p-2">
            <p className="font-bold">{item.name}</p>
            <p>Prix : {item.price} CROQ</p>
            <div className="flex gap-2 mt-2">
              {!item.owned ? (
                <Button size="sm" onClick={() => buyItem(item.id)} disabled={userCredits < item.price}>
                  Acheter
                </Button>
              ) : (
                <Button size="sm" onClick={() => sellItem(item.id)} variant="secondary">
                  Vendre
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};