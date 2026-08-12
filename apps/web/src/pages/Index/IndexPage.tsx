import React from 'react';
import { Card } from '../../components/ui';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';

// Données de démonstration pour l'indice mondial
const globalIndexData = {
  currentValue: 5.50,
  previousValue: 5.25,
  change: '+0.25',
  changePercentage: '+4.76%',
  countries: 45,
  reports: 12500,
  lastUpdated: '12 août 2026',
  confidence: 0.88,
};

// Données pour les top pays
const topCountries = [
  { iso2: 'US', name: 'États-Unis', value: 7.50, currency: 'USD', sampleSize: 2400, confidence: 0.95 },
  { iso2: 'FR', name: 'France', value: 5.50, currency: 'EUR', sampleSize: 1250, confidence: 0.92 },
  { iso2: 'GB', name: 'Royaume-Uni', value: 4.75, currency: 'GBP', sampleSize: 800, confidence: 0.88 },
  { iso2: 'DE', name: 'Allemagne', value: 6.00, currency: 'EUR', sampleSize: 950, confidence: 0.90 },
  { iso2: 'JP', name: 'Japon', value: 600, currency: 'JPY', sampleSize: 400, confidence: 0.78 },
];

// Données pour les bottom pays
const bottomCountries = [
  { iso2: 'BR', name: 'Brésil', value: 25.00, currency: 'BRL', sampleSize: 200, confidence: 0.70 },
  { iso2: 'AU', name: 'Australie', value: 8.00, currency: 'AUD', sampleSize: 300, confidence: 0.75 },
  { iso2: 'CA', name: 'Canada', value: 6.50, currency: 'CAD', sampleSize: 500, confidence: 0.80 },
  { iso2: 'ES', name: 'Espagne', value: 4.00, currency: 'EUR', sampleSize: 700, confidence: 0.85 },
  { iso2: 'IT', name: 'Italie', value: 5.00, currency: 'EUR', sampleSize: 600, confidence: 0.82 },
];

