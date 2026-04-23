'use client';

import { MembersDashboard } from '../../components/MembersDashboard';
import { useNav } from '../../components/useNav';

export default function Page() {
  const go = useNav();
  return <MembersDashboard onNavigate={go} />;
}
