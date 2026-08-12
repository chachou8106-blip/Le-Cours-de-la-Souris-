import React from 'react';
import { Card } from '../../components/ui';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';

// Données de démonstration pour l'indice mondial communautaire
const globalCommunityIndexData = {
  currentValue: 5.50,
  previousValue: 5.25,
  change: '+0.25',
  changePercentage: '+4.76%',
  countries: 45,
  reports: 1250,
  lastUpdated: '12 août 2026',
};

// Données de démonstration pour les top pays (communautaire)
const topCommunityCountries = [
  { iso2: 'US', name: 'États-Unis', value: 7.50, currency: 'USD', reports: 320 },
  { iso2: 'FR', name: 'France', value: 5.50, currency: 'EUR', reports: 280 },
  { iso2: 'GB', name: 'Royaume-Uni', value: 4.75, currency: 'GBP', reports: 210 },
  { iso2: 'DE', name: 'Allemagne', value: 6.00, currency: 'EUR', reports: 190 },
  { iso2: 'JP', name: 'Japon', value: 800, currency: 'JPY', reports: 150 },
];

// Données de démonstration pour les top pays (officiel)
const topOfficialCountries = [
  { iso2: 'US', name: 'États-Unis', value: 150.00, currency: 'USD' },
  { iso2: 'GB', name: 'Royaume-Uni', value: 80.00, currency: 'GBP' },
  { iso2: 'AU', name: 'Australie', value: 180.00, currency: 'AUD' },
  { iso2: 'FR', name: 'France', value: 50.00, currency: 'EUR' },
  { iso2: 'DE', name: 'Allemagne', value: 60.00, currency: 'EUR' },
];

export const IndexPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">📊 Indice Mondial du Cours de la Souris</h1>
      <p className="text-lg mb-8">
        Découvrez l'**indice communautaire** des montants laissés par la Petite Souris dans le monde, 
        calculé à partir des **déclarations validées** des utilisateurs.
      </p>

      {/* Cours communautaire */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card title="🌍 Cours Communautaire" subtitle="Indice mondial des montants déclarés">
          <p className="text-4xl font-bold text-[var(--primary)] mb-2">
            {formatCurrency(globalCommunityIndexData.currentValue, 'EUR')}
          </p>
          <p className={`text-${globalCommunityIndexData.change.startsWith('+') ? 'green' : 'red'}-600 mb-4`}>
            {globalCommunityIndexData.change} ({globalCommunityIndexData.changePercentage})
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Pays couverts :</strong> {globalCommunityIndexData.countries}</p>
              <p><strong>Déclarations :</strong> {globalCommunityIndexData.reports}</p>
            </div>
            <div>
              <p><strong>Confiance :</strong> ⭐⭐⭐⭐☆ (85%)</p>
              <p><strong>Mise à jour :</strong> {globalCommunityIndexData.lastUpdated}</p>
            </div>
          </div>
          <p className="text-xs text-[var(--secondary)] mt-4">
            *Médiane pondérée des montants déclarés, ajustée par PPA.
          </p>
        </Card>

        <Card title="🏛️ Cours Officiel" subtitle="Coût moyen d'une extraction dentaire">
          <p className="mb-2">
            Comparez avec le **coût réel** d'une extraction dentaire chez un professionnel.
          </p>
          <p className="text-sm text-[var(--secondary)] mb-4">
            Ces données proviennent des **associations dentaires nationales** et des ministères de la santé.
          </p>
          <Link to="/official-rates" className="text-[var(--primary)] hover:underline">
            Voir les tarifs officiels →
          </Link>
        </Card>
      </div>

      {/* Top pays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="🏆 Top 5 Pays (Communautaire)">
          <ol className="list-decimal pl-5">
            {topCommunityCountries.map((country) => (
              <li key={country.iso2} className="mb-1">
                {country.name} : {formatCurrency(country.value, country.currency)} ({country.reports} déclarations)
              </li>
            ))}
          </ol>
          <p className="text-xs text-[var(--secondary)] mt-2">
            *Classement basé sur le montant médian déclaré.
          </p>
        </Card>

        <Card title="🏛️ Top 5 Pays (Officiel)">
          <ol className="list-decimal pl-5">
            {topOfficialCountries.map((country) => (
              <li key={country.iso2} className="mb-1">
                {country.name} : {formatCurrency(country.value, country.currency)}
              </li>
            ))}
          </ol>
          <p className="text-xs text-[var(--secondary)] mt-2">
            *Classement basé sur le coût moyen d'une extraction dentaire.
          </p>
        </Card>
      </div>

      {/* Graphique (simulé) */}
      <Card title="📈 Évolution de l'Indice Communautaire" className="mb-8">
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-[var(--secondary)]">
            Graphique d'évolution sur 12 mois (à intégrer avec Recharts).
          </p>
        </div>
      </Card>

      {/* Comparaison */}
      <Card title="🔍 Comparaison : Officiel vs. Communautaire" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">🏛️ Officiel (Extraction Dentaire)</h4>
            <p>Coût moyen d'une extraction dentaire chez un dentiste.</p>
            <p className="text-sm text-[var(--secondary)]">Source : Associations dentaires nationales.</p>
            <p className="text-sm text-[var(--secondary)]">Exemple : ~50€ en France, ~150$ aux États-Unis.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">🦷 Communautaire (Petite Souris)</h4>
            <p>Montant moyen laissé par la Petite Souris (déclarations utilisateurs).</p>
            <p className="text-sm text-[var(--secondary)]">Source : Déclarations anonymes validées.</p>
            <p className="text-sm text-[var(--secondary)]">Exemple : ~5€ en France, ~7$ aux États-Unis.</p>
          </div>
        </div>
        <p className="mt-4 text-center text-sm">
          <strong>Note :</strong> Ces deux valeurs ne sont pas directement comparables, mais elles offrent une perspective intéressante 
          sur les **traditions** (Petite Souris) et les **réalités économiques** (coût dentaire).
        </p>
      </Card>

      {/* Méthodologie */}
      <Card title="🔬 Méthodologie">
        <p className="mb-2">
          L'**indice communautaire** est calculé à partir de :
        </p>
        <ul className="list-disc pl-5 text-sm">
          <li><strong>Médiane</strong> des montants déclarés par pays.</li>
          <li><strong>Pondération par PPA</strong> (Parité de Pouvoir d'Achat) pour éviter les biais des devises fortes.</li>
          <li><strong>Plafond à 20%</strong> par pays pour éviter la domination des grands pays.</li>
          <li><strong>Filtrage</strong> des déclarations aberrantes (seuils configurables).</li>
        </ul>
        <p className="mt-2 text-sm">
          <Link to="/methodology" className="text-[var(--primary)] hover:underline">
            En savoir plus sur la méthodologie →
          </Link>
        </p>
      </Card>

      {/* Avertissement */}
      <Card title="⚠️ Avertissement" className="mb-8">
        <p className="text-sm">
          <strong>Le Cours de la Souris</strong> est un **indice communautaire** et non un cours officiel. 
          Les données sont basées sur des **déclarations anonymes** et peuvent varier selon les régions et les traditions.
          <br /><br />
          Les **tarifs officiels** (extraction dentaire) proviennent de sources publiques et sont mis à jour régulièrement.
          <br /><br />
          <strong>Aucune garantie</strong> n'est fournie sur l'exactitude ou l'exhaustivité des données.
        </p>
      </Card>
    </div>
  );
};