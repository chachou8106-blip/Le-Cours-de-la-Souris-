import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Card } from '../../components/ui';

export const AdminLayout: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🔒 Tableau de Bord Admin</h1>
      
      <div className="flex gap-4 mb-6">
        <Link
          to="/admin"
          className="px-4 py-2 bg-[var(--primary)] text-[var(--light)] rounded-lg hover:bg-opacity-90"
        >
          Accueil
        </Link>
        <Link
          to="/admin/moderation"
          className="px-4 py-2 bg-[var(--secondary)] text-[var(--light)] rounded-lg hover:bg-opacity-90"
        >
          Modération
        </Link>
        <Link
          to="/admin/sources"
          className="px-4 py-2 bg-[var(--secondary)] text-[var(--light)] rounded-lg hover:bg-opacity-90"
        >
          Sources
        </Link>
        <Link
          to="/admin/stats"
          className="px-4 py-2 bg-[var(--secondary)] text-[var(--light)] rounded-lg hover:bg-opacity-90"
        >
          Statistiques
        </Link>
        <Link
          to="/admin/settings"
          className="px-4 py-2 bg-[var(--secondary)] text-[var(--light)] rounded-lg hover:bg-opacity-90"
        >
          Paramètres
        </Link>
      </div>

      <div className="bg-[var(--light)] p-6 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};