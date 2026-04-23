'use client';

import { useEffect, useState } from 'react';

const KEY = 'rh_gate_v1';
const PASS = 'gatehub12';

export const PasswordGate = ({ children }) => {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(KEY) === '1') setAuthed(true);
    setChecked(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === PASS) {
      sessionStorage.setItem(KEY, '1');
      setAuthed(true);
      setValue('');
    } else {
      setValue('');
      setError('Redirecting…');
      window.location.replace('https://www.google.com');
    }
  };

  if (!checked) return null;
  if (authed) return children;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Access required"
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{
        width: '100%', maxWidth: 340,
        padding: '0 24px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18,
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c0ced3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <form onSubmit={handleSubmit} autoComplete="off" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="password"
            placeholder="Enter password"
            autoFocus
            spellCheck="false"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px', fontSize: 16,
              border: '1.5px solid #c0ced3', borderRadius: 10,
              outline: 'none', textAlign: 'center', letterSpacing: '0.1em',
              transition: 'border-color 200ms', fontFamily: 'inherit',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%', padding: 15, fontSize: 16, fontWeight: 600,
              background: '#00b5d6', color: '#fff', border: 'none', borderRadius: 10,
              cursor: 'pointer', transition: 'background 200ms', letterSpacing: '-0.01em',
              fontFamily: 'inherit',
            }}
          >
            Continue
          </button>
        </form>
        <div aria-live="polite" style={{
          fontSize: 13, color: '#f6452c', textAlign: 'center',
          minHeight: 18, transition: 'opacity 200ms',
        }}>
          {error}
        </div>
      </div>
    </div>
  );
};
