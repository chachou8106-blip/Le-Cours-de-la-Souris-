// Export des adaptateurs de données

export * from './dental-tariffs/mock-tariffs';
export * from './dental-tariffs/real-tariffs';

export * from './fx-providers/mock-fx';
export * from './fx-providers/real-fx';

export * from './ppp-providers/mock-ppp';
export * from './ppp-providers/real-ppp';

// Types
export type { OfficialDentalTariff } from './dental-tariffs/real-tariffs';
export type { FXRate } from './fx-providers/real-fx';
export type { PPPRate } from './ppp-providers/real-ppp';
