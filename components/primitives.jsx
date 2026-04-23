'use client';

// Primitives — Button, Anchor, Card, Pill, Icon, Input, Select, CheckBullet
// Tokens come from colors_and_type.css

import { useState } from 'react';

export const Button = ({ variant = 'primary', size = 'm', children, onClick, style, ...rest }) => {
  const base = {
    fontFamily: 'var(--rh-font-sans)',
    fontWeight: 500,
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background-color 300ms, color 300ms, box-shadow 300ms, border-color 300ms',
    lineHeight: 1.2,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  };
  const sizes = {
    s: { padding: '8px 16px', fontSize: 13 },
    m: { padding: '12px 22px', fontSize: 15 },
    l: { padding: '16px 28px', fontSize: 17 },
  };
  const variants = {
    primary:   { background: '#2d6e8a', color: '#fff' },
    secondary: { background: 'transparent', color: 'var(--rh-blackberry)', border: '2px solid var(--rh-blackberry)' },
    alternate: { background: 'var(--rh-blackberry)', color: '#fff' },
    coconut:   { background: 'var(--rh-coconut)', color: 'var(--rh-blueberry-dark)', boxShadow: 'var(--rh-shadow-s)' },
    ghost:     { background: 'transparent', color: 'var(--rh-blueberry-dark)' },
  };
  const [hover, setHover] = useState(false);
  const hoverStyles = {
    primary:   { background: 'var(--rh-blueberry-dark)' },
    secondary: { background: 'var(--rh-blackberry)', color: '#fff' },
    alternate: { background: 'var(--rh-blackberry-light)' },
    coconut:   { color: 'var(--rh-blueberry)' },
    ghost:     { color: 'var(--rh-blueberry)' },
  };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...sizes[size], ...variants[variant], ...(hover ? hoverStyles[variant] : {}), ...style }}
      {...rest}
    >
      {children}
    </button>
  );
};

export const Anchor = ({ children, icon = true, href = '#', style, ...rest }) => {
  const [h, setH] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        color: h ? 'var(--rh-blueberry)' : 'var(--rh-blueberry-dark)',
        textDecoration: 'none',
        boxShadow: 'inset 0 -2px 0 0 currentColor',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontWeight: 500,
        fontSize: 14,
        transition: 'color 300ms',
        ...style,
      }}
      {...rest}
    >
      {children}
      {icon && <span style={{ transform: h ? 'translateX(4px)' : 'none', transition: 'transform 300ms' }}>→</span>}
    </a>
  );
};

export const Pill = ({ tone = 'lime', children, icon }) => {
  const tones = {
    lime:       { bg: 'var(--rh-lime-lightest)',       fg: 'var(--rh-lime-darkest)'       },
    mint:       { bg: 'var(--rh-mint-light)',           fg: 'var(--rh-mint-darkest)'       },
    yuzu:       { bg: 'var(--rh-yuzu-lightest)',        fg: 'var(--rh-yuzu-darkest)'       },
    berry:      { bg: 'var(--rh-blueberry-lightest)',   fg: 'var(--rh-blueberry-darkest)'  },
    stone:      { bg: 'var(--rh-stone-light)',          fg: 'var(--rh-stone-darkest)'      },
    error:      { bg: 'var(--rh-error-bg)',             fg: 'var(--rh-error)'              },
    tangerine:  { bg: 'var(--rh-tangerine-lightest)',   fg: 'var(--rh-tangerine-darkest)'  },
  };
  const t = tones[tone] || tones.stone;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 12px', borderRadius: 9999,
      fontSize: 12, fontWeight: 500, lineHeight: 1.2,
      background: t.bg, color: t.fg, whiteSpace: 'nowrap',
    }}>
      {icon}
      {children}
    </span>
  );
};

export const Icon = ({ name, size = 24, color = 'currentColor', style }) => (
  <span style={{ display: 'inline-block', width: size, height: size, color, flexShrink: 0, ...style }}>
    <img src={`/assets/icons/${name}.svg`} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
  </span>
);

export const Card = ({ children, style, padding = 24, ...rest }) => (
  <div style={{
    background: '#fff',
    border: '1px solid var(--rh-stone-light)',
    borderRadius: 12,
    boxShadow: 'var(--rh-shadow-xs)',
    padding,
    transition: 'box-shadow 250ms, transform 220ms',
    ...style,
  }} {...rest}>{children}</div>
);

export const Input = ({ label, value, onChange, error, prefix, suffix, disabled, placeholder, style }) => {
  const [f, setF] = useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--rh-blackberry-light)' }}>{label}</span>}
      <div style={{
        display: 'flex', alignItems: 'center',
        border: `1px solid ${error ? 'var(--rh-error)' : f ? 'var(--rh-blueberry)' : 'var(--rh-stone)'}`,
        borderRadius: 8,
        background: disabled ? 'var(--rh-stone-lightest)' : '#fff',
        boxShadow: f ? 'var(--rh-shadow-focus)' : 'none',
        transition: 'border-color 300ms, box-shadow 300ms',
        padding: '0 12px',
      }}>
        {prefix && <span style={{ color: 'var(--rh-stone-darkest)', marginRight: 6 }}>{prefix}</span>}
        <input
          value={value}
          onChange={onChange}
          onFocus={() => setF(true)}
          onBlur={() => setF(false)}
          disabled={disabled}
          placeholder={placeholder}
          style={{
            border: 'none', outline: 'none', flex: 1,
            padding: '12px 0', fontFamily: 'inherit', fontSize: 15,
            background: 'transparent',
            color: disabled ? 'var(--rh-stone-darkest)' : 'var(--rh-blackberry)',
          }}
        />
        {suffix && <span style={{ color: 'var(--rh-stone-darkest)', marginLeft: 6 }}>{suffix}</span>}
      </div>
      {error && <span style={{ fontSize: 11, color: 'var(--rh-error)' }}>{error}</span>}
    </label>
  );
};

export const Select = ({ label, value, onChange, options = [] }) => (
  <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    {label && <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--rh-blackberry-light)' }}>{label}</span>}
    <div style={{ position: 'relative' }}>
      <select value={value} onChange={onChange}
        style={{
          width: '100%',
          border: '1px solid var(--rh-stone)',
          borderRadius: 8,
          padding: '12px 32px 12px 14px',
          fontFamily: 'inherit', fontSize: 15,
          appearance: 'none',
          background: '#fff',
          color: 'var(--rh-blackberry)',
          cursor: 'pointer',
        }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--rh-stone-darkest)' }}>▾</span>
    </div>
  </label>
);

export const CheckBullet = ({ children }) => (
  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, lineHeight: 1.5, marginBottom: 8 }}>
    <span style={{
      width: 22, height: 22, borderRadius: '50%',
      background: 'var(--rh-lime-lightest)', color: 'var(--rh-lime-dark)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, marginTop: 1,
    }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 12 10 18 20 6"/>
      </svg>
    </span>
    <span>{children}</span>
  </li>
);
