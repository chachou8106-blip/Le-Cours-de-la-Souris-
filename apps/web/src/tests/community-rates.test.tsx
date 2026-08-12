import { render, screen } from '@testing-library/react';
import { CommunityRates } from '../../features/community-rates/CommunityRates';
import { MemoryRouter } from 'react-router-dom';

describe('CommunityRates Component', () => {
  it('affiche le titre correctement', () => {
    render(
      <MemoryRouter>
        <CommunityRates />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cours Communautaire/)).toBeInTheDocument();
  });

  it('affiche la description', () => {
    render(
      <MemoryRouter>
        <CommunityRates />
      </MemoryRouter>
    );
    expect(screen.getByText(/Montants laissés par la Petite Souris/)).toBeInTheDocument();
  });

  it('affiche l\'indice mondial', () => {
    render(
      <MemoryRouter>
        <CommunityRates />
      </MemoryRouter>
    );
    expect(screen.getByText(/Indice Mondial Communautaire/)).toBeInTheDocument();
  });

  it('affiche les cours par pays', () => {
    render(
      <MemoryRouter>
        <CommunityRates />
      </MemoryRouter>
    );
    expect(screen.getByText(/Cours par Pays/)).toBeInTheDocument();
  });

  it('affiche la section "Comment ça marche"', () => {
    render(
      <MemoryRouter>
        <CommunityRates />
      </MemoryRouter>
    );
    expect(screen.getByText(/Comment ça marche/)).toBeInTheDocument();
  });

  it('affiche l\'avertissement', () => {
    render(
      <MemoryRouter>
        <CommunityRates />
      </MemoryRouter>
    );
    expect(screen.getByText(/Ces données sont communautaires/)).toBeInTheDocument();
  });
});