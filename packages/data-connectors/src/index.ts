// Export des providers par défaut
export { defaultFXProvider } from './fx-providers/real-fx';
export { defaultPPPProvider } from './ppp-providers/real-ppp';
export { defaultDentalTariffProvider } from './dental-tariffs/real-tariffs';

// Export des mocks pour le développement
export { mockFXRates, getMockFXRates, getMockFXRate, convertCurrency as mockConvertCurrency } from './fx-providers/mock-fx';
export { mockPPPRates, getMockPPPRates, getMockPPPRate, convertViaPPP as mockConvertViaPPP } from './ppp-providers/mock-ppp';
export { mockOfficialDentalTariffs, getMockOfficialDentalTariffs, getMockOfficialDentalTariffByCountry } from './dental-tariffs/mock-tariffs';

// Export des types
export type { FXProvider } from './fx-providers/real-fx';
export type { PPPProvider } from './ppp-providers/real-ppp';
export type { DentalTariffProvider } from './dental-tariffs/real-tariffs';