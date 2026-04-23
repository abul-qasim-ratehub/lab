// FeaturedIn — Press strip + verified testimonial cards
// Logo path: assets/logos/ (relative to root index.html)

const FeaturedIn = () => {
  const press = [
    { name: 'The Globe and Mail', style: { fontStyle: 'italic', fontWeight: 700 } },
    { name: 'Financial Post',     style: { fontWeight: 700, letterSpacing: '-0.01em' } },
    { name: 'CBC/Radio-Canada',   style: { fontWeight: 700 } },
    { name: 'Forbes',             style: { fontWeight: 900, letterSpacing: '-0.02em' } },
    { name: 'MoneySense',         style: { fontWeight: 700, color: 'var(--rh-blueberry-darkest)', opacity: 1 } },
  ];

  const testimonials = [
    {
      stars: 5, initials: 'SM', tone: 'berry', product: 'Mortgage', date: 'March 2025',
      name: 'Sarah M.', location: 'Toronto, ON',
      quote: 'Saved $14,200 on my mortgage renewal. The side-by-side comparison made it incredibly easy to see exactly which lender was right for my situation.',
    },
    {
      stars: 5, initials: 'JL', tone: 'lime', product: 'Credit cards', date: 'January 2025',
      name: 'James L.', location: 'Vancouver, BC',
      quote: 'Found the perfect cash-back card in under 10 minutes. Ratehub showed me I was leaving $800/year on the table with my old card. Made the switch the same day.',
    },
    {
      stars: 5, initials: 'PK', tone: 'mint', product: 'Savings', date: 'February 2025',
      name: 'Priya K.', location: 'Calgary, AB',
      quote: 'Switched to EQ Bank through Ratehub and immediately started earning 4× more interest on my savings. I genuinely wish I had done this years ago.',
    },
  ];

  const avatarColors = {
    berry: { bg: 'var(--rh-blueberry-lightest)', fg: 'var(--rh-blueberry-darkest)' },
    lime:  { bg: 'var(--rh-lime-lightest)',       fg: 'var(--rh-lime-darkest)'       },
    mint:  { bg: 'var(--rh-mint-light)',           fg: 'var(--rh-mint-darkest)'       },
  };

  const StarRow = ({ count = 5, size = 16 }) => (
    <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="var(--rh-yuzu-dark)" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );

  return (
    <section style={{ padding: '80px 28px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Press logos */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--rh-stone-darkest)', marginBottom: 28 }}>
            Trusted and featured by Canada's leading publications
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
            {press.map(p => (
              <div key={p.name} style={{
                fontSize: 17, color: 'var(--rh-stone-darkest)', opacity: .6, transition: 'opacity 300ms', ...p.style,
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = .6}
              >
                {p.name}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--rh-stone-light)', marginBottom: 56 }} />

        {/* Testimonials header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 500, margin: '0 0 10px', letterSpacing: '-0.01em' }}>Trusted by 12 million Canadians</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <StarRow count={5} size={18} />
              <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--rh-blackberry)' }}>4.9</span>
              <span style={{ fontSize: 13, color: 'var(--rh-stone-darkest)' }}>· 14,200+ reviews on Trustpilot</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--rh-yuzu-lightest)', border: '1px solid var(--rh-yuzu-light)', borderRadius: 10, padding: '10px 16px' }}>
              <Icon name="award" size={22} color="var(--rh-yuzu-darkest)" />
              <div>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--rh-yuzu-darkest)', textTransform: 'uppercase', letterSpacing: '.07em' }}>Best broker</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--rh-blackberry)' }}>CanWise 2024</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--rh-lime-lightest)', border: '1px solid var(--rh-lime-light)', borderRadius: 10, padding: '10px 16px' }}>
              <Icon name="checkmark" size={22} color="var(--rh-lime-darkest)" />
              <div>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--rh-lime-darkest)', textTransform: 'uppercase', letterSpacing: '.07em' }}>Accredited</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--rh-blackberry)' }}>BBB A+ Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="rh-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {testimonials.map((t, i) => {
            const av = avatarColors[t.tone];
            return (
              <Card key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                <StarRow count={t.stars} size={16} />
                <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--rh-blackberry)', margin: '0 0 22px', flex: 1 }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: av.bg, color: av.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--rh-stone-darkest)' }}>{t.location} · {t.date}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Pill tone={t.tone}>{t.product}</Pill>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--rh-lime-darkest)', fontWeight: 500 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      Verified
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Legal / licensing */}
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Icon name="maple-leaf" size={16} color="var(--rh-stone-darkest)" />
          <span style={{ fontSize: 12, color: 'var(--rh-stone-darkest)', lineHeight: 1.5 }}>
            Ratehub Inc. is licensed as a mortgage brokerage in all provinces. Insurance services licensed in ON, AB, and BC.
            Rates updated daily. All figures in CAD.
          </span>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { FeaturedIn });
