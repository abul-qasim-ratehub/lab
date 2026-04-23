'use client';

import { InsurancePage } from '../../components/InsurancePage';
import { useNav } from '../../components/useNav';

export default function Page() {
  const go = useNav();
  return <InsurancePage onNavigate={go} />;
}
