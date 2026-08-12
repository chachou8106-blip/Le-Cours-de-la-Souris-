// Configuration pour les tests avec Vitest + React Testing Library
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Nettoyer après chaque test
afterEach(() => {
  cleanup();
});

// Mock des modules externes si nécessaire
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
    useParams: () => ({}),
  };
});

// Mock de l'API pour les tests
vi.mock('../hooks/useCountries', () => ({
  useCountries: () => ({
    data: [
      { iso2: 'FR', name_fr: 'France', name_en: 'France', currency_code: 'EUR' },
      { iso2: 'US', name_fr: 'États-Unis', name_en: 'United States', currency_code: 'USD' },
    ],
    isLoading: false,
    error: null,
  }),
}));

vi.mock('../hooks/usePayoutReports', () => ({
  usePayoutReports: () => ({
    data: [
      { id: '1', country_iso2: 'FR', amount: 5.5, currency: 'EUR', status: 'published' },
      { id: '2', country_iso2: 'US', amount: 7.5, currency: 'USD', status: 'published' },
    ],
    isLoading: false,
    error: null,
  }),
}));

// Mock de i18n pour éviter les erreurs
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'fr' },
  }),
}));

// Mock des composants UI si nécessaire
vi.mock('../components/ui/Card', () => ({
  Card: ({ children, title }: { children: React.ReactNode; title?: string }) => (
    <div data-testid="card">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  ),
}));

vi.mock('../components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick} data-testid="button">
      {children}
    </button>
  ),
}));

// Configuration globale pour les tests
process.env.NODE_ENV = 'test';
