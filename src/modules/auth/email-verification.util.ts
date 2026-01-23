import * as crypto from 'crypto';

/**
 * Generates an HMAC-based verification code for email verification
 * @param email - User's email address
 * @param userId - User's unique identifier
 * @returns HMAC verification code
 */
export function generateEmailVerificationCode(
  email: string,
  userId: string,
): string {
  const secret = process.env.EMAIL_VERIFICATION_SECRET;

  if (!secret) {
    throw new Error('EMAIL_VERIFICATION_SECRET is not defined in environment');
  }

  const data = `${email}:${userId}`;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(data);

  return hmac.digest('hex');
}

/**
 * Verifies an HMAC-based verification code for email verification
 * @param email - User's email address
 * @param userId - User's unique identifier
 * @param code - Verification code to verify
 * @returns True if the code is valid, false otherwise
 */
export function verifyEmailVerificationCode(
  email: string,
  userId: string,
  code: string,
): boolean {
  try {
    const expectedCode = generateEmailVerificationCode(email, userId);
    return crypto.timingSafeEqual(
      Buffer.from(code, 'hex'),
      Buffer.from(expectedCode, 'hex'),
    );
  } catch (error) {
    console.error('Error verifying email verification code:', error);
    // If there's any error (invalid hex, length mismatch, etc), return false
    return false;
  }
}
