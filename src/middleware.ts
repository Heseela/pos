import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes: Record<string, string[]> = {
  '/dashboard': ['admin', 'branch-head', 'cashier', 'waiter'],
  '/orders': ['admin', 'branch-head', 'cashier', 'waiter'],
  '/inventory': ['admin', 'branch-head'],
  '/ledger': ['admin', 'branch-head'],
  '/reports': ['admin', 'branch-head'],
  '/purchases': ['admin', 'branch-head'],
  '/branches': ['admin'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (pathname === '/login' || pathname.startsWith('/_next/') || pathname.includes('.')) {
    return NextResponse.next();
  }
  
  const route = Object.keys(protectedRoutes).find(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  if (route) {
    const userCookie = request.cookies.get('user');
    
    if (!userCookie) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    try {
      const user = JSON.parse(userCookie.value);
      const allowedRoles = protectedRoutes[route];
      
      if (!allowedRoles.includes(user.role)) {
        const redirectUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  } else if (pathname === '/') {
    const userCookie = request.cookies.get('user');
    if (!userCookie) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/orders/:path*',
    '/inventory/:path*',
    '/ledger/:path*',
    '/reports/:path*',
    '/purchases/:path*',
    '/branches/:path*',
  ],
};