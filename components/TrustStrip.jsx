'use client';

import { Icon } from './primitives';

export const TrustStrip = () => {
  const stats = [
    { n: '12M+', l: 'Canadians helped' },
    { n: '$8.6B', l: 'Mortgages funded' },
    { n: '30+',   l: 'Lenders compared' },
    { n: '4.9',   l: 'Trustpilot rating' },
  ];
  return (
    <section style={{ background: 'var(--rh-stone-lightest)', padding: '56px 28px' }}>
      <div className="rh-grid-4" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, alignItems: 'center' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div className="showDot" style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--rh-blueberry-darkest)', lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', marginTop: 6, fontWeight: 500 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

