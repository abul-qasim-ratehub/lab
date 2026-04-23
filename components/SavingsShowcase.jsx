'use client';

import { Anchor, Button, Card, CheckBullet, Pill } from './primitives';

export const SavingsShowcase = () => {
  const rows = [
    { bank: 'EQ Bank', rate: '4.00', bonus: '+1.00% promo', fee: '$0', min: '$0' },
    { bank: 'Saven Financial', rate: '3.75', bonus: '—', fee: '$0', min: '$25' },
    { bank: 'Tangerine', rate: '3.50', bonus: 'New clients: 5.25% for 5 months', fee: '$0', min: '$0' },
    { bank: 'Simplii Financial', rate: '3.25', bonus: '—', fee: '$0', min: '$0' },
  ];
  return (
    <section style={{ background: 'linear-gradient(180deg, var(--rh-mint-lightest) 0%, #fff 100%)', padding: '72px 28px' }}>
      <div className="rh-grid-2" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '340px 1fr', gap: 48, alignItems: 'flex-start' }}>
        <div>
          <Pill tone="mint">Savings</Pill>
          <h2 className="showDot" style={{ fontSize: 40, fontWeight: 500, margin: '14px 0 16px', letterSpacing: '-0.01em', lineHeight: 1.1 }}>Your money, made better</h2>
          <p style={{ color: 'var(--rh-blackberry-light)', fontSize: 16, lineHeight: 1.5, marginBottom: 24 }}>
            Compare high-interest savings accounts, GICs, and chequing from every major Canadian bank and credit union.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
            <CheckBullet>CDIC & provincially-insured deposits</CheckBullet>
            <CheckBullet>No-fee accounts with unlimited transactions</CheckBullet>
            <CheckBullet>Earn up to 5.25% with promotional rates</CheckBullet>
          </ul>
          <Button>See all savings rates</Button>
        </div>
        <Card padding={0}>
          <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--rh-stone-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 16, fontWeight: 500 }}>High-interest savings</div>
            <Pill tone="stone">Updated today</Pill>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--rh-stone-darkest)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                <th style={{ padding: '12px 22px', fontWeight: 500 }}>Bank</th>
                <th style={{ padding: '12px 8px', fontWeight: 500 }}>Rate</th>
                <th style={{ padding: '12px 8px', fontWeight: 500 }}>Promo</th>
                <th style={{ padding: '12px 8px', fontWeight: 500 }}>Min</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--rh-stone-light)' }}>
                  <td style={{ padding: '14px 22px', fontWeight: 500 }}>{r.bank}</td>
                  <td style={{ padding: '14px 8px' }}><span style={{ fontSize: 18, fontWeight: 700 }}>{r.rate}</span><span style={{ color: 'var(--rh-stone-darkest)' }}>%</span></td>
                  <td style={{ padding: '14px 8px', color: 'var(--rh-lime-dark)', fontWeight: 500 }}>{r.bonus}</td>
                  <td style={{ padding: '14px 8px' }}>{r.min}</td>
                  <td style={{ padding: '14px 22px', textAlign: 'right' }}><Anchor icon={true}>Apply</Anchor></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </section>
  );
};
