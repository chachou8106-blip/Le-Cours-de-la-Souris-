import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui';
import { formatCurrency } from '../../utils/formatters';

interface OfficialRate {
  country: string;
  countryCode: string;
  currency: string;
  extractionCost: number;
  source: string;
  year: number;
  isDemo: boolean;
}

// Données de démonstration pour les tarifs officiels d'extraction dentaire
const officialRatesData: OfficialRate[] = [
  { country: 'France', countryCode: 'FR', currency: 'EUR', extractionCost: 50, source: 'Conseil National de l\'Ordre des Chirurgiens-Dentistes', year: 2026, isDemo: true },
  { country: 'États-Unis', countryCode: 'US', currency: 'USD', extractionCost: 150, source: 'American Dental Association (ADA)', year: 2026, isDemo: true },
  { country: 'Royaume-Uni', countryCode: 'GB', currency: 'GBP', extractionCost: 80, source: 'British Dental Association (BDA)', year: 2026, isDemo: true },
  { country: 'Allemagne', countryCode: 'DE', currency: 'EUR', extractionCost: 60, source: 'Bundeszahnärztekammer', year: 2026, isDemo: true },
  { country: 'Espagne', countryCode: 'ES', currency: 'EUR', extractionCost: 40, source: 'Consejo General de Dentistas', year: 2026, isDemo: true },
  { country: 'Italie', countryCode: 'IT', currency: 'EUR', extractionCost: 45, source: 'Consiglio Nazionale degli Odontoiatri', year: 2026, isDemo: true },
  { country: 'Japon', countryCode: 'JP', currency: 'JPY', extractionCost: 5000, source: 'Japan Dental Association', year: 2026, isDemo: true },
  { country: 'Canada', countryCode: 'CA', currency: 'CAD', extractionCost: 120, source: 'Canadian Dental Association', year: 2026, isDemo: true },
  { country: 'Australie', countryCode: 'AU', currency: 'AUD', extractionCost: 180, source: 'Australian Dental Association', year: 2026, isDemo: true },
  { country: 'Brésil', countryCode: 'BR', currency: 'BRL', extractionCost: 200, source: 'Conselho Federal de Odontologia', year: 2026, isDemo: true },
];

export const OfficialRates: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRate, setSelectedRate] = useState<OfficialRate | null>(null);

  useEffect(() => {
    if (selectedCountry) {
      const rate = officialRatesData.find(r => r.countryCode === selectedCountry);
      setSelectedRate(rate || null);
    }
  }, [selectedCountry]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🏛️ Cours Officiel de l'Extraction Dentaire</h1>
      <p className="text-lg mb-8">
        Découvrez le **coût officiel moyen** d'une extraction dentaire par pays, selon les sources gouvernementales et les associations dentaires.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Carte du monde (simulée) */}
        <Card title="🌍 Carte des Tarifs Officiels">
          <div className="h-96 bg-blue-50 rounded-lg flex items-center justify-center">
            <p className="text-[var(--secondary)]">
              Carte interactive à intégrer (MapLibre GL).
              <br />
              <span className="text-sm">(Couleurs : vert = bas, rouge = élevé)</span>
            </p>
          </div>
        </Card>

        {/* Tableau des tarifs */}
        <Card title="📊 Tarifs par Pays">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--primary)]">
                  <th className="text-left p-2">Pays</th>
                  <th className="text-left p-2">Devise</th>
                  <th className="text-right p-2">Coût (Extraction)</th>
                  <th className="text-left p-2">Source</th>
                </tr>
              </thead>
              <tbody>
                {officialRatesData.map((rate) => (
                  <tr
                    key={rate.countryCode}
                    className={`border-b border-gray-200 cursor-pointer ${selectedCountry === rate.countryCode ? 'bg-yellow-50' : ''}`}
                    onClick={() => setSelectedCountry(rate.countryCode)}
                  >
                    <td className="p-2">{rate.country}</td>
                    <td className="p-2">{rate.currency}</td>
                    <td className="p-2 text-right">{formatCurrency(rate.extractionCost, rate.currency)}</td>
                    <td className="p-2 text-sm">{rate.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Détails du pays sélectionné */}
      {selectedRate && (
        <Card title={`📋 Détails pour ${selectedRate.country}`} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Pays :</strong> {selectedRate.country}</p>
              <p><strong>Code :</strong> {selectedRate.countryCode}</p>
              <p><strong>Devise :</strong> {selectedRate.currency}</p>
            </div>
            <div>
              <p><strong>Coût d'extraction :</strong> {formatCurrency(selectedRate.extractionCost, selectedRate.currency)}</p>
              <p><strong>Source :</strong> {selectedRate.source}</p>
              <p><strong>Année :</strong> {selectedRate.year}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--secondary)]">
            ⚠️ Ces données sont des **estimations basées sur des sources publiques**. Les tarifs réels peuvent varier selon les cliniques et les régions.
          </p>
        </Card>
      )}

      {/* Comparaison avec le cours communautaire */}
      <Card title="📈 Comparaison : Officiel vs. Communautaire" className="mt-6">
        <p className="mb-4">
          Comparez les **tarifs officiels** (extraction dentaire) avec les **montants communautaires** (Petite Souris).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">🏛️ Officiel (Extraction Dentaire)</h4>
            <p>Coût moyen d'une extraction dentaire chez un dentiste.</p>
            <p className="text-sm text-[var(--secondary)]">Source : Associations dentaires nationales.</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">🦷 Communautaire (Petite Souris)</h4>
            <p>Montant moyen laissé par la Petite Souris (déclarations utilisateurs).</p>
            <p className="text-sm text-[var(--secondary)]">Source : Déclarations anonymes validées.</p>
          </div>
        </div>
        <p className="mt-4 text-center">
          <a href="/countries" className="text-[var(--primary)] hover:underline">
            Voir les données communautaires par pays →
          </a>
        </p>
      </Card>

      {/* Avertissement */}
      <Card title="⚠️ Avertissement" className="mt-6">
        <p className="text-sm">
          Les **tarifs officiels** représentent le coût moyen d'une extraction dentaire chez un professionnel.
          Les **montants communautaires** représentent ce que les parents laissent traditionnellement sous l'oreiller.
          <br />
          <strong>Ces deux valeurs ne sont pas directement comparables</strong>, mais elles offrent une perspective intéressante sur les traditions et les réalités économiques.
        </p>
      </Card>
    </div>
  );
};