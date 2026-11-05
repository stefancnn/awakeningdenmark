import crypto from 'crypto';

interface AdminAccount {
  email: string;
  passwordHash: string; // SHA-256 for secure in-memory comparison
  salt: string;
}

// In-memory active session tokens with 24-hour expiration
interface Session {
  token: string;
  email: string;
  expiresAt: number;
}

const sessions = new Map<string, Session>();

// Hardcoded authorized credentials as explicitly requested:
// 1. stefancnn@gmail.com -> @aA1234554321
// 2. descheemaeckeryaniv@gmail.com -> Yaniv-777
const ALLOWED_ADMINS: Record<string, string> = {
  'stefancnn@gmail.com': '@aA1234554321',
  'descheemaeckeryaniv@gmail.com': 'Yaniv-777',
};

export function verifyAdminCredentials(email: string, password: string): boolean {
  if (!email || !password) return false;
  const normalizedEmail = email.trim().toLowerCase();
  const expectedPassword = ALLOWED_ADMINS[normalizedEmail];
  if (!expectedPassword) return false;
  
  // Constant-time buffer comparison to prevent timing attacks
  const expectedBuffer = Buffer.from(expectedPassword);
  const providedBuffer = Buffer.from(password);
  if (expectedBuffer.length !== providedBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, providedBuffer);
}

export function createSession(email: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  sessions.set(token, {
    token,
    email: email.trim().toLowerCase(),
    expiresAt,
  });
  return token;
}

export function validateSession(token: string | undefined): { valid: boolean; email?: string } {
  if (!token) return { valid: false };
  const session = sessions.get(token);
  if (!session) return { valid: false };

  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return { valid: false };
  }

  return { valid: true, email: session.email };
}

export function revokeSession(token: string): void {
  sessions.delete(token);
}
