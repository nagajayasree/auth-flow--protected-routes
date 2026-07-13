import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE_NAME } from '@/app/lib/session';

export default async function Main() {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  redirect(token ? '/dashboard' : '/login');
}
