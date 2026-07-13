import { adminAuth } from '@/app/lib/firebase-admin';
import { cookies } from 'next/headers';

export const SESSION_COOKIE_NAME = 'session';
export const SESSION_DURATION_MS = 60 * 60 * 24 * 7 * 1000; // 7 days in milliseconds
export const SESSION_DURATION_S = SESSION_DURATION_MS / 1000;

export default async function setSessionCookie(idToken: string): Promise<void> {
  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION_MS,
  });

  (await cookies()).set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true, // not accessible via JS — prevents XSS token theft
    secure: true, // HTTPS only in prod
    sameSite: 'lax', // protects against CSRF
    maxAge: SESSION_DURATION_S,
    path: '/',
  });
}
