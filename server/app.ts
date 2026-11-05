import express, { Request, Response, NextFunction } from 'express';
import { verifyAdminCredentials, createSession, validateSession, revokeSession } from './auth';
import { addWaitlistEntry, loadWaitlist, deleteWaitlistEntry } from './db';

export const app = express();

app.use(express.json());

// Auth middleware for admin-protected routes
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  
  const { valid, email } = validateSession(token);
  if (!valid) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired session' });
  }

  (req as any).adminEmail = email;
  next();
}

// -------------------------------------------------------------
// PUBLIC WAITLIST ENDPOINTS
// -------------------------------------------------------------

// Submit entry to waitlist
app.post('/api/waitlist', (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, city, country, postalCode, roleInterest, churchName } = req.body;

    if (!firstName || !lastName || !email || !phone || !city || !country || !postalCode) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const entry = addWaitlistEntry({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city: city.trim(),
      country: country.trim(),
      postalCode: postalCode.trim(),
      roleInterest: roleInterest || 'believer',
      churchName: churchName?.trim() || undefined,
    });

    res.status(201).json({ success: true, entry });
  } catch (err) {
    console.error('Error submitting waitlist entry:', err);
    res.status(500).json({ error: 'Internal server error saving registration' });
  }
});

// Public total count
app.get('/api/waitlist/count', (_req: Request, res: Response) => {
  try {
    const records = loadWaitlist();
    res.json({ count: records.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve count' });
  }
});

// -------------------------------------------------------------
// ADMIN AUTHENTICATION ENDPOINTS
// -------------------------------------------------------------

// Admin login
app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const isValid = verifyAdminCredentials(email, password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = createSession(email);
    res.json({
      success: true,
      token,
      admin: {
        email: email.trim().toLowerCase(),
      },
    });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// Check current session
app.get('/api/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  const { valid, email } = validateSession(token);

  if (!valid) {
    return res.status(401).json({ authenticated: false });
  }

  res.json({ authenticated: true, admin: { email } });
});

// Admin logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  if (token) {
    revokeSession(token);
  }
  res.json({ success: true });
});

// -------------------------------------------------------------
// PROTECTED ADMIN WAITLIST ENDPOINTS
// -------------------------------------------------------------

// Get full waitlist records for admin dashboard
app.get('/api/admin/waitlist', requireAdmin, (_req: Request, res: Response) => {
  try {
    const records = loadWaitlist();
    res.json({ success: true, count: records.length, entries: records });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load waitlist' });
  }
});

// Delete a waitlist record
app.delete('/api/admin/waitlist/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = deleteWaitlistEntry(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ success: true, message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete record' });
  }
});
