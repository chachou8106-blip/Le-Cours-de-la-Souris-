import React, { useState } from 'react';
import { Card } from '../../components/ui';
import { useCountries } from '../../hooks/useCountries';
import { usePayoutReports } from '../../hooks/usePayoutReports';
import { formatCurrency, formatDate } from '../../utils/formatters';

// Données de démonstration pour les cours communautaires
const demoCommunityRates = [
  { country: 'France', iso2: 'FR', amount: 5.50, currency: 'EUR', sampleSize: 1250, confidence: 0.92, trend: '+2.5%' },
  { country: 'États-Unis', iso2: 'US', amount: 7.50, currency: 'USD', sampleSize: 2400, confidence: 0.95, trend: '+1.8%' },
  { country: 'Royaume-Uni', iso2: 'GB', amount: 4.75, currency: 'GBP', sampleSize: 800, confidence: 0.88, trend: '+3.1%' },
  { country: 'Allemagne', iso2: 'DE', amount: 6.00, currency: 'EUR', sampleSize: 950, confidence: 0.90, trend: '+1.5%' },
  { country: 'Espagne', iso2: 'ES', amount: 4.00, currency: 'EUR', sampleSize: 700, confidence: 0.85, trend: '+2.2%' },
  { country: 'Italie', iso2: 'IT', amount: 5.00, currency: 'EUR', sampleSize: 600, confidence: 0.82, trend: '+1.9%' },
  { country: 'Japon', iso2: 'JP', amount: 600, currency: 'JPY', sampleSize: 400, confidence: 0.78, trend: '+4.0%' },
  { country: 'Canada', iso2: 'CA', amount: 6.50, currency: 'CAD', sampleSize: 500, confidence: 0.80, trend: '+2.7%' },
  { country: 'Australie', iso2: 'AU', amount: 8.00, currency: 'AUD', sampleSize: 300, confidence: 0.75, trend: '+3.5%' },
  { country: 'Brésil', iso2: 'BR', amount: 25.00, currency: 'BRL', sampleSize: 200, confidence: 0.70, trend: '+5.0%' },
];

// Données pour les graphiques (simulées)
const historicalData = {
  FR: [
    { date: '2026-01', amount: 5.00 },
    { date: '2026-02', amount: 5.20 },
    { date: '2026-03', amount: 5.30 },
    { date: '2026-04', amount: 5.40 },
    { date: '2026-05', amount: 5.45 },
    { date: '2026-06', amount: 5.50 },
    { date: '2026-07', amount: 5.50 },
    { date: '2026-08', amount: 5.50 },
  ],
  US: [
    { date: '2026-01', amount: 7.00 },
    { date: '2026-02', amount: 7.20 },
    { date: '2026-03', amount: 7.30 },
    { date: '2026-04', amount: 7.40 },
    { date: '2026-05', amount: 7.45 },
    { date: '2026-06', amount: 7.50 },
    { date: '2026-07', amount: 7.50 },
    { date: '2026-08', amount: 7.50 },
  ],
};

