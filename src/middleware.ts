export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/((?!api|login|_next/static|manifest.webmanifest|_next/image|favicon.ico|icon.*).*)'],
};
