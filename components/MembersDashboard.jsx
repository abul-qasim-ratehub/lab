'use client';

// MembersDashboard — members-only mortgage dashboard
// Surfaces: Account Details, Loan Details, Prepayment Privileges, Security Property, Borrower info

import React from 'react';
import { Button, Card, Icon, Input, Pill } from './primitives';

const MOCK_MEMBER = {
  mcapAccountNumber: 'MCM-4821-9034',
  lenderNumber: 'LN-10294',
  jointMemberNumber: null,

  memberNumber: 'MB-82103',
  firstName: 'Sarah',
  lastName: 'Chen',
  homePhone: '416-555-0183',
  mobilePhone: '647-555-0219',
  email: 'sarah.chen@email.com',
  mailing: {
    unit: '12', number: '45', streetName: 'Bloor', streetType: 'St W',
    city: 'Toronto', province: 'ON', postalCode: 'M5S 1T5',
  },

  coBorrower: {
    memberNumber: 'MB-82104',
    firstName: 'James', lastName: 'Chen',
    homePhone: '', mobilePhone: '647-555-0347',
    email: 'james.chen@email.com',
    mailing: {
      unit: '12', number: '45', streetName: 'Bloor', streetType: 'St W',
      city: 'Toronto', province: 'ON', postalCode: 'M5S 1T5',
    },
  },

  currentLoanAmount: 342100,
  originalLoanAmount: 520000,
  productType: 'Fixed',
  productOption: 'Value Flex',
  amortizationRemaining: '22 years, 4 months',
  paymentFrequency: 'Monthly',
  interestRate: 5.19,
  currentTerm: '5-Year Fixed',
  maturityDate: '2026-10-15',
  totalPaymentAmount: 2493,
  paymentBreakdown: { principal: 843, interest: 1478, tax: 172, ancillary: 0 },
  arrears: 0,
  nextPaymentDate: '2026-05-01',

  lumpSumUsed: 5000,
  lumpSumAllowance: 34210,

  property: {
    unit: '', number: '312', streetName: 'Lakeshore', streetType: 'Blvd W',
    city: 'Toronto', province: 'ON', postalCode: 'M5V 1A3',
  },
};

const fmtCad   = v => '$' + Math.round(v).toLocaleString('en-CA');
const fmtDate  = s => new Date(s).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
const propLine = p => [(p.unit ? `#${p.unit} – ` : ''), p.number, ' ', p.streetName, ' ', p.streetType].join('').trim();

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--rh-stone-darkest)', textTransform: 'uppercase', letterSpacing: '.09em', marginBottom: 16 }}>
    {children}
  </div>
);

const StatCell = ({ label, value, sub, valueColor, borderRight }) => (
  <div style={{ padding: '22px 24px', borderRight: borderRight ? '1px solid var(--rh-stone-light)' : 'none' }}>
    <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--rh-stone-darkest)', textTransform: 'uppercase', letterSpacing: '.09em', marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 20, fontWeight: 700, color: valueColor || 'var(--rh-blackberry)', letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: 3 }}>{value}</div>
    <div style={{ fontSize: 12, color: 'var(--rh-stone-darkest)' }}>{sub}</div>
  </div>
);

const DetailRow = ({ label, value, last }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, paddingBottom: last ? 0 : 14, marginBottom: last ? 0 : 14, borderBottom: last ? 'none' : '1px solid var(--rh-stone-lightest)' }}>
    <span style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', flexShrink: 0 }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--rh-blackberry)', textAlign: 'right' }}>{value}</span>
  </div>
);

const ProgressBar = ({ pct, color = 'var(--rh-blueberry-dark)', height = 8 }) => (
  <div style={{ height, background: 'var(--rh-stone-light)', borderRadius: height / 2, overflow: 'hidden' }}>
    <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: color, borderRadius: height / 2, transition: 'width 600ms ease' }} />
  </div>
);

