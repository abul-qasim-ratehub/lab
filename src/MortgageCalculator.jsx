// MortgageCalculator — Interactive payment calculator with live donut chart
// Uses design system tokens + PulseButton from HeroBannerV2

const MortgageCalculator = ({ onFindRates }) => {
  const [homePrice,    setHomePrice]    = React.useState(750000);
  const [downPercent,  setDownPercent]  = React.useState(20);
  const [amortization, setAmortization] = React.useState(25);
  const [rate,         setRate]         = React.useState(4.39);

  // ── Calculations ──
  const loanAmount    = homePrice * (1 - downPercent / 100);
  const monthlyRate   = rate / 100 / 12;
  const n             = amortization * 12;
  const monthly       = monthlyRate > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    : loanAmount / n;
  const totalPaid     = monthly * n;
  const totalInterest = totalPaid - loanAmount;
  const principalPct  = loanAmount / totalPaid;

  // ── Donut chart geometry (SVG, centre 90,90, radius 64) ──
  const R    = 64;
  const circ = 2 * Math.PI * R;
  const pArc = Math.max(principalPct * circ, 2);       // principal arc
  const iArc = Math.max((1 - principalPct) * circ, 2); // interest arc

  // ── Formatters ──
  const fmt  = v => '$' + Math.round(v).toLocaleString('en-CA');
  const fmtM = v => '$' + Math.round(v).toLocaleString('en-CA');

  // ── Slider row helper ──
  const SliderRow = ({ label, valueLabel, min, max, step, value, onChange, minLabel, maxLabel }) => (
    <div style={{ marginBottom: 26 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--rh-blackberry-light)' }}>{label}</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--rh-blueberry-darkest)', letterSpacing: '-0.01em' }}>{valueLabel}</span>
      </div>
      <div style={{ position: 'relative', height: 6, marginBottom: 6 }}>
        {/* Track fill effect */}
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%',
          width: `${((value - min) / (max - min)) * 100}%`,
          background: 'var(--rh-blueberry-dark)', borderRadius: 3, pointerEvents: 'none',
          transition: 'width 80ms',
        }} />
        <input
          type="range" className="rh-slider"
          min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', margin: 0 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--rh-stone-darkest)', marginTop: 2 }}>
        <span>{minLabel}</span><span>{maxLabel}</span>
      </div>
    </div>
  );

  return (
    <section style={{ padding: '80px 28px', background: 'var(--rh-stone-lightest)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* ── Section header ── */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Pill tone="berry" icon={<Icon name="calculator" size={14} color="var(--rh-blueberry-darkest)" />}>
            Mortgage calculator
          </Pill>
          <h2 className="showDot" style={{
            fontSize: 36, fontWeight: 500, margin: '14px 0 10px',
            letterSpacing: '-0.015em', lineHeight: 1.2,
          }}>
            See your real monthly payment
          </h2>
          <p style={{ color: 'var(--rh-blackberry-light)', fontSize: 16, margin: '0 auto', maxWidth: 500, lineHeight: 1.6 }}>
            Adjust the sliders to match your scenario, then compare live rates to see how much you can save.
          </p>
        </div>

        {/* ── Main grid ── */}
        <div className="rh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>

          {/* Left — Controls */}
          <Card style={{ padding: '32px 32px 24px' }}>
            <SliderRow
              label="Home price"
              valueLabel={fmt(homePrice)}
              min={200000} max={2000000} step={5000}
              value={homePrice} onChange={setHomePrice}
              minLabel="$200K" maxLabel="$2M"
            />
            <SliderRow
              label="Down payment"
              valueLabel={`${downPercent}% — ${fmt(homePrice * downPercent / 100)}`}
              min={5} max={50} step={1}
              value={downPercent} onChange={setDownPercent}
              minLabel="5%" maxLabel="50%"
            />
            <SliderRow
              label="Amortization period"
              valueLabel={`${amortization} years`}
              min={5} max={30} step={5}
              value={amortization} onChange={setAmortization}
              minLabel="5 yrs" maxLabel="30 yrs"
            />
            <SliderRow
              label="Interest rate (5-yr fixed)"
              valueLabel={`${rate.toFixed(2)}%`}
              min={2} max={9} step={0.05}
              value={rate} onChange={setRate}
              minLabel="2.00%" maxLabel="9.00%"
            />

            {/* Summary chips */}
            <div className="rh-grid-3" style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
              background: 'var(--rh-blueberry-lightest)', borderRadius: 12, padding: '16px 20px',
              marginTop: 8,
            }}>
              {[
                { label: 'Mortgage amount', value: fmt(loanAmount) },
                { label: 'Total interest',  value: fmt(totalInterest) },
                { label: 'Total cost',      value: fmt(totalPaid) },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontSize: 11, color: 'var(--rh-blueberry-dark)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 5 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--rh-blueberry-darkest)' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Right — Chart + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Payment card with donut */}
            <Card style={{ padding: '28px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: 'var(--rh-stone-darkest)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 6 }}>
                Estimated monthly payment
              </div>
              <div style={{ fontSize: 46, fontWeight: 700, color: 'var(--rh-blackberry)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                {fmtM(monthly)}
                <span style={{ fontSize: 16, color: 'var(--rh-stone-darkest)', fontWeight: 400, marginLeft: 2 }}>/mo</span>
              </div>

              {/* Donut chart */}
              <div style={{ position: 'relative', width: 180, height: 180, margin: '20px auto 8px' }}>
                <svg viewBox="0 0 180 180" width="180" height="180">
                  {/* Background track */}
                  <circle cx="90" cy="90" r={R} fill="none" stroke="var(--rh-stone-light)" strokeWidth="22" />

                  {/* Interest segment — lime */}
                  <circle
                    cx="90" cy="90" r={R} fill="none"
                    stroke="var(--rh-lime-dark)"
                    strokeWidth="22"
                    strokeDasharray={`${iArc} ${circ}`}
                    strokeDashoffset={-pArc}
                    transform="rotate(-90 90 90)"
                  />

                  {/* Principal segment — blueberry (painted on top) */}
                  <circle
                    cx="90" cy="90" r={R} fill="none"
                    stroke="var(--rh-blueberry-dark)"
                    strokeWidth="22"
                    strokeDasharray={`${pArc} ${circ}`}
                    strokeDashoffset={0}
                    transform="rotate(-90 90 90)"
                  />
                </svg>

                {/* Overlaid centre text */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ fontSize: 11, color: 'var(--rh-stone-darkest)', fontWeight: 500 }}>Monthly</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--rh-blackberry)', letterSpacing: '-0.01em' }}>{fmtM(monthly)}</div>
                </div>
              </div>

              {/* Legend */}
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 22, fontSize: 12, color: 'var(--rh-blackberry-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--rh-blueberry-dark)', display: 'inline-block', flexShrink: 0 }}/>
                  Principal <strong style={{ color: 'var(--rh-blackberry)' }}>{Math.round(principalPct * 100)}%</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--rh-lime-dark)', display: 'inline-block', flexShrink: 0 }}/>
                  Interest <strong style={{ color: 'var(--rh-blackberry)' }}>{Math.round((1 - principalPct) * 100)}%</strong>
                </div>
              </div>

              <Button
                size="l"
                onClick={onFindRates}
                style={{ width: '100%' }}
              >
                Compare live rates →
              </Button>
              <div style={{ fontSize: 11, color: 'var(--rh-stone-darkest)', marginTop: 10 }}>
                Based on {rate.toFixed(2)}% · {amortization}-yr amortization · {downPercent}% down
              </div>
            </Card>

            {/* Best rate highlight */}
            <div style={{
              background: 'var(--rh-blueberry-darkest)', color: '#fff',
              borderRadius: 14, padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <Icon name="lightning" size={30} color="var(--rh-yuzu)" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, opacity: .7, marginBottom: 3, fontWeight: 500 }}>
                  Today's best Ontario 5-yr fixed
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.01em' }}>
                  4.39%
                  <span style={{ fontSize: 13, fontWeight: 400, opacity: .65, marginLeft: 6 }}>· Butler Mortgage</span>
                </div>
              </div>
              <Anchor href="#" style={{ color: 'var(--rh-mint)', fontSize: 13, whiteSpace: 'nowrap' }}>
                Get this rate
              </Anchor>
            </div>

            {/* Penalty / renewal alert */}
            <div style={{
              background: 'var(--rh-yuzu-lightest)', border: '1px solid var(--rh-yuzu-light)',
              borderRadius: 12, padding: '14px 18px',
              display: 'flex', alignItems: 'flex-start', gap: 12,
            }}>
              <Icon name="light-bulb" size={22} color="var(--rh-yuzu-darkest)" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--rh-yuzu-darkest)', marginBottom: 3 }}>
                  Renewing in 2025?
                </div>
                <div style={{ fontSize: 12, color: 'var(--rh-blackberry-light)', lineHeight: 1.5 }}>
                  Start comparing 120 days early — it's free and could save you thousands. <Anchor href="#" icon={false} style={{ fontSize: 12 }}>Learn more</Anchor>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { MortgageCalculator });
