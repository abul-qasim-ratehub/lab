'use client';

// PerksLanding — public marketing surfaces for the perks program.
// Two layouts share the same primitives: <PerksIndex /> for /perks,
// <PerksPartner /> for /perks/willful (and /perks/<partner-N> later).

import React from 'react';
import { Anchor, Button, Card, CheckBullet, Icon, Pill } from './primitives';

const PARTNERS = [
  {
    id: 'willful',
    name: 'Willful',
    status: 'live',
    category: 'Estate planning',
    tagline: 'Make a legal will online in 20 minutes.',
    discount: '20% off',
    href: '/perks/willful',
    tone: 'berry',
  },
  {
    id: 'coming-banking',
    name: 'A high-interest savings partner',
    status: 'coming-soon',
    category: 'Banking',
    tagline: 'Bonus rate on your first deposit.',
    discount: 'Coming soon',
    tone: 'stone',
  },
  {
    id: 'coming-insurance',
    name: 'A home & auto insurance partner',
    status: 'coming-soon',
    category: 'Insurance',
    tagline: 'Member-only quote credits.',
    discount: 'Coming soon',
    tone: 'stone',
  },
  {
    id: 'coming-investing',
    name: 'A self-directed investing partner',
    status: 'coming-soon',
    category: 'Investing',
    tagline: 'Account-opening bonus for members.',
    discount: 'Coming soon',
    tone: 'stone',
  },
];

const SECTION = { maxWidth: 1280, margin: '0 auto', padding: '72px 28px' };

