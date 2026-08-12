import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui';
import { formatCurrency } from '../../utils/formatters';

// Données de démonstration pour les tarifs officiels d'extraction dentaire
const officialDentalTariffs = [
  { country: 'France', iso2: 'FR', procedure: 'Extraction dentaire simple', cost: 30, currency: 'EUR', source: 'Conseil National de l\'Ordre des Chirurgiens-Dentistes', year: 2026 },
  { country: 'États-Unis', iso2: 'US', procedure: 'Simple tooth extraction', cost: 150, currency: 'USD', source: 'American Dental Association (ADA)', year: 2026 },
  { country: 'Royaume-Uni', iso2: 'GB', procedure: 'Simple extraction', cost: 80, currency: 'GBP', source: 'NHS Dental Tariffs', year: 2026 },
  { country: 'Allemagne', iso2: 'DE', procedure: 'Einfache Zahnentfernung', cost: 60, currency: 'EUR', source: 'Bundeszahnärztekammer', year: 2026 },
  { country: 'Espagne', iso2: 'ES', procedure: 'Extracción dental simple', cost: 50, currency: 'EUR', source: 'Consejo General de Dentistas', year: 2026 },
  { country: 'Italie', iso2: 'IT', procedure: 'Estrazione dentale semplice', cost: 70, currency: 'EUR', source: 'Ordine Nazionale dei Medici Chirurghi e degli Odontoiatri', year: 2026 },
  { country: 'Japon', iso2: 'JP', procedure: '歯の抜歯', cost: 10000, currency: 'JPY', source: 'Japan Dental Association', year: 2026 },
  { country: 'Canada', iso2: 'CA', procedure: 'Simple tooth extraction', cost: 120, currency: 'CAD', source: 'Canadian Dental Association', year: 2026 },
  { country: 'Australie', iso2: 'AU', procedure: 'Simple extraction', cost: 150, currency: 'AUD', source: 'Australian Dental Association', year: 2026 },
  { country: 'Brésil', iso2: 'BR', procedure: 'Extração dental simples', cost: 150, currency: 'BRL', source: 'Conselho Federal de Odontologia', year: 2026 },
];

// Données pour les montants communautaires (médiane des déclarations)
const communityRates = [
  { country: 'France', iso2: 'FR', amount: 5.50, currency: 'EUR', sampleSize: 1250, confidence: 0.92 },
  { country: 'États-Unis', iso2: 'US', amount: 7.50, currency: 'USD', sampleSize: 2400, confidence: 0.95 },
  { country: 'Royaume-Uni', iso2: 'GB', amount: 4.75, currency: 'GBP', sampleSize: 800, confidence: 0.88 },
  { country: 'Allemagne', iso2: 'DE', amount: 6.00, currency: 'EUR', sampleSize: 950, confidence: 0.90 },
  { country: 'Espagne', iso2: 'ES', amount: 4.00, currency: 'EUR', sampleSize: 700, confidence: 0.85 },
  { country: 'Italie', iso2: 'IT', amount: 5.00, currency: 'EUR', sampleSize: 600, confidence: 0.82 },
  { country: 'Japon', iso2: 'JP', amount: 600, currency: 'JPY', sampleSize: 400, confidence: 0.78 },
  { country: 'Canada', iso2: 'CA', amount: 6.50, currency: 'CAD', sampleSize: 500, confidence: 0.80 },
  { country: 'Australie', iso2: 'AU', amount: 8.00, currency: 'AUD', sampleSize: 300, confidence: 0.75 },
  { country: 'Brésil', iso2: 'BR', amount: 25.00, currency: 'BRL', sampleSize: 200, confidence: 0.70 },
];

