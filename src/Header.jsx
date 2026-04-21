// Header — sticky nav with logo + nav items + sign-in + mobile hamburger
// Logo path: assets/logos/ (relative to root index.html)

const Header = ({ onNavigate, current }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const items = [
    { id: 'mortgages', label: 'Mortgages'           },
    { id: 'cards',     label: 'Credit cards'         },
    { id: 'banking',   label: 'Banking'              },
    { id: 'insurance', label: 'Insurance'            },
    { id: 'investing', label: 'Investing'            },
    { id: 'tools',     label: 'Tools & calculators'  },
    { id: 'home-value', label: 'Home value'           },
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
          <img src="assets/logos/ratehub_full_dark.svg" style={{ height: 26, display: 'block' }} alt="Ratehub.ca" />
        </a>
        <nav style={{ display: 'flex', gap: 2, flex: 1 }}>
          {items.map(it => (
            <a key={it.id} href="#"
              onClick={(e) => { e.preventDefault(); handleNav(it.id); }}
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
        {items.map(it => (
          <a key={it.id} href="#"
            onClick={(e) => { e.preventDefault(); handleNav(it.id); }}
            style={{
              color: current === it.id ? 'var(--rh-blueberry-dark)' : undefined,
              background: current === it.id ? 'var(--rh-blueberry-lightest)' : undefined,
              fontWeight: current === it.id ? 600 : undefined,
            }}
          >{it.label}</a>
        ))}
      </div>
    </header>
  );
};

Object.assign(window, { Header });
