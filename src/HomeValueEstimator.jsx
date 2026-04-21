// HomeValueEstimator — Zoocasa home appraisal widget integration
// Loads the Zoocasa SDK, renders the widget, and listens for estimate results

const ZOOCASA_CLIENT_ID = 'ratehub-mortgage';
const ZOOCASA_SCRIPT_SRC = `https://www.zoocasa.com/widget/home-appraisal.js?clientId=${ZOOCASA_CLIENT_ID}`;
const ZOOCASA_CONTAINER_ID = 'zoocasa-appraisal';
const ZOOCASA_ORIGIN = 'https://www.zoocasa.com';

const HomeValueEstimator = ({ onNavigate }) => {
  const [estimate, setEstimate] = React.useState(null);
  const [widgetReady, setWidgetReady] = React.useState(false);

  React.useEffect(() => {
    // Load the Zoocasa SDK script
    let script = document.querySelector(`script[src="${ZOOCASA_SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = ZOOCASA_SCRIPT_SRC;
      script.async = true;
      script.onload = () => {
        setWidgetReady(true);
      };
      document.head.appendChild(script);
    } else {
      setWidgetReady(true);
    }

    // Listen for estimate results from the widget
    const handleMessage = (event) => {
      if (event.origin !== ZOOCASA_ORIGIN) return;
      if (!event.data || !event.data.type) return;

      if (event.data.type === 'zoocasa:estimate:complete') {
        setEstimate(event.data.data);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      // Destroy widget on unmount
      if (window.ZoocasaAppraisal) {
        try { window.ZoocasaAppraisal.destroy(`#${ZOOCASA_CONTAINER_ID}`); } catch (e) {}
      }
    };
  }, []);

  // Render the widget once SDK is loaded
  React.useEffect(() => {
    if (widgetReady && window.ZoocasaAppraisal) {
      window.ZoocasaAppraisal.render(`#${ZOOCASA_CONTAINER_ID}`, {
        height: '800px',
        width: '100%',
      });
    }
  }, [widgetReady]);

  const fmt = (n) => n ? '$' + n.toLocaleString('en-CA') : '—';

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'var(--rh-blueberry-darkest)', color: '#fff', padding: '72px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Pill tone="yuzu" icon={<Icon name="house" size={14} color="var(--rh-yuzu-darkest)" />}>Home value</Pill>
          <h1 className="showDot" style={{ fontSize: 52, fontWeight: 700, margin: '18px 0 14px', letterSpacing: '-0.025em', lineHeight: 1.08 }}>
            How much is your home worth
          </h1>
          <p style={{ fontSize: 17, opacity: .88, maxWidth: 540, margin: '0 0 32px', lineHeight: 1.65 }}>
            Get a free, instant home value estimate powered by Zoocasa. Enter your address and property details to see what your home could sell for today.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button size="l" variant="coconut" onClick={() => {
              const el = document.getElementById(ZOOCASA_CONTAINER_ID);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>Get my estimate →</Button>
            <Button size="l" variant="ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} onClick={() => onNavigate('mortgages')}>
              Compare mortgage rates
            </Button>
          </div>
        </div>
      </div>

      {/* Value props */}
      <section style={{ padding: '48px 28px 0', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {[
            { icon: 'house',      title: 'Instant estimate', desc: 'Get a data-driven home value estimate in seconds.' },
            { icon: 'lock',       title: 'Free & private',   desc: 'No sign-up required. Your data stays confidential.' },
            { icon: 'map-pin',    title: 'Canada-wide',      desc: 'Coverage across all major Canadian markets.' },
            { icon: 'calculator', title: 'Detailed report',  desc: 'See estimated range and comparable properties.' },
          ].map((v, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '20px 0' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'var(--rh-blueberry-lightest)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name={v.icon} size={24} color="var(--rh-blueberry-dark)" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 4 }}>{v.title}</div>
                <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', lineHeight: 1.5 }}>{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="rh-section-divider" style={{ maxWidth: 1280, margin: '0 auto' }} />

      {/* Widget container */}
      <section style={{ padding: '48px 28px 72px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 26, fontWeight: 500, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Enter your address to get started</h2>
          <p style={{ fontSize: 15, color: 'var(--rh-blackberry-light)', margin: 0, lineHeight: 1.5 }}>
            Search for your property and provide a few details for the most accurate estimate.
          </p>
        </div>

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <div id={ZOOCASA_CONTAINER_ID} style={{ minHeight: 800 }}>
            {!widgetReady && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400, color: 'var(--rh-stone-darkest)', fontSize: 15 }}>
                Loading home value estimator...
              </div>
            )}
          </div>
        </Card>

        {/* Estimate result display */}
        {estimate && (
          <div style={{ marginTop: 32 }}>
            <Card style={{ background: 'var(--rh-lime-lightest)', border: '1.5px solid var(--rh-lime-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: 'var(--rh-lime-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon name="house" size={28} color="var(--rh-lime-darkest)" />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--rh-lime-darkest)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                    Estimated value
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--rh-lime-darkest)', letterSpacing: '-0.02em' }}>
                    {fmt(estimate.estimate)}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--rh-lime-dark)', marginTop: 2 }}>
                    {estimate.address}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: 'var(--rh-lime-darkest)', fontWeight: 500, marginBottom: 4 }}>Estimated range</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--rh-lime-darkest)' }}>
                    {fmt(estimate.lowerEstimate)} – {fmt(estimate.upperEstimate)}
                  </div>
                </div>
              </div>
            </Card>

            <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button onClick={() => onNavigate('mortgages')}>See today's mortgage rates →</Button>
              <Button variant="secondary" onClick={() => onNavigate('tools')}>Try our mortgage calculator</Button>
            </div>
          </div>
        )}
      </section>

      {/* CTA strip */}
      <section style={{ background: 'var(--rh-stone-lightest)', borderTop: '1px solid var(--rh-stone-light)', padding: '56px 28px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
            Ready to take the next step?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--rh-blackberry-light)', margin: '0 0 28px', lineHeight: 1.6 }}>
            Whether you're buying, selling, or refinancing — compare rates from 30+ lenders and save thousands.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button size="l" onClick={() => onNavigate('mortgages')}>Compare mortgage rates →</Button>
            <Button size="l" variant="secondary" onClick={() => onNavigate('tools')}>Explore all tools</Button>
          </div>
        </div>
      </section>

      <TrustStrip />
      <AwardStrip />
    </div>
  );
};

Object.assign(window, { HomeValueEstimator });
