import { FormErrors, WaitlistEntry } from '../types';

export const STORAGE_KEY = 'denmark_harvest_waitlist_entries';

export function validateWaitlistForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  postalCode: string;
}): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'Last name is required';
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (data.phone.replace(/[^0-9]/g, '').length < 6) {
    errors.phone = 'Please provide a valid phone number';
  }

  if (!data.city.trim()) {
    errors.city = 'City is required';
  }

  if (!data.country.trim()) {
    errors.country = 'Country is required';
  }

  if (!data.postalCode.trim()) {
    errors.postalCode = 'Postal code is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateTicketNumber(prefix = 'DK-FIRE'): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${random}`;
}

export function saveWaitlistEntry(
  entry: Omit<WaitlistEntry, 'id' | 'createdAt' | 'ticketNumber'>,
  existingRecord?: WaitlistEntry
): WaitlistEntry {
  const newEntry: WaitlistEntry = existingRecord || {
    ...entry,
    id: `entry_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date().toISOString(),
    ticketNumber: generateTicketNumber(),
  };

  try {
    const existing = getWaitlistEntries();
    // Prevent duplicate entries with same id
    const filtered = existing.filter((item) => item.id !== newEntry.id && item.email !== newEntry.email);
    const updated = [newEntry, ...filtered];
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } catch {
    // Graceful fallback for storage quota or restricted environments
  }

  return newEntry;
}

export function getWaitlistEntries(): WaitlistEntry[] {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function generateICalendarEvent(): string {
  const event = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Denmark The Time Is Now//Harvest Movement//EN',
    'BEGIN:VEVENT',
    'SUMMARY:Fire Camp Copenhagen 2027 (Dates TBC)',
    'DESCRIPTION:Fire Camp Copenhagen with Christ for All Nations (CfaN). Training every Christian, setting apart evangelists, and commissioning pastors for a national harvest in Denmark.',
    'LOCATION:Copenhagen, Denmark',
    'DTSTART:20270622T090000Z',
    'DTEND:20270628T210000Z',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  return `data:text/calendar;charset=utf8,${encodeURIComponent(event)}`;
}