const Hero = ({ eyebrow, title, sub, ctaLabel, onCta, secondaryLabel, onSecondary }) => (
  <section className="rh-hero-section" style={{ background: 'var(--rh-blueberry-darkest)', color: '#fff', padding: '88px 28px' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto' }}>
      <Pill tone="yuzu" icon={<Icon name="gift" size={14} color="var(--rh-yuzu-darkest)" />}>
        {eyebrow}
      </Pill>
      <h1 className="rh-hero-h1 showDot" style={{
        fontSize: 52, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05,
        margin: '20px 0 14px', maxWidth: 880,
      }}>
        {title}
      </h1>
      <p style={{ fontSize: 17, opacity: 0.78, lineHeight: 1.6, margin: 0, maxWidth: 640 }}>
        {sub}
      </p>
      <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
        <Button variant="coconut" size="l" onClick={onCta}>{ctaLabel}</Button>
        {secondaryLabel && (
          <Button variant="ghost" size="l" style={{ color: '#fff' }} onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        )}
      </div>
    </div>
  </section>
);

const PartnerCard = ({ partner, onClick }) => {
  const live = partner.status === 'live';
  return (
    <Card
      style={{
        padding: 24,
        cursor: live ? 'pointer' : 'default',
        opacity: live ? 1 : 0.85,
        transition: 'box-shadow 200ms, transform 200ms',
      }}
      onClick={() => live && onClick && onClick(partner)}
      onMouseEnter={(e) => { if (live) { e.currentTarget.style.boxShadow = 'var(--rh-shadow-m)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
      onMouseLeave={(e) => { if (live) { e.currentTarget.style.boxShadow = 'var(--rh-shadow-xs)'; e.currentTarget.style.transform = 'none'; } }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <Pill tone={partner.tone}>{partner.category}</Pill>
        <span style={{ fontSize: 12, fontWeight: 600, color: live ? 'var(--rh-blueberry-dark)' : 'var(--rh-stone-darkest)' }}>
          {partner.discount}
        </span>
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--rh-blackberry)', margin: '0 0 6px' }}>
        {partner.name}
      </h3>
      <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--rh-blackberry-light)', margin: '0 0 14px' }}>
        {partner.tagline}
      </p>
      {live ? (
        <Anchor href="#">See the perk</Anchor>
      ) : (
        <span style={{ fontSize: 12, color: 'var(--rh-stone-darkest)', fontWeight: 500 }}>Launching shortly</span>
      )}
    </Card>
  );
};

export const PerksIndex = ({ onNavigate }) => {
  return (
    <div>
      <Hero
        eyebrow="Member perks"
        title="Perks built for Ratehub members"
        sub="Exclusive savings on the brands Canadians trust — wills, banking, insurance, and more. Sign up free, claim your perks, and get more from every visit."
        ctaLabel="Become a member"
        onCta={() => onNavigate && onNavigate('login')}
        secondaryLabel="Already a member? Log in →"
        onSecondary={() => onNavigate && onNavigate('login')}
      />

      <section style={SECTION}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <Pill tone="berry">Live now</Pill>
            <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', margin: '12px 0 6px' }}>
              Available perks
            </h2>
            <p style={{ fontSize: 15, color: 'var(--rh-blackberry-light)', margin: 0 }}>
              Claim instantly when you sign up — free, 30 seconds.
            </p>
          </div>
          <Anchor href="/perks/willful">View Willful perk</Anchor>
        </div>

        <div className="rh-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {PARTNERS.map((p) => (
            <PartnerCard key={p.id} partner={p} onClick={() => onNavigate && onNavigate('perks-willful')} />
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--rh-stone-lightest)' }}>
        <div style={SECTION}>
          <div className="rh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <Pill tone="lime">How it works</Pill>
              <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', margin: '12px 0 14px' }}>
                Three steps to your perks
              </h2>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { n: 1, t: 'Become a member, free', d: 'Sign up with your email — no credit card required.' },
                  { n: 2, t: 'Open your dashboard',     d: 'Your perks tab shows every offer you can claim today.' },
                  { n: 3, t: 'Claim your perk',         d: 'Click through and your member discount is auto-applied.' },
                ].map((s) => (
                  <li key={s.n} style={{ display: 'flex', gap: 14 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'var(--rh-blueberry-dark)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 14, flexShrink: 0,
                    }}>
                      {s.n}
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--rh-blackberry)', marginBottom: 2 }}>{s.t}</div>
                      <div style={{ fontSize: 14, color: 'var(--rh-blackberry-light)', lineHeight: 1.55 }}>{s.d}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <Card style={{ padding: 32 }}>
              <Pill tone="yuzu">Featured perk · Live</Pill>
              <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.015em', margin: '14px 0 8px' }}>
                20% off Willful — Canada’s leading online will
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--rh-blackberry-light)', margin: '0 0 18px' }}>
                Half of Canadians don’t have a will. Willful makes one in 20 minutes — and Ratehub members save 20%, with free updates for life.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px' }}>
                <CheckBullet>Built and reviewed by Canadian lawyers</CheckBullet>
                <CheckBullet>Plans from $99 (under $80 with your perk)</CheckBullet>
                <CheckBullet>Free updates for life</CheckBullet>
              </ul>
              <Button variant="primary" size="m" onClick={() => onNavigate && onNavigate('perks-willful')}>
                See the Willful perk →
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <section style={SECTION}>
        <Card style={{ padding: '40px 48px', background: 'var(--rh-blueberry-darkest)', border: 'none', color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 640 }}>
              <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.015em', margin: '0 0 8px' }}>
                One free account. Every perk, in one place.
              </h3>
              <p style={{ fontSize: 14, opacity: 0.78, margin: 0, lineHeight: 1.6 }}>
                Become a Ratehub member to claim your perks and access your personal dashboard — rate alerts, application history, and exclusive partner offers.
              </p>
            </div>
            <Button variant="coconut" size="l" onClick={() => onNavigate && onNavigate('login')}>
              Become a member →
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--rh-stone-light)' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%', padding: '18px 0',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: 'inherit', fontSize: 16, fontWeight: 600,
          color: 'var(--rh-blackberry)', textAlign: 'left',
        }}
        aria-expanded={open}
      >
        {q}
        <span style={{ fontSize: 22, color: 'var(--rh-stone-darkest)', fontWeight: 400, lineHeight: 1 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p style={{ fontSize: 14, color: 'var(--rh-blackberry-light)', margin: '0 0 18px', lineHeight: 1.65, maxWidth: 760 }}>{a}</p>
      )}
    </div>
  );
};

