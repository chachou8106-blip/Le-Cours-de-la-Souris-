import { render, screen } from '@testing-library/react';
import { DailyHumor } from '../../features/daily-humor/DailyHumor';
import { MemoryRouter } from 'react-router-dom';

describe('DailyHumor Component', () => {
  it('affiche le titre', () => {
    render(
      <MemoryRouter>
        <DailyHumor />
      </MemoryRouter>
    );
    expect(screen.getByText(/Scène Humoristique du Jour/)).toBeInTheDocument();
  });

  it('affiche un bouton pour changer de scène', () => {
    render(
      <MemoryRouter>
        <DailyHumor />
      </MemoryRouter>
    );
    expect(screen.getByText(/Une autre scène/)).toBeInTheDocument();
  });

  it('affiche une scène par défaut', () => {
    render(
      <MemoryRouter>
        <DailyHumor />
      </MemoryRouter>
    );
    // Vérifie qu'une scène est affichée (au moins un élément de scène)
    const scenes = screen.getAllByRole('img');
    expect(scenes.length).toBeGreaterThan(0);
  });
});