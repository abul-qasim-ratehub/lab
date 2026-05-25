'use client';

import React, { useEffect } from 'react';

export const CalculatorsPage = () => {
  useEffect(() => {
    // Load the Ratehub widget loader script
    if (document.getElementById('rh-widget-loader')) return;

    const script = document.createElement('script');
    script.id = 'rh-widget-loader';
    script.src = 'https://www.ratehub.ca/scripts/rh-widget-loader.js';
    script.async = true;

    script.onload = () => {
      // After script loads, initialize all widget divs
      setTimeout(() => {
        const widgets = document.querySelectorAll('div[rh-widget-key]');
        widgets.forEach(widget => {
          if (window.rh && window.rh.loadWidget) {
            window.rh.loadWidget(widget);
          }
        });
      }, 100);
    };

    document.head.appendChild(script);
  }, []);

  return (
    <main style={{ background: 'var(--rh-coconut)' }}>
      {/* Hero Section */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '72px 28px 48px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: 'var(--rh-font-6xl)',
          fontWeight: 700,
          color: 'var(--rh-blackberry)',
          marginBottom: 12,
        }}>
          Financial Calculators
        </h1>
        <p style={{
          fontSize: 'var(--rh-font-lg)',
          color: 'var(--rh-stone-dark)',
          maxWidth: 600,
          margin: '0 auto',
        }}>
          Use our interactive calculators to estimate mortgage affordability, consolidate debt, and calculate land transfer taxes.
        </p>
      </section>

      {/* Calculators Grid */}
      <section style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '0 28px 72px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 36,
        }}>
          {/* Affordability Calculator */}
          <div style={{
            background: 'var(--rh-coconut)',
            border: '1px solid var(--rh-stone-light)',
            borderRadius: 'var(--rh-radius-lg)',
            padding: 24,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}>
            <h2 style={{
              fontSize: 'var(--rh-font-xl)',
              fontWeight: 600,
              color: 'var(--rh-blackberry)',
              marginBottom: 16,
            }}>
              Mortgage Affordability Calculator
            </h2>
            <div
              rh-widget-key="AffordabilityCalculator"
              rh-frame-title="Mortgage affordability calculator"
              rh-aff-id="protecdental"
              rh-province-code="ON"
              rh-disable-powered-by-ratehub="false"
            />
          </div>

          {/* Debt Consolidation Calculator */}
          <div style={{
            background: 'var(--rh-coconut)',
            border: '1px solid var(--rh-stone-light)',
            borderRadius: 'var(--rh-radius-lg)',
            padding: 24,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}>
            <h2 style={{
              fontSize: 'var(--rh-font-xl)',
              fontWeight: 600,
              color: 'var(--rh-blackberry)',
              marginBottom: 16,
            }}>
              Debt Consolidation Calculator
            </h2>
            <div
              rh-widget-key="DebtConsolidationCalculator"
              rh-frame-title="Debt consolidation calculator"
              rh-aff-id="protecdental"
              rh-recommendation-url="https://www.ratehub.ca"
              rh-disable-powered-by-ratehub="false"
            />
          </div>

          {/* Land Transfer Tax Calculator */}
          <div style={{
            background: 'var(--rh-coconut)',
            border: '1px solid var(--rh-stone-light)',
            borderRadius: 'var(--rh-radius-lg)',
            padding: 24,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}>
            <h2 style={{
              fontSize: 'var(--rh-font-xl)',
              fontWeight: 600,
              color: 'var(--rh-blackberry)',
              marginBottom: 16,
            }}>
              Land Transfer Tax Calculator
            </h2>
            <div
              rh-widget-key="LandTransferTaxCalculator"
              rh-frame-title="Land transfer tax calculator"
              rh-aff-id="protecdental"
              rh-province-code="NB"
              rh-disable-powered-by-ratehub="false"
            />
          </div>

          {/* Payment Calculator */}
          <div style={{
            background: 'var(--rh-coconut)',
            border: '1px solid var(--rh-stone-light)',
            borderRadius: 'var(--rh-radius-lg)',
            padding: 24,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}>
            <h2 style={{
              fontSize: 'var(--rh-font-xl)',
              fontWeight: 600,
              color: 'var(--rh-blackberry)',
              marginBottom: 16,
            }}>
              Mortgage Payment Calculator
            </h2>
            <div
              rh-widget-key="PaymentCalculator"
              rh-frame-title="Ratehub.ca mortgage payment calculator"
              rh-aff-id="qasim"
              rh-province-code="ON"
            />
          </div>

          {/* Refinance Calculator */}
          <div style={{
            background: 'var(--rh-coconut)',
            border: '1px solid var(--rh-stone-light)',
            borderRadius: 'var(--rh-radius-lg)',
            padding: 24,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}>
            <h2 style={{
              fontSize: 'var(--rh-font-xl)',
              fontWeight: 600,
              color: 'var(--rh-blackberry)',
              marginBottom: 16,
            }}>
              Mortgage Refinance Calculator
            </h2>
            <div
              rh-widget-key="RefinanceCalculator"
              rh-frame-title="Ratehub.ca mortgage refinance calculator"
              rh-aff-id="qasim"
            />
          </div>

          {/* Compound Interest Calculator */}
          <div style={{
            background: 'var(--rh-coconut)',
            border: '1px solid var(--rh-stone-light)',
            borderRadius: 'var(--rh-radius-lg)',
            padding: 24,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}>
            <h2 style={{
              fontSize: 'var(--rh-font-xl)',
              fontWeight: 600,
              color: 'var(--rh-blackberry)',
              marginBottom: 16,
            }}>
              Compound Interest Calculator
            </h2>
            <div
              rh-widget-key="CompoundInterestCalculator"
              rh-frame-title="Ratehub.ca compound interest calculator"
              rh-aff-id="qasim"
            />
          </div>
        </div>
      </section>
    </main>
  );
};
