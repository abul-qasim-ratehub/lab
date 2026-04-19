const HeroBanner = ({ onFindRates }) => {
  const [province, setProvince] = React.useState('ON');
  const [homeValue, setHomeValue] = React.useState('$750,000');
  const [downPayment, setDownPayment] = React.useState('$150,000');

  return (
    <section style={{ position: 'relative', background: 'var(--rh-blueberry-darkest)', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: .15, pointerEvents: 'none',
        backgroundImage: 'url(../../assets/brand/background-circle.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right -120px center',
        backgroundSize: '700px',
      }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 28px 56px', position: 'relative' }}>
        <div style={{ maxWidth: 640, color: '#fff' }}>
          <Pill tone="yuzu" icon={<Icon name="trophy" size={14} color="var(--rh-yuzu-darkest)" />}>MoneySense — Best Rate Platform 2024</Pill>
          <h1 className="showDot" style={{
            fontSize: 60, fontWeight: 700, lineHeight: 1.1,
            margin: '18px 0 16px', letterSpacing: '-0.02em',
          }}>
            Canada's smartest way<br/>to compare mortgages
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.5, opacity: .9, margin: '0 0 32px' }}>
            Compare rates from 30+ lenders. Save up to $13,384 over your first 5 years — no obligation, no fees.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['No impact on credit', 'Free to use', 'Updated every hour'].map(t => (
              <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--rh-mint)', color: 'var(--rh-blueberry-darkest)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 12 10 18 20 6"/></svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          marginTop: 40,
          background: '#fff', borderRadius: 16, padding: 24,
          boxShadow: 'var(--rh-shadow-l)',
          display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr 1fr auto', gap: 14, alignItems: 'flex-end',
        }}>
          <Select label="I'm looking to" value="purchase" onChange={() => {}} options={[
            { value: 'purchase', label: 'Purchase a new home' },
            { value: 'renew', label: 'Renew my mortgage' },
            { value: 'refinance', label: 'Refinance' },
          ]}/>
          <Select label="Province" value={province} onChange={(e) => setProvince(e.target.value)} options={[
            { value: 'ON', label: 'Ontario' }, { value: 'BC', label: 'British Columbia' }, { value: 'AB', label: 'Alberta' }, { value: 'QC', label: 'Quebec' }, { value: 'NS', label: 'Nova Scotia' },
          ]}/>
          <Input label="Home value" value={homeValue} onChange={(e) => setHomeValue(e.target.value)} />
          <Input label="Down payment" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
          <Button size="l" onClick={onFindRates}>Find my rate →</Button>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { HeroBanner });
