import React from 'react';
import { useCountries } from '../../hooks/useCountries';
import { Card } from '../../components/ui';
import { formatCurrency } from '../../utils/formatters';

export const CountriesPage: React.FC = () => {
  const { data: countries, isLoading, error } = useCountries();

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🌍 Pays</h1>
      <p className="text-lg mb-8">
        Découvrez les montants moyens laissés par la Petite Souris dans le monde.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries?.map((country) => (
          <Card
            key={country.iso2}
            title={country.name}
            subtitle={country.currency}
          >
            <p className="text-sm mb-2">
              Tradition : {country.tradition || 'Non spécifiée'}
            </p>
            <a
              href={`/countries/${country.iso2}`}
              className="text-[var(--primary)] hover:underline"
            >
              Voir les détails →
            </a>
          </Card>
        ))}
      </div>
    </div>
  );
};