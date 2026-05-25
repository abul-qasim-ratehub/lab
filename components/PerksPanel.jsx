'use client';

// PerksPanel — "Your perks" tab inside MembersDashboard.
// Renders the launch partner card (Willful) + a templated grid that scales
// to partner #2/#3/... by adding entries to PERK_CATALOG.

import React from 'react';
import { Anchor, Button, Card, Icon, Pill } from './primitives';

const WILLFUL_URL = 'https://app.willful.co/sign-up?discount=gay8y9jiya73&utm_source=ratehub-members&utm_medium=partner';

const PERK_CATALOG = [
  {
    id: 'willful',
    status: 'live',
    category: 'Estate planning',
    partner: 'Willful',
    eyebrow: 'New · Featured perk',
    title: 'Make your will online — 20% off',
    description:
      'Canada’s leading online will platform. Build a legally valid will in 20 minutes, with free updates for life.',
    discount: '20%',
    discountLabel: 'off',
    tone: 'berry',
    cta: 'Claim your discount',
    href: WILLFUL_URL,
    bullets: [
      'Built and reviewed by Canadian lawyers',
      'Plans from $99 (under $80 with your perk)',
      'Free updates for life',
      'Available across Canada',
    ],
    terms: [
      'Offer valid for new Willful customers only.',
      'Discount applies to the regular plan price at checkout via the Ratehub member link.',
      'Cannot be combined with other promotional codes or partner offers.',
      'Ratehub may earn an affiliate commission. This does not affect your discount or price.',
      'Willful’s service is governed by their own Terms of Service and Privacy Policy.',
    ],
  },
  {
    id: 'coming-tangerine',
    status: 'coming-soon',
    category: 'Banking',
    partner: 'Coming soon',
    title: 'High-interest savings perk',
    description: 'A bonus rate for Ratehub members opening a new savings account. Launching shortly.',
    tone: 'stone',
  },
  {
    id: 'coming-insurance',
    status: 'coming-soon',
    category: 'Insurance',
    partner: 'Coming soon',
    title: 'Auto + home insurance perk',
    description: 'Exclusive member-only quote credit when you bundle through Ratehub.',
    tone: 'stone',
  },
];

const PerkBadge = ({ children, tone = 'berry' }) => (
  <Pill tone={tone}>{children}</Pill>
);

const TermsReveal = ({ items }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ marginTop: 18, paddingTop: 18, borderTop: '1px solid var(--rh-stone-lightest)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          fontFamily: 'inherit', fontSize: 12, fontWeight: 500,
          color: 'var(--rh-blueberry-dark)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}
        aria-expanded={open}
      >
        {open ? '− Hide terms & conditions' : '+ Terms & conditions · Learn more'}
      </button>
      {open && (
        <ul style={{
          listStyle: 'disc', paddingLeft: 18, marginTop: 12,
          fontSize: 12, lineHeight: 1.6, color: 'var(--rh-blackberry-light)',
        }}>
          {items.map((t) => <li key={t} style={{ marginBottom: 6 }}>{t}</li>)}
        </ul>
      )}
    </div>
  );
};

