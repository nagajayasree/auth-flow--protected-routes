'use server';

import { adminAuth } from '@/app/lib/firebase-admin';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FirebaseError } from 'firebase-admin';
import setSessionCookie from '@/app/lib/session';
import { SESSION_COOKIE_NAME } from '@/app/lib/session';

interface AuthFormData {
  name?: string; // used by register only
  email: string;
  password: string;
}

interface ActionError {
  error: string;
}

export interface SessionPayload {
  uid: string;
  email: string | null;
  name: string | null;
}

function mapFirebaseError(code: string): string {
  switch (code) {
    case 'auth/email-already-exists':
      return 'An account with this email already exists.';
    case 'auth/missing-email':
      return 'Please enter an email address.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password must be at least 8 characters.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid credentials. Check your email and password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a few minutes and try again.';
    case 'auth/session-cookie-expired':
      return 'Your session has expired. Please sign in again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export async function register(
  data: AuthFormData,
  idToken: string,
): Promise<ActionError | void> {
  // Basic server-side validation
  if (!data.email || !data.password) {
    return { error: 'Email and password are required.' };
  }

  if (data.password.length < 8) {
    return { error: 'Password must be at least 8 characters.' };
  }

  try {
    // To update the display name on the Firebase Auth record
    // The client SDK already created the user — just patch the name
    const decoded = await adminAuth.verifyIdToken(idToken);
    await adminAuth.updateUser(decoded.uid, {
      displayName: data.name ?? '',
    });
    await setSessionCookie(idToken);
  } catch (err) {
    const code = (err as FirebaseError).code ?? '';
    return { error: mapFirebaseError(code) };
  }
}

export async function login(idToken: string): Promise<ActionError | void> {
  if (!idToken) {
    return { error: 'Invalid credentials. Check your email and password.' };
  }

  try {
    // Verify the token is genuine and not expired or tampered
    // checkRevoked: true also catches tokens from users who've been disabled
    await adminAuth.verifyIdToken(idToken, true);
    await setSessionCookie(idToken);
  } catch (err) {
    const code = (err as FirebaseError).code ?? '';
    return { error: mapFirebaseError(code) };
  }
}

export async function logout(): Promise<void> {
  const sessionCookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (sessionCookie) {
    try {
      // Decode the cookie to get the uid — needed for token revocation
      const decoded = await adminAuth.verifySessionCookie(sessionCookie);
      await adminAuth.revokeRefreshTokens(decoded.uid);
    } catch {
      // Cookie may already be expired — still delete it and redirect
    }

    (await cookies()).delete(SESSION_COOKIE_NAME);
  }

  redirect('/login');
}

export async function getSession(): Promise<SessionPayload | null> {
  const sessionCookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    console.log(decoded);
    return {
      uid: decoded.uid,
      email: decoded.email ?? null,
      name: decoded.name ?? null,
    };
  } catch {
    // Expired, revoked, or tampered cookie
    return null;
  }
}
