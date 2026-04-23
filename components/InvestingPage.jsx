'use client';

import { Anchor, Button, Card, Icon, Pill } from './primitives';

export const InvestingPage = () => {
  const products = [
    { icon: 'trending',  label: 'Robo-advisors',  rate: '~8%/yr',  desc: 'Automated, diversified portfolios for hands-off investors.' },
    { icon: 'dollar',    label: 'GICs',            rate: '5.10%',   desc: 'Guaranteed returns, CDIC insured. No market risk.'          },
    { icon: 'bar-chart', label: 'ETF brokerages',  rate: '$0 fees', desc: 'Commission-free ETF and stock investing.'                   },
    { icon: 'piggy',     label: 'TFSA & RRSP',     rate: 'Tax-free',desc: 'Max your tax-sheltered contribution room every year.'       },
  ];
  return (
    <div>
      <div className="rh-hero-section" style={{ background: 'var(--rh-blueberry-darkest)', color: '#fff', padding: '72px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Pill tone="lime" icon={<Icon name="trending" size={14} color="var(--rh-lime-darkest)" />}>Investing</Pill>
          <h1 className="showDot rh-hero-h1" style={{ fontSize: 52, fontWeight: 700, margin: '18px 0 14px', letterSpacing: '-0.025em', lineHeight: 1.08 }}>Grow your wealth, simplified</h1>
          <p style={{ fontSize: 17, opacity: .88, maxWidth: 520, margin: '0 0 32px', lineHeight: 1.65 }}>No jargon — just the numbers that matter.</p>
          <Button size="l" variant="coconut">Explore options →</Button>
        </div>
      </div>
      <section style={{ padding: '56px 28px', maxWidth: 1280, margin: '0 auto' }}>
        <div className="rh-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {products.map((p, i) => (
            <Card key={i} style={{ textAlign: 'center', cursor: 'pointer' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow='var(--rh-shadow-l)'; e.currentTarget.style.transform='translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow='var(--rh-shadow-xs)'; e.currentTarget.style.transform='none'; }}
            >
              <Icon name={p.icon} size={48} color="var(--rh-lime-dark)" style={{ margin: '0 auto 16px' }} />
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--rh-lime-dark)', marginBottom: 4 }}>{p.rate}</div>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>{p.label}</div>
              <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', lineHeight: 1.5, marginBottom: 16 }}>{p.desc}</div>
              <Anchor>Compare →</Anchor>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
