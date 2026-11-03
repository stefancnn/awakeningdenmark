import test from 'node:test';
import assert from 'node:assert/strict';
import { validateWaitlistForm, generateTicketNumber } from './waitlist';

test('validateWaitlistForm detects missing fields', () => {
  const result = validateWaitlistForm({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    postalCode: '',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.firstName);
  assert.ok(result.errors.lastName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.city);
  assert.ok(result.errors.country);
  assert.ok(result.errors.postalCode);
});

test('validateWaitlistForm validates email format correctly', () => {
  const invalidEmail = validateWaitlistForm({
    firstName: 'Lars',
    lastName: 'Mikkelsen',
    email: 'not-an-email',
    phone: '+45 20 12 34 56',
    city: 'Copenhagen',
    country: 'Denmark',
    postalCode: '1050',
  });
  assert.equal(invalidEmail.isValid, false);
  assert.equal(invalidEmail.errors.email, 'Please provide a valid email address');

  const valid = validateWaitlistForm({
    firstName: 'Lars',
    lastName: 'Mikkelsen',
    email: 'lars@harvestdenmark.dk',
    phone: '+45 20 12 34 56',
    city: 'Copenhagen',
    country: 'Denmark',
    postalCode: '1050',
  });
  assert.equal(valid.isValid, true);
  assert.deepEqual(valid.errors, {});
});

test('generateTicketNumber generates proper prefix and length', () => {
  const ticket = generateTicketNumber('DK-FIRE');
  assert.ok(ticket.startsWith('DK-FIRE-'));
  assert.equal(ticket.length, 'DK-FIRE-XXXXX'.length);
});
