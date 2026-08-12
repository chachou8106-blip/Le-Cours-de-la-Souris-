import React from 'react';
import { Card } from '../../components/ui';
import { formatCurrency } from '../../utils/formatters';

export const IndexPage: React.FC = () => {
  // Données de démonstration pour l'indice mondial
  const globalIndexData = {
    currentValue: 5.50,
    previousValue: 5.25,
    change: '+0.25',
    changePercentage: '+4.76%',
    countries: 45,
    reports: 1250,
    lastUpdated: '12 août 2026',
  };

  // Données de démonstration pour les top pays
  const topCountries = [
    { iso2: 'US', name: 'États-Unis', value: 7.50, currency: 'USD' },
    { iso2: 'FR', name: 'France', value: 5.50, currency: 'EUR' },
    { iso2: 'GB', name: 'Royaume-Uni', value: 4.75, currency: 'GBP' },
    { iso2: 'DE', name: 'Allemagne', value: 6.00, currency: 'EUR' },
    { iso2: 'JP', name: 'Japon', value: 800, currency: 'JPY' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">📊 Indice Mondial</h1>
      <p className="text-lg mb-8">
        L'indice mondial du Cours de la Souris, calculé à partir des déclarations communautaires.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="🌍 Valeur Actuelle" subtitle="Cours de Référence de la Souris">
          <p className="text-4xl font-bold text-[var(--primary)]">
            {formatCurrency(globalIndexData.currentValue, 'EUR')}
          </p>
          <p className={`text-${globalIndexData.change.startsWith('+') ? 'green' : 'red'}-600`}>
            {globalIndexData.change} ({globalIndexData.changePercentage})
          </p>
          <p className="text-sm text-[var(--secondary)] mt-2">
            Mise à jour : {globalIndexData.lastUpdated}
          </p>
        </Card>

        <Card title="📈 Statistiques">
          <p>Pays couverts : {globalIndexData.countries}</p>
          <p>Déclarations : {globalIndexData.reports}</p>
          <p>Confiance : ⭐⭐⭐⭐☆ (85%)</p>
        </Card>

        <Card title="🏆 Top 5 Pays">
          <ol className="list-decimal pl-5">
            {topCountries.map((country) => (
              <li key={country.iso2} className="mb-1">
                {country.name} : {formatCurrency(country.value, country.currency)}
              </li>
            ))}
          </ol>
        </Card>
      </div>

      <Card title="📉 Évolution" className="mb-8">
        <p>Graphique d'évolution de l'indice sur les 12 derniers mois.</p>
        <div className="h-64 bg-gray-100 rounded-lg mt-4 flex items-center justify-center">
          <p className="text-[var(--secondary)]">Graphique à intégrer (Recharts)</p>
        </div>
      </Card>

      <Card title="🔍 Méthodologie">
        <p>
          L'indice est calculé à partir de la médiane des montants déclarés par pays,
          pondérés par la parité de pouvoir d'achat (PPA).
        </p>
        <a href="/methodology" className="text-[var(--primary)] hover:underline mt-2 inline-block">
          En savoir plus →
        </a>
      </Card>
    </div>
  );
};