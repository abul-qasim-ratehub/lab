'use client';

import { Button, Pill } from '../../components/primitives';
import { CardFinder } from '../../components/CardFinder';
import { FeaturedIn } from '../../components/FeaturedIn';
import { AwardStrip } from '../../components/AwardStrip';

export default function CardsPage() {
  return (
    <div>
      <div className="rh-hero-section" style={{ background: 'var(--rh-blueberry-darkest)', color: '#fff', padding: '72px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Pill tone="berry">CardFinder</Pill>
          <h1 className="showDot rh-hero-h1" style={{ fontSize: 52, fontWeight: 700, margin: '18px 0 14px', letterSpacing: '-0.025em', lineHeight: 1.08 }}>Find the right card for you</h1>
          <p style={{ fontSize: 17, opacity: .88, maxWidth: 540, margin: '0 0 32px', lineHeight: 1.65 }}>Compare 200+ cards by cash back, travel, or low interest — matched to your spending in 60 seconds.</p>
          <Button size="l" variant="coconut">Start the quiz →</Button>
        </div>
      </div>
      <CardFinder />
      <FeaturedIn />
      <AwardStrip />
    </div>
  );
}
