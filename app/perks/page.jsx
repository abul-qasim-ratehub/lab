'use client';

import { PerksIndex } from '../../components/PerksLanding';
import { useNav } from '../../components/useNav';

export default function Page() {
  const go = useNav();
  return <PerksIndex onNavigate={go} />;
}
