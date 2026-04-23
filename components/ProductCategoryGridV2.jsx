'use client';

import React from 'react';
import { Anchor, Icon, Pill } from './primitives';

export const ProductCategoryGridV2 = ({ onNavigate }) => {
  const cats = [
    { id: 'mortgages', icon: 'house',       name: 'Mortgages',    desc: 'Compare 30+ lenders',       badge: '4.39% fixed',  tone: 'berry' },
    { id: 'cards',     icon: 'credit-card', name: 'Credit cards', desc: '200+ cards. One quiz.',      badge: '4% cash back', tone: 'lime'  },
    { id: 'banking',   icon: 'piggy',       name: 'Savings',      desc: 'Up to 5.25% interest',       badge: '4.00% HISA',   tone: 'mint'  },
    { id: 'insurance', icon: 'shield',      name: 'Insurance',    desc: 'Home, auto, life & travel',  badge: 'Save 32%',     tone: 'yuzu'  },
    { id: 'investing', icon: 'trending',    name: 'Investing',    desc: 'GICs, ETFs & robo-advisors', badge: '5.10% GIC',    tone: 'lime'  },
    { id: 'tools',     icon: 'calculator',  name: 'Tools',        desc: '20+ free calculators',       badge: 'Free',         tone: 'stone' },
  ];
  const [hovered, setHovered] = React.useState(null);
  return (
    <section style={{ padding: '72px 28px 40px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="rh-vertical-eyebrow">Everything in one place</div>
          <h2 style={{ fontSize: 30, fontWeight: 500, margin: '0 0 8px', letterSpacing: '-0.015em' }}>One place. Every product.</h2>
          <p style={{ fontSize: 15, color: 'var(--rh-blackberry-light)', margin: 0, maxWidth: 520, lineHeight: 1.5 }}>
            Compare side-by-side, apply in minutes, and track every financial decision from one dashboard.
          </p>
        </div>
        <Anchor>See everything we compare</Anchor>
      </div>
      <div className="rh-grid-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
        {cats.map(c => (
          <button key={c.id} className="rh-cat-card" onClick={() => onNavigate(c.id)}
            onMouseEnter={() => setHovered(c.id)} onMouseLeave={() => setHovered(null)}
            style={{
              background: '#fff',
              border: `1.5px solid ${hovered === c.id ? 'var(--rh-blueberry)' : 'var(--rh-stone-light)'}`,
              borderRadius: 16, padding: '22px 16px',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14,
              cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              boxShadow: hovered === c.id ? 'var(--rh-shadow-m)' : 'var(--rh-shadow-xs)',
              transform: hovered === c.id ? 'translateY(-4px)' : 'none',
              transition: 'all 250ms ease',
            }}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: hovered === c.id ? 'var(--rh-blueberry-lightest)' : 'var(--rh-stone-lightest)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 250ms',
            }}>
              <Icon name={c.icon} size={26} color="var(--rh-blueberry-dark)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: 'var(--rh-stone-darkest)', lineHeight: 1.4 }}>{c.desc}</div>
            </div>
            <Pill tone={c.tone}>{c.badge}</Pill>
          </button>
        ))}
      </div>
    </section>
  );
};
