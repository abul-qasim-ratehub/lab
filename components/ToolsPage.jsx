'use client';

import { Anchor, Card, Icon } from './primitives';

export const ToolsPage = () => {
  const tools = [
    { icon: 'house',       label: 'Mortgage payment',     color: 'var(--rh-blueberry-lightest)', fg: 'var(--rh-blueberry-dark)' },
    { icon: 'calculator',  label: 'Affordability',         color: 'var(--rh-mint-lightest)',      fg: 'var(--rh-mint-dark)'      },
    { icon: 'dollar',      label: 'Land transfer tax',     color: 'var(--rh-yuzu-lightest)',      fg: 'var(--rh-yuzu-dark)'      },
    { icon: 'refresh',     label: 'Mortgage penalty',      color: 'var(--rh-stone-lightest)',     fg: 'var(--rh-stone-darkest)'  },
    { icon: 'piggy',       label: 'Savings goals',         color: 'var(--rh-lime-lightest)',      fg: 'var(--rh-lime-dark)'      },
    { icon: 'credit-card', label: 'Debt payoff',           color: 'var(--rh-watermelon-lightest)',fg: 'var(--rh-strawberry)'     },
    { icon: 'trending',    label: 'RRSP vs TFSA',          color: 'var(--rh-lime-lightest)',      fg: 'var(--rh-lime-dark)'      },
    { icon: 'shield',      label: 'Life insurance needs',  color: 'var(--rh-blueberry-lightest)', fg: 'var(--rh-blueberry-dark)' },
    { icon: 'bar-chart',   label: 'Compound interest',     color: 'var(--rh-mint-lightest)',      fg: 'var(--rh-mint-dark)'      },
    { icon: 'map-pin',     label: 'CMHC premium',          color: 'var(--rh-yuzu-lightest)',      fg: 'var(--rh-yuzu-dark)'      },
    { icon: 'dollar',      label: 'Closing costs',         color: 'var(--rh-stone-lightest)',     fg: 'var(--rh-stone-darkest)'  },
    { icon: 'user',        label: 'Income needed',         color: 'var(--rh-blueberry-lightest)', fg: 'var(--rh-blueberry-dark)' },
  ];
  return (
    <div style={{ padding: '56px 28px', maxWidth: 1280, margin: '0 auto' }}>
      <h1 style={{ fontSize: 36, fontWeight: 500, margin: '0 0 8px', letterSpacing: '-0.015em' }}>Free Canadian calculators</h1>
      <p style={{ fontSize: 16, color: 'var(--rh-blackberry-light)', margin: '0 0 32px' }}>20+ interactive tools built for Canadian mortgages, taxes, and savings.</p>
      <div className="rh-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {tools.map((t, i) => (
          <Card key={i} style={{ cursor: 'pointer', padding: 0, overflow: 'hidden' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow='var(--rh-shadow-m)'; e.currentTarget.style.transform='translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow='var(--rh-shadow-xs)'; e.currentTarget.style.transform='none'; }}
          >
            <div style={{ height: 5, background: t.color }} />
            <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={t.icon} size={22} color={t.fg} />
              </div>
              <div>
                <div style={{ fontWeight: 500, fontSize: 13, marginBottom: 4 }}>{t.label}</div>
                <Anchor style={{ fontSize: 12 }}>Try it</Anchor>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
