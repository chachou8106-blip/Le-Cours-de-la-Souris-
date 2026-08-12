import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Card } from '../../components/ui';

export const LegalLayout: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">⚖️ Mentions Légales</h1>
      <p className="text-lg mb-8">
        Consultez les documents légaux du projet.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card title="📜 Conditions Générales" subtitle="CGU">
          <p>Conditions d'utilisation du service.</p>
          <a href="/legal/terms-of-service" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            Lire →
          </a>
        </Card>

        <Card title="🔒 Politique de Confidentialité" subtitle="RGPD">
          <p>Comment nous protégeons vos données.</p>
          <a href="/legal/privacy-policy" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            Lire →
          </a>
        </Card>

        <Card title="⚠️ Avertissement Token" subtitle="CROQ">
          <p>Avertissements sur les CROQ Credits et le token.</p>
          <a href="/legal/token-disclaimer" className="text-[var(--primary)] hover:underline mt-2 inline-block">
            Lire →
          </a>
        </Card>
      </div>

      <div className="bg-[var(--light)] p-6 rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};