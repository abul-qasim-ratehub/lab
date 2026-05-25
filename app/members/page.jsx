'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MembersDashboard } from '../../components/MembersDashboard';
import { useNav } from '../../components/useNav';
import { useAuth } from '../../components/AuthProvider';

function MembersInner() {
  const go = useNav();
  const params = useSearchParams();
  const tab = params.get('tab') || 'overview';
  const claim = params.get('claim');
  const { authenticated, loading, user, login } = useAuth();

  useEffect(() => {
    if (!loading && !authenticated) {
      // Real BFF login if configured; otherwise fall through to the custom /login screen.
      try { login(); } catch { go('login'); }
    }
  }, [authenticated, loading, login, go]);

  if (loading) {
    return (
      <div style={{ padding: '64px 28px', textAlign: 'center' }}>
        <p style={{ color: 'var(--rh-stone-darkest)' }}>Loading member data...</p>
      </div>
    );
  }

  // For the prototype we let the dashboard render even when not authenticated
  // so the perks tab is reachable from the /login mock — real auth gating
  // continues to live in AuthProvider for the production wiring.
  return (
    <MembersDashboard
      onNavigate={go}
      authenticatedUser={user}
      initialTab={tab}
      claim={claim}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: '64px 28px', textAlign: 'center', color: 'var(--rh-stone-darkest)' }}>Loading…</div>}>
      <MembersInner />
    </Suspense>
  );
}
