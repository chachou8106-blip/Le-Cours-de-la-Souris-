import React from 'react';
import { Card } from '../../components/ui';
import { Link } from 'react-router-dom';

export const CROQPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">🪙 CROQ Credits & Token</h1>
      <p className="text-lg mb-8">
        Découvrez comment **gagner, utiliser et staker** des CROQ Credits, et préparez-vous pour le futur **token CROQ**.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Comment gagner des CROQ Credits */}
        <Card title="🎁 Comment gagner des CROQ Credits ?">
          <p className="mb-4">
            Les CROQ Credits sont attribués pour votre **participation** à l'écosystème.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Déclarer un montant</strong> pour la Petite Souris : +10 à 50 CROQ (selon la qualité).
            </li>
            <li>
              <strong>Jouer aux mini-jeux</strong> : +5 à 500 CROQ (selon le jeu et la difficulté).
            </li>
            <li>
              <strong>Contribuer à la modération</strong> : +20 à 100 CROQ (par décision validée).
            </li>
            <li>
              <strong>Traduire du contenu</strong> : +50 à 200 CROQ (par document).
            </li>
            <li>
              <strong>Signaler un bug</strong> : +10 à 50 CROQ (si valide).
            </li>
            <li>
              <strong>Se connecter quotidiennement</strong> : +5 CROQ.
            </li>
            <li>
              <strong>Partager le projet</strong> : +20 CROQ par ami inscrit.
            </li>
          </ul>
        </Card>

        {/* Comment utiliser ses CROQ Credits */}
        <Card title="🛒 Comment utiliser ses CROQ Credits ?">
          <p className="mb-4">
            Les CROQ Credits peuvent être utilisés **uniquement dans l'application** pour :
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Acheter des cosmétiques</strong> : Skins de souris, décors de profil, etc. (10-1000 CROQ).
            </li>
            <li>
              <strong>Participer à des loteries</strong> : Tirages quotidiens ou spéciaux (10-100 CROQ par ticket).
            </li>
            <li>
              <strong>Débloquer des contenus premium</strong> : Guides, analyses avancées, etc. (50-500 CROQ).
            </li>
            <li>
              <strong>Staker pour valider des données</strong> : (Bientôt) Valider des déclarations ou des sources (récompenses en CROQ).
            </li>
            <li>
              <strong>Gagner des badges</strong> : Récompenses symboliques pour votre participation.
            </li>
          </ul>
        </Card>
      </div>

      {/* Avertissements */}
      <Card title="⚠️ Avertissements Importants" className="mb-8">
        <p className="text-red-600 mb-4">
          <strong>Les CROQ Credits ne sont PAS une cryptomonnaie.</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
          <li>Ils <strong>n'ont aucune valeur monétaire</strong> et ne peuvent être ni achetés ni vendus.</li>
          <li>Ils ne sont <strong>pas transférables</strong> en dehors de l'application.</li>
          <li>Ils ne donnent droit à <strong>aucune promesse de rendement</strong> ou de conversion future.</li>
          <li>Le projet <strong>ne garantit pas</strong> que les CROQ Credits auront une quelconque valeur à l'avenir.</li>
          <li>Ils peuvent être <strong>supprimés ou désactivés</strong> à tout moment, sans préavis ni compensation.</li>
        </ul>
        <p className="mt-4 text-sm">
          <Link to="/legal/token-disclaimer" className="text-[var(--primary)] hover:underline">
            Lire l'avertissement complet sur les CROQ Credits →
          </Link>
        </p>
      </Card>

      {/* Futur Token CROQ */}
      <Card title="🚀 Futur Token CROQ" className="mb-8">
        <p className="mb-4">
          Le <strong>token CROQ</strong> est actuellement en phase de <strong>développement et de préparation</strong>.
          Il sera lancé après validation légale et technique.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-2">Caractéristiques :</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Standard <strong>ERC-20</strong> (Ethereum).</li>
              <li>Nom : <strong>CROQ Protocol Token</strong>.</li>
              <li>Symbole : <strong>CROQ</strong>.</li>
              <li>Supply max : <strong>1 milliard</strong> (à valider légalement).</li>
              <li>Fonctionnalités : <strong>Staking, Gouvernance, Accès premium</strong>.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Utilités :</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Récompenser</strong> les contributeurs (validateurs, traducteurs).</li>
              <li><strong>Gouverner</strong> le protocole (votes sur les paramètres non critiques).</li>
              <li><strong>Accéder</strong> à des fonctionnalités premium (API, données avancées).</li>
              <li><strong>Staker</strong> pour valider des données et gagner des récompenses.</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-[var(--secondary)]">
          ⚠️ <strong>Aucune date de lancement</strong> n'est fixée. Le token ne sera pas lancé tant que toutes les conditions légales 
          (MiCA, KYC/AML, fiscalité) et techniques (audits, sécurité) ne sont pas remplies.
        </p>
        <p className="mt-2 text-sm">
          <Link to="/docs/token-design" className="text-[var(--primary)] hover:underline">
            En savoir plus sur le design du token →
          </Link>
        </p>
      </Card>

      {/* Ledger et Transparence */}
      <Card title="📜 Ledger et Transparence">
        <p className="mb-4">
          Toutes les transactions de CROQ Credits sont enregistrées dans un <strong>ledger append-only</strong> (base de données immuable).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-2">Caractéristiques :</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Append-only</strong> : Aucune modification ou suppression possible.</li>
              <li><strong>Preuves Merkle</strong> : Vérification cryptographique de l'intégrité des données.</li>
              <li><strong>Anonymisé</strong> : Aucune donnée personnelle n'est stockée.</li>
              <li><strong>Auditables</strong> : Le ledger peut être vérifié indépendamment.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Données stockées :</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>ID de l'événement.</li>
              <li>Type d'événement (mint, burn, transfer, reward).</li>
              <li>Compte pseudonymisé.</li>
              <li>Montant.</li>
              <li>Raison (code).</li>
              <li>Hash de l'événement précédent (chaînage).</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm">
          <Link to="/docs/audit-readiness" className="text-[var(--primary)] hover:underline">
            En savoir plus sur la transparence et les audits →
          </Link>
        </p>
      </Card>

      {/* Partenariats et Monétisation */}
      <Card title="🤝 Partenariats et Monétisation" className="mb-8">
        <p className="mb-4">
          Le projet est conçu pour être <strong>rentable</strong> tout en restant **familial et éducatif**.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-2">Sources de revenus :</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Affiliation Amazon</strong> : Liens avec le code <code>zencheztoi-21</code>.</li>
              <li><strong>Publicité ciblée</strong> : Bannières et partenariats (ex: Colgate, Oral-B).</li>
              <li><strong>Vente de guides premium</strong> : Contenu éducatif avancé.</li>
              <li><strong>Abonnements</strong> : Accès à des analyses exclusives.</li>
              <li><strong>Dons</strong> : Soutien volontaire des utilisateurs.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Partenariats actuels :</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Amazon</strong> : Code d'affiliation <code>zencheztoi-21</code>.</li>
              <li><strong>Colgate</strong> : Sponsoring de contenus éducatifs.</li>
              <li><strong>Oral-B</strong> : Collaboration pour des jeux et défis.</li>
              <li><strong>Lego</strong> : Contenus exclusifs pour enfants.</li>
              <li><strong>Disney</strong> : (Optionnel) Licences pour des personnages.</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Appel à l'action */}
      <Card title="🎉 Rejoignez la Communauté !" className="mb-8">
        <p className="mb-4">
          Participez dès maintenant pour :
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Gagner des <strong>CROQ Credits</strong> en jouant et en contribuant.</li>
          <li>Aider à construire un <strong>indice mondial</strong> des traditions dentaires.</li>
          <li>Accéder à des <strong>contenus exclusifs</strong> et des récompenses.</li>
          <li>Être parmi les premiers à tester le <strong>token CROQ</strong> (quand il sera lancé).</li>
        </ul>
        <div className="flex gap-4 mt-6">
          <Link to="/games" className="text-[var(--primary)] hover:underline">
            🎮 Jouer maintenant →
          </Link>
          <Link to="/countries" className="text-[var(--primary)] hover:underline">
            🌍 Explorer les pays →
          </Link>
        </div>
      </Card>
    </div>
  );
};