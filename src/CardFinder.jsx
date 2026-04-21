const CardFinder = () => {
  const cards = [
    { name: 'Scotia Momentum Visa', type: 'Cash back', annualFee: '$120', reward: '4% on groceries', bonus: 'Earn $300 cash back', best: 'Best for groceries', color: '#0066b3' },
    { name: 'American Express Cobalt', type: 'Travel', annualFee: '$156', reward: '5x on food & drink', bonus: '15,000 welcome points', best: 'Best overall', color: '#003087' },
    { name: 'MBNA True Line Mastercard', type: 'Low interest', annualFee: '$0', reward: '8.99% interest rate', bonus: '0% balance transfer', best: 'Best for debt', color: '#d92027' },
    { name: 'Tangerine Money-Back', type: 'No-fee cash back', annualFee: '$0', reward: '2% on 2 categories', bonus: 'No annual fee', best: 'Best no-fee', color: '#ff6900' },
  ];
  return (
    <section style={{ padding: '56px 28px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <Pill tone="berry">CardFinder</Pill>
          <h2 style={{ fontSize: 28, fontWeight: 500, margin: '10px 0 6px' }}>Find the right card for you.</h2>
          <p style={{ color: 'var(--rh-blackberry-light)', margin: 0 }}>Answer 5 quick questions — we'll match you to the right card from 200+.</p>
        </div>
        <Button variant="secondary">Start the quiz →</Button>
      </div>
      <div className="rh-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {cards.map((c, i) => (
          <Card key={i} padding={0} style={{ overflow: 'hidden' }}>
            <div style={{ background: c.color, height: 130, position: 'relative', padding: 20, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 11, opacity: .8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.06em' }}>{c.type}</div>
              <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.2 }}>{c.name}</div>
              <div style={{ position: 'absolute', right: 16, bottom: 14, fontSize: 20, fontWeight: 700, opacity: .5 }}>VISA</div>
            </div>
            <div style={{ padding: 18 }}>
              <Pill tone="yuzu">{c.best}</Pill>
              <div style={{ marginTop: 12, fontSize: 13, color: 'var(--rh-blackberry-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--rh-stone-light)' }}>
                  <span>Annual fee</span><span style={{ fontWeight: 500, color: 'var(--rh-blackberry)' }}>{c.annualFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--rh-stone-light)' }}>
                  <span>Reward</span><span style={{ fontWeight: 500, color: 'var(--rh-blackberry)' }}>{c.reward}</span>
                </div>
                <div style={{ padding: '10px 0 0', color: 'var(--rh-lime-dark)', fontWeight: 500, fontSize: 13 }}>{c.bonus}</div>
              </div>
              <Button size="s" style={{ width: '100%', marginTop: 14 }}>See details</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { CardFinder });
