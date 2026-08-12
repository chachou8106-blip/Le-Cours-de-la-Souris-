import { render, screen, fireEvent } from '@testing-library/react';
import { Rewards } from '../../features/rewards/Rewards';
import { MemoryRouter } from 'react-router-dom';

describe('Rewards Component', () => {
  const mockBalance = 500;

  it('affiche le titre correctement', () => {
    render(
      <MemoryRouter>
        <Rewards balance={mockBalance} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Récompenses et Boutique/)).toBeInTheDocument();
  });

  it('affiche le solde de l\'utilisateur', () => {
    render(
      <MemoryRouter>
        <Rewards balance={mockBalance} />
      </MemoryRouter>
    );
    expect(screen.getByText(`${mockBalance} CROQ Credits`)).toBeInTheDocument();
  });

  it('affiche les catégories', () => {
    render(
      <MemoryRouter>
        <Rewards balance={mockBalance} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Catégories/)).toBeInTheDocument();
    expect(screen.getByText(/Tout/)).toBeInTheDocument();
    expect(screen.getByText(/Cosmétiques/)).toBeInTheDocument();
    expect(screen.getByText(/Loteries/)).toBeInTheDocument();
    expect(screen.getByText(/Premium/)).toBeInTheDocument();
  });

  it('affiche la boutique', () => {
    render(
      <MemoryRouter>
        <Rewards balance={mockBalance} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Boutique/)).toBeInTheDocument();
  });

  it('affiche l\'avertissement', () => {
    render(
      <MemoryRouter>
        <Rewards balance={mockBalance} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Les CROQ Credits n'ont aucune valeur monétaire/)).toBeInTheDocument();
  });

  it('affiche un message si pas assez de CROQ', () => {
    render(
      <MemoryRouter>
        <Rewards balance={10} />
      </MemoryRouter>
    );
    // Simuler un clic sur un bouton "Acheter" pour un article à 50 CROQ
    const buyButtons = screen.getAllByText(/Acheter/);
    if (buyButtons.length > 0) {
      fireEvent.click(buyButtons[0]);
      expect(screen.getByText(/Tu n'as pas assez de CROQ Credits/)).toBeInTheDocument();
    }
  });
});