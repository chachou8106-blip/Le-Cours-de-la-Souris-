import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--primary)] text-[var(--light)] p-8 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Colonne 1: À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4">🦷 Le Cours de la Souris</h3>
            <p className="text-sm">
              L’indice mondial communautaire des dents de lait. 
              Une application familiale, humoristique et éducative.
            </p>
          </div>

          {/* Colonne 2: Liens rapides */}
          <div>
            <h4 className="font-bold mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Accueil</Link></li>
              <li><Link to="/index" className="hover:underline">Indice Mondial</Link></li>
              <li><Link to="/official-rates" className="hover:underline">Cours Officiel</Link></li>
              <li><Link to="/countries" className="hover:underline">Pays</Link></li>
              <li><Link to="/games" className="hover:underline">Jeux</Link></li>
            </ul>
          </div>

          {/* Colonne 3: Récompenses */}
          <div>
            <h4 className="font-bold mb-4">Récompenses</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/rewards" className="hover:underline">Mes Récompenses</Link></li>
              <li><Link to="/shop" className="hover:underline">Boutique</Link></li>
              <li><Link to="/croq" className="hover:underline">À propos des CROQ</Link></li>
              <li><Link to="/reports" className="hover:underline">Faire une déclaration</Link></li>
            </ul>
          </div>

          {/* Colonne 4: Légal */}
          <div>
            <h4 className="font-bold mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/legal/terms-of-service" className="hover:underline">Conditions Générales</Link></li>
              <li><Link to="/legal/privacy-policy" className="hover:underline">Politique de Confidentialité</Link></li>
              <li><Link to="/legal/token-disclaimer" className="hover:underline">Avertissement Token</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--light)] border-opacity-20 pt-8 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Zen Chez Toi. Tous droits réservés.
          </p>
          <p className="mt-2">
            Code Amazon : <code>zencheztoi-21</code>
          </p>
        </div>
      </div>
    </footer>
  );
};