// Header — sticky nav with logo + 6 nav items + sign-in
// Logo path: assets/logos/ (relative to root index.html)

const Header = ({ onNavigate, current }) => {
  const items = [
    { id: 'mortgages', label: 'Mortgages'           },
    { id: 'cards',     label: 'Credit cards'         },
    { id: 'banking',   label: 'Banking'              },
    { id: 'insurance', label: 'Insurance'            },
    { id: 'investing', label: 'Investing'            },
    { id: 'tools',     label: 'Tools & calculators'  },
  ];
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
      }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          style={{ display: 'block', textDecoration: 'none', flexShrink: 0 }}>
          <img src="assets/logos/ratehub_full_dark.svg" style={{ height: 26, display: 'block' }} alt="Ratehub.ca" />
        </a>
        <nav style={{ display: 'flex', gap: 2, flex: 1 }}>
          {items.map(it => (
            <a key={it.id} href="#"
              onClick={(e) => { e.preventDefault(); onNavigate(it.id); }}
              style={{
                padding: '8px 14px', borderRadius: 8,
                fontSize: 14, fontWeight: 500,
                color: current === it.id ? 'var(--rh-blueberry-dark)' : 'var(--rh-blackberry)',
                textDecoration: 'none',
                transition: 'color 250ms, background 250ms',
                background: current === it.id ? 'var(--rh-blueberry-lightest)' : 'transparent',
              }}
              onMouseEnter={e => {
                if (current !== it.id) e.currentTarget.style.color = 'var(--rh-blueberry-dark)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = current === it.id ? 'var(--rh-blueberry-dark)' : 'var(--rh-blackberry)';
              }}
            >{it.label}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <a href="#" style={{ fontSize: 13, color: 'var(--rh-blackberry)', textDecoration: 'none', fontWeight: 500 }}>En · Fr</a>
          <Button size="s" variant="secondary">Sign in</Button>
        </div>
      </div>
    </header>
  );
};

Object.assign(window, { Header });
