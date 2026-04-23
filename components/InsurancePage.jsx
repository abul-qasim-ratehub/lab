'use client';

import { Button, Card, Icon, Pill } from './primitives';
import { TrustStrip } from './TrustStrip';

export const InsurancePage = ({ onNavigate }) => {
  const types = [
    { icon: 'house',  label: 'Home',    from: '$42/mo',   desc: 'Protect your home and belongings. 10+ insurers compared.' },
    { icon: 'car',    label: 'Auto',    from: '$89/mo',   desc: 'Compare comprehensive, collision, and liability coverage.' },
    { icon: 'heart',  label: 'Life',    from: '$21/mo',   desc: 'Term and whole life. No medical exam options available.' },
    { icon: 'plane',  label: 'Travel',  from: '$14/trip', desc: 'Emergency medical, trip cancellation and baggage coverage.' },
    { icon: 'shield', label: 'Tenant',  from: '$18/mo',   desc: 'Protect your contents and get personal liability coverage.' },
    { icon: 'dollar', label: 'Business',from: '$55/mo',   desc: 'Commercial general liability and property coverage.' },
  ];
  return (
    <div>
      <div className="rh-hero-section" style={{ background: 'var(--rh-blueberry-darkest)', color: '#fff', padding: '72px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Pill tone="stone" icon={<Icon name="shield" size={14} color="var(--rh-stone-darkest)" />}>Insurance</Pill>
          <h1 className="showDot rh-hero-h1" style={{ fontSize: 52, fontWeight: 700, margin: '18px 0 14px', letterSpacing: '-0.025em', lineHeight: 1.08 }}>Protect what matters most</h1>
          <p style={{ fontSize: 17, opacity: .88, maxWidth: 520, margin: '0 0 32px', lineHeight: 1.65 }}>
            Get quotes from 10+ top Canadian insurers in minutes. Compared honestly, side-by-side.
          </p>
          <Button size="l" variant="coconut">Get a quote →</Button>
        </div>
      </div>
      <section style={{ padding: '56px 28px', maxWidth: 1280, margin: '0 auto' }}>
        <h2 style={{ fontSize: 24, fontWeight: 500, margin: '0 0 24px' }}>Choose your coverage</h2>
        <div className="rh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {types.map(t => (
            <Card key={t.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, cursor: 'pointer', padding: 20 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--rh-blueberry)'; e.currentTarget.style.boxShadow='var(--rh-shadow-m)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--rh-stone-light)'; e.currentTarget.style.boxShadow='var(--rh-shadow-xs)'; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--rh-blueberry-lightest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={t.icon} size={24} color="var(--rh-blueberry-dark)" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 2 }}>{t.label} insurance</div>
                <div style={{ fontSize: 13, color: 'var(--rh-lime-dark)', fontWeight: 500, marginBottom: 6 }}>From {t.from}</div>
                <div style={{ fontSize: 12, color: 'var(--rh-blackberry-light)', lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>
      <TrustStrip />
    </div>
  );
};
