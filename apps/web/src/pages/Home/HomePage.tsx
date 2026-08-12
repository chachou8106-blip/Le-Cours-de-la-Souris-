import React from 'react';
import { Card } from '../../components/ui';
import { DailyHumor } from '../../features/daily-humor/DailyHumor';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">🦷 Le Cours de la Souris</h1>
        <p className="text-xl text-[var(--secondary)]">
          L’indice mondial communautaire des dents de lait.
        </p>
        <p className="text-lg mt-2">
          Découvrez, déclarez, jouez et gagnez des CROQ Credits !
        </p>
      </div>

      <DailyHumor />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="📊 Indice Mondial" subtitle="Cours communautaire">
          <p>Consultez les montants moyens laissés par la Petite Souris dans le monde.</p>
          <Link to="/index" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            Voir l'indice →
          </Link>
        </Card>

        <Card title="🏛️ Cours Officiel" subtitle="Extraction dentaire">
          <p>Découvrez le coût officiel d'une extraction dentaire par pays.</p>
          <Link to="/official-rates" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            Voir les tarifs →
          </Link>
        </Card>

        <Card title="🌍 Pays" subtitle="Traditions et montants">
          <p>Explorez les traditions et les montants par pays.</p>
          <Link to="/countries" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            Voir les pays →
          </Link>
        </Card>

        <Card title="📝 Déclarer" subtitle="Contribuer">
          <p>Aidez-nous en déclarant un montant pour la Petite Souris.</p>
          <Link to="/reports" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            Faire une déclaration →
          </Link>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="🎮 Mini-Jeux" subtitle="20 jeux pour gagner des CROQ">
          <p>Jouez à nos 20 mini-jeux pour gagner des CROQ Credits !</p>
          <Link to="/games" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            Jouer maintenant →
          </Link>
        </Card>

        <Card title="🪙 CROQ Credits" subtitle="Récompenses et économie">
          <p>Découvrez comment gagner et utiliser des CROQ Credits.</p>
          <Link to="/croq" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            En savoir plus →
          </Link>
        </Card>
      </div>

      <Card title="🤝 Partenariats" className="mb-8">
        <p className="mb-2">Découvrez nos partenaires :</p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-[var(--light)] border border-[var(--primary)] px-3 py-1 rounded-full text-sm">
            Amazon (zencheztoi-21)
          </span>
          <span className="bg-[var(--light)] border border-[var(--primary)] px-3 py-1 rounded-full text-sm">
            Colgate
          </span>
          <span className="bg-[var(--light)] border border-[var(--primary)] px-3 py-1 rounded-full text-sm">
            Oral-B
          </span>
          <span className="bg-[var(--light)] border border-[var(--primary)] px-3 py-1 rounded-full text-sm">
            Lego
          </span>
        </div>
      </Card>

      <Card title="⚠️ Avertissement" className="mb-8">
        <p className="text-sm">
          <strong>Le Cours de la Souris</strong> est une application **familiale et éducative**. 
          Les CROQ Credits ne sont **pas une cryptomonnaie** et n'ont **aucune valeur monétaire**. 
          Les données affichées sont **à titre indicatif uniquement**.
          <br /><br />
          <strong>Deux types de cours sont disponibles :</strong>
          <ul className="list-disc pl-5 mt-2">
            <li><strong>Cours Officiel</strong> : Coût réel d'une extraction dentaire (sources : associations dentaires).</li>
            <li><strong>Cours Communautaire</strong> : Montants déclarés par les utilisateurs pour la Petite Souris.</li>
          </ul>
        </p>
      </Card>
    </div>
  );
};