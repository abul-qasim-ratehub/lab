'use client';

import React from 'react';
import { Button, Card, Icon } from './primitives';
import { TrustStrip } from './TrustStrip';
import { AwardStrip } from './AwardStrip';

const ZOOCASA_CLIENT_ID = 'test123'; // QA client ID per Zoocasa email
const ZOOCASA_SCRIPT_SRC = `https://zoocasa-next-git-widget-iframe-auto-resize-zoocasa.vercel.app/widget/home-appraisal.js?clientId=${ZOOCASA_CLIENT_ID}`;
// ^ NOTE: for QA only. Swap back to https://www.zoocasa.com/widget/home-appraisal.js + 'ratehub-mortgage' for prod once they roll the change out.

const ZOOCASA_CONTAINER_ID = 'zoocasa-appraisal';
const ZOOCASA_ORIGIN = 'https://zoocasa-next-git-widget-iframe-auto-resize-zoocasa.vercel.app';
// ^ QA origin. Revert to 'https://www.zoocasa.com' for prod.

export const HomeValueEstimator = ({ onNavigate }) => {
  const [estimate, setEstimate] = React.useState(null);
  const [widgetReady, setWidgetReady] = React.useState(false);

  React.useEffect(() => {
    let script = document.querySelector(`script[src="${ZOOCASA_SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = ZOOCASA_SCRIPT_SRC;
      script.async = true;
      script.onload = () => setWidgetReady(true);
      document.head.appendChild(script);
    } else {
      setWidgetReady(true);
    }

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
      if (window.ZoocasaAppraisal) {
        try { window.ZoocasaAppraisal.destroy(`#${ZOOCASA_CONTAINER_ID}`); } catch (e) {}
      }
    };
  }, []);

  React.useEffect(() => {
    if (widgetReady && window.ZoocasaAppraisal) {
      window.ZoocasaAppraisal.render(`#${ZOOCASA_CONTAINER_ID}`, {
        minHeight: 420,
        width: '80%',
      });
    }
  }, [widgetReady]);

  const fmt = (n) => n ? '$' + n.toLocaleString('en-CA') : '—';

  return (
    <div>
      <hr className="rh-section-divider" style={{ maxWidth: 1280, margin: '0 auto' }} />

      <section className="rh-section" style={{ padding: '48px 28px 72px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 26, fontWeight: 500, margin: '0 0 8px', letterSpacing: '-0.01em' }}>Enter your address to get started</h2>
          <p style={{ fontSize: 15, color: 'var(--rh-blackberry-light)', margin: 0, lineHeight: 1.5 }}>
            Search for your property and provide a few details for the most accurate estimate.
          </p>
        </div>

        <div id={ZOOCASA_CONTAINER_ID} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          {!widgetReady && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400, color: 'var(--rh-stone-darkest)', fontSize: 15, width: '100%' }}>
              Loading home value estimator...
            </div>
          )}
        </div>

        {estimate && (
          <div style={{ marginTop: 32 }}>
            <Card style={{ background: 'var(--rh-lime-lightest)', border: '1.5px solid var(--rh-lime-light)' }}>
              <div className="rh-estimate-result" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
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
                <div>
                  <div style={{ fontSize: 12, color: 'var(--rh-lime-darkest)', fontWeight: 500, marginBottom: 4 }}>Estimated range</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--rh-lime-darkest)' }}>
                    {fmt(estimate.lowerEstimate)} – {fmt(estimate.upperEstimate)}
                  </div>
                </div>
              </div>
            </Card>

            <div className="rh-flex-wrap" style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button onClick={() => onNavigate('mortgages')}>See today's mortgage rates →</Button>
              <Button variant="secondary" onClick={() => onNavigate('tools')}>Try our mortgage calculator</Button>
            </div>
          </div>
        )}
      </section>

      <section className="rh-section" style={{ background: 'var(--rh-stone-lightest)', borderTop: '1px solid var(--rh-stone-light)', padding: '56px 28px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 500, margin: '0 0 12px', letterSpacing: '-0.01em' }}>
            Ready to take the next step?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--rh-blackberry-light)', margin: '0 0 28px', lineHeight: 1.6 }}>
            Whether you're buying, selling, or refinancing — compare rates from 30+ lenders and save thousands.
          </p>
          <div className="rh-flex-wrap" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
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
