'use client';

import { HomeValueEstimator } from '../../components/HomeValueEstimator';
import { useNav } from '../../components/useNav';

export default function Page() {
  const go = useNav();
  return <HomeValueEstimator onNavigate={go} />;
}
