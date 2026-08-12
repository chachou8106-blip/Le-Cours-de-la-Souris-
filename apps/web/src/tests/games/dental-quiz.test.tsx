import { render, screen, fireEvent } from '@testing-library/react';
import { DentalQuiz } from '../../../features/games/DentalQuiz';
import { MemoryRouter } from 'react-router-dom';

describe('DentalQuiz Game', () => {
  const mockOnWin = jest.fn();

  it('affiche le titre du jeu', () => {
    render(
      <MemoryRouter>
        <DentalQuiz onWin={mockOnWin} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Quizz Dentaire/)).toBeInTheDocument();
  });

  it('affiche la description', () => {
    render(
      <MemoryRouter>
        <DentalQuiz onWin={mockOnWin} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Teste tes connaissances/)).toBeInTheDocument();
  });

  it('affiche une question', () => {
    render(
      <MemoryRouter>
        <DentalQuiz onWin={mockOnWin} />
      </MemoryRouter>
    );
    // Vérifie qu'une question est affichée (le texte exact dépend des données mock)
    expect(screen.getByText(/Combien de dents/)).toBeInTheDocument();
  });

  it('affiche des options de réponse', () => {
    render(
      <MemoryRouter>
        <DentalQuiz onWin={mockOnWin} />
      </MemoryRouter>
    );
    // Vérifie qu'au moins une option est affichée
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('affiche le score après réponse', () => {
    render(
      <MemoryRouter>
        <DentalQuiz onWin={mockOnWin} />
      </MemoryRouter>
    );
    
    // Sélectionner une réponse
    const answerButtons = screen.getAllByRole('button');
    if (answerButtons.length > 0) {
      fireEvent.click(answerButtons[0]);
      
      // Vérifie qu'un message de score est affiché
      expect(screen.getByText(/Score/)).toBeInTheDocument();
    }
  });

  it('appelle onWin à la fin du quiz', () => {
    render(
      <MemoryRouter>
        <DentalQuiz onWin={mockOnWin} />
      </MemoryRouter>
    );
    
    // Répondre à toutes les questions (simulé)
    const answerButtons = screen.getAllByRole('button');
    for (let i = 0; i < answerButtons.length; i++) {
      fireEvent.click(answerButtons[i]);
    }
    
    // À la fin, onWin devrait être appelé
    expect(mockOnWin).toHaveBeenCalled();
  });
});