export const IndexPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">📊 Indice Mondial de la Petite Souris</h1>
      <p className="text-lg mb-8">
        L'indice mondial du Cours de la Souris, calculé à partir des déclarations communautaires et des données officielles.
      </p>

      {/* En-tête avec valeur principale */}
      <Card title="🌍 Cours de Référence de la Souris" className="mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-4xl font-bold text-[var(--primary)]">
              {formatCurrency(globalIndexData.currentValue, 'EUR')}
            </p>
            <p className="text-lg">
              <span className={`text-${globalIndexData.change.startsWith('+') ? 'green' : 'red'}-600`}>
                {globalIndexData.change} ({globalIndexData.changePercentage})
              </span>
            </p>
          </div>
          <div className="text-right">
            <p><strong>Pays couverts :</strong> {globalIndexData.countries}</p>
            <p><strong>Déclarations :</strong> {globalIndexData.reports.toLocaleString()}</p>
            <p><strong>Confiance :</strong> {(globalIndexData.confidence * 100).toFixed(0)}%</p>
            <p><strong>Dernière mise à jour :</strong> {globalIndexData.lastUpdated}</p>
          </div>
        </div>
      </Card>

      {/* Comparaison Officiel vs Communautaire */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card title="🏥 Tarifs Officiels (Extraction Dentaire)" subtitle="Source : Ministères et Associations">
          <p className="mb-4">
            Montants moyens pour une extraction dentaire simple, selon les données officielles.
          </p>
          <div className="space-y-2">
            {topCountries.slice(0, 3).map((country) => (
              <div key={country.iso2} className="flex justify-between">
                <span>{country.name}</span>
                <span className="font-bold">{formatCurrency(country.value, country.currency)}</span>
              </div>
            ))}
          </div>
          <Link to="/official-rates" className="text-[var(--primary)] hover:underline mt-4 inline-block">
            Voir tous les tarifs officiels →
          </Link>
        </Card>

        <Card title="🌍 Cours Communautaire" subtitle="Source : Déclarations Utilisateurs">
          <p className="mb-4">
            Montants moyens laissés par la Petite Souris, calculés à partir des déclarations validées.
          </p>
          <div className="space-y-2">
            {topCountries.slice(0, 3).map((country) => (
              <div key={country.iso2} className="flex justify-between">
                <span>{country.name}</span>
                <span className="font-bold">{formatCurrency(country.value, country.currency)}</span>
              </div>
            ))}
          </div>
          <Link to="/community-rates" className="text-[var(--primary)] hover:underline mt-4 inline-block">
            Voir tous les cours communautaires →
          </Link>
        </Card>
      </div>

      {/* Top et Bottom Pays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card title="🏆 Top 5 Pays (Montants les plus élevés)">
          <div className="space-y-2">
            {topCountries.map((country, index) => (
              <div key={country.iso2} className="flex items-center gap-2">
                <span className="text-xl font-bold text-[var(--accent)]">{index + 1}.</span>
                <span className="flex-1">{country.name}</span>
                <span className="font-bold">{formatCurrency(country.value, country.currency)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="📉 Bottom 5 Pays (Montants les plus bas)">
          <div className="space-y-2">
            {bottomCountries.map((country, index) => (
              <div key={country.iso2} className="flex items-center gap-2">
                <span className="text-xl font-bold text-[var(--secondary)]">{index + 1}.</span>
                <span className="flex-1">{country.name}</span>
                <span className="font-bold">{formatCurrency(country.value, country.currency)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Graphiques (placeholders) */}
      <Card title="📈 Évolution de l'Indice Mondial" className="mb-6">
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-[var(--secondary)]">
            Graphique d'évolution sur 12 mois (à intégrer avec Recharts)
          </p>
        </div>
      </Card>

      {/* Comparaison Officiel vs Communautaire */}
      <Card title="🔍 Comparaison Officiel vs Communautaire" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--primary)] text-[var(--light)]">
                <th className="p-2 border">Pays</th>
                <th className="p-2 border">Tarif Officiel</th>
                <th className="p-2 border">Cours Communautaire</th>
                <th className="p-2 border">Ratio (%)</th>
              </tr>
            </thead>
            <tbody>
              {topCountries.map((country) => {
                // Calculer un ratio fictif pour l'exemple
                const ratio = (country.value / (country.value * 1.5)) * 100; // Exemple simplifié
                return (
                  <tr key={country.iso2} className="hover:bg-gray-100">
                    <td className="p-2 border">{country.name}</td>
                    <td className="p-2 border">{formatCurrency(country.value * 1.5, country.currency)}</td>
                    <td className="p-2 border">{formatCurrency(country.value, country.currency)}</td>
                    <td className="p-2 border">{ratio.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[var(--secondary)] mt-2">
          *Le ratio montre le pourcentage du tarif officiel représenté par le cours communautaire.
        </p>
      </Card>

      {/* Méthodologie */}
      <Card title="📌 Méthodologie">
        <p className="mb-4">
          L'<strong>Indice Mondial de la Petite Souris</strong> est calculé en combinant :
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong>Tarifs officiels</strong> : Données sourcées auprès des ministères de la santé et associations dentaires.
          </li>
          <li>
            <strong>Cours communautaire</strong> : Médiane des montants déclarés par les utilisateurs (anonymes et validés).
          </li>
          <li>
            <strong>Pondération</strong> : Chaque pays est pondéré par son nombre de déclarations et son score de confiance.
          </li>
          <li>
            <strong>Agrégation</strong> : Les données sont agrégées en utilisant la parité de pouvoir d'achat (PPA) pour éviter les biais des devises fortes.
          </li>
        </ol>
        <Link to="/methodology" className="text-[var(--primary)] hover:underline mt-4 inline-block">
          En savoir plus sur la méthodologie →
        </Link>
      </Card>

      {/* Avertissement */}
      <Card title="⚠️ Avertissement">
        <p className="text-[var(--secondary)]">
          Ces données sont fournies à titre <strong>indicatif</strong> et <strong>ludique</strong>.
          Elles ne remplacent pas un avis médical ou dentaire officiel.
          Le <strong>Cours de Référence de la Souris</strong> est officiel uniquement au regard de sa méthodologie publique.
        </p>
      </Card>
    </div>
  );
};