const Tier = ({ name, price, sub, features, highlight }) => (
  <Card style={{
    padding: 28,
    border: highlight ? '2px solid var(--rh-blueberry-dark)' : '1px solid var(--rh-stone-light)',
    position: 'relative',
  }}>
    {highlight && (
      <div style={{ position: 'absolute', top: -12, left: 24 }}>
        <Pill tone="berry">Most popular</Pill>
      </div>
    )}
    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--rh-stone-darkest)', textTransform: 'uppercase', letterSpacing: '.09em', marginBottom: 8 }}>
      {name}
    </div>
    <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--rh-blackberry)', lineHeight: 1 }}>
      {price}
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--rh-stone-darkest)', marginLeft: 6 }}>{sub}</span>
    </div>
    <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
      {features.map((f) => <CheckBullet key={f}>{f}</CheckBullet>)}
    </ul>
  </Card>
);

export const PerksPartner = ({ onNavigate }) => {
  const ctaToLogin = () => onNavigate && onNavigate('login');

  return (
    <div>

      <section className="rh-hero-section" style={{ background: 'var(--rh-blueberry-darkest)', color: '#fff', padding: '72px 28px 88px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="rh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <Pill tone="yuzu" icon={<Icon name="gift" size={14} color="var(--rh-yuzu-darkest)" />}>
                  Member perk · Live now
                </Pill>
                <span style={{ fontSize: 13, opacity: 0.7 }}>Ratehub + Willful</span>
              </div>
              <h1 className="rh-hero-h1 showDot" style={{
                fontSize: 52, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05,
                margin: '0 0 14px',
              }}>
                Make your will online —<br />
                <span style={{ color: 'var(--rh-yuzu-lightest)' }}>20% off as a Ratehub member.</span>
              </h1>
              <p style={{ fontSize: 17, opacity: 0.78, lineHeight: 1.6, margin: '0 0 28px', maxWidth: 560 }}>
                Half of Canadians don’t have a will. Willful makes a legal will in 20 minutes — and Ratehub members get 20% off, every day of the year, with free updates for life.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Button variant="coconut" size="l" onClick={ctaToLogin}>
                  Become a member · Claim 20% off →
                </Button>
                <Button variant="ghost" size="l" style={{ color: '#fff' }} onClick={ctaToLogin}>
                  Already a member? Log in
                </Button>
              </div>
            </div>

            <Card style={{
              padding: 0, overflow: 'hidden',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
            }}>
              <div style={{ padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 12,
                    background: 'var(--rh-yuzu-lightest)', color: 'var(--rh-blueberry-darkest)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 20, flexShrink: 0,
                  }}>
                    20%
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--rh-yuzu-lightest)', textTransform: 'uppercase', letterSpacing: '.09em' }}>
                      Your member perk
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' }}>
                      20% off your online legal will
                    </div>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'Legal in every Canadian province (except QC)',
                    'Built and reviewed by lawyers',
                    'Free updates for life',
                    'Power of attorney + healthcare directive included on Premium',
                  ].map((b) => (
                    <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: 14 }}>
                      <Icon name="checkmark" size={16} color="var(--rh-yuzu-lightest)" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '14px 28px', background: 'rgba(255,255,255,0.06)', fontSize: 12, opacity: 0.75 }}>
                <Icon name="lock" size={12} color="rgba(255,255,255,0.7)" style={{ verticalAlign: 'middle', marginRight: 6 }} />
                Your discount auto-applies via your member dashboard.
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section style={SECTION}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Pill tone="berry">Why a will, why now</Pill>
          <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', margin: '12px 0 8px' }}>
            The most important document you don’t have yet
          </h2>
          <p style={{ fontSize: 15, color: 'var(--rh-blackberry-light)', maxWidth: 640, margin: '0 auto' }}>
            Buying a home, having a baby, or getting married? These are the moments when a will matters most — and the moments when it gets put off.
          </p>
        </div>

        <div className="rh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { i: 'house', t: 'Bought a home', d: 'A mortgage is the largest debt most Canadians carry. A will makes sure your home is handled the way you want.' },
            { i: 'heart', t: 'New baby or marriage', d: 'Name a guardian for your children and protect the people you love.' },
            { i: 'shield', t: 'Skip the lawyer fees', d: 'Willful is a fraction of the cost of a traditional lawyer — without skipping the legal protection.' },
          ].map((c) => (
            <Card key={c.t} style={{ padding: 24 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: 'var(--rh-blueberry-lightest)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Icon name={c.i} size={22} color="var(--rh-blueberry-darkest)" />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--rh-blackberry)', margin: '0 0 6px' }}>{c.t}</h3>
              <p style={{ fontSize: 14, color: 'var(--rh-blackberry-light)', lineHeight: 1.6, margin: 0 }}>{c.d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--rh-stone-lightest)' }}>
        <div style={SECTION}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <Pill tone="lime">Willful plans</Pill>
            <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', margin: '12px 0 8px' }}>
              Pick a plan — your 20% applies automatically
            </h2>
            <p style={{ fontSize: 15, color: 'var(--rh-blackberry-light)' }}>
              Prices shown are Willful’s retail pricing. Your Ratehub member discount is applied at checkout.
            </p>
          </div>

          <div className="rh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            <Tier
              name="Essentials"
              price="$99"
              sub="one-time"
              features={[
                'Last will & testament',
                'Free lifetime updates',
                'Step-by-step guidance',
              ]}
            />
            <Tier
              name="Premium"
              price="$189"
              sub="one-time"
              highlight
              features={[
                'Everything in Essentials',
                'Power of attorney (property)',
                'Healthcare directive (personal care)',
                'Free lifetime updates',
              ]}
            />
            <Tier
              name="Family Plan"
              price="$269"
              sub="one-time"
              features={[
                'Premium plan for two adults',
                'Mirrored or separate documents',
                'Best value for couples',
              ]}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Button variant="primary" size="l" onClick={ctaToLogin}>
              Sign in to claim 20% off →
            </Button>
          </div>
        </div>
      </section>

      <section style={SECTION}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <Pill tone="berry">FAQ</Pill>
          <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', margin: '12px 0 24px' }}>
            Questions, answered
          </h2>
          <FaqItem q="Who is eligible for this perk?" a="Every Ratehub member. Becoming a member is free — just sign up with your email. The 20% discount applies as long as you’re logged in and click through to Willful from your member dashboard or member email." />
          <FaqItem q="Is the will legally valid?" a="Yes. Willful is built and reviewed by Canadian lawyers, and the resulting will is legally valid in every Canadian province (except Quebec, where the legal framework differs)." />
          <FaqItem q="Can I update my will later?" a="Yes — Willful includes free updates for life on every plan. Life changes, your will changes." />
          <FaqItem q="What does Ratehub get out of it?" a="Ratehub may earn an affiliate commission when you use this perk. That does not affect the price you pay — your full 20% discount applies either way." />
          <FaqItem q="Can I combine this with another Willful discount?" a="No — the 20% Ratehub member discount can’t be stacked with other Willful promotional codes, but it’s the best partner offer available." />
        </div>
      </section>

      <section style={{ background: 'var(--rh-blueberry-darkest)', color: '#fff' }}>
        <div style={SECTION}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 640 }}>
              <h3 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 8px' }}>
                Ready to make your will?
              </h3>
              <p style={{ fontSize: 15, opacity: 0.78, margin: 0, lineHeight: 1.6 }}>
                Become a Ratehub member to unlock 20% off Willful and every future member perk.
              </p>
            </div>
            <Button variant="coconut" size="l" onClick={ctaToLogin}>
              Become a member →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
