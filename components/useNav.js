'use client';

import { useRouter } from 'next/navigation';

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
};

export function useNav() {
  const router = useRouter();
  return (id) => {
    const path = PATH_BY_ID[id] || '/';
    router.push(path);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
}
