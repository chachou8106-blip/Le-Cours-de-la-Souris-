import React from 'react';
import { Card } from '../../components/ui';
import { DailyHumor } from '../../features/daily-humor';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🦷 Le Cours de la Souris</h1>
      <p className="text-lg mb-8">
        L’indice mondial communautaire des dents de lait. Découvrez, déclarez, jouez et gagnez des récompenses !
      </p>

      <DailyHumor />

      {/* Section Cours Officiels et Communautaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="🏥 Cours Officiels" subtitle="Tarifs des actes dentaires">
          <p className="mb-4">
            Découvrez les tarifs officiels des extractions dentaires dans le monde, sourcés auprès des ministères et associations.
          </p>
          <Link to="/official-rates" className="text-[var(--primary)] hover:underline font-bold">
            Voir les tarifs officiels →
          </Link>
        </Card>

        <Card title="🌍 Cours Communautaire" subtitle="Montants laissés par la Petite Souris">
          <p className="mb-4">
            Consultez les montants moyens déclarés par les utilisateurs pour chaque pays.
          </p>
          <Link to="/community-rates" className="text-[var(--primary)] hover:underline font-bold">
            Voir les cours communautaires →
          </Link>
        </Card>
      </div>

      {/* Section Indice Mondial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="📊 Indice Mondial" subtitle="Cours de Référence de la Souris">
          <p className="mb-4">
            L'indice mondial qui combine les données officielles et communautaires pour un cours de référence.
          </p>
          <Link to="/index" className="text-[var(--primary)] hover:underline font-bold">
            Voir l'indice mondial →
          </Link>
        </Card>

        <Card title="💰 CROQ Credits" subtitle="Gagne et utilise tes crédits">
          <p className="mb-4">
            Participe aux jeux, déclare des montants, et gagne des CROQ Credits pour acheter des récompenses.
          </p>
          <Link to="/croq" className="text-[var(--primary)] hover:underline font-bold">
            En savoir plus →
          </Link>
        </Card>
      </div>

      {/* Section Jeux */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">🎮 Mini-Jeux</h2>
        <p className="mb-4">Joue à nos 20 mini-jeux pour gagner des CROQ Credits !</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card title="Devine le Montant" subtitle="Gagne jusqu'à 50 CROQ">
            <Link to="/games" className="text-[var(--primary)] hover:underline">
              Jouer →
            </Link>
          </Card>
          <Card title="Quizz Dentaire" subtitle="Gagne jusqu'à 30 CROQ">
            <Link to="/games" className="text-[var(--primary)] hover:underline">
              Jouer →
            </Link>
          </Card>
          <Card title="Chasse aux Dents" subtitle="Gagne jusqu'à 100 CROQ">
            <Link to="/games" className="text-[var(--primary)] hover:underline">
              Jouer →
            </Link>
          </Card>
        </div>
        <Link to="/games" className="text-[var(--primary)] hover:underline mt-4 inline-block">
          Voir tous les jeux →
        </Link>
      </div>

      {/* Section Récompenses */}
      <Card title="🎁 Récompenses" subtitle="Boutique et loteries" className="mb-8">
        <p className="mb-4">
          Utilise tes CROQ Credits pour acheter des cosmétiques, participer à des loteries, ou débloquer des contenus premium.
        </p>
        <Link to="/rewards" className="text-[var(--primary)] hover:underline font-bold">
          Voir la boutique →
        </Link>
      </Card>

      {/* Section Partenariats */}
      <Card title="🤝 Partenariats" subtitle="Collaborations">
        <p className="mb-4">
          Nous collaborons avec des marques comme <strong>Colgate</strong>, <strong>Oral-B</strong>, et <strong>Amazon</strong> pour t'offrir le meilleur contenu.
        </p>
        <p className="text-sm text-[var(--secondary)]">
          Code d'affiliation Amazon : <code className="bg-gray-200 p-1 rounded">zencheztoi-21</code>
        </p>
      </Card>

      {/* Avertissement */}
      <Card title="⚠️ Avertissement" className="mt-8">
        <p className="text-[var(--secondary)]">
          Les CROQ Credits <strong>ne sont pas une cryptomonnaie</strong> et n'ont <strong>aucune valeur monétaire</strong>.
          Ils ne peuvent être ni achetés ni vendus, et ne donnent droit à aucune promesse de rendement.
        </p>
      </Card>
    </div>
  );
};