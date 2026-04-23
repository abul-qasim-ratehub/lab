'use client';

import { Icon, Pill } from '../../components/primitives';
import { PulseButton } from '../../components/HeroBannerV2';
import { MortgageCalculator } from '../../components/MortgageCalculator';
import { MortgageRateTable } from '../../components/MortgageRateTable';
import { EducationStrip } from '../../components/EducationStrip';
import { AwardStrip } from '../../components/AwardStrip';

export default function MortgagesPage() {
  return (
    <div>
      <div className="rh-hero-section" style={{ background: 'var(--rh-blueberry-darkest)', color: '#fff', padding: '72px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Pill tone="yuzu" icon={<Icon name="house" size={14} color="var(--rh-yuzu-darkest)" />}>Mortgages</Pill>
          <h1 className="showDot rh-hero-h1" style={{ fontSize: 52, fontWeight: 700, margin: '18px 0 14px', letterSpacing: '-0.025em', lineHeight: 1.08 }}>Canada's smartest mortgage comparison</h1>
          <p style={{ fontSize: 17, opacity: .88, maxWidth: 540, margin: '0 0 32px', lineHeight: 1.65 }}>
            Compare rates from 30+ lenders in real time. Save up to $13,384 over 5 years — no obligation, no credit check.
          </p>
          <PulseButton onClick={() => {}}>Find my rate →</PulseButton>
        </div>
      </div>
      <MortgageCalculator onFindRates={() => {}} />
      <MortgageRateTable />
      <EducationStrip />
      <AwardStrip />
    </div>
  );
}
