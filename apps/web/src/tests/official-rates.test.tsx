import { render, screen } from '@testing-library/react';
import { OfficialRates } from '../../features/official-rates/OfficialRates';
import { MemoryRouter } from 'react-router-dom';

// Mock des données pour les tests
const mockOfficialTariffs = [
  { country: 'France', iso2: 'FR', procedure: 'Extraction dentaire simple', cost: 30, currency: 'EUR', source: 'Conseil National', year: 2026 },
  { country: 'États-Unis', iso2: 'US', procedure: 'Simple tooth extraction', cost: 150, currency: 'USD', source: 'ADA', year: 2026 },
];

const mockCommunityRates = [
  { country: 'France', iso2: 'FR', amount: 5.50, currency: 'EUR', sampleSize: 1250, confidence: 0.92 },
  { country: 'États-Unis', iso2: 'US', amount: 7.50, currency: 'USD', sampleSize: 2400, confidence: 0.95 },
];

describe('OfficialRates Component', () => {
  it('affiche le titre correctement', () => {
    render(
      <MemoryRouter>
        <OfficialRates />
      </MemoryRouter>
    );
    expect(screen.getByText(/Tarifs Officiels/)).toBeInTheDocument();
  });

  it('affiche la description', () => {
    render(
      <MemoryRouter>
        <OfficialRates />
      </MemoryRouter>
    );
    expect(screen.getByText(/Tarifs des actes dentaires/)).toBeInTheDocument();
  });

  it('affiche un tableau comparatif', () => {
    render(
      <MemoryRouter>
        <OfficialRates />
      </MemoryRouter>
    );
    expect(screen.getByText(/Tableau Comparatif/)).toBeInTheDocument();
  });

  it('affiche les avertissements', () => {
    render(
      <MemoryRouter>
        <OfficialRates />
      </MemoryRouter>
    );
    expect(screen.getByText(/Avertissement/)).toBeInTheDocument();
  });
});