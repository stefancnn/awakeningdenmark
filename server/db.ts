import fs from 'fs';
import path from 'path';

export interface WaitlistRecord {
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

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'waitlist.json');

function ensureDataFile(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error ensuring data file:', err);
  }
}

// In-memory cache for fast read/writes
let cache: WaitlistRecord[] | null = null;

export function loadWaitlist(): WaitlistRecord[] {
  if (cache) return cache;
  ensureDataFile();
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      cache = JSON.parse(raw);
      return cache || [];
    }
  } catch (err) {
    console.error('Error reading waitlist.json:', err);
  }
  cache = [];
  return cache;
}

function persistWaitlist(records: WaitlistRecord[]): void {
  cache = records;
  ensureDataFile();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error persisting waitlist.json:', err);
  }
}

export function generateTicketNumber(prefix = 'DK-FIRE'): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${random}`;
}

export function addWaitlistEntry(
  data: Omit<WaitlistRecord, 'id' | 'createdAt' | 'ticketNumber'>
): WaitlistRecord {
  const records = loadWaitlist();
  const newRecord: WaitlistRecord = {
    ...data,
    id: `entry_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    createdAt: new Date().toISOString(),
    ticketNumber: generateTicketNumber(),
  };

  records.unshift(newRecord);
  persistWaitlist(records);
  return newRecord;
}

export function deleteWaitlistEntry(id: string): boolean {
  const records = loadWaitlist();
  const initialLength = records.length;
  const filtered = records.filter((r) => r.id !== id);
  if (filtered.length !== initialLength) {
    persistWaitlist(filtered);
    return true;
  }
  return false;
}
