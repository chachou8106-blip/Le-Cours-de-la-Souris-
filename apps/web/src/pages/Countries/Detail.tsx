import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCountries } from '../../hooks/useCountries';
import { usePayoutReports } from '../../hooks/usePayoutReports';
import { Card } from '../../components/ui';
import { formatCurrency, formatDate } from '../../utils/formatters';

export const CountryDetailPage: React.FC = () => {
  const { iso2 } = useParams<{ iso2: string }>();
  const { data: countries } = useCountries();
  const { data: reports, isLoading, error } = usePayoutReports({ countryIso2: iso2, status: 'published' });

  const country = countries?.find((c) => c.iso2 === iso2);

  if (!country) return <div className="container mx-auto p-4">Pays non trouvé</div>;
  if (isLoading) return <div className="container mx-auto p-4">Chargement...</div>;
  if (error) return <div className="container mx-auto p-4">Erreur : {error.message}</div>;

  // Calcul des statistiques
  const amounts = reports?.map((r) => r.amount) || [];
  const medianAmount = amounts.length > 0
    ? amounts.sort((a, b) => a - b)[Math.floor(amounts.length / 2)]
    : 0;
  const avgAmount = amounts.length > 0
    ? amounts.reduce((a, b) => a + b, 0) / amounts.length
    : 0;
  const minAmount = amounts.length > 0 ? Math.min(...amounts) : 0;
  const maxAmount = amounts.length > 0 ? Math.max(...amounts) : 0;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{country.name}</h1>
        <p className="text-lg text-[var(--secondary)]">
          {country.tradition || 'Tradition locale'} | Devise : {country.currency}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Statistiques communautaires */}
        <Card title="📊 Statistiques Communautaires">
          <p><strong>Nombre de déclarations :</strong> {reports?.length || 0}</p>
          <p><strong>Montant médian :</strong> {formatCurrency(medianAmount, country.currency)}</p>
          <p><strong>Montant moyen :</strong> {formatCurrency(avgAmount, country.currency)}</p>
          <p><strong>Min / Max :</strong> {formatCurrency(minAmount, country.currency)} / {formatCurrency(maxAmount, country.currency)}</p>
        </Card>

        {/* Comparaison avec le cours officiel */}
        <Card title="🏛️ Comparaison avec le Cours Officiel">
          <p>
            Le **cours communautaire** (Petite Souris) est généralement **inférieur** au coût réel d'une extraction dentaire.
          </p>
          <p className="mt-2">
            <Link to="/official-rates" className="text-[var(--primary)] hover:underline">
              Voir les tarifs officiels →
            </Link>
          </p>
        </Card>
      </div>

      {/* Dernières déclarations */}
      <Card title="📅 Dernières Déclarations" className="mb-8">
        {reports?.length === 0 ? (
          <p>Aucune déclaration validée pour ce pays.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--primary)]">
                  <th className="text-left p-2">Date</th>
                  <th className="text-right p-2">Montant</th>
                  <th className="text-left p-2">Âge</th>
                  <th className="text-left p-2">Commentaire</th>
                </tr>
              </thead>
              <tbody>
                {reports?.slice(0, 10).map((report) => (
                  <tr key={report.id} className="border-b border-gray-200">
                    <td className="p-2">{formatDate(report.createdAt)}</td>
                    <td className="p-2 text-right">{formatCurrency(report.amount, report.currency)}</td>
                    <td className="p-2">{report.ageRange || 'N/A'}</td>
                    <td className="p-2 text-sm">{report.comment || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Graphique (simulé) */}
      <Card title="📈 Évolution des Montants" className="mb-8">
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-[var(--secondary)]">
            Graphique d'évolution des montants déclarés (à intégrer avec Recharts).
          </p>
        </div>
      </Card>

      {/* Appel à l'action */}
      <Card title="🎁 Contribuer" className="mb-8">
        <p>
          Aidez-nous à améliorer les données en **déclarant un montant** pour ce pays !
        </p>
        <p className="text-sm text-[var(--secondary)] mt-2">
          Chaque déclaration validée vous rapporte **10 à 50 CROQ Credits** !
        </p>
        <Link to="/" className="text-[var(--primary)] hover:underline mt-2 inline-block">
          Faire une déclaration →
        </Link>
      </Card>
    </div>
  );
};