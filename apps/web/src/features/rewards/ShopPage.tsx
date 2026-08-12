import React, { useState } from 'react';
import { Card, Button, Badge } from '../../components/ui';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';

// Types pour les articles de la boutique
export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'cosmetic' | 'premium' | 'lottery' | 'badge';
  image: string;
  stock: number;
  featured: boolean;
}

// Données de démonstration pour la boutique
const shopItems: ShopItem[] = [
  {
    id: 'skin_golden_mouse',
    name: 'Skin Souris Dorée',
    description: 'Un design élégant en or pour votre profil de souris.',
    price: 50,
    category: 'cosmetic',
    image: '🐭',
    stock: 100,
    featured: true,
  },
  {
    id: 'skin_silver_mouse',
    name: 'Skin Souris Argentée',
    description: 'Un design élégant en argent pour votre profil.',
    price: 40,
    category: 'cosmetic',
    image: '🐭',
    stock: 100,
    featured: false,
  },
  {
    id: 'hat_magician',
    name: 'Chapeau de Magicien',
    description: 'Un chapeau magique pour votre souris.',
    price: 30,
    category: 'cosmetic',
    image: '🎩',
    stock: 50,
    featured: true,
  },
  {
    id: 'hat_crown',
    name: 'Couronne Royale',
    description: 'Une couronne pour votre souris royale.',
    price: 70,
    category: 'cosmetic',
    image: '👑',
    stock: 30,
    featured: false,
  },
  {
    id: 'sword_gold',
    name: 'Épée en Or',
    description: 'Une épée légendaire pour votre collection.',
    price: 100,
    category: 'cosmetic',
    image: '⚔️',
    stock: 20,
    featured: true,
  },
  {
    id: 'shield_mouse',
    name: 'Bouclier de la Souris',
    description: 'Un bouclier pour protéger vos CROQ Credits.',
    price: 70,
    category: 'cosmetic',
    image: '🛡️',
    stock: 25,
    featured: false,
  },
  {
    id: 'cape_invisible',
    name: 'Cape Invisible',
    description: 'Devenez invisible aux yeux des autres joueurs.',
    price: 200,
    category: 'cosmetic',
    image: '👗',
    stock: 10,
    featured: true,
  },
  {
    id: 'guide_premium',
    name: 'Guide Premium : Traditions Dentaires',
    description: 'Un guide complet sur les traditions dentaires dans le monde (PDF).',
    price: 50,
    category: 'premium',
    image: '📖',
    stock: -1, // Illimité
    featured: true,
  },
  {
    id: 'analysis_advanced',
    name: 'Analyse Avancée',
    description: 'Accès aux statistiques avancées et aux tendances pendant 1 mois.',
    price: 100,
    category: 'premium',
    image: '📊',
    stock: -1,
    featured: true,
  },
  {
    id: 'lottery_ticket_daily',
    name: 'Ticket de Loterie Quotidienne',
    description: 'Participez à la loterie quotidienne pour gagner jusqu\'à 500 CROQ !',
    price: 10,
    category: 'lottery',
    image: '🎟️',
    stock: -1,
    featured: true,
  },
  {
    id: 'lottery_ticket_weekly',
    name: 'Ticket de Loterie Hebdomadaire',
    description: 'Participez à la loterie hebdomadaire pour gagner jusqu\'à 2000 CROQ !',
    price: 50,
    category: 'lottery',
    image: '🎟️',
    stock: -1,
    featured: false,
  },
];

// Données de démonstration pour le panier
export interface CartItem {
  item: ShopItem;
  quantity: number;
}

