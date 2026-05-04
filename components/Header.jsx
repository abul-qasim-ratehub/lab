'use client';

// Header — sticky nav with logo + nav items + sign-in + mobile hamburger

import React from 'react';
import { Button } from './primitives';

export const Header = ({ onNavigate, current }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState(null);

  const navGroups = [
    {
      label: 'Mortgages',
      items: [
        { id: 'mortgages', label: 'Mortgages' },
        { id: 'home-value', label: 'Home value' },
        { id: 'members', label: 'My mortgage' },
      ]
    },
    {
      label: 'Products',
      items: [
        { id: 'cards', label: 'Credit cards' },
        { id: 'banking', label: 'Banking' },
        { id: 'insurance', label: 'Insurance' },
        { id: 'investing', label: 'Investing' },
      ]
    },
    {
      label: 'Tools',
      items: [
        { id: 'tools', label: 'Tools & calculators' },
      ]
    },
    {
      label: 'Partners',
      items: [
        { id: 'affiliates', label: 'Affiliate widgets' },
      ]
    },
    {
      label: 'Design System',
      items: [
        { id: 'design-system', label: 'Design System' },
      ]
    },
  ];

  const handleNav = (id) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--rh-coconut)',
      borderBottom: '1px solid var(--rh-stone-light)',
      boxShadow: '0 1px 0 var(--rh-stone-light)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '14px 28px',
        display: 'flex', alignItems: 'center', gap: 36,
        position: 'relative',
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); handleNav('home'); }}
          style={{ display: 'block', textDecoration: 'none', flexShrink: 0 }}>
          <img src="/assets/logos/ratehub_full_dark.svg" style={{ height: 26, display: 'block' }} alt="Ratehub.ca" />
        </a>
        <nav style={{ display: 'flex', gap: 2, flex: 1 }}>
          {navGroups.map(group => (
            <div key={group.label} style={{ position: 'relative' }}>
              <button
                onClick={() => setOpenDropdown(openDropdown === group.label ? null : group.label)}
                style={{
                  padding: '8px 14px', borderRadius: 8,
                  fontSize: 14, fontWeight: 500,
                  color: 'var(--rh-blackberry)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 250ms, background 250ms',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--rh-blueberry-dark)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'var(--rh-blackberry)';
                }}
              >
                {group.label}
              </button>
              {openDropdown === group.label && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0,
                  background: 'var(--rh-coconut)',
                  border: '1px solid var(--rh-stone-light)',
                  borderRadius: 8,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  minWidth: 160,
                  zIndex: 40,
                }}>
                  {group.items.map(it => (
                    <a key={it.id} href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav(it.id);
                        setOpenDropdown(null);
                      }}
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        fontSize: 14,
                        color: 'var(--rh-blackberry)',
                        textDecoration: 'none',
                        transition: 'background 150ms',
                        background: current === it.id ? 'var(--rh-blueberry-lightest)' : 'transparent',
                        fontWeight: current === it.id ? 500 : 400,
                        borderBottom: it !== group.items[group.items.length - 1] ? '1px solid var(--rh-stone-lightest)' : 'none',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--rh-stone-lightest)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = current === it.id ? 'var(--rh-blueberry-lightest)' : 'transparent';
                      }}
                    >{it.label}</a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <a href="#" style={{ fontSize: 13, color: 'var(--rh-blackberry)', textDecoration: 'none', fontWeight: 500 }}>En · Fr</a>
          <Button size="s" variant="secondary">Sign in</Button>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="rh-mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ marginLeft: 'auto' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen
              ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></>
              : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown nav */}
      <div className={`rh-mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {navGroups.map(group => (
          <div key={group.label}>
            <div style={{
              padding: '12px 16px',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--rh-stone-dark)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              {group.label}
            </div>
            {group.items.map(it => (
              <a key={it.id} href="#"
                onClick={(e) => { e.preventDefault(); handleNav(it.id); setMobileOpen(false); }}
                style={{
                  display: 'block',
                  padding: '10px 28px',
                  fontSize: 14,
                  color: current === it.id ? 'var(--rh-blueberry-dark)' : 'var(--rh-blackberry)',
                  background: current === it.id ? 'var(--rh-blueberry-lightest)' : undefined,
                  fontWeight: current === it.id ? 600 : 400,
                  textDecoration: 'none',
                  borderLeft: current === it.id ? '3px solid var(--rh-blueberry-dark)' : 'none',
                }}
              >{it.label}</a>
            ))}
          </div>
        ))}
      </div>
    </header>
  );
};
