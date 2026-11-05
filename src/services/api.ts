import { WaitlistEntry } from '../types';
import { saveWaitlistEntry, getWaitlistEntries } from '../utils/waitlist';

const ADMIN_TOKEN_KEY = 'denmark_harvest_admin_token';
const ADMIN_EMAIL_KEY = 'denmark_harvest_admin_email';

export interface SubmitWaitlistPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  postalCode: string;
  roleInterest: WaitlistEntry['roleInterest'];
  churchName?: string;
}

export interface AdminAuthResponse {
  success: boolean;
  token: string;
  admin: {
    email: string;
  };
}

/**
 * Submits a new registration to the backend waitlist database.
 * Falls back to local storage if offline or running in a standalone preview.
 */
export async function submitWaitlist(data: SubmitWaitlistPayload): Promise<WaitlistEntry> {
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with ${response.status}`);
    }

    const result = await response.json();
    if (result.success && result.entry) {
      // Also save to device localStorage for immediate pass retrieval
      saveWaitlistEntry(data, result.entry);
      return result.entry;
    }
    throw new Error('Unexpected response format from server');
  } catch (err) {
    console.warn('Backend waitlist submission fell back to local storage:', err);
    // Graceful fallback to client-side storage so user registration is never lost
    return saveWaitlistEntry(data);
  }
}

/**
 * Gets the total waitlist registration count from the backend.
 */
export async function getWaitlistCount(): Promise<number> {
  try {
    const res = await fetch('/api/waitlist/count');
    if (res.ok) {
      const data = await res.json();
      return typeof data.count === 'number' ? data.count : 0;
    }
  } catch (e) {
    console.error('Failed to get waitlist count from server:', e);
  }
  return getWaitlistEntries().length;
}

/**
 * Authenticates an admin using email and password.
 * Strictly limited to authorized admin accounts:
 * - stefancnn@gmail.com
 * - descheemaeckeryaniv@gmail.com
 */
export async function loginAdmin(email: string, password: string): Promise<{ token: string; email: string }> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Invalid email or password. Access is restricted.');
  }

  const token = data.token;
  const adminEmail = data.admin?.email || email.toLowerCase().trim();

  // Store in sessionStorage
  try {
    sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
    sessionStorage.setItem(ADMIN_EMAIL_KEY, adminEmail);
  } catch {
    // ignore storage restrictions
  }

  return { token, email: adminEmail };
}

/**
 * Gets the active stored admin token if available.
 */
export function getStoredAdminToken(): { token: string | null; email: string | null } {
  try {
    const token = sessionStorage.getItem(ADMIN_TOKEN_KEY);
    const email = sessionStorage.getItem(ADMIN_EMAIL_KEY);
    return { token, email };
  } catch {
    return { token: null, email: null };
  }
}

/**
 * Verifies if the stored token is still valid with the backend.
 */
export async function verifyAdminSession(token: string): Promise<{ authenticated: boolean; email?: string }> {
  try {
    const res = await fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      return { authenticated: Boolean(data.authenticated), email: data.admin?.email };
    }
  } catch (e) {
    console.error('Session verification error:', e);
  }
  return { authenticated: false };
}

/**
 * Admin: Fetches all waitlist registrations from the backend.
 */
export async function getAdminWaitlist(token: string): Promise<WaitlistEntry[]> {
  const res = await fetch('/api/admin/waitlist', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch waitlist (${res.status})`);
  }

  const data = await res.json();
  return data.entries || [];
}

/**
 * Admin: Deletes a specific waitlist entry by ID.
 */
export async function deleteAdminWaitlistEntry(token: string, id: string): Promise<boolean> {
  const res = await fetch(`/api/admin/waitlist/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to delete record');
  }

  const data = await res.json();
  return Boolean(data.success);
}

/**
 * Admin: Logs out and invalidates the session.
 */
export async function logoutAdmin(token?: string | null): Promise<void> {
  if (token) {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // ignore network errors on logout
    }
  }

  try {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_EMAIL_KEY);
  } catch {
    // ignore
  }
}
