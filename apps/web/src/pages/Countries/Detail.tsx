import React from 'react';
import { useParams } from 'react-router-dom';
import { useCountries } from '../../hooks/useCountries';
import { usePayoutReports } from '../../hooks/usePayoutReports';
import { Card } from '../../components/ui';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const CountryDetailPage: React.FC = () => {
  const { iso2 } = useParams<{ iso2: string }>();
  const { data: countries } = useCountries();
  const { data: reports, isLoading, error } = usePayoutReports({ countryIso2: iso2 });

  const country = countries?.find((c) => c.iso2 === iso2);

  if (!country) return <div>Pays non trouvé</div>;
  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  const amounts = reports?.map((r) => r.amount) || [];
  const medianAmount = amounts.length > 0
    ? amounts.sort((a, b) => a - b)[Math.floor(amounts.length / 2)]
    : 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{country.name}</h1>
      <p className="text-lg text-[var(--secondary)] mb-6">
        {country.tradition || 'Tradition locale'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card title="📊 Statistiques">
          <p>Devise : {country.currency}</p>
          <p>Montant médian : {formatCurrency(medianAmount, country.currency)}</p>
          <p>Nombre de déclarations : {reports?.length || 0}</p>
        </Card>

        <Card title="📅 Dernières Déclarations">
          {reports?.slice(0, 5).map((report) => (
            <div key={report.id} className="mb-2 p-2 border-b border-gray-200">
              <p>
                <strong>{formatDate(report.createdAt)}</strong> : {formatCurrency(report.amount, report.currency)}
              </p>
              {report.ageRange && <p>Tranche d'âge : {report.ageRange}</p>}
              {report.comment && <p>Commentaire : {report.comment}</p>}
            </div>
          ))}
        </Card>
      </div>

      <Card title="🌍 Comparaison">
        <p>Comparer avec d'autres pays...</p>
      </Card>
    </div>
  );
};