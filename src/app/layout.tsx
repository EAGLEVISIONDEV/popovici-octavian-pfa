import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Popovici Octavian PFA | Software Developer',
  description:
    'Dezvoltare software profesională - Aplicații web moderne, API-uri scalabile și soluții cloud. Full-Stack Developer cu experiență în React, Next.js, Node.js și TypeScript.',
  keywords: [
    'software developer', 'web development', 'React', 'Next.js', 'TypeScript',
    'Node.js', 'full-stack developer', 'PFA', 'Popovici Octavian',
    'freelancer', 'România', 'București', 'dezvoltare software',
  ],
  authors: [{ name: 'Octavian Popovici' }],
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    title: 'Popovici Octavian PFA | Software Developer',
    description: 'Dezvoltare software profesională - Aplicații web moderne, API-uri scalabile și soluții cloud.',
    siteName: 'Popovici Octavian PFA',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#020617" />
      </head>
      <body className="min-h-screen bg-dark-950 text-dark-100 font-sans">
        {children}
      </body>
    </html>
  );
}
