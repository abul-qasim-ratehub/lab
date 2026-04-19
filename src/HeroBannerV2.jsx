// HeroBannerV2 — Light split-screen hero
// Asset paths relative to root index.html (assets/brand/, assets/logos/)

(function () {
  if (document.getElementById('rh-v2-styles')) return;
  const s = document.createElement('style');
  s.id = 'rh-v2-styles';
  s.textContent = `
    @keyframes rh-pulse {
      0%   { box-shadow: 0 0 0 0   rgba(0,181,214,0.55); }
      65%  { box-shadow: 0 0 0 14px rgba(0,181,214,0);   }
      100% { box-shadow: 0 0 0 0   rgba(0,181,214,0);    }
    }
    .rh-pulse-btn { animation: rh-pulse 2.4s infinite; }
    .rh-pulse-btn:hover { animation: none; box-shadow: var(--rh-shadow-m) !important; }

    input[type=range].rh-slider {
      -webkit-appearance: none; appearance: none;
      width: 100%; height: 6px; border-radius: 3px;
      background: var(--rh-stone-light); outline: none; cursor: pointer; border: none;
    }
    input[type=range].rh-slider::-webkit-slider-thumb {
      -webkit-appearance: none; appearance: none;
      width: 20px; height: 20px; border-radius: 50%;
      background: var(--rh-blueberry-dark); cursor: pointer;
      box-shadow: 0 2px 8px rgba(0,114,158,0.35);
      transition: transform 150ms ease;
    }
    input[type=range].rh-slider::-webkit-slider-thumb:hover { transform: scale(1.25); }
    input[type=range].rh-slider::-moz-range-thumb {
      width: 20px; height: 20px; border-radius: 50%; border: none;
      background: var(--rh-blueberry-dark); cursor: pointer;
    }

    .rh-hero-tab { transition: color 200ms; cursor: pointer; }
    .rh-hero-tab:hover { color: var(--rh-blackberry) !important; }

    .rh-option-btn { transition: border-color 180ms, background 180ms; }
    .rh-option-btn:hover { border-color: var(--rh-blueberry-light) !important; }

    .rh-cat-card { transition: border-color 280ms, box-shadow 280ms, transform 220ms !important; }
    .rh-cat-card:hover {
      border-color: var(--rh-blueberry) !important;
      box-shadow: var(--rh-shadow-m) !important;
      transform: translateY(-4px) !important;
    }

    .rh-step-input:focus-within {
      border-color: var(--rh-blueberry) !important;
      box-shadow: var(--rh-shadow-focus) !important;
    }
    .rh-step-input input { border: none; outline: none; flex: 1; font-family: inherit; background: transparent; }
  `;
  document.head.appendChild(s);
})();

const PulseButton = ({ children, onClick, style, size = 'l' }) => {
  const sizes = {
    s: { padding: '10px 20px', fontSize: 14 },
    m: { padding: '13px 24px', fontSize: 15 },
    l: { padding: '17px 32px', fontSize: 17 },
  };
  const [h, setH] = React.useState(false);
  return (
    <button
      className="rh-pulse-btn"
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        fontFamily: 'var(--rh-font-sans)', fontWeight: 600, border: 'none',
        borderRadius: 10, cursor: 'pointer', lineHeight: 1.2,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        background: h ? 'var(--rh-blueberry-dark)' : 'var(--rh-blueberry)',
        color: '#fff', transition: 'background-color 250ms', whiteSpace: 'nowrap',
        ...sizes[size], ...style,
      }}
    >
      {children}
    </button>
  );
};

