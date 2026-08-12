import { useQuery } from '@tanstack/react-query';
import { Country } from '../types';

const fetchCountries = async (): Promise<Country[]> => {
  const response = await fetch('/api/v1/countries');
  if (!response.ok) {
    throw new Error('Échec du chargement des pays');
  }
  return response.json();
};

export const useCountries = () => {
  return useQuery<Country[], Error>({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 5,
  });
};