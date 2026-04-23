import '../colors_and_type.css';
import './globals.css';
import { PasswordGate } from '../components/PasswordGate';
import { SiteShell } from '../components/SiteShell';

export const metadata = {
  title: 'Ratehub.ca — Smarter Financial Choices, Simplified.',
  description: "Canada's #1 financial comparison platform. Compare mortgages, credit cards, savings accounts, and insurance from 30+ lenders. Free, unbiased, updated daily.",
  openGraph: {
    title: 'Ratehub.ca — Smarter Financial Choices, Simplified.',
    description: 'Compare mortgages, credit cards, banking, and insurance side-by-side. Zero fees, zero spam.',
    type: 'website',
  },
  icons: { icon: '/assets/brand/favicon-32x32.png' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PasswordGate>
          <SiteShell>{children}</SiteShell>
        </PasswordGate>
      </body>
    </html>
  );
}
