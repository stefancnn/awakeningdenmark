export interface WaitlistEntry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  postalCode: string;
  roleInterest: 'evangelist' | 'believer' | 'pastor' | 'volunteer' | 'general';
  churchName?: string;
  createdAt: string;
  ticketNumber: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export interface PlanStep {
  number: string;
  title: string;
  summary: string;
  description: string;
  actionItems: string[];
  scripture: string;
}
