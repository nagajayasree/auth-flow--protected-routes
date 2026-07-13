import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/app/lib/session';


export async function middleware(req: NextRequest) {
  const token = await req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
