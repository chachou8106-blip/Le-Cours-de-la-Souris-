import React from 'react';
import { Card } from '../../components/ui';

export const CROQPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🪙 CROQ Credits</h1>
      <p className="text-lg mb-8">
        Découvrez comment gagner et utiliser des CROQ Credits dans Le Cours de la Souris.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="🎁 Comment gagner des CROQ Credits ?">
          <ul className="list-disc pl-5">
            <li>Déclarer un montant pour la Petite Souris (+10 à 50 CROQ).</li>
            <li>Jouer aux mini-jeux (+5 à 500 CROQ).</li>
            <li>Contribuer à la modération ou aux traductions (+20 à 200 CROQ).</li>
            <li>Se connecter quotidiennement (+5 CROQ).</li>
            <li>Partager le Service avec des amis (+20 CROQ par inscription).</li>
          </ul>
        </Card>

        <Card title="🛒 Comment utiliser ses CROQ Credits ?">
          <ul className="list-disc pl-5">
            <li>Acheter des cosmétiques (skins, décors).</li>
            <li>Participer à des loteries ou jeux spéciaux.</li>
            <li>Débloquer des contenus premium (guides, analyses).</li>
            <li>Staker pour valider des données (bientôt).</li>
          </ul>
        </Card>
      </div>

      <Card title="⚠️ Avertissement Important" className="mt-6">
        <p className="text-red-600">
          <strong>Les CROQ Credits ne sont pas une cryptomonnaie.</strong> Ils n'ont aucune valeur monétaire,
          ne peuvent être ni achetés ni vendus, et ne donnent droit à aucune promesse de rendement.
          Un éventuel token CROQ n'est pas encore lancé.
        </p>
      </Card>

      <div className="mt-8">
        <a
          href="/legal/token-disclaimer"
          className="text-[var(--primary)] hover:underline"
        >
          Lire l'avertissement complet sur les CROQ Credits →
        </a>
      </div>
    </div>
  );
};