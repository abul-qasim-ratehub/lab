const TrustStrip = () => {
  const stats = [
    { n: '12M+', l: 'Canadians helped' },
    { n: '$8.6B', l: 'Mortgages funded' },
    { n: '30+',   l: 'Lenders compared' },
    { n: '4.9',   l: 'Trustpilot rating' },
  ];
  return (
    <section style={{ background: 'var(--rh-stone-lightest)', padding: '56px 28px' }}>
      <div className="rh-grid-4" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, alignItems: 'center' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div className="showDot" style={{ fontSize: 44, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--rh-blueberry-darkest)', lineHeight: 1 }}>{s.n}</div>
            <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', marginTop: 6, fontWeight: 500 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const AwardStrip = () => {
  const awards = ['MoneySense 2024', 'Best Mortgage Broker 2023', 'Webby Award 2022', 'CMA Awards 2024', 'BBB Accredited'];
  return (
    <section style={{ padding: '40px 28px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--rh-stone-darkest)', marginBottom: 20, fontWeight: 500 }}>
        Trusted by Canadians & recognized by the industry
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 36, flexWrap: 'wrap', opacity: .7 }}>
        {awards.map(a => (
          <div key={a} style={{ fontSize: 14, fontWeight: 500, color: 'var(--rh-blackberry-light)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="trophy" size={22} color="var(--rh-yuzu-dark)" />{a}
          </div>
        ))}
      </div>
    </section>
  );
};

Object.assign(window, { TrustStrip, AwardStrip });
