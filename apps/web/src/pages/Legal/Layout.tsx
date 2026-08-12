import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Card } from '../../components/ui';

export const LegalLayout: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">⚖️ Mentions Légales</h1>
      
      <div className="flex gap-4 mb-6">
        <Link
          to="/legal/terms-of-service"
          className="px-4 py-2 bg-[var(--primary)] text-[var(--light)] rounded-lg hover:bg-opacity-90"
        >
          Conditions Générales
        </Link>
        <Link
          to="/legal/privacy-policy"
          className="px-4 py-2 bg-[var(--secondary)] text-[var(--light)] rounded-lg hover:bg-opacity-90"
        >
          Politique de Confidentialité
        </Link>
        <Link
          to="/legal/token-disclaimer"
          className="px-4 py-2 bg-[var(--secondary)] text-[var(--light)] rounded-lg hover:bg-opacity-90"
        >
          Avertissement Token
        </Link>
        <Link
          to="/legal/cookie-policy"
          className="px-4 py-2 bg-[var(--secondary)] text-[var(--light)] rounded-lg hover:bg-opacity-90"
        >
          Politique des Cookies
        </Link>
      </div>

      <div className="bg-[var(--light)] p-6 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};