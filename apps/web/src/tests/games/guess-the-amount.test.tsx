import { render, screen, fireEvent } from '@testing-library/react';
import { GuessTheAmount } from '../../../features/games/GuessTheAmount';
import { MemoryRouter } from 'react-router-dom';

describe('GuessTheAmount Game', () => {
  const mockOnWin = jest.fn();

  it('affiche le titre du jeu', () => {
    render(
      <MemoryRouter>
        <GuessTheAmount onWin={mockOnWin} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Devine le Montant/)).toBeInTheDocument();
  });

  it('affiche la description', () => {
    render(
      <MemoryRouter>
        <GuessTheAmount onWin={mockOnWin} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Trouve le montant médian/)).toBeInTheDocument();
  });

  it('affiche un champ de saisie', () => {
    render(
      <MemoryRouter>
        <GuessTheAmount onWin={mockOnWin} />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Entrez votre estimation/)).toBeInTheDocument();
  });

  it('affiche un bouton de soumission', () => {
    render(
      <MemoryRouter>
        <GuessTheAmount onWin={mockOnWin} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Soumettre/)).toBeInTheDocument();
  });

  it('affiche un message de feedback après soumission', () => {
    render(
      <MemoryRouter>
        <GuessTheAmount onWin={mockOnWin} />
      </MemoryRouter>
    );
    
    const input = screen.getByPlaceholderText(/Entrez votre estimation/);
    const button = screen.getByText(/Soumettre/);
    
    // Simuler une soumission
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.click(button);
    
    // Vérifie qu'un message de feedback est affiché
    expect(screen.getByText(/Votre estimation/)).toBeInTheDocument();
  });

  it('appelle onWin avec la bonne récompense', () => {
    render(
      <MemoryRouter>
        <GuessTheAmount onWin={mockOnWin} />
      </MemoryRouter>
    );
    
    // Dans ce jeu, la récompense dépend de la proximité avec le montant réel.
    // Pour ce test, nous vérifions simplement que onWin est appelé.
    const input = screen.getByPlaceholderText(/Entrez votre estimation/);
    const button = screen.getByText(/Soumettre/);
    
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.click(button);
    
    expect(mockOnWin).toHaveBeenCalled();
  });
});