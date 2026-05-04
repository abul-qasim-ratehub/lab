'use client';

import React, { useState } from 'react';
import { Button, Pill, Icon } from './primitives';

const WIDGETS_DATA = [
  // Mortgage Widgets
  { id: 'mortgage-rate-table', name: 'Mortgage Rate Table', bu: 'mortgages', type: 'Table', status: 'available', description: 'Compare current mortgage rates from 30+ lenders' },
  { id: 'payment-calc', name: 'Payment Calculator', bu: 'mortgages', type: 'Calculator', status: 'available', description: 'Calculate monthly mortgage payments' },
  { id: 'renewal-calc', name: 'Renewal Calculator', bu: 'mortgages', type: 'Calculator', status: 'available', description: 'Calculate renewal costs and savings' },
  { id: 'affordability-calc', name: 'Affordability Calculator', bu: 'mortgages', type: 'Calculator', status: 'available', description: 'Determine home affordability' },
  { id: 'refinance-calc', name: 'Refinance Calculator', bu: 'mortgages', type: 'Calculator', status: 'available', description: 'Calculate refinancing costs' },
  { id: 'penalty-calc', name: 'Penalty Calculator', bu: 'mortgages', type: 'Calculator', status: 'available', description: 'Calculate mortgage prepayment penalties' },
  { id: 'down-payment-calc', name: 'Down Payment Calculator', bu: 'mortgages', type: 'Calculator', status: 'available', description: 'Calculate down payment requirements' },
  { id: 'ltt-calc', name: 'Land Transfer Tax Calculator', bu: 'mortgages', type: 'Calculator', status: 'available', description: 'Estimate land transfer taxes' },
  // Banking Widgets
  { id: 'cc-table', name: 'Master Credit Card Table', bu: 'banking', type: 'Table', status: 'available', description: 'Comprehensive credit card comparison' },
  { id: 'cc-product', name: 'Credit Card Product Table', bu: 'banking', type: 'Table', status: 'available', description: 'Curated credit card comparisons' },
  { id: 'cardfinder', name: 'CardFinder', bu: 'banking', type: 'Form', status: 'unavailable', description: 'Interactive credit card matching tool' },
  { id: 'savings-list', name: 'Savings Account List', bu: 'banking', type: 'Table', status: 'available', description: 'Compare HISA and savings accounts' },
  { id: 'gic-list', name: 'GIC List', bu: 'banking', type: 'Table', status: 'available', description: 'Compare GIC rates and terms' },
  { id: 'chequing-list', name: 'Chequing Account List', bu: 'banking', type: 'Table', status: 'available', description: 'Compare chequing accounts' },
  { id: 'tfsa-calc', name: 'TFSA Calculator', bu: 'banking', type: 'Calculator', status: 'available', description: 'Calculate TFSA growth' },
  { id: 'rrsp-calc', name: 'RRSP Contribution Room Calculator', bu: 'banking', type: 'Calculator', status: 'available', description: 'Calculate RRSP contributions' },
  { id: 'compound-calc', name: 'Compound Interest Calculator', bu: 'banking', type: 'Calculator', status: 'available', description: 'Model savings growth' },
  { id: 'cc-interest-calc', name: 'Credit Card Interest Calculator', bu: 'banking', type: 'Calculator', status: 'available', description: 'Calculate interest charges' },
  // Loans Widgets
  { id: 'loanfinder', name: 'LoanFinder', bu: 'loans', type: 'Form', status: 'unavailable', description: 'Interactive personal loan matcher' },
  { id: 'loan-table', name: 'Loan Comparison Table', bu: 'loans', type: 'Table', status: 'available', description: 'Compare personal loans' },
  { id: 'debt-consolidation', name: 'Debt Consolidation Calculator', bu: 'loans', type: 'Calculator', status: 'available', description: 'Calculate consolidation savings' },
  // Insurance Widgets
  { id: 'life-insurance', name: 'Life Insurance', bu: 'insurance', type: 'Quoter', status: 'upcoming', description: 'Life insurance quotes (2026 TBD)' },
  { id: 'home-insurance', name: 'Home Insurance', bu: 'insurance', type: 'Quoter', status: 'upcoming', description: 'Home insurance quotes (2026 TBD)' },
  { id: 'condo-insurance', name: 'Condo Insurance', bu: 'insurance', type: 'Quoter', status: 'upcoming', description: 'Condo insurance quotes (2026 TBD)' },
  { id: 'auto-insurance', name: 'Auto Insurance', bu: 'insurance', type: 'Quoter', status: 'upcoming', description: 'Auto insurance quotes (2026 TBD)' },
  { id: 'insurance-launcher', name: 'Insurance Quote Launchers', bu: 'insurance', type: 'Launcher', status: 'available', description: 'Home and auto quote launchers' },
];

