import { useQuery } from '@tanstack/react-query';
import { FamilyPayoutReport } from '../types';

interface PayoutReportsParams {
  countryIso2?: string;
  status?: string;
  limit?: number;
}

const fetchPayoutReports = async (params: PayoutReportsParams): Promise<FamilyPayoutReport[]> => {
  const queryParams = new URLSearchParams();
  if (params.countryIso2) queryParams.append('country', params.countryIso2);
  if (params.status) queryParams.append('status', params.status);
  if (params.limit) queryParams.append('limit', params.limit.toString());

  const response = await fetch(`/api/v1/reports?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Échec du chargement des rapports');
  }
  return response.json();
};

export const usePayoutReports = (params: PayoutReportsParams = {}) => {
  return useQuery<FamilyPayoutReport[], Error>({
    queryKey: ['payoutReports', params],
    queryFn: () => fetchPayoutReports(params),
    staleTime: 1000 * 60 * 1,
  });
};