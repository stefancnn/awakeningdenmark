import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyAdminCredentials, createSession, validateSession, revokeSession } from './auth';

test('verifyAdminCredentials allows authorized account 1 (stefancnn@gmail.com)', () => {
  const result = verifyAdminCredentials('stefancnn@gmail.com', '@aA1234554321');
  assert.equal(result, true);
});

test('verifyAdminCredentials normalizes casing and trimming on authorized account 1', () => {
  const result = verifyAdminCredentials('  STEFANCNN@GMAIL.COM ', '@aA1234554321');
  assert.equal(result, true);
});

test('verifyAdminCredentials allows authorized account 2 (descheemaeckeryaniv@gmail.com)', () => {
  const result = verifyAdminCredentials('descheemaeckeryaniv@gmail.com', 'Yaniv-777');
  assert.equal(result, true);
});

test('verifyAdminCredentials rejects wrong password for authorized emails', () => {
  assert.equal(verifyAdminCredentials('stefancnn@gmail.com', 'WrongPassword123'), false);
  assert.equal(verifyAdminCredentials('descheemaeckeryaniv@gmail.com', '@aA1234554321'), false); // Swapped
  assert.equal(verifyAdminCredentials('stefancnn@gmail.com', 'Yaniv-777'), false); // Swapped
});

test('verifyAdminCredentials rejects unauthorized emails completely', () => {
  assert.equal(verifyAdminCredentials('admin@harvestdenmark.dk', '@aA1234554321'), false);
  assert.equal(verifyAdminCredentials('user@gmail.com', 'Yaniv-777'), false);
  assert.equal(verifyAdminCredentials('', ''), false);
});

test('createSession, validateSession, and revokeSession manage active admin sessions', () => {
  const token = createSession('stefancnn@gmail.com');
  assert.ok(token);

  const validation = validateSession(token);
  assert.equal(validation.valid, true);
  assert.equal(validation.email, 'stefancnn@gmail.com');

  // Revoke on logout
  revokeSession(token);
  const recheck = validateSession(token);
  assert.equal(recheck.valid, false);
});
