export type Country = {
  iso2: string;
  name: string;
  currency: string;
  tradition: string;
  isActive: boolean;
};

export type FamilyPayoutReport = {
  id: string;
  countryIso2: string;
  amount: number;
  currency: string;
  month: number;
  year: number;
  ageRange?: string;
  tradition?: string;
  comment?: string;
  status: 'pending' | 'auto_approved' | 'quarantined' | 'rejected' | 'published';
  createdAt: string;
};

export type CROQCreditEvent = {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  createdAt: string;
};

export type Game = {
  id: string;
  name: string;
  description: string;
  reward: number;
  component: React.ComponentType;
};