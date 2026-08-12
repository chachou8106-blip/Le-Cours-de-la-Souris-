import React, { useState } from 'react';
import { Card } from '../../components/ui';
import { ReportForm } from '../../features/reports/ReportForm';
import { useNavigate } from 'react-router-dom';

export const ReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (data: {
    countryIso2: string;
    amount: number;
    currency: string;
    month: number;
    year: number;
    ageRange?: string;
    tradition?: string;
    comment?: string;
  }) => {
    setIsSubmitting(true);
    // Dans une implémentation réelle, on appellerait l'API ici
    // Exemple: await fetch('/api/v1/reports', { method: 'POST', body: JSON.stringify(data) });
    console.log('Déclaration envoyée :', data);
    // Simulation d'un délai de soumission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] p-4">
      <ReportForm onSubmit={handleSubmit} />
    </div>
  );
};