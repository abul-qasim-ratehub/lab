'use client';

// PerksSiderail — reusable promo block for siderails, in-flow surfaces,
// and confirmation pages. Two variants: 'willful' (launch) and 'generic'
// (post-launch when the program grows beyond partner #1).

import React from 'react';
import { Button, Card, Icon, Pill } from './primitives';

const CONFIG = {
  willful: {
    eyebrow: 'New member perk',
    title: '20% off your online will',
    body: 'Ratehub members save 20% on Willful — Canada’s leading online will platform. Free updates for life.',
    ctaLabel: 'Claim your perk →',
    badge: '20%',
  },
  generic: {
    eyebrow: 'Member perks',
    title: 'Exclusive savings inside',
    body: 'Sign up free to unlock curated perks on the brands Canadians trust — wills, banking, insurance, and more.',
    ctaLabel: 'See your perks →',
    badge: '$',
  },
};

export const PerksSiderail = ({ variant = 'willful', onClaim, layout = 'rail' }) => {
  const c = CONFIG[variant] || CONFIG.generic;

  if (layout === 'strip') {
    // Horizontal full-width strip — drop into a page between sections.
    return (
      <section style={{ background: 'var(--rh-blueberry-darkest)', color: '#fff' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '24px 28px',
          display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 12,
            background: 'var(--rh-yuzu-lightest)', color: 'var(--rh-blueberry-darkest)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 20, flexShrink: 0,
          }}>
            {c.badge}
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--rh-yuzu-lightest)', textTransform: 'uppercase', letterSpacing: '.09em', marginBottom: 4 }}>
              {c.eyebrow}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.015em', marginBottom: 4 }}>
              {c.title}
            </div>
            <div style={{ fontSize: 14, opacity: 0.78, lineHeight: 1.5 }}>{c.body}</div>
          </div>
          <Button variant="coconut" size="m" onClick={onClaim}>
            {c.ctaLabel}
          </Button>
        </div>
      </section>
    );
  }

  // Default — compact siderail card.
  return (
    <Card style={{
      padding: 0, overflow: 'hidden',
      background: 'var(--rh-blueberry-darkest)',
      color: '#fff', border: 'none',
      maxWidth: 320,
    }}>
      <div style={{ padding: '22px 22px 18px', position: 'relative' }}>
        <div
          aria-hidden
          style={{
            position: 'absolute', top: -40, right: -40,
            width: 180, height: 180, borderRadius: '50%',
            background: 'radial-gradient(circle at center, rgba(231,234,76,0.18), transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <Pill tone="yuzu" icon={<Icon name="gift" size={12} color="var(--rh-yuzu-darkest)" />}>
          {c.eyebrow}
        </Pill>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em', margin: '14px 0 6px', lineHeight: 1.2 }}>
          {c.title}
        </div>
        <div style={{ fontSize: 13, opacity: 0.78, lineHeight: 1.55, marginBottom: 16 }}>
          {c.body}
        </div>
        <Button variant="coconut" size="s" onClick={onClaim}>{c.ctaLabel}</Button>
      </div>
      <div style={{ padding: '10px 22px', background: 'rgba(255,255,255,0.06)', fontSize: 11, opacity: 0.72, lineHeight: 1.5 }}>
        Free to join · Cancel anytime
      </div>
    </Card>
  );
};
