'use client';

// PerksLogin — single login/sign-up screen for the perks funnel.
// Left rail communicates membership value (partner-specific or generic).
// Right rail is the auth form: one screen for new sign-ups + returning members.

import React from 'react';
import { Button, Card, CheckBullet, Icon, Input, Pill } from './primitives';

// Partner-specific copy lives here so the same screen serves Willful today
// and partner #2/#3/... tomorrow with no UI changes.
const PARTNER_COPY = {
  willful: {
    partnerName: 'Willful',
    eyebrow: 'New member perk',
    discount: '20% off',
    headline: 'Make your will today —',
    headlineHighlight: 'as a Ratehub member.',
    subhead:
      'Sign up free to claim 20% off Willful, Canada’s leading online will platform. Plus unlock every future Ratehub member perk.',
    benefits: [
      'Legal will in 20 minutes, from $99',
      'Free updates for life, included',
      'Plus access to every future Ratehub perk',
    ],
    logo: 'Willful',
  },
  generic: {
    partnerName: 'Ratehub members',
    eyebrow: 'Member perks',
    discount: 'Exclusive savings',
    headline: 'Unlock perks built',
    headlineHighlight: 'for Ratehub members.',
    subhead:
      'Sign up free to claim discounts on the brands Canadians trust — wills, insurance, banking, and more.',
    benefits: [
      'Curated deals on trusted Canadian brands',
      'One login, dashboard, and member identity',
      'New perks added every month',
    ],
    logo: null,
  },
};

const SocialButton = ({ children, onClick }) => {
  const [h, setH] = React.useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        width: '100%',
        padding: '12px 16px',
        background: '#fff',
        border: `1px solid ${h ? 'var(--rh-blackberry)' : 'var(--rh-stone)'}`,
        borderRadius: 8,
        fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
        color: 'var(--rh-blackberry)',
        cursor: 'pointer',
        transition: 'border-color 200ms, box-shadow 200ms',
        boxShadow: h ? 'var(--rh-shadow-xs)' : 'none',
      }}
    >
      {children}
    </button>
  );
};

const Divider = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
    <div style={{ flex: 1, height: 1, background: 'var(--rh-stone-light)' }} />
    <span style={{ fontSize: 11, color: 'var(--rh-stone-darkest)', textTransform: 'uppercase', letterSpacing: '.09em' }}>
      {children}
    </span>
    <div style={{ flex: 1, height: 1, background: 'var(--rh-stone-light)' }} />
  </div>
);

