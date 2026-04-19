const MortgageRateTable = () => {
  const rates = [
    { lender: 'Butler Mortgage',     type: '5-yr fixed',    rate: '4.39',  apr: '4.41', payment: '$2,493', save: '$13,384', best: true },
    { lender: 'CanWise',             type: '5-yr fixed',    rate: '4.44',  apr: '4.47', payment: '$2,507', save: '$12,832', best: false },
    { lender: 'TD Canada Trust',     type: '5-yr fixed',    rate: '4.59',  apr: '4.63', payment: '$2,548', save: '$11,264', best: false },
    { lender: 'Scotiabank',          type: '5-yr variable', rate: '4.95',  apr: '4.98', payment: '$2,649', save: '$7,192',  best: false },
    { lender: 'RBC Royal Bank',      type: '5-yr fixed',    rate: '5.14',  apr: '5.17', payment: '$2,704', save: '$5,094',  best: false },
  ];
  const [sort, setSort] = React.useState('rate');
  return (
    <section style={{ padding: '72px 28px 40px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 500, margin: '0 0 6px' }}>Today's best Ontario rates</h2>
          <p style={{ color: 'var(--rh-stone-darkest)', fontSize: 13, margin: 0 }}>$750,000 home · 20% down · 25-yr amortization · Updated today</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: 'var(--rh-stone-darkest)' }}>Sort by</span>
          {['rate', 'payment', 'save'].map(s => (
            <button key={s} onClick={() => setSort(s)} style={{
              background: sort === s ? 'var(--rh-blueberry-darkest)' : '#fff',
              color: sort === s ? '#fff' : 'var(--rh-blackberry)',
              border: `1px solid ${sort === s ? 'var(--rh-blueberry-darkest)' : 'var(--rh-stone)'}`,
              borderRadius: 9999, padding: '6px 14px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>{s === 'rate' ? 'Rate' : s === 'payment' ? 'Payment' : 'Savings'}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rates.map((r, i) => (
          <Card key={i} padding={0}>
            <div style={{
              display: 'grid', gridTemplateColumns: '180px 1fr 1fr 1fr 1fr auto',
              gap: 20, alignItems: 'center', padding: '18px 24px',
            }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--rh-blueberry-darkest)', marginBottom: 4, letterSpacing: '-0.01em' }}>{r.lender}</div>
                {r.best && <Pill tone="lime" icon={<span style={{width:6,height:6,borderRadius:'50%',background:'currentColor',display:'inline-block'}}/>}>Best rate</Pill>}
              </div>
              <div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--rh-stone-darkest)', fontWeight: 500, marginBottom: 2 }}>Type</div>
                <div style={{ fontSize: 14 }}>{r.type}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--rh-stone-darkest)', fontWeight: 500, marginBottom: 2 }}>Rate</div>
                <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.1 }}>{r.rate}<span style={{ fontSize: 14, fontWeight: 400, color: 'var(--rh-stone-darkest)' }}>%</span></div>
                <div style={{ fontSize: 11, color: 'var(--rh-stone-darkest)' }}>APR {r.apr}%</div>
              </div>
              <div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--rh-stone-darkest)', fontWeight: 500, marginBottom: 2 }}>Monthly</div>
                <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.1 }}>{r.payment}<span style={{ fontSize: 12, fontWeight: 400, color: 'var(--rh-stone-darkest)' }}>/mo</span></div>
              </div>
              <div>
                <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--rh-stone-darkest)', fontWeight: 500, marginBottom: 2 }}>5-yr savings</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--rh-lime-dark)', lineHeight: 1.1 }}>{r.save}</div>
              </div>
              <Button size="m">Next steps →</Button>
            </div>
          </Card>
        ))}
      </div>
      <div style={{ marginTop: 18, fontSize: 12, color: 'var(--rh-stone-darkest)' }}>
        Rates shown are for qualified borrowers. Ratehub.ca may receive compensation when you apply with some lenders.
      </div>
    </section>
  );
};

Object.assign(window, { MortgageRateTable });
