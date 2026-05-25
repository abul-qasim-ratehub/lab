'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

const PATH_BY_ID = {
  home: '/',
  mortgages: '/mortgages',
  cards: '/cards',
  banking: '/banking',
  insurance: '/insurance',
  investing: '/investing',
  tools: '/tools',
  'home-value': '/home-value',
  members: '/members',
  'design-system': '/design-system',
  affiliates: '/affiliates',
  calculators: '/calculators',
  login: '/login',
  perks: '/perks',
  'perks-willful': '/perks/willful',
};

const ID_BY_PATH = Object.fromEntries(Object.entries(PATH_BY_ID).map(([k, v]) => [v, k]));

const CHROMELESS = new Set(['/login']);

export const SiteShell = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const current = ID_BY_PATH[pathname] || 'home';
  const go = (id) => {
    const path = PATH_BY_ID[id] || '/';
    router.push(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (CHROMELESS.has(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Header current={current} onNavigate={go} />
      {children}
      <Footer />
    </>
  );
};
