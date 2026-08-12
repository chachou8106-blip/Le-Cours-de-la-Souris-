import { render, screen } from '@testing-library/react';
import { HomePage } from '../../pages/Home';
import { MemoryRouter } from 'react-router-dom';

describe('HomePage Component', () => {
  it('affiche le titre principal', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Le Cours de la Souris/)).toBeInTheDocument();
  });

  it('affiche la description', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/L’indice mondial communautaire des dents de lait/)).toBeInTheDocument();
  });

  it('affiche la section Cours Officiels', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cours Officiels/)).toBeInTheDocument();
  });

  it('affiche la section Cours Communautaire', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cours Communautaire/)).toBeInTheDocument();
  });

  it('affiche la section Indice Mondial', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Indice Mondial/)).toBeInTheDocument();
  });

  it('affiche la section CROQ Credits', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/CROQ Credits/)).toBeInTheDocument();
  });

  it('affiche la section Mini-Jeux', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Mini-Jeux/)).toBeInTheDocument();
  });

  it('affiche la section Récompenses', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Récompenses/)).toBeInTheDocument();
  });

  it('affiche la section Partenariats', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Partenariats/)).toBeInTheDocument();
  });

  it('affiche l\'avertissement', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Les CROQ Credits ne sont pas une cryptomonnaie/)).toBeInTheDocument();
  });

  it('affiche les liens vers les pages principales', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    // Vérifie la présence de liens (même si le texte exact peut varier)
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });
});