export const PerksLogin = ({ partner = 'willful', onAuthenticated, onBackHome }) => {
  const copy = PARTNER_COPY[partner] || PARTNER_COPY.generic;
  const isWillful = partner === 'willful';

  const [mode, setMode] = React.useState('signup'); // 'signup' | 'login'
  const [form, setForm] = React.useState({ email: '', password: '', firstName: '', consent: true });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState(null);

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const submit = (e) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password || (mode === 'signup' && !form.firstName)) {
      setError('Please fill in every field to continue.');
      return;
    }
    setSubmitting(true);
    // Simulated auth — real BFF wires in via AuthProvider. Routes everyone to the dashboard's perks tab.
    setTimeout(() => {
      setSubmitting(false);
      if (onAuthenticated) onAuthenticated({ tab: 'perks', partner });
    }, 600);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--rh-stone-lightest)', display: 'flex', flexDirection: 'column' }}>

      {/* Slim top bar — no main site chrome on this screen */}
      <div style={{
        padding: '18px 28px',
        background: '#fff',
        borderBottom: '1px solid var(--rh-stone-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); onBackHome && onBackHome(); }}
          style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
          aria-label="Back to Ratehub"
        >
          <img src="/assets/logos/ratehub_full_dark.svg" alt="Ratehub.ca" style={{ height: 24, display: 'block' }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 13, color: 'var(--rh-stone-darkest)' }}>
            <Icon name="lock" size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />
            Secure sign in
          </span>
          <a href="#" style={{ fontSize: 13, color: 'var(--rh-blackberry)', textDecoration: 'none', fontWeight: 500 }}>En · Fr</a>
        </div>
      </div>

      <div className="rh-grid-2" style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1.05fr 1fr',
        maxWidth: 1280, width: '100%',
        margin: '0 auto',
        padding: '48px 28px',
        gap: 48,
        alignItems: 'center',
      }}>

        {/* LEFT — value prop. Switches between Willful and generic perks copy. */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Pill tone="yuzu" icon={<Icon name="gift" size={14} color="var(--rh-yuzu-darkest)" />}>
              {copy.eyebrow}
            </Pill>
            {isWillful && (
              <>
                <span style={{ fontSize: 13, color: 'var(--rh-stone-darkest)' }}>Ratehub</span>
                <span style={{ fontSize: 13, color: 'var(--rh-stone-darkest)' }}>+</span>
                <span style={{
                  fontSize: 13, fontWeight: 700, color: 'var(--rh-blackberry)',
                  padding: '4px 10px', border: '1px solid var(--rh-stone)', borderRadius: 6,
                  letterSpacing: '.02em',
                }}>
                  Willful
                </span>
              </>
            )}
          </div>

          <h1
            className="rh-hero-h1 showDot"
            style={{
              fontSize: 44, fontWeight: 700, lineHeight: 1.08,
              letterSpacing: '-0.025em', margin: '0 0 18px',
              color: 'var(--rh-blackberry)',
            }}
          >
            {copy.headline}<br />
            <span style={{ color: 'var(--rh-blueberry-dark)' }}>{copy.headlineHighlight}</span>
          </h1>

          <p style={{
            fontSize: 16, lineHeight: 1.6, color: 'var(--rh-blackberry-light)',
            margin: '0 0 28px', maxWidth: 520,
          }}>
            {copy.subhead}
          </p>

          {isWillful && (
            <Card
              style={{
                padding: '22px 24px',
                background: 'var(--rh-blueberry-darkest)',
                border: 'none',
                color: '#fff',
                marginBottom: 28,
                maxWidth: 520,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: 'var(--rh-yuzu-lightest)', color: 'var(--rh-blueberry-darkest)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em',
                  flexShrink: 0,
                }}>
                  20%
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--rh-yuzu-lightest)', textTransform: 'uppercase', letterSpacing: '.09em', marginBottom: 4 }}>
                    Ratehub member perk
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}>
                    20% off your Willful online will
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4 }}>
                    Free updates for life, included.
                  </div>
                </div>
              </div>
            </Card>
          )}

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxWidth: 520 }}>
            {copy.benefits.map((b) => <CheckBullet key={b}>{b}</CheckBullet>)}
          </ul>

          <div style={{
            marginTop: 32, paddingTop: 24,
            borderTop: '1px solid var(--rh-stone-light)',
            display: 'flex', flexWrap: 'wrap', gap: 22, alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--rh-stone-darkest)' }}>
              <Icon name="shield" size={16} color="var(--rh-blueberry-dark)" />
              Trusted by 12M+ Canadians
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--rh-stone-darkest)' }}>
              <Icon name="maple-leaf" size={16} color="var(--rh-blueberry-dark)" />
              Built in Canada
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--rh-stone-darkest)' }}>
              <Icon name="lock" size={16} color="var(--rh-blueberry-dark)" />
              Bank-grade encryption
            </div>
          </div>
        </div>

        {/* RIGHT — single auth form: toggle sign-up / log-in */}
        <Card
          style={{
            padding: '36px 36px 32px',
            maxWidth: 460,
            width: '100%',
            justifySelf: 'end',
            boxShadow: 'var(--rh-shadow-l)',
            borderColor: 'var(--rh-stone-light)',
          }}
        >
          <div style={{
            display: 'flex', background: 'var(--rh-stone-lightest)',
            borderRadius: 10, padding: 4, marginBottom: 24,
          }}>
            {[
              { id: 'signup', label: 'Become a member' },
              { id: 'login',  label: 'Log in' },
            ].map((tab) => {
              const active = mode === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setMode(tab.id); setError(null); }}
                  style={{
                    flex: 1, padding: '10px 14px',
                    border: 'none',
                    borderRadius: 8,
                    background: active ? '#fff' : 'transparent',
                    color: active ? 'var(--rh-blackberry)' : 'var(--rh-stone-darkest)',
                    fontFamily: 'inherit',
                    fontSize: 13, fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: active ? 'var(--rh-shadow-xs)' : 'none',
                    transition: 'background 200ms, color 200ms, box-shadow 200ms',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <h2 style={{
            fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em',
            color: 'var(--rh-blackberry)', margin: '0 0 4px',
          }}>
            {mode === 'signup' ? `Become a Ratehub member` : 'Welcome back'}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--rh-blackberry-light)', margin: '0 0 22px', lineHeight: 1.5 }}>
            {mode === 'signup'
              ? `Free, 30 seconds. Unlock ${isWillful ? 'Willful' : 'every member perk'} as soon as you're in.`
              : 'Log in to claim your perk and access your dashboard.'}
          </p>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mode === 'signup' && (
              <Input label="First name" placeholder="Sarah" {...field('firstName')} />
            )}
            <Input label="Email" placeholder="you@example.com" {...field('email')} />
            <Input
              label={mode === 'signup' ? 'Create a password' : 'Password'}
              placeholder="At least 8 characters"
              {...field('password')}
            />

            {mode === 'login' && (
              <a href="#" style={{ alignSelf: 'flex-end', fontSize: 12, color: 'var(--rh-blueberry-dark)', textDecoration: 'none', fontWeight: 500 }}>
                Forgot password?
              </a>
            )}

            {mode === 'signup' && (
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, color: 'var(--rh-blackberry-light)', lineHeight: 1.55, marginTop: 4 }}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                  style={{ marginTop: 2, accentColor: '#2d6e8a' }}
                />
                <span>
                  Email me Ratehub member perks, rate alerts, and tips. You can unsubscribe anytime.
                </span>
              </label>
            )}

            {error && (
              <div style={{
                fontSize: 12, color: 'var(--rh-error)',
                background: 'var(--rh-error-bg)', padding: '8px 12px',
                borderRadius: 8,
              }}>
                {error}
              </div>
            )}

            <Button variant="primary" size="l" style={{ width: '100%', marginTop: 6 }} disabled={submitting}>
              {submitting
                ? 'One moment…'
                : mode === 'signup'
                  ? `Create account${isWillful ? ' · Claim 20% off' : ''}`
                  : 'Log in'}
            </Button>
          </form>

          <Divider>or</Divider>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SocialButton>
              <span aria-hidden style={{ width: 16, height: 16, display: 'inline-block' }}>
                <svg viewBox="0 0 48 48" width="16" height="16">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.5 29.3 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.3-3.5z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.5 29.3 4.5 24 4.5 16.3 4.5 9.7 8.6 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-1.9 1.3-4.3 2.1-7.2 2.1-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.6 38.9 16.2 43.5 24 43.5z"/>
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l6.2 5.2c-.4.4 6.6-4.8 6.6-14.9 0-1.2-.1-2.4-.3-3.5z"/>
                </svg>
              </span>
              Continue with Google
            </SocialButton>
            <SocialButton>
              <span aria-hidden style={{ width: 16, height: 16, display: 'inline-block' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16.365 1.43c0 1.14-.456 2.235-1.265 3.02-.844.819-2.17 1.45-3.293 1.357-.135-1.084.39-2.236 1.183-3.022.86-.85 2.288-1.476 3.375-1.355zM21 17.301c-.59 1.357-.87 1.963-1.62 3.16-1.04 1.654-2.51 3.713-4.33 3.73-1.62.015-2.04-1.04-4.24-1.025-2.2.015-2.66 1.04-4.28 1.025-1.82-.017-3.21-1.876-4.25-3.53C-.45 17.36-.74 12.49 1.13 9.9 2.47 8.05 4.59 7.05 6.58 7.05c2.03 0 3.31 1.07 4.99 1.07 1.63 0 2.62-1.07 4.98-1.07 1.78 0 3.67.97 5.02 2.65-4.41 2.42-3.69 8.71-.57 10.6z"/></svg>
              </span>
              Continue with Apple
            </SocialButton>
          </div>

          <p style={{ fontSize: 11, color: 'var(--rh-stone-darkest)', lineHeight: 1.55, margin: '22px 0 0', textAlign: 'center' }}>
            By {mode === 'signup' ? 'creating an account' : 'logging in'} you agree to Ratehub’s
            {' '}<a href="#" style={{ color: 'var(--rh-blueberry-dark)', textDecoration: 'underline' }}>Terms</a>
            {' '}and{' '}
            <a href="#" style={{ color: 'var(--rh-blueberry-dark)', textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>
        </Card>
      </div>

      <div style={{
        padding: '18px 28px',
        background: '#fff',
        borderTop: '1px solid var(--rh-stone-light)',
        fontSize: 12, color: 'var(--rh-stone-darkest)',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
      }}>
        <span>&copy; {new Date().getFullYear()} Ratehub Inc. — Canada’s #1 financial comparison platform.</span>
        <span>Need help? <a href="#" style={{ color: 'var(--rh-blueberry-dark)', textDecoration: 'none', fontWeight: 500 }}>Contact support</a></span>
      </div>
    </div>
  );
};