const CATEGORIES = {
  mortgages: { label: 'Mortgages', color: 'var(--rh-blueberry)' },
  banking: { label: 'Banking', color: 'var(--rh-mint)' },
  loans: { label: 'Loans & Debt', color: 'var(--rh-grape)' },
  insurance: { label: 'Insurance', color: 'var(--rh-watermelon)' },
};

const STATUS_CONFIG = {
  available: { label: '✅ Available', bg: 'var(--rh-lime-lightest)', fg: 'var(--rh-lime-dark)' },
  unavailable: { label: '❌ Not available', bg: 'var(--rh-stone-lightest)', fg: 'var(--rh-stone-dark)' },
  upcoming: { label: '🔄 2026 TBD', bg: 'var(--rh-yuzu-lightest)', fg: 'var(--rh-yuzu-dark)' },
};

function WidgetCard({ widget, partnerDomain = 'yoursite' }) {
  const [copied, setCopied] = useState(false);
  const subdomain = `https://${partnerDomain}.ratehub.ca/${widget.bu}/${widget.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(subdomain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusConfig = STATUS_CONFIG[widget.status];

  return (
    <div style={{
      background: 'var(--rh-coconut)',
      border: '1px solid var(--rh-stone-light)',
      borderRadius: 'var(--rh-radius-md)',
      padding: '20px',
      display: 'flex', flexDirection: 'column', gap: 12,
      transition: 'all 150ms',
      cursor: 'default',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--rh-blackberry)',
            margin: '0 0 6px 0',
          }}>
            {widget.name}
          </h3>
          <p style={{
            fontSize: 13,
            color: 'var(--rh-stone-dark)',
            margin: 0,
            lineHeight: 1.4,
          }}>
            {widget.description}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <Pill size="s" style={{ background: CATEGORIES[widget.bu].color, color: 'white' }}>
          {CATEGORIES[widget.bu].label}
        </Pill>
        <Pill size="s" style={{ background: 'var(--rh-stone-light)', color: 'var(--rh-stone-dark)' }}>
          {widget.type}
        </Pill>
        <Pill size="s" style={{ background: statusConfig.bg, color: statusConfig.fg }}>
          {statusConfig.label}
        </Pill>
      </div>

      {widget.status === 'available' && (
        <div style={{
          background: 'var(--rh-stone-lightest)',
          borderRadius: 'var(--rh-radius-sm)',
          padding: '10px 12px',
          fontFamily: 'monospace',
          fontSize: 12,
          color: 'var(--rh-blackberry)',
          wordBreak: 'break-all',
          lineHeight: 1.4,
        }}>
          {subdomain}
        </div>
      )}

      {widget.status === 'unavailable' && (
        <div style={{
          fontSize: 12,
          color: 'var(--rh-stone-dark)',
          fontStyle: 'italic',
          padding: '8px 0',
        }}>
          Use subdomain redirect or contact partnerships@ratehub.ca
        </div>
      )}

      {widget.status === 'upcoming' && (
        <div style={{
          fontSize: 12,
          color: 'var(--rh-yuzu-dark)',
          padding: '8px 0',
        }}>
          Enhanced widget coming 2026. Simple redirect available now.
        </div>
      )}

      {widget.status === 'available' && (
        <Button
          onClick={handleCopy}
          variant="primary"
          size="s"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {copied ? '✓ Copied!' : 'Copy embed URL'}
        </Button>
      )}
    </div>
  );
}

export const AffiliatesPortal = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [partnerDomain, setPartnerDomain] = useState('yoursite');

  const filteredWidgets = activeCategory
    ? WIDGETS_DATA.filter(w => w.bu === activeCategory)
    : WIDGETS_DATA;

  const availableCount = WIDGETS_DATA.filter(w => w.status === 'available').length;

  return (
    <div style={{ background: 'var(--rh-stone-lightest)' }}>
      {/* Hero Section */}
      <section style={{
        background: 'var(--rh-blueberry-darkest)',
        color: 'var(--rh-coconut)',
        padding: '72px 28px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <Pill style={{ background: 'rgba(255,255,255,0.2)', color: 'white', marginBottom: 12 }}>
              Affiliate program
            </Pill>
          </div>
          <h1 className="showDot" style={{
            fontSize: 52,
            fontWeight: 700,
            color: 'white',
            margin: '0 0 16px 0',
            lineHeight: 1.2,
          }}>
            Embed Ratehub widgets
          </h1>
          <p style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.9)',
            margin: 0,
            lineHeight: 1.5,
            maxWidth: 600,
          }}>
            Add {availableCount}+ financial widgets to your website. Zero setup required—just copy and embed.
          </p>
        </div>
      </section>

      {/* Partner Domain Input */}
      <section style={{
        background: 'var(--rh-coconut)',
        padding: '48px 28px',
        borderBottom: '1px solid var(--rh-stone-light)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--rh-blackberry)',
            margin: '0 0 16px 0',
          }}>
            Configure your domain
          </h2>
          <div style={{
            display: 'flex',
            gap: 12,
            maxWidth: 400,
            alignItems: 'flex-end',
          }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--rh-stone-dark)',
                marginBottom: 6,
              }}>
                Your domain
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 'var(--rh-radius-md)',
                border: '1px solid var(--rh-stone-light)',
                background: 'var(--rh-coconut)',
                overflow: 'hidden',
              }}>
                <input
                  type="text"
                  value={partnerDomain}
                  onChange={(e) => setPartnerDomain(e.target.value.toLowerCase())}
                  placeholder="yoursite"
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: 'none',
                    fontSize: 14,
                    fontFamily: 'monospace',
                    outline: 'none',
                  }}
                />
                <span style={{
                  padding: '10px 12px',
                  fontSize: 14,
                  color: 'var(--rh-stone-dark)',
                  whiteSpace: 'nowrap',
                  borderLeft: '1px solid var(--rh-stone-light)',
                }}>
                  .ratehub.ca
                </span>
              </div>
            </div>
            <Button variant="secondary" size="s">Test</Button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section style={{
        background: 'var(--rh-coconut)',
        padding: '32px 28px',
        borderBottom: '1px solid var(--rh-stone-light)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h3 style={{
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--rh-stone-dark)',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            Filter by category
          </h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button
              onClick={() => setActiveCategory(null)}
              variant={activeCategory === null ? 'primary' : 'secondary'}
              size="s"
            >
              All widgets
            </Button>
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <Button
                key={key}
                onClick={() => setActiveCategory(key)}
                variant={activeCategory === key ? 'primary' : 'secondary'}
                size="s"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Widgets Grid */}
      <section style={{ padding: '48px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--rh-blackberry)',
            margin: '0 0 32px 0',
          }}>
            {activeCategory ? CATEGORIES[activeCategory].label : 'All widgets'} ({filteredWidgets.length})
          </h2>
          <div className="rh-grid-3" style={{ gap: 24 }}>
            {filteredWidgets.map(widget => (
              <WidgetCard key={widget.id} widget={widget} partnerDomain={partnerDomain} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section style={{
        background: 'var(--rh-coconut)',
        padding: '48px 28px',
        borderTop: '1px solid var(--rh-stone-light)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--rh-blackberry)',
            margin: '0 0 32px 0',
          }}>
            How it works
          </h2>
          <div className="rh-grid-2" style={{ gap: 32 }}>
            <div>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--rh-blackberry)',
                margin: '0 0 12px 0',
              }}>
                1. Copy widget URL
              </h3>
              <p style={{
                fontSize: 14,
                color: 'var(--rh-stone-dark)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Select a widget and copy the Ratehub-hosted URL. It's formatted as: <code style={{ background: 'var(--rh-stone-lightest)', padding: '2px 6px' }}>https://yoursite.ratehub.ca/category/widget-name</code>
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--rh-blackberry)',
                margin: '0 0 12px 0',
              }}>
                2. Embed on your site
              </h3>
              <p style={{
                fontSize: 14,
                color: 'var(--rh-stone-dark)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Embed the URL as an iframe or link. No technical integration needed. Widgets are automatically responsive and mobile-friendly.
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--rh-blackberry)',
                margin: '0 0 12px 0',
              }}>
                3. Affiliate tracking
              </h3>
              <p style={{
                fontSize: 14,
                color: 'var(--rh-stone-dark)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                All clicks are tracked automatically using your domain. We'll send you monthly reports with click-through rates and conversions.
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--rh-blackberry)',
                margin: '0 0 12px 0',
              }}>
                4. Customize (optional)
              </h3>
              <p style={{
                fontSize: 14,
                color: 'var(--rh-stone-dark)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                Need custom branding or design? Contact us at partnerships@ratehub.ca and we'll work with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'var(--rh-blueberry-darkest)',
        color: 'var(--rh-coconut)',
        padding: '48px 28px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 28,
            fontWeight: 700,
            color: 'white',
            margin: '0 0 12px 0',
          }}>
            Ready to get started?
          </h2>
          <p style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.9)',
            margin: '0 0 24px 0',
            lineHeight: 1.5,
          }}>
            Contact our partnerships team to set up your account and start embedding widgets.
          </p>
          <Button style={{ background: 'white', color: 'var(--rh-blueberry-darkest)', fontWeight: 600 }}>
            Contact partnerships@ratehub.ca
          </Button>
        </div>
      </section>
    </div>
  );
};
