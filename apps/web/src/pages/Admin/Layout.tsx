import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Card } from '../../components/ui';

export const AdminLayout: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🔒 Tableau de Bord Admin</h1>
      <p className="text-lg mb-8">
        Gérer les déclarations, les utilisateurs, et les paramètres du site.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="📊 Statistiques" subtitle="Aperçu global">
          <p>Nombre total de déclarations : 0</p>
          <p>Utilisateurs actifs : 0</p>
          <p>Pays couverts : 0</p>
        </Card>

        <Card title="⚠️ Modération" subtitle="Déclarations en attente">
          <p>Déclarations à modérer : 0</p>
          <a href="/admin/moderation" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            Voir la file →
          </a>
        </Card>

        <Card title="🌍 Sources" subtitle="Gestion des données">
          <p>Sources actives : 0</p>
          <a href="/admin/sources" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            Gérer les sources →
          </a>
        </Card>

        <Card title="⚙️ Paramètres" subtitle="Configuration">
          <p>Paramètres du site</p>
          <a href="/admin/settings" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            Modifier →
          </a>
        </Card>
      </div>

      <div className="bg-[var(--light)] p-6 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};