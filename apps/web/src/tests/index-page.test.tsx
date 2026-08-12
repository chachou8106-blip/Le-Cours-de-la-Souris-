import { render, screen } from '@testing-library/react';
import { IndexPage } from '../../pages/Index';
import { MemoryRouter } from 'react-router-dom';

describe('IndexPage Component', () => {
  it('affiche le titre principal', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Indice Mondial de la Petite Souris/)).toBeInTheDocument();
  });

  it('affiche la description', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/L'indice mondial du Cours de la Souris/)).toBeInTheDocument();
  });

  it('affiche le Cours de Référence de la Souris', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cours de Référence de la Souris/)).toBeInTheDocument();
  });

  it('affiche la section Tarifs Officiels', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Tarifs Officiels/)).toBeInTheDocument();
  });

  it('affiche la section Cours Communautaire', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cours Communautaire/)).toBeInTheDocument();
  });

  it('affiche la section Top 5 Pays', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Top 5 Pays/)).toBeInTheDocument();
  });

  it('affiche la section Bottom 5 Pays', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Bottom 5 Pays/)).toBeInTheDocument();
  });

  it('affiche la section Évolution de l\'Indice Mondial', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Évolution de l'Indice Mondial/)).toBeInTheDocument();
  });

  it('affiche la section Comparaison Officiel vs Communautaire', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Comparaison Officiel vs Communautaire/)).toBeInTheDocument();
  });

  it('affiche la section Méthodologie', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Méthodologie/)).toBeInTheDocument();
  });

  it('affiche l\'avertissement', () => {
    render(
      <MemoryRouter>
        <IndexPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Ces données sont fournies à titre indicatif/)).toBeInTheDocument();
  });
});