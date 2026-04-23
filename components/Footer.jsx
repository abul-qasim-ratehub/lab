'use client';

import { Button } from './primitives';

export const Footer = () => {
  const cols = [
    { h: 'Mortgages', items: ['Mortgage rates', 'First-time buyers', 'Mortgage refinancing', 'Renewal', 'HELOC'] },
    { h: 'Credit cards', items: ['Best cards of 2026', 'Cash back', 'Travel rewards', 'Balance transfer', 'No fee'] },
    { h: 'Banking', items: ['Savings accounts', 'Chequing', 'GICs', 'TFSA', 'RRSP'] },
    { h: 'Insurance', items: ['Home', 'Auto', 'Life', 'Travel', 'Business'] },
    { h: 'Company', items: ['About us', 'MoneySense', 'Careers', 'Contact', 'Media'] },
  ];
  return (
    <footer style={{ background: 'var(--rh-blueberry-darkest)', color: 'var(--rh-coconut)', padding: '64px 28px 28px', marginTop: 80 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="rh-grid-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr) 280px', gap: 40 }}>
          {cols.map(c => (
            <div key={c.h}>
              <h4 style={{ fontSize: 13, fontWeight: 500, margin: '0 0 14px', letterSpacing: '.04em', textTransform: 'uppercase', opacity: .7 }}>{c.h}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.items.map(i => <li key={i}><a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: 13, opacity: .85 }}>{i}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 500, margin: '0 0 14px', letterSpacing: '.04em', textTransform: 'uppercase', opacity: .7 }}>Newsletter</h4>
            <p style={{ fontSize: 13, opacity: .85, margin: '0 0 12px', lineHeight: 1.5 }}>The smartest Canadian money tips, delivered weekly.</p>
            <div style={{ display: 'flex', gap: 6 }}>
              <input placeholder="you@example.ca" style={{ flex: 1, border: 'none', borderRadius: 8, padding: '10px 12px', fontFamily: 'inherit', fontSize: 13, background: 'rgba(255,255,255,.1)', color: '#fff' }} />
              <Button size="s" variant="coconut">Subscribe</Button>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, opacity: .7 }}>
          <span>© 2010–2026 Ratehub Inc. All rights reserved.</span>
          <span>Privacy · Terms · Disclosure · Accessibility</span>
        </div>
      </div>
    </footer>
  );
};
