const EducationStrip = () => {
  const items = [
    { tag: 'Guides', title: 'How much mortgage can I afford in Canada?', read: '8 min read', color: 'var(--rh-blueberry-lightest)' },
    { tag: 'News',   title: 'Bank of Canada holds key rate at 4.00% — what it means for homebuyers', read: '5 min read', color: 'var(--rh-yuzu-lightest)' },
    { tag: 'Tools',  title: 'Use the mortgage affordability calculator to plan your budget', read: 'Interactive', color: 'var(--rh-mint-lightest)' },
  ];
  return (
    <section style={{ padding: '72px 28px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 500, margin: '0 0 6px' }}>Learn before you borrow.</h2>
          <p style={{ color: 'var(--rh-blackberry-light)', margin: 0 }}>Expert guides and MoneySense editorial — because knowing your options is half the battle.</p>
        </div>
        <Anchor>Visit the Education Centre</Anchor>
      </div>
      <div className="rh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {items.map((it, i) => (
          <Card key={i} padding={0} style={{ overflow: 'hidden' }}>
            <div style={{ height: 140, background: it.color, display: 'flex', alignItems: 'flex-end', padding: 20 }}>
              <Pill tone="stone">{it.tag}</Pill>
            </div>
            <div style={{ padding: 22 }}>
              <h3 style={{ fontSize: 18, fontWeight: 500, margin: '0 0 12px', lineHeight: 1.35 }}>{it.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--rh-stone-darkest)' }}>
                <span>{it.read}</span>
                <Anchor>Read</Anchor>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { EducationStrip });
