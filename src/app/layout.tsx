import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from '@/lib/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adelaide",
  description: "Baby's first Next.js app",
  generator: "Next.js",
  manifest: "/manifest.webmanifest",
  authors: [
    { name: "Ben Binder" },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "/icon-128x128.png" },
    { rel: "icon", url: "/icon-128x128.png" },
  ],
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#08adff' },
    { media: '(prefers-color-scheme: dark)', color: '#08adff' },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <SessionProvider session={session}><body className={inter.className}>{children}</body></SessionProvider>
    </html>
  );
}
