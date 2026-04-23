'use client';

import { Anchor, Button, Card, Icon, Pill } from './primitives';

export const InvestingPreview = ({ onNavigate }) => {
  const products = [
    { icon: 'trending',  label: 'Robo-advisors',  rate: '~8%/yr',   color: 'var(--rh-lime-lightest)',      fg: 'var(--rh-lime-darkest)',      desc: 'Automated, low-cost investing. Ideal for hands-off investors.' },
    { icon: 'dollar',    label: 'GICs',            rate: '5.10%',    color: 'var(--rh-blueberry-lightest)', fg: 'var(--rh-blueberry-darkest)', desc: 'Guaranteed returns. CDIC insured. No market risk.'           },
    { icon: 'bar-chart', label: 'Online brokers',  rate: '$0 fees',  color: 'var(--rh-yuzu-lightest)',      fg: 'var(--rh-yuzu-darkest)',      desc: 'Self-directed ETF investing with low commissions.'            },
    { icon: 'piggy',     label: 'TFSA & RRSP',     rate: 'Tax-free', color: 'var(--rh-mint-lightest)',      fg: 'var(--rh-mint-darkest)',      desc: 'Max your tax-sheltered contribution room every year.'         },
  ];
  return (
    <section style={{ padding: '72px 28px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Pill tone="lime" icon={<Icon name="trending" size={14} color="var(--rh-lime-darkest)" />}>Investing</Pill>
          <h2 style={{ fontSize: 30, fontWeight: 500, margin: '12px 0 8px', letterSpacing: '-0.015em' }}>Grow your wealth, simplified</h2>
          <p style={{ fontSize: 15, color: 'var(--rh-blackberry-light)', margin: 0, maxWidth: 480, lineHeight: 1.5 }}>
            Compare robo-advisors, GICs, and online brokerages. No jargon — just clear numbers.
          </p>
        </div>
        <Button variant="secondary" onClick={() => onNavigate('investing')}>Explore investing →</Button>
      </div>
      <div className="rh-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {products.map((p, i) => (
          <Card key={i} style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--rh-shadow-m)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--rh-shadow-xs)'; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ background: p.color, padding: '20px 20px 16px' }}>
              <Icon name={p.icon} size={32} color={p.fg} />
              <div style={{ fontSize: 20, fontWeight: 700, color: p.fg, marginTop: 10, letterSpacing: '-0.01em' }}>{p.rate}</div>
            </div>
            <div style={{ padding: '16px 20px 20px' }}>
              <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>{p.label}</div>
              <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', lineHeight: 1.5, marginBottom: 14 }}>{p.desc}</div>
              <Anchor style={{ fontSize: 13 }}>Compare options</Anchor>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
