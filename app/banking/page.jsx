'use client';

import { Button, Pill } from '../../components/primitives';
import { SavingsShowcase } from '../../components/SavingsShowcase';
import { TrustStrip } from '../../components/TrustStrip';
import { AwardStrip } from '../../components/AwardStrip';

export default function BankingPage() {
  return (
    <div>
      <div className="rh-hero-section" style={{ background: 'var(--rh-blueberry-darkest)', color: '#fff', padding: '72px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Pill tone="mint">Banking</Pill>
          <h1 className="showDot rh-hero-h1" style={{ fontSize: 52, fontWeight: 700, margin: '18px 0 14px', letterSpacing: '-0.025em', lineHeight: 1.08 }}>Your money, made better</h1>
          <p style={{ fontSize: 17, opacity: .88, maxWidth: 540, margin: '0 0 32px', lineHeight: 1.65 }}>Compare high-interest savings, GICs, and chequing from Canada's top banks. Updated daily.</p>
          <Button size="l" variant="coconut">See savings rates →</Button>
        </div>
      </div>
      <SavingsShowcase />
      <TrustStrip />
      <AwardStrip />
    </div>
  );
}
