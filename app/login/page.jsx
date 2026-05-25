'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PerksLogin } from '../../components/PerksLogin';

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  // ?partner=willful (default) or ?partner=generic — same screen, swappable copy.
  const partner = params.get('partner') || 'willful';

  return (
    <PerksLogin
      partner={partner}
      onBackHome={() => router.push('/')}
      onAuthenticated={({ tab, partner: p }) => {
        const qs = new URLSearchParams();
        if (tab) qs.set('tab', tab);
        if (p) qs.set('claim', p);
        router.push(`/members?${qs.toString()}`);
      }}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: '64px 28px', textAlign: 'center', color: 'var(--rh-stone-darkest)' }}>Loading…</div>}>
      <LoginInner />
    </Suspense>
  );
}