export const ShopPage: React.FC = () => {
  const [userBalance, setUserBalance] = useState<number>(250);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cosmetic' | 'premium' | 'lottery'>('all');

  const addToCart = (item: ShopItem) => {
    if (item.stock > 0 || item.stock === -1) {
      setCart(prev => {
        const existingItem = prev.find(i => i.item.id === item.id);
        if (existingItem) {
          return prev.map(i =>
            i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { item, quantity: 1 }];
      });
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(i => i.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(prev =>
        prev.map(i =>
          i.item.id === itemId ? { ...i, quantity } : i
        )
      );
    }
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  };

  const checkout = () => {
    const total = getTotal();
    if (total > userBalance) {
      alert('Solde insuffisant !');
      return;
    }
    setUserBalance(userBalance - total);
    setCart([]);
    alert(`Achat effectué avec succès ! Vous avez dépensé ${total} CROQ.`);
  };

  const filteredItems = selectedCategory === 'all'
    ? shopItems
    : shopItems.filter(item => item.category === selectedCategory);

  const featuredItems = shopItems.filter(item => item.featured);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🛒 Boutique CROQ</h1>
      <p className="text-lg mb-8">
        Utilisez vos CROQ Credits pour acheter des **cosmétiques**, des **contenus premium**, 
        ou des **tickets de loterie** !
      </p>

      {/* Solde */}
      <Card title="💰 Votre Solde" className="mb-8">
        <p className="text-4xl font-bold text-[var(--primary)] text-center">
          {userBalance} CROQ
        </p>
        <p className="text-center text-sm text-[var(--secondary)] mt-2">
          Utilisez vos crédits pour acheter des articles dans la boutique.
        </p>
      </Card>

      {/* Catégories */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
          onClick={() => setSelectedCategory('all')}
        >
          Toutes
        </Button>
        <Button
          variant={selectedCategory === 'cosmetic' ? 'primary' : 'secondary'}
          onClick={() => setSelectedCategory('cosmetic')}
        >
          Cosmétiques
        </Button>
        <Button
          variant={selectedCategory === 'premium' ? 'primary' : 'secondary'}
          onClick={() => setSelectedCategory('premium')}
        >
          Premium
        </Button>
        <Button
          variant={selectedCategory === 'lottery' ? 'primary' : 'secondary'}
          onClick={() => setSelectedCategory('lottery')}
        >
          Loteries
        </Button>
      </div>

      {/* Articles en vedette */}
      <h2 className="text-2xl font-bold mb-4">⭐ Articles en Vedette</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {featuredItems.map(item => (
          <Card key={item.id} title={item.name} subtitle={formatCurrency(item.price, 'CROQ')}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{item.image}</span>
              <div>
                <p className="text-sm">{item.description}</p>
                <Badge variant={item.category === 'cosmetic' ? 'primary' : item.category === 'premium' ? 'accent' : 'secondary'}>
                  {item.category}
                </Badge>
                {item.stock > 0 && item.stock <= 10 && (
                  <Badge variant="error" className="ml-2">
                    {item.stock} restants
                  </Badge>
                )}
              </div>
            </div>
            <Button onClick={() => addToCart(item)} className="w-full">
              Ajouter au panier
            </Button>
          </Card>
        ))}
      </div>

      {/* Tous les articles */}
      <h2 className="text-2xl font-bold mb-4">📦 Tous les Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredItems.map(item => (
          <Card key={item.id} title={item.name} subtitle={formatCurrency(item.price, 'CROQ')}>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{item.image}</span>
              <div>
                <p className="text-sm">{item.description}</p>
                <Badge variant={item.category === 'cosmetic' ? 'primary' : item.category === 'premium' ? 'accent' : 'secondary'}>
                  {item.category}
                </Badge>
                {item.stock > 0 && item.stock <= 10 && (
                  <Badge variant="error" className="ml-2">
                    {item.stock} restants
                  </Badge>
                )}
                {item.stock === 0 && (
                  <Badge variant="error" className="ml-2">
                    Rupture de stock
                  </Badge>
                )}
              </div>
            </div>
            {item.stock > 0 || item.stock === -1 ? (
              <Button onClick={() => addToCart(item)} className="w-full">
                Ajouter au panier
              </Button>
            ) : (
              <Button disabled className="w-full">
                Rupture de stock
              </Button>
            )}
          </Card>
        ))}
      </div>

      {/* Panier */}
      {cart.length > 0 && (
        <Card title="🛒 Votre Panier" className="mb-8">
          <div className="overflow-x-auto mb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--primary)]">
                  <th className="text-left p-2">Article</th>
                  <th className="text-right p-2">Prix</th>
                  <th className="text-center p-2">Quantité</th>
                  <th className="text-right p-2">Total</th>
                  <th className="text-center p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.item.id} className="border-b border-gray-200">
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <span>{item.item.image}</span>
                        <span>{item.item.name}</span>
                      </div>
                    </td>
                    <td className="p-2 text-right">{item.item.price} CROQ</td>
                    <td className="p-2 text-center">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateQuantity(item.item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          size="sm"
                          onClick={() => updateQuantity(item.item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td className="p-2 text-right">{item.item.price * item.quantity} CROQ</td>
                    <td className="p-2 text-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => removeFromCart(item.item.id)}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Total : {getTotal()} CROQ</p>
            <Button onClick={checkout} disabled={getTotal() > userBalance}>
              Payer
            </Button>
          </div>
        </Card>
      )}

      {/* Comment gagner plus de CROQ */}
      <Card title="💡 Comment gagner plus de CROQ Credits ?" className="mb-8">
        <p className="mb-4">
          Voici comment accumuler des CROQ Credits pour acheter plus d'articles :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-2">🎮 Jeux :</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Devine le Montant : +5 à 50 CROQ</li>
              <li>Quizz Dentaire : +10 à 30 CROQ</li>
              <li>Chasse aux Dents : +1 à 100 CROQ</li>
              <li>La Roue de la Souris : +5 à 200 CROQ</li>
              <li>Loterie : Jusqu'à +500 CROQ</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">📝 Contributions :</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Déclaration validée : +10 à 50 CROQ</li>
              <li>Modération de contenu : +20 à 100 CROQ</li>
              <li>Traduction : +50 à 200 CROQ</li>
              <li>Signalement de bug : +10 à 50 CROQ</li>
              <li>Connexion quotidienne : +5 CROQ</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-center">
          <Link to="/games" className="text-[var(--primary)] hover:underline">
            Jouer maintenant →
          </Link>
        </p>
      </Card>

      {/* Avertissement */}
      <Card title="⚠️ Avertissement" className="mb-8">
        <p className="text-sm text-red-600">
          <strong>Les CROQ Credits ne sont pas une cryptomonnaie.</strong> Ils n'ont aucune valeur monétaire 
          et ne peuvent être ni achetés ni vendus. Ils sont uniquement utilisables dans cette application 
          pour des récompenses virtuelles.
        </p>
        <p className="text-sm text-[var(--secondary)] mt-2">
          Pour en savoir plus, consultez notre 
          <Link to="/legal/token-disclaimer" className="text-[var(--primary)] hover:underline">
            avertissement complet
          </Link>.
        </p>
      </Card>
    </div>
  );
};