import React, { useState } from 'react';
import { Button, Card } from '../../components/ui';

interface Item {
  id: number;
  name: string;
  price: number;
  owned: boolean;
}

const marketItems: Item[] = [
  { id: 1, name: 'Chapeau de Souris', price: 50, owned: false },
  { id: 2, name: 'Cape Magique', price: 100, owned: false },
  { id: 3, name: 'Épée en Or', price: 200, owned: false },
  { id: 4, name: 'Bouclier', price: 150, owned: false },
  { id: 5, name: 'Potion de Chance', price: 75, owned: false },
];

interface MarketGameProps {
  onWin: (reward: number) => void;
}

export const MarketGame: React.FC<MarketGameProps> = ({ onWin }) => {
  const [items, setItems] = useState<Item[]>(marketItems);
  const [balance, setBalance] = useState<number>(500); // Solde initial de 500 CROQ Credits

  const buyItem = (id: number) => {
    const item = items.find((i) => i.id === id);
    if (!item || item.owned || balance < item.price) return;

    const newItems = items.map((i) =>
      i.id === id ? { ...i, owned: true } : i
    );
    setItems(newItems);
    setBalance(balance - item.price);
  };

  const sellItem = (id: number) => {
    const item = items.find((i) => i.id === id);
    if (!item || !item.owned) return;

    const newItems = items.map((i) =>
      i.id === id ? { ...i, owned: false } : i
    );
    setItems(newItems);
    setBalance(balance + Math.floor(item.price * 0.8)); // Vendre à 80% du prix
  };

  return (
    <Card title="Le Marché de la Souris" subtitle={`Solde : ${balance} CROQ Credits`}>
      <p className="mb-4">Achète et vends des objets pour gérer ton portefeuille !</p>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <div key={item.id} className="border border-[var(--primary)] p-2 rounded-lg">
            <p className="font-bold">{item.name}</p>
            <p>Prix : {item.price} CROQ</p>
            <p>Statut : {item.owned ? 'Possédé' : 'Disponible'}</p>
            <div className="flex gap-2 mt-2">
              {!item.owned ? (
                <Button onClick={() => buyItem(item.id)} disabled={balance < item.price}>
                  Acheter
                </Button>
              ) : (
                <Button onClick={() => sellItem(item.id)}>
                  Vendre
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button onClick={() => onWin(balance)} className="mt-4">
        Encaisse tes gains
      </Button>
    </Card>
  );
};