'use client';

import { PerksPartner } from '../../../components/PerksLanding';
import { useNav } from '../../../components/useNav';

export default function Page() {
  const go = useNav();
  return <PerksPartner onNavigate={go} />;
}