export const MembersDashboard = ({ onNavigate }) => {
  const m = MOCK_MEMBER;
  const [editMode, setEditMode] = React.useState(false);
  const [form, setForm] = React.useState({
    email:      m.email,
    mobile:     m.mobilePhone,
    home:       m.homePhone,
    unit:       m.mailing.unit,
    number:     m.mailing.number,
    streetName: m.mailing.streetName,
    streetType: m.mailing.streetType,
    city:       m.mailing.city,
    province:   m.mailing.province,
    postal:     m.mailing.postalCode,
  });
  const field = (key) => ({ value: form[key], onChange: e => setForm(f => ({ ...f, [key]: e.target.value })) });

  const today            = new Date('2026-04-21');
  const maturity         = new Date(m.maturityDate);
  const monthsToMaturity = (maturity.getFullYear() - today.getFullYear()) * 12 + (maturity.getMonth() - today.getMonth());
  const paidDown         = m.originalLoanAmount - m.currentLoanAmount;
  const paidDownPct      = (paidDown / m.originalLoanAmount * 100).toFixed(1);
  const lumpSumRemaining = m.lumpSumAllowance - m.lumpSumUsed;
  const lumpSumUsedPct   = (m.lumpSumUsed / m.lumpSumAllowance * 100);
  const marketRate       = 4.74;
  const monthlySaving    = Math.round(((m.interestRate - marketRate) / 100 / 12) * m.currentLoanAmount);

  const renewTone  = monthsToMaturity <= 3 ? 'error' : monthsToMaturity <= 12 ? 'tangerine' : 'lime';
  const renewLabel = monthsToMaturity <= 0 ? 'Renewal due now' : `Renews in ${monthsToMaturity} month${monthsToMaturity === 1 ? '' : 's'}`;

  const { principal, interest, tax, ancillary } = m.paymentBreakdown;
  const pmtTotal = principal + interest + tax + (ancillary || 0);
  const R    = 64;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / pmtTotal) * circ;
  const iArc = (interest  / pmtTotal) * circ;
  const tArc = (tax       / pmtTotal) * circ;

  const segments = [
    { label: 'Principal',     amount: principal, color: 'var(--rh-blueberry-dark)', arc: pArc, offset: 0 },
    { label: 'Interest',      amount: interest,  color: 'var(--rh-lime-dark)',      arc: iArc, offset: pArc },
    { label: 'Property tax',  amount: tax,       color: 'var(--rh-yuzu-dark)',      arc: tArc, offset: pArc + iArc },
    ...(ancillary > 0 ? [{ label: 'Ancillary', amount: ancillary, color: 'var(--rh-stone-darkest)', arc: circ - pArc - iArc - tArc, offset: pArc + iArc + tArc }] : []),
  ];

  return (
    <div>

      <section className="rh-hero-section" style={{ background: 'var(--rh-blueberry-darkest)', color: '#fff', padding: '52px 28px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <Pill tone="berry" icon={<Icon name="house" size={14} color="var(--rh-blueberry-darkest)" />}>My mortgage</Pill>
              <h1 className="rh-hero-h1 showDot" style={{ fontSize: 40, fontWeight: 700, margin: '14px 0 8px', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                Welcome back, {m.firstName}
              </h1>
              <p style={{ fontSize: 15, opacity: 0.75, margin: 0, lineHeight: 1.6 }}>
                {propLine(m.property)} &nbsp;·&nbsp; {m.property.city}, {m.property.province}
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
              <Pill tone={m.productType === 'Fixed' ? 'mint' : 'yuzu'}>{m.currentTerm}</Pill>
              <Pill tone={renewTone}>{renewLabel}</Pill>
              {m.arrears > 0 && <Pill tone="error">Arrears: {fmtCad(m.arrears)}</Pill>}
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginLeft: 4, fontFamily: 'monospace' }}>#{m.mcapAccountNumber}</span>
            </div>
          </div>
        </div>
      </section>

      <div style={{ background: '#fff', borderBottom: '1px solid var(--rh-stone-light)', padding: '0 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="rh-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <StatCell label="Current balance"    value={fmtCad(m.currentLoanAmount)} sub={`of ${fmtCad(m.originalLoanAmount)} original`} borderRight />
            <StatCell label="Interest rate"      value={`${m.interestRate.toFixed(2)}%`} sub={m.productType} borderRight />
            <StatCell label="Next payment"       value={fmtCad(m.totalPaymentAmount) + '/mo'} sub={fmtDate(m.nextPaymentDate)} borderRight />
            <StatCell label="Term maturity"      value={renewLabel} sub={fmtDate(m.maturityDate)} valueColor={monthsToMaturity <= 3 ? 'var(--rh-error)' : monthsToMaturity <= 12 ? 'var(--rh-tangerine-dark)' : 'var(--rh-blackberry)'} />
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--rh-stone-lightest)', padding: '36px 28px 56px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

          <div className="rh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

            <Card style={{ padding: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <SectionLabel>Payment breakdown</SectionLabel>
                  <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--rh-blackberry)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {fmtCad(pmtTotal)}
                    <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--rh-stone-darkest)', marginLeft: 4 }}>/mo</span>
                  </div>
                </div>
                <Pill tone="stone">{m.paymentFrequency}</Pill>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                <div style={{ flexShrink: 0 }}>
                  <svg viewBox="0 0 180 180" width={156} height={156}>
                    <circle cx="90" cy="90" r={R} fill="none" stroke="var(--rh-stone-light)" strokeWidth="22" />
                    {segments.map(s => (
                      <circle key={s.label} cx="90" cy="90" r={R} fill="none"
                        stroke={s.color} strokeWidth="22"
                        strokeDasharray={`${s.arc} ${circ}`}
                        strokeDashoffset={-s.offset}
                        transform="rotate(-90 90 90)"
                      />
                    ))}
                  </svg>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {segments.map(s => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 9, height: 9, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: 'var(--rh-blackberry-light)' }}>{s.label}</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--rh-blackberry)' }}>{fmtCad(s.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card style={{ padding: 32 }}>
              <SectionLabel>Mortgage details</SectionLabel>
              <DetailRow label="Product type"            value={`${m.productType} — ${m.productOption}`} />
              <DetailRow label="Remaining amortization"  value={m.amortizationRemaining} />
              <DetailRow label="Payment frequency"       value={m.paymentFrequency} />
              <DetailRow label="Interest rate"           value={`${m.interestRate.toFixed(2)}%`} />
              <DetailRow label="Current term"            value={m.currentTerm} />
              <DetailRow label="Maturity date"           value={fmtDate(m.maturityDate)} last />

              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--rh-stone-lightest)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--rh-blackberry-light)' }}>Balance paid down</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--rh-lime-dark)' }}>{paidDownPct}% paid off</span>
                </div>
                <ProgressBar pct={parseFloat(paidDownPct)} color="var(--rh-lime-dark)" height={10} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'var(--rh-stone-darkest)' }}>
                  <span>{fmtCad(paidDown)} paid</span>
                  <span>{fmtCad(m.currentLoanAmount)} remaining</span>
                </div>
              </div>
            </Card>
          </div>

          <div className="rh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

            <Card style={{ padding: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <SectionLabel>Prepayment privileges</SectionLabel>
                <Pill tone="lime">{fmtCad(lumpSumRemaining)} left</Pill>
              </div>
              <p style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', margin: '0 0 18px', lineHeight: 1.6 }}>
                Annual lump sum allowance — applied directly to principal.
              </p>

              <ProgressBar pct={lumpSumUsedPct} color="var(--rh-blueberry-dark)" height={10} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 7, fontSize: 12, color: 'var(--rh-stone-darkest)', marginBottom: 24 }}>
                <span>{fmtCad(m.lumpSumUsed)} used this year</span>
                <span>{fmtCad(m.lumpSumAllowance)} total allowance</span>
              </div>

              <div style={{ background: 'var(--rh-blueberry-lightest)', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--rh-blueberry-darkest)', marginBottom: 3 }}>
                  Tip: A {fmtCad(lumpSumRemaining)} lump sum payment now
                </div>
                <div style={{ fontSize: 12, color: 'var(--rh-blueberry-dark)', lineHeight: 1.5 }}>
                  could reduce your amortization by up to 14 months and save approximately {fmtCad(lumpSumRemaining * 0.38)} in interest.
                </div>
              </div>

              <Button variant="primary" size="s">Make a lump sum payment →</Button>
            </Card>

            <Card style={{ padding: 32 }}>
              <SectionLabel>Secured property</SectionLabel>

              <div style={{ display: 'flex', gap: 14, marginBottom: 22 }}>
                <div style={{ width: 46, height: 46, borderRadius: 10, background: 'var(--rh-blueberry-lightest)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="house" size={22} color="var(--rh-blueberry-darkest)" />
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--rh-blackberry)', lineHeight: 1.3, marginBottom: 2 }}>{propLine(m.property)}</div>
                  <div style={{ fontSize: 14, color: 'var(--rh-stone-darkest)' }}>{m.property.city}, {m.property.province} &nbsp; {m.property.postalCode}</div>
                </div>
              </div>

              <div style={{ background: 'var(--rh-mint-lightest)', border: '1px solid var(--rh-mint-light)', borderRadius: 10, padding: '14px 16px', marginBottom: 22 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--rh-mint-darkest)', marginBottom: 4 }}>Know your equity position</div>
                <div style={{ fontSize: 13, color: 'var(--rh-blackberry-light)', lineHeight: 1.55 }}>
                  Your outstanding balance is {fmtCad(m.currentLoanAmount)}. Get a live market estimate to see your real equity — powered by Zoocasa.
                </div>
              </div>

              <Button variant="secondary" size="s" onClick={() => onNavigate && onNavigate('home-value')}>
                Get home value estimate →
              </Button>
            </Card>
          </div>

          {monthsToMaturity <= 18 && (
            <Card style={{ padding: '28px 32px', background: 'var(--rh-blueberry-darkest)', border: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                <div style={{ color: '#fff' }}>
                  <Pill tone="tangerine" style={{ marginBottom: 12 }}>Rate renewal approaching</Pill>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: '12px 0 8px', letterSpacing: '-0.015em' }}>
                    Your rate renews {monthsToMaturity <= 0 ? 'now' : `in ${monthsToMaturity} months`}
                  </h3>
                  <p style={{ fontSize: 14, opacity: 0.8, margin: 0, maxWidth: 520, lineHeight: 1.65 }}>
                    You're currently at {m.interestRate.toFixed(2)}%. Today's best 5-year fixed is {marketRate.toFixed(2)}% —
                    that's a potential saving of {fmtCad(monthlySaving)}/mo on your renewal.
                  </p>
                </div>
                <Button variant="coconut" size="m" onClick={() => onNavigate && onNavigate('mortgages')}>
                  Compare renewal rates →
                </Button>
              </div>
            </Card>
          )}

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingTop: 4 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--rh-blackberry)', margin: 0, letterSpacing: '-0.01em' }}>Contact information</h2>
              <button
                onClick={() => setEditMode(e => !e)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, color: 'var(--rh-blueberry-dark)', fontFamily: 'inherit', padding: 0 }}
              >
                {editMode ? 'Cancel' : 'Edit contact info'}
              </button>
            </div>

            <div className="rh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

              <Card style={{ padding: '28px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <SectionLabel>Primary borrower</SectionLabel>
                  <Pill tone="berry">Primary</Pill>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--rh-blackberry)', marginBottom: 20, letterSpacing: '-0.01em' }}>
                  {m.firstName} {m.lastName}
                </div>

                {editMode ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                    <Input label="Email" {...field('email')} />
                    <Input label="Mobile phone" {...field('mobile')} />
                    <Input label="Home phone" {...field('home')} />
                    <div className="rh-grid-2" style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: 10 }}>
                      <Input label="Unit #" {...field('unit')} placeholder="—" />
                      <Input label="Street number" {...field('number')} />
                    </div>
                    <div className="rh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: 10 }}>
                      <Input label="Street name" {...field('streetName')} />
                      <Input label="Type" {...field('streetType')} placeholder="St, Ave…" />
                    </div>
                    <div className="rh-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 64px', gap: 10 }}>
                      <Input label="City" {...field('city')} />
                      <Input label="Province" {...field('province')} />
                    </div>
                    <Input label="Postal code" {...field('postal')} />
                    <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                      <Button variant="primary" size="s" onClick={() => setEditMode(false)}>Save changes</Button>
                      <Button variant="ghost" size="s" onClick={() => setEditMode(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {[
                      { label: 'Email',           value: form.email },
                      { label: 'Mobile',          value: m.mobilePhone },
                      { label: 'Home phone',      value: m.homePhone || '—' },
                      { label: 'Mailing address', value: `${form.unit ? `#${form.unit} – ` : ''}${form.number} ${form.streetName} ${form.streetType}` },
                      { label: 'City / Province', value: `${m.mailing.city}, ${m.mailing.province}  ${m.mailing.postalCode}` },
                    ].map((row, i, arr) => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--rh-stone-lightest)' : 'none' }}>
                        <span style={{ fontSize: 12, color: 'var(--rh-stone-darkest)', minWidth: 110 }}>{row.label}</span>
                        <span style={{ fontSize: 13, color: 'var(--rh-blackberry)', fontWeight: 500, textAlign: 'right' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <Card style={{ padding: '28px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <SectionLabel>Co-borrower</SectionLabel>
                  <Pill tone="stone">Co-borrower</Pill>
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--rh-blackberry)', marginBottom: 20, letterSpacing: '-0.01em' }}>
                  {m.coBorrower.firstName} {m.coBorrower.lastName}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 20 }}>
                  {[
                    { label: 'Email',     value: m.coBorrower.email },
                    { label: 'Mobile',    value: m.coBorrower.mobilePhone },
                    { label: 'Home',      value: m.coBorrower.homePhone || '—' },
                    { label: 'Member #',  value: m.coBorrower.memberNumber },
                  ].map((row, i, arr) => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--rh-stone-lightest)' : 'none' }}>
                      <span style={{ fontSize: 12, color: 'var(--rh-stone-darkest)', minWidth: 80 }}>{row.label}</span>
                      <span style={{ fontSize: 13, color: 'var(--rh-blackberry)', fontWeight: 500, textAlign: 'right' }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div style={{ padding: '12px 14px', background: 'var(--rh-stone-lightest)', borderRadius: 8, fontSize: 12, color: 'var(--rh-stone-darkest)', lineHeight: 1.55 }}>
                  To update co-borrower information, contact your lender directly.
                </div>
              </Card>
            </div>
          </div>

          <Card style={{ padding: '20px 28px' }}>
            <SectionLabel>Account reference</SectionLabel>
            <div className="rh-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {[
                { label: 'MCAP account #', value: m.mcapAccountNumber },
                { label: 'Lender #',       value: m.lenderNumber },
                { label: 'Member #',       value: m.memberNumber },
                { label: 'Joint member #', value: m.jointMemberNumber || '—' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontSize: 11, color: 'var(--rh-stone-darkest)', marginBottom: 5 }}>{item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--rh-blackberry)', fontFamily: 'monospace', letterSpacing: '0.03em' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};
