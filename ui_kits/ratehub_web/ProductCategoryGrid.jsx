const ProductCategoryGrid = ({ onNavigate }) => {
  const cats = [
    { id: 'mortgages', icon: 'house',       name: 'Mortgages',    desc: 'Compare 30+ lenders' },
    { id: 'cards',     icon: 'credit-card', name: 'Credit cards', desc: '200+ cards. One quiz.' },
    { id: 'banking',   icon: 'piggy',       name: 'Savings',      desc: 'Up to 5.00% interest' },
    { id: 'insurance', icon: 'shield',      name: 'Insurance',    desc: 'Home, auto, life, travel' },
    { id: 'investing', icon: 'trending',    name: 'Investing',    desc: 'Robo-advisors & GICs' },
    { id: 'tools',     icon: 'calculator',  name: 'Tools',        desc: '20+ free calculators' },
  ];
  return (
    <section style={{ padding: '80px 28px 24px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 32, fontWeight: 500, margin: '0 0 8px', letterSpacing: '-0.01em' }}>One place. Every product.</h2>
          <p style={{ fontSize: 16, color: 'var(--rh-blackberry-light)', margin: 0, maxWidth: 560 }}>
            Compare side-by-side, apply in minutes, and track every financial decision from one dashboard.
          </p>
        </div>
        <Anchor>See everything we compare</Anchor>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
        {cats.map(c => (
          <button key={c.id} onClick={() => onNavigate(c.id)} style={{
            background: '#fff', border: '1px solid var(--rh-stone-light)', borderRadius: 16,
            padding: '24px 20px',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12,
            cursor: 'pointer', textAlign: 'left',
            transition: 'border-color 300ms, box-shadow 300ms, transform 300ms',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--rh-blueberry)'; e.currentTarget.style.boxShadow = 'var(--rh-shadow-m)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--rh-stone-light)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Icon name={c.icon} size={52} color="var(--rh-blueberry-dark)" />
            <div>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 2 }}>{c.name}</div>
              <div style={{ fontSize: 13, color: 'var(--rh-stone-darkest)' }}>{c.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { ProductCategoryGrid });
