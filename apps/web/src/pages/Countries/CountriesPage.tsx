import React from 'react';
import { useCountries } from '../../hooks/useCountries';
import { Card } from '../../components/ui';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';

export const CountriesPage: React.FC = () => {
  const { data: countries, isLoading, error } = useCountries();

  if (isLoading) return <div className="container mx-auto p-4">Chargement...</div>;
  if (error) return <div className="container mx-auto p-4">Erreur : {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🌍 Pays et Traditions</h1>
      <p className="text-lg mb-8">
        Découvrez les **montants communautaires** laissés par la Petite Souris dans le monde, 
        ainsi que les **traditions locales**.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries?.map((country) => (
          <Card
            key={country.iso2}
            title={country.name}
            subtitle={`${country.currency} - ${country.tradition || 'Tradition locale'}`}
          >
            <p className="text-sm mb-2">
              Code : {country.iso2}
            </p>
            <Link
              to={`/countries/${country.iso2}`}
              className="text-[var(--primary)] hover:underline"
            >
              Voir les détails et déclarations →
            </Link>
          </Card>
        ))}
      </div>

      <Card title="💡 Le saviez-vous ?" className="mt-8">
        <p>
          Les montants affichés ici sont basés sur les **déclarations des utilisateurs** (adultes responsables).
          Ils reflètent les **traditions locales** et peuvent varier selon les familles et les régions.
        </p>
        <p className="mt-2">
          Pour voir les **tarifs officiels** d'extraction dentaire, consultez la page 
          <Link to="/official-rates" className="text-[var(--primary)] hover:underline">
            Cours Officiel
          </Link>.
        </p>
      </Card>
    </div>
  );
};