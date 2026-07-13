// app/(protected)/layout.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminAuth } from '@/app/lib/firebase-admin';
import { SESSION_COOKIE_NAME } from '@/app/lib/session';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (!token) redirect('/login');

  try {
    await adminAuth.verifySessionCookie(token, true);
  } catch {
    redirect('/login');
  }

  return <>{children}</>;
}
