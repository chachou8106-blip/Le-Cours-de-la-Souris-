import { render, screen } from '@testing-library/react';
import { CountriesPage } from '../../pages/Countries';
import { MemoryRouter } from 'react-router-dom';

describe('CountriesPage Component', () => {
  it('affiche le titre principal', () => {
    render(
      <MemoryRouter>
        <CountriesPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Pays/)).toBeInTheDocument();
  });

  it('affiche la description', () => {
    render(
      <MemoryRouter>
        <CountriesPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/Découvrez les montants et traditions par pays/)).toBeInTheDocument();
  });

  it('affiche la recherche', () => {
    render(
      <MemoryRouter>
        <CountriesPage />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Rechercher/)).toBeInTheDocument();
  });

  it('affiche une liste de pays', () => {
    render(
      <MemoryRouter>
        <CountriesPage />
      </MemoryRouter>
    );
    // Vérifie qu'au moins un pays est affiché (via les données mock)
    expect(screen.getByText(/France/)).toBeInTheDocument();
  });
});