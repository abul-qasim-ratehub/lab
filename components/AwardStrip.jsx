'use client';

import { Icon } from './primitives';

export const AwardStrip = () => {
  const awards = [
    { icon: 'trophy',    label: 'MoneySense',  sub: 'Best Rate Platform 2024'    },
    { icon: 'award',     label: 'CanWise',     sub: 'Best Mortgage Broker 2023'  },
    { icon: 'star',      label: 'Webby Award', sub: 'Excellence in Finance 2023' },
    { icon: 'award',     label: 'CMA',         sub: 'Digital Marketing 2024'     },
    { icon: 'checkmark', label: 'BBB',         sub: 'A+ Accredited Business'     },
  ];
  return (
    <section style={{ background: 'var(--rh-stone-lightest)', padding: '28px 28px', borderTop: '1px solid var(--rh-stone-light)', borderBottom: '1px solid var(--rh-stone-light)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--rh-stone-darkest)', flexShrink: 0 }}>Industry recognition</span>
        {awards.map((a, i) => (
          <div key={i} className="rh-award-item" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name={a.icon} size={18} color="var(--rh-yuzu-dark)" />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--rh-blackberry)', lineHeight: 1.1 }}>{a.label}</div>
              <div style={{ fontSize: 11, color: 'var(--rh-stone-darkest)' }}>{a.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
