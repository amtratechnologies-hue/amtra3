import bcrypt from 'bcryptjs';

const BCRYPT_ROUNDS = 12;

// A fixed, valid hash used to keep failed-login timing consistent when the
// username does not exist. It is not tied to any real account.
const DUMMY_PASSWORD_HASH =
  '$2b$12$xZndjaDtMP7UdJWnK4o9suDuX.uPu9zfvifUWrtgFgx5pLp4D2r.2';

export async function hashPassword(password) {
  if (typeof password !== 'string' || password.length === 0) {
    throw new Error('A password is required to create a hash.');
  }

  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password, hash) {
  if (typeof password !== 'string' || typeof hash !== 'string' || !hash) {
    return false;
  }

  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

export async function verifyAgainstDummy(password) {
  try {
    await bcrypt.compare(
      typeof password === 'string' ? password : '',
      DUMMY_PASSWORD_HASH,
    );
  } catch {
    // Timing equalization only; the result is intentionally discarded.
  }
}
