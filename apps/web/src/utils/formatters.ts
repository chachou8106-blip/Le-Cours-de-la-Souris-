// Formatage des montants par devise
export const formatCurrency = (amount: number, currency: string): string => {
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
};

// Formatage des dates
export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

// Formatage des nombres avec séparateurs
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('fr-FR').format(value);
};

// Formatage des pourcentages
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};