export const OfficialRates: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  // Calculer le ratio entre le cours communautaire et le tarif officiel
  const getRatio = (iso2: string) => {
    const official = officialDentalTariffs.find((t) => t.iso2 === iso2);
    const community = communityRates.find((r) => r.iso2 === iso2);
    
    if (!official || !community) return null;
    
    // Convertir les deux montants en EUR pour comparaison (simplifié)
    // Dans une implémentation réelle, on utiliserait les taux de change
    const officialInEUR = official.currency === 'EUR' ? official.cost : official.cost / 1.1; // Approximation USD/EUR
    const communityInEUR = community.currency === 'EUR' ? community.amount : community.amount / 1.1;
    
    return (communityInEUR / officialInEUR) * 100;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🏥 Tarifs Officiels vs. Cours Communautaire</h2>
      <p className="mb-6">
        Comparez le coût officiel d'une extraction dentaire avec le montant moyen laissé par la Petite Souris dans chaque pays.
      </p>

      <Card title="📊 Tableau Comparatif" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[var(--primary)] text-[var(--light)]">
                <th className="p-2 border">Pays</th>
                <th className="p-2 border">Procédure</th>
                <th className="p-2 border">Tarif Officiel</th>
                <th className="p-2 border">Cours Communautaire</th>
                <th className="p-2 border">Ratio (%)</th>
                <th className="p-2 border">Confiance</th>
              </tr>
            </thead>
            <tbody>
              {officialDentalTariffs.map((tariff) => {
                const community = communityRates.find((r) => r.iso2 === tariff.iso2);
                const ratio = getRatio(tariff.iso2);
                return (
                  <tr
                    key={tariff.iso2}
                    className={`cursor-pointer hover:bg-gray-100 ${selectedCountry === tariff.iso2 ? 'bg-gray-200' : ''}`}
                    onClick={() => setSelectedCountry(tariff.iso2)}
                  >
                    <td className="p-2 border">{tariff.country}</td>
                    <td className="p-2 border">{tariff.procedure}</td>
                    <td className="p-2 border">{formatCurrency(tariff.cost, tariff.currency)}</td>
                    <td className="p-2 border">
                      {community ? formatCurrency(community.amount, community.currency) : 'N/A'}
                    </td>
                    <td className="p-2 border">
                      {ratio ? `${ratio.toFixed(1)}%` : 'N/A'}
                    </td>
                    <td className="p-2 border">
                      {community ? `${(community.confidence * 100).toFixed(0)}%` : 'N/A'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedCountry && (
        <Card title={`📈 Détails pour ${officialDentalTariffs.find((t) => t.iso2 === selectedCountry)?.country}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2">Tarif Officiel</h3>
              {officialDentalTariffs
                .filter((t) => t.iso2 === selectedCountry)
                .map((tariff) => (
                  <div key={tariff.iso2} className="mb-4">
                    <p><strong>Procédure :</strong> {tariff.procedure}</p>
                    <p><strong>Coût :</strong> {formatCurrency(tariff.cost, tariff.currency)}</p>
                    <p><strong>Source :</strong> {tariff.source}</p>
                    <p><strong>Année :</strong> {tariff.year}</p>
                  </div>
                ))}
            </div>
            <div>
              <h3 className="font-bold mb-2">Cours Communautaire</h3>
              {communityRates
                .filter((r) => r.iso2 === selectedCountry)
                .map((rate) => (
                  <div key={rate.iso2} className="mb-4">
                    <p><strong>Montant moyen :</strong> {formatCurrency(rate.amount, rate.currency)}</p>
                    <p><strong>Taille de l'échantillon :</strong> {rate.sampleSize} déclarations</p>
                    <p><strong>Score de confiance :</strong> {(rate.confidence * 100).toFixed(0)}%</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-bold mb-2">Analyse</h3>
            <p>
              Le montant moyen laissé par la Petite Souris représente environ 
              <strong>{getRatio(selectedCountry)?.toFixed(1) || 'N/A'}%</strong> du tarif officiel d'une extraction dentaire.
            </p>
          </div>
        </Card>
      )}

      <Card title="📌 Notes Importantes" className="mt-6">
        <ul className="list-disc pl-5">
          <li>
            Les <strong>tarifs officiels</strong> sont basés sur les données des associations dentaires nationales.
          </li>
          <li>
            Le <strong>cours communautaire</strong> est calculé à partir des déclarations anonymes des utilisateurs.
          </li>
          <li>
            Le <strong>ratio</strong> montre le pourcentage du tarif officiel représenté par le cours communautaire.
          </li>
          <li>
            Ces données sont à titre <strong>indicatif</strong> et ne remplacent pas un avis médical ou dentaire.
          </li>
        </ul>
      </Card>
    </div>
  );
};