const StepDots = ({ current, total }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 20 }}>
    {Array.from({ length: total }).map((_, i) => {
      const n = i + 1;
      const done = n < current;
      const active = n === current;
      return (
        <React.Fragment key={n}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700,
            background: active ? 'var(--rh-blackberry)' : done ? 'var(--rh-blueberry)' : 'transparent',
            border: active || done ? 'none' : '2px solid var(--rh-stone)',
            color: active || done ? '#fff' : 'var(--rh-stone-darkest)',
            transition: 'all 300ms',
          }}>
            {done
              ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 12 10 18 20 6"/></svg>
              : n
            }
          </div>
          {i < total - 1 && (
            <div style={{
              flex: 1, height: 2,
              background: n < current ? 'var(--rh-blueberry)' : 'var(--rh-stone-light)',
              transition: 'background 300ms',
            }} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

const OptionBtn = ({ value, selected, label, onClick }) => (
  <button
    className="rh-option-btn"
    onClick={onClick}
    style={{
      padding: '13px 16px', borderRadius: 10, fontFamily: 'inherit',
      border: `1.5px solid ${selected ? 'var(--rh-blueberry)' : 'var(--rh-stone)'}`,
      background: selected ? 'var(--rh-blueberry-lightest)' : '#fff',
      color: 'var(--rh-blackberry)', fontSize: 14,
      fontWeight: selected ? 500 : 400,
      textAlign: 'left', cursor: 'pointer', width: '100%',
    }}
  >{label}</button>
);

const StepInput = ({ label, value, onChange, prefix, placeholder = '' }) => (
  <div>
    <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', fontWeight: 500, marginBottom: 8 }}>{label}</div>
    <div
      className="rh-step-input"
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        border: '1.5px solid var(--rh-stone)', borderRadius: 10,
        padding: '14px 16px', background: '#fff',
        transition: 'border-color 200ms, box-shadow 200ms',
      }}
    >
      {prefix && <span style={{ color: 'var(--rh-stone-darkest)', fontSize: 18, fontWeight: 500, flexShrink: 0 }}>{prefix}</span>}
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ flex: 1, fontSize: 18, fontWeight: 500, fontFamily: 'inherit', color: 'var(--rh-blackberry)' }}
      />
    </div>
  </div>
);