export const CommunityRates: React.FC = () => {
  const { data: countries } = useCountries();
  const { data: reports } = usePayoutReports({ limit: 100 });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Calculer la médiane pour un pays donné (simplifié)
  const calculateMedian = (iso2: string) => {
    const countryReports = reports?.filter((r) => r.countryIso2 === iso2) || [];
    if (countryReports.length === 0) return 0;
    
    const amounts = countryReports.map((r) => r.amount).sort((a, b) => a - b);
    const middle = Math.floor(amounts.length / 2);
    
    if (amounts.length % 2 === 0) {
      return (amounts[middle - 1] + amounts[middle]) / 2;
    }
    return amounts[middle];
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🌍 Cours Communautaire de la Petite Souris</h2>
      <p className="mb-6">
        Découvrez les montants moyens laissés par la Petite Souris dans chaque pays, basés sur les déclarations des utilisateurs.
      </p>

      <Card title="📊 Indice Mondial Communautaire" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-[var(--light)] rounded-lg">
            <p className="text-sm text-[var(--secondary)]">Médiane mondiale</p>
            <p className="text-3xl font-bold text-[var(--primary)]">5.50€</p>
            <p className="text-sm text-green-600">+2.1% (1 mois)</p>
          </div>
          <div className="text-center p-4 bg-[var(--light)] rounded-lg">
            <p className="text-sm text-[var(--secondary)]">Pays couverts</p>
            <p className="text-3xl font-bold text-[var(--primary)]">45</p>
            <p className="text-sm text-[var(--secondary)]">Déclarations totales</p>
          </div>
          <div className="text-center p-4 bg-[var(--light)] rounded-lg">
            <p className="text-sm text-[var(--secondary)]">Score de confiance moyen</p>
            <p className="text-3xl font-bold text-[var(--primary)]">88%</p>
            <p className="text-sm text-[var(--secondary)]">Données fiables</p>
          </div>
        </div>
      </Card>

      <Card title="📈 Cours par Pays" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--primary)] text-[var(--light)]">
                <th className="p-2 border">Pays</th>
                <th className="p-2 border">Montant Médian</th>
                <th className="p-2 border">Devise</th>
                <th className="p-2 border">Échantillon</th>
                <th className="p-2 border">Confiance</th>
                <th className="p-2 border">Tendance</th>
              </tr>
            </thead>
            <tbody>
              {demoCommunityRates.map((rate) => (
                <tr
                  key={rate.iso2}
                  className={`cursor-pointer hover:bg-gray-100 ${selectedCountry === rate.iso2 ? 'bg-gray-200' : ''}`}
                  onClick={() => setSelectedCountry(rate.iso2)}
                >
                  <td className="p-2 border">{rate.country}</td>
                  <td className="p-2 border">{formatCurrency(rate.amount, rate.currency)}</td>
                  <td className="p-2 border">{rate.currency}</td>
                  <td className="p-2 border">{rate.sampleSize}</td>
                  <td className="p-2 border">{(rate.confidence * 100).toFixed(0)}%</td>
                  <td className={`p-2 border ${rate.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {rate.trend}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedCountry && (
        <Card title={`📉 Historique pour ${demoCommunityRates.find((r) => r.iso2 === selectedCountry)?.country}`}>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-[var(--secondary)]">
              Graphique d'évolution temporelle (à intégrer avec Recharts)
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2">Statistiques</h3>
              <p><strong>Montant actuel :</strong> {formatCurrency(
                demoCommunityRates.find((r) => r.iso2 === selectedCountry)?.amount || 0,
                demoCommunityRates.find((r) => r.iso2 === selectedCountry)?.currency || 'EUR'
              )}</p>
              <p><strong>Taille de l'échantillon :</strong> {
                demoCommunityRates.find((r) => r.iso2 === selectedCountry)?.sampleSize || 0
              } déclarations</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Confiance</h3>
              <p><strong>Score :</strong> {
                (demoCommunityRates.find((r) => r.iso2 === selectedCountry)?.confidence * 100).toFixed(0)
              }%</p>
              <p><strong>Tendance :</strong> {
                demoCommunityRates.find((r) => r.iso2 === selectedCountry)?.trend || 'N/A'
              }</p>
            </div>
          </div>
        </Card>
      )}

      <Card title="🔍 Comment ça marche ?" className="mt-6">
        <ul className="list-disc pl-5">
          <li>
            Les montants sont calculés à partir de la <strong>médiane</strong> des déclarations des utilisateurs.
          </li>
          <li>
            Le <strong>score de confiance</strong> dépend de la taille de l'échantillon, de la récence des données, et de la dispersion des montants.
          </li>
          <li>
            Les données sont <strong>anonymisées</strong> et <strong>modérées</strong> pour éviter les abus.
          </li>
          <li>
            Les montants sont affichés dans la <strong>devise locale</strong> du pays.
          </li>
        </ul>
      </Card>

      <Card title="⚠️ Avertissement" className="mt-6">
        <p className="text-[var(--secondary)]">
          Ces données sont <strong>communautaires</strong> et ne reflètent pas nécessairement la réalité officielle.
          Elles sont fournies à titre <strong>indicatif</strong> et <strong>ludique</strong>.
        </p>
      </Card>
    </div>
  );
};