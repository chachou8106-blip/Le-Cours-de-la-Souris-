import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';

export const Header: React.FC = () => {
  return (
    <header className="bg-[var(--primary)] text-[var(--light)] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <span>🦷</span>
          <span>Le Cours de la Souris</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-4">
          <Link to="/" className="hover:underline">Accueil</Link>
          <Link to="/index" className="hover:underline">Indice Mondial</Link>
          <Link to="/official-rates" className="hover:underline">Cours Officiel</Link>
          <Link to="/countries" className="hover:underline">Pays</Link>
          <Link to="/games" className="hover:underline">Jeux</Link>
          <Link to="/shop" className="hover:underline">Boutique</Link>
          <Link to="/croq" className="hover:underline">CROQ</Link>
        </nav>

        {/* Boutons d'action */}
        <div className="flex gap-2">
          <Button variant="accent" size="sm" asChild>
            <Link to="/reports">Déclarer</Link>
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <Link to="/rewards">Récompenses</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};