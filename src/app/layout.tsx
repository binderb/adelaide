import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from '@/lib/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import "react-toastify/dist/ReactToastify.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adelaide",
  description: "Baby's first Next.js app",
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