const FeaturedPerkCard = ({ perk }) => (
  <Card style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--rh-stone-light)' }}>
    <div className="rh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 0 }}>

      <div style={{ padding: '32px 32px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <PerkBadge tone="yuzu">
            <Icon name="star" size={12} color="var(--rh-yuzu-darkest)" />
            {perk.eyebrow}
          </PerkBadge>
          <span style={{ fontSize: 12, color: 'var(--rh-stone-darkest)' }}>{perk.category}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ fontSize: 13, color: 'var(--rh-stone-darkest)' }}>Ratehub</span>
          <span style={{ fontSize: 13, color: 'var(--rh-stone-darkest)' }}>+</span>
          <span style={{
            fontSize: 14, fontWeight: 700, color: 'var(--rh-blackberry)',
            padding: '4px 10px', border: '1px solid var(--rh-stone)', borderRadius: 6,
          }}>
            {perk.partner}
          </span>
        </div>

        <h3 style={{
          fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em',
          color: 'var(--rh-blackberry)', margin: '0 0 10px', lineHeight: 1.2,
        }}>
          {perk.title}
        </h3>

        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--rh-blackberry-light)', margin: '0 0 18px' }}>
          {perk.description}
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {perk.bullets.map((b) => (
            <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: 'var(--rh-blackberry)' }}>
              <span style={{
                width: 18, height: 18, borderRadius: '50%',
                background: 'var(--rh-lime-lightest)', color: 'var(--rh-lime-dark)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 12 10 18 20 6" />
                </svg>
              </span>
              {b}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <Button
            variant="primary"
            size="m"
            onClick={() => window.open(perk.href, '_blank', 'noopener,noreferrer')}
          >
            {perk.cta} →
          </Button>
          <Anchor href={perk.href}>Visit Willful</Anchor>
        </div>

        <TermsReveal items={perk.terms} />
      </div>

      <div
        style={{
          background: 'var(--rh-blueberry-darkest)', color: '#fff',
          padding: '40px 32px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute', right: -60, top: -60,
            width: 260, height: 260, borderRadius: '50%',
            background: 'radial-gradient(circle at center, rgba(231,234,76,0.18), transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div>
          <Pill tone="yuzu">Your member perk</Pill>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, margin: '20px 0 8px' }}>
            {perk.discount}
            <span style={{ fontSize: 22, fontWeight: 500, marginLeft: 8, letterSpacing: 0 }}>{perk.discountLabel}</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>
            your online legal will
          </div>
          <div style={{ fontSize: 13, opacity: 0.7, marginTop: 8, lineHeight: 1.5 }}>
            Free updates for life, included. The market discount is typically ~20% — that’s what you’re getting, every day of the year, as a Ratehub member.
          </div>
        </div>

        <div style={{
          marginTop: 28, paddingTop: 20,
          borderTop: '1px solid rgba(255,255,255,0.12)',
          fontSize: 12, opacity: 0.7, lineHeight: 1.55,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <Icon name="lock" size={14} color="rgba(255,255,255,0.7)" />
            Your discount is auto-applied via the Ratehub partner link.
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const ComingSoonCard = ({ perk }) => (
  <Card style={{ padding: 24, opacity: 0.95 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
      <Pill tone="stone">{perk.category}</Pill>
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--rh-stone-darkest)', textTransform: 'uppercase', letterSpacing: '.09em' }}>
        Coming soon
      </span>
    </div>
    <h4 style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--rh-blackberry)', margin: '0 0 8px' }}>
      {perk.title}
    </h4>
    <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--rh-blackberry-light)', margin: 0 }}>
      {perk.description}
    </p>
  </Card>
);

export const PerksPanel = ({ memberName, claim }) => {
  const featured = PERK_CATALOG.find((p) => p.id === (claim || 'willful')) || PERK_CATALOG[0];
  const comingSoon = PERK_CATALOG.filter((p) => p.status === 'coming-soon');

  // If the user came in via /login?partner=willful, scroll the featured card into view.
  const featuredRef = React.useRef(null);
  React.useEffect(() => {
    if (claim && featuredRef.current) {
      featuredRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [claim]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <Icon name="gift" size={18} color="var(--rh-blueberry-dark)" />
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--rh-blueberry-dark)', textTransform: 'uppercase', letterSpacing: '.09em' }}>
            Your perks
          </span>
        </div>
        <h2 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: 'var(--rh-blackberry)' }}>
          {memberName ? `${memberName}, your perks are ready.` : 'Your member perks are ready.'}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--rh-blackberry-light)', margin: '6px 0 0', maxWidth: 640, lineHeight: 1.6 }}>
          Every Ratehub member gets exclusive savings on the brands Canadians trust. Claim your perks below — new partners added every month.
        </p>
      </div>

      <div ref={featuredRef}>
        <FeaturedPerkCard perk={featured} />
      </div>

      <div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--rh-blackberry)', textTransform: 'uppercase', letterSpacing: '.08em', margin: '8px 0 14px' }}>
          More perks on the way
        </h3>
        <div className="rh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {comingSoon.map((p) => <ComingSoonCard key={p.id} perk={p} />)}
        </div>
      </div>

      <Card style={{ padding: '20px 24px', background: 'var(--rh-stone-lightest)', border: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--rh-blackberry)', marginBottom: 4 }}>
              Got a brand you’d love to see as a Ratehub perk?
            </div>
            <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)' }}>
              Tell us — we’re curating partners for our member community.
            </div>
          </div>
          <Button variant="secondary" size="s">Suggest a partner</Button>
        </div>
      </Card>
    </div>
  );
};