const ProvinceSelect = ({ value, onChange }) => (
  <div>
    <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', fontWeight: 500, marginBottom: 8 }}>Province</div>
    <div style={{ position: 'relative' }}>
      <select value={value} onChange={e => onChange(e.target.value)} style={{
        width: '100%', border: '1.5px solid var(--rh-stone)', borderRadius: 10,
        padding: '14px 40px 14px 16px', fontSize: 16, fontFamily: 'inherit',
        appearance: 'none', background: '#fff', color: 'var(--rh-blackberry)', cursor: 'pointer',
      }}>
        {[['ON','Ontario'],['BC','British Columbia'],['AB','Alberta'],['QC','Quebec'],['NS','Nova Scotia'],['MB','Manitoba'],['SK','Saskatchewan']].map(([v,l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
      <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--rh-stone-darkest)' }}>▾</span>
    </div>
  </div>
);

const HeroBannerV2 = ({ onFindRates, onNavigate }) => {
  const [tab, setTab]   = React.useState('mortgages');
  const [step, setStep] = React.useState(1);

  const [mortgageAmount, setMortgageAmount] = React.useState('500,000');
  const [purchaseType,   setPurchaseType]   = React.useState('purchase');
  const [province,       setProvince]       = React.useState('ON');
  const [monthlySpend,   setMonthlySpend]   = React.useState('3,000');
  const [topCategory,    setTopCategory]    = React.useState('groceries');
  const [feePreference,  setFeePreference]  = React.useState('any');
  const [accountType,    setAccountType]    = React.useState('hisa');
  const [depositAmount,  setDepositAmount]  = React.useState('10,000');
  const [insType,        setInsType]        = React.useState('home');
  const [postalCode,     setPostalCode]     = React.useState('');

  const TOTAL_STEPS = 3;

  const tabs = [
    { id: 'mortgages', label: 'Mortgages',    icon: 'house'       },
    { id: 'cards',     label: 'Credit Cards', icon: 'credit-card' },
    { id: 'banking',   label: 'Banking',      icon: 'piggy'       },
    { id: 'insurance', label: 'Insurance',    icon: 'shield'      },
  ];

  const rateTeasers = {
    mortgages: { eyebrow: '5-YR FIXED, FROM',      rate: '4.29%',     note: 'Based on 30+ lenders on the Ratehub marketplace' },
    cards:     { eyebrow: 'TOP CASH BACK RATE',    rate: '4%',        note: 'On groceries · 200+ cards compared for you'       },
    banking:   { eyebrow: 'BEST HISA RATE TODAY',  rate: '4.00%',     note: 'CDIC-insured · No minimum deposit required'       },
    insurance: { eyebrow: 'AVERAGE SAVINGS',       rate: 'Up to 32%', note: 'On home & auto bundled coverage'                 },
  };

  const ctaFinal = {
    mortgages: 'See my rates →',
    cards:     'Find my card →',
    banking:   'See savings rates →',
    insurance: 'Get my quote →',
  };

  const switchTab = (id) => { setTab(id); setStep(1); };

  const handleContinue = () => {
    if (step < TOTAL_STEPS) { setStep(s => s + 1); return; }
    if (tab === 'mortgages' && onFindRates) return onFindRates();
    if (onNavigate) onNavigate(tab === 'banking' ? 'banking' : tab);
  };

  const renderStep = () => {
    if (tab === 'mortgages') {
      if (step === 1) return <StepInput label="Mortgage amount" value={mortgageAmount} onChange={setMortgageAmount} prefix="$" />;
      if (step === 2) return (
        <div>
          <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', fontWeight: 500, marginBottom: 8 }}>I'm looking to</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['purchase','Purchase a new home'],['renew','Renew my mortgage'],['refinance','Refinance'],['heloc','Get a HELOC']].map(([v,l]) => (
              <OptionBtn key={v} value={v} selected={purchaseType===v} label={l} onClick={() => setPurchaseType(v)} />
            ))}
          </div>
        </div>
      );
      if (step === 3) return <ProvinceSelect value={province} onChange={setProvince} />;
    }
    if (tab === 'cards') {
      if (step === 1) return <StepInput label="Monthly spend" value={monthlySpend} onChange={setMonthlySpend} prefix="$" />;
      if (step === 2) return (
        <div>
          <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', fontWeight: 500, marginBottom: 8 }}>I spend most on</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['groceries','Groceries & dining'],['travel','Travel & flights'],['gas','Gas & transit'],['general','Everything equally']].map(([v,l]) => (
              <OptionBtn key={v} value={v} selected={topCategory===v} label={l} onClick={() => setTopCategory(v)} />
            ))}
          </div>
        </div>
      );
      if (step === 3) return (
        <div>
          <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', fontWeight: 500, marginBottom: 8 }}>Annual fee preference</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['any','Any fee is fine'],['none','No annual fee only'],['low','Under $120/yr']].map(([v,l]) => (
              <OptionBtn key={v} value={v} selected={feePreference===v} label={l} onClick={() => setFeePreference(v)} />
            ))}
          </div>
        </div>
      );
    }
    if (tab === 'banking') {
      if (step === 1) return (
        <div>
          <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', fontWeight: 500, marginBottom: 8 }}>Account type</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['hisa','High-interest savings (HISA)'],['tfsa','TFSA savings'],['gic','GIC / term deposit'],['chequing','Chequing account']].map(([v,l]) => (
              <OptionBtn key={v} value={v} selected={accountType===v} label={l} onClick={() => setAccountType(v)} />
            ))}
          </div>
        </div>
      );
      if (step === 2) return <StepInput label="Starting deposit" value={depositAmount} onChange={setDepositAmount} prefix="$" />;
      if (step === 3) return <ProvinceSelect value={province} onChange={setProvince} />;
    }
    if (tab === 'insurance') {
      if (step === 1) return (
        <div>
          <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', fontWeight: 500, marginBottom: 8 }}>Coverage type</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['home','Home insurance'],['auto','Auto insurance'],['life','Life insurance'],['tenant','Tenant insurance']].map(([v,l]) => (
              <OptionBtn key={v} value={v} selected={insType===v} label={l} onClick={() => setInsType(v)} />
            ))}
          </div>
        </div>
      );
      if (step === 2) return <ProvinceSelect value={province} onChange={setProvince} />;
      if (step === 3) return <StepInput label="Postal code" value={postalCode} onChange={setPostalCode} placeholder="e.g. M5V 3A5" />;
    }
  };

  const teaser = rateTeasers[tab];
  const isLastStep = step === TOTAL_STEPS;
  const ctaLabel = isLastStep ? ctaFinal[tab] : 'Continue →';

  return (
    <section style={{
      background: 'linear-gradient(160deg, var(--rh-stone-lightest) 0%, #fff 55%)',
      padding: '80px 28px 80px',
      borderBottom: '1px solid var(--rh-stone-light)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 480px', gap: 64, alignItems: 'center' }}>

        {/* ── LEFT: editorial copy ── */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid var(--rh-stone)', borderRadius: 9999,
            padding: '5px 14px 5px 8px', marginBottom: 32,
            background: '#fff', boxShadow: 'var(--rh-shadow-xs)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--rh-blueberry)', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--rh-blackberry-light)' }}>Trusted by 12M+ Canadians</span>
          </div>

          {/* Editorial headline */}
          <h1 style={{ margin: '0 0 24px', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            <span style={{
              display: 'block', fontSize: 62, fontWeight: 700,
              color: 'var(--rh-blueberry-darkest)', fontFamily: 'var(--rh-font-sans)',
            }}>
              Smarter financial<br/>choices,
            </span>
            <span style={{
              display: 'block', fontSize: 62, fontWeight: 700,
              color: 'var(--rh-blueberry-darkest)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontStyle: 'italic', letterSpacing: '-0.01em',
            }}>
              simplified.
            </span>
          </h1>

          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--rh-blackberry-light)', margin: '0 0 36px', maxWidth: 460 }}>
            Compare mortgages, cards, banking and insurance side-by-side.
            Zero fluff. Zero spam. <strong style={{ color: 'var(--rh-blackberry)' }}>Zero fees — ever.</strong>
          </p>

          {/* Inline trust stats */}
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { stat: '$8.6B',  label: 'mortgages funded'      },
              { stat: '4.9',    label: 'Trustpilot (14,200+)'  },
              { stat: '14 yrs', label: 'helping Canadians'     },
            ].map(({ stat, label }) => (
              <div key={stat}>
                <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--rh-blackberry)', letterSpacing: '-0.02em', lineHeight: 1 }}>{stat}</div>
                <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Award row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            {[
              { icon: 'award',     label: 'MoneySense Best Platform 2024', color: 'var(--rh-yuzu-dark)' },
              { icon: 'checkmark', label: 'BBB A+ Accredited',             color: 'var(--rh-lime-dark)'  },
              { icon: 'maple-leaf',label: 'FSRA Licensed Broker',          color: 'var(--rh-strawberry)' },
            ].map((a, i) => (
              <React.Fragment key={a.label}>
                {i > 0 && <div style={{ width: 1, height: 14, background: 'var(--rh-stone)' }} />}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--rh-stone-darkest)' }}>
                  <Icon name={a.icon} size={16} color={a.color} />
                  {a.label}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── RIGHT: floating widget card ── */}
        <div style={{
          background: '#fff', borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 8px 48px rgba(0,79,110,0.14), 0 2px 8px rgba(0,79,110,0.06)',
          border: '1px solid var(--rh-stone-light)',
        }}>
          {/* Tab bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid var(--rh-stone-light)' }}>
            {tabs.map(t => {
              const active = tab === t.id;
              return (
                <button key={t.id} className="rh-hero-tab" onClick={() => switchTab(t.id)} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                  padding: '14px 8px 12px', border: 'none', background: 'transparent',
                  cursor: 'pointer', fontFamily: 'inherit', position: 'relative',
                  color: active ? 'var(--rh-blackberry)' : 'var(--rh-stone-darkest)',
                  borderBottom: active ? '2.5px solid var(--rh-blueberry)' : '2.5px solid transparent',
                  marginBottom: -1,
                }}>
                  <Icon name={t.icon} size={20} color={active ? 'var(--rh-blueberry-dark)' : 'var(--rh-stone-darkest)'} />
                  <span style={{ fontSize: 12, fontWeight: active ? 600 : 400 }}>{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Card body */}
          <div style={{ padding: '22px 24px 24px' }}>
            {/* Live rate badge + rate display */}
            <div style={{ marginBottom: 18 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'var(--rh-blueberry-lightest)', borderRadius: 9999,
                padding: '5px 12px', marginBottom: 12,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--rh-blueberry)', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--rh-blueberry-dark)' }}>
                  Live rates · updated {new Date().toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--rh-stone-darkest)', marginBottom: 4 }}>
                    {teaser.eyebrow}
                  </div>
                  <div style={{ fontSize: 40, fontWeight: 700, color: 'var(--rh-blackberry)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                    {teaser.rate}
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--rh-stone-darkest)', textAlign: 'right', maxWidth: 140, lineHeight: 1.5 }}>
                  {teaser.note}
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--rh-stone-light)', margin: '0 -24px 20px' }} />

            {/* Step dots */}
            <StepDots current={step} total={TOTAL_STEPS} />

            {/* Step content */}
            <div style={{ minHeight: 168 }}>{renderStep()}</div>

            {/* CTA */}
            <button
              className="rh-pulse-btn"
              onClick={handleContinue}
              style={{
                width: '100%', marginTop: 20, padding: '17px',
                fontSize: 16, fontWeight: 700, border: 'none', borderRadius: 12,
                cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.01em',
                background: 'var(--rh-blueberry)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              {ctaLabel}
            </button>

            {/* Security microcopy */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--rh-stone-darkest)' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                256-bit encrypted
              </span>
              <span style={{ color: 'var(--rh-stone)', fontSize: 11 }}>·</span>
              <span style={{ fontSize: 11, color: 'var(--rh-stone-darkest)' }}>No credit pull</span>
              <span style={{ color: 'var(--rh-stone)', fontSize: 11 }}>·</span>
              <span style={{ fontSize: 11, color: 'var(--rh-stone-darkest)' }}>Free forever</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { HeroBannerV2, PulseButton });
