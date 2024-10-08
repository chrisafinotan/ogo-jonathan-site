import { NextResponse } from 'next/server';

export function middleware(request) {
    const session = request.cookies.get('session')?.value;
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/api/:path*', '/admin/:path*'],
};
