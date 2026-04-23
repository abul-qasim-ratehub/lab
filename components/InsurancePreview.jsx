'use client';

import React from 'react';
import { Button, Card, Icon, Pill } from './primitives';

export const InsurancePreview = ({ onNavigate }) => {
  const [activeType, setActiveType] = React.useState('home');
  const types = [
    { id: 'home',   icon: 'house',  label: 'Home',   from: '$42/mo',    coverage: '10+ insurers · Rebuild value covered' },
    { id: 'auto',   icon: 'car',    label: 'Auto',   from: '$89/mo',    coverage: 'Collision, liability & comprehensive' },
    { id: 'life',   icon: 'heart',  label: 'Life',   from: '$21/mo',    coverage: 'Term & whole life · No medical needed' },
    { id: 'tenant', icon: 'shield', label: 'Tenant', from: '$18/mo',    coverage: 'Contents + liability · Any rental type' },
  ];
  const active = types.find(t => t.id === activeType);
  return (
    <section style={{ padding: '72px 28px', background: 'linear-gradient(180deg, #fff 0%, var(--rh-stone-lightest) 100%)' }}>
      <div className="rh-grid-2" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <Pill tone="stone" icon={<Icon name="shield" size={14} color="var(--rh-stone-darkest)" />}>Insurance</Pill>
          <h2 style={{ fontSize: 32, fontWeight: 500, margin: '14px 0 12px', letterSpacing: '-0.015em', lineHeight: 1.2 }}>
            Protect what matters most
          </h2>
          <p style={{ fontSize: 16, color: 'var(--rh-blackberry-light)', margin: '0 0 28px', lineHeight: 1.6, maxWidth: 400 }}>
            Get quotes from 10+ top Canadian insurers in minutes. Compare coverage, not just price.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
            {types.map(t => (
              <button key={t.id} onClick={() => setActiveType(t.id)} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 9999,
                border: `1.5px solid ${activeType === t.id ? 'var(--rh-blueberry)' : 'var(--rh-stone)'}`,
                background: activeType === t.id ? 'var(--rh-blueberry-lightest)' : '#fff',
                color: activeType === t.id ? 'var(--rh-blueberry-darkest)' : 'var(--rh-blackberry)',
                fontFamily: 'inherit', fontSize: 13, fontWeight: activeType === t.id ? 600 : 400,
                cursor: 'pointer', transition: 'all 200ms',
              }}>
                <Icon name={t.icon} size={14} color={activeType === t.id ? 'var(--rh-blueberry-dark)' : 'var(--rh-stone-darkest)'} />
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button size="m" onClick={() => onNavigate('insurance')}>Get a quote →</Button>
            <Button size="m" variant="secondary" onClick={() => onNavigate('insurance')}>Compare all plans</Button>
          </div>
        </div>
        <Card style={{ overflow: 'hidden', padding: 0 }}>
          <div style={{ background: 'var(--rh-blueberry-darkest)', padding: '28px 28px 24px', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={active.icon} size={28} color="var(--rh-mint)" />
              </div>
              <div>
                <div style={{ fontSize: 12, opacity: .7, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.08em' }}>{active.label} insurance · from</div>
                <div style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' }}>{active.from}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, opacity: .75, lineHeight: 1.5 }}>{active.coverage}</div>
          </div>
          <div style={{ padding: '24px 28px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Quotes in under 5 minutes','Licensed insurance brokers on standby','Bundle & save up to 32% on home + auto','No commitment required to compare'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--rh-lime-lightest)', color: 'var(--rh-lime-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 12 10 18 20 6"/></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </section>
  );
};
