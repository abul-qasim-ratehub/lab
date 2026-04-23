'use client';

import { HeroBannerV2 } from '../components/HeroBannerV2';
import { MortgageRateTable } from '../components/MortgageRateTable';
import { CardFinder } from '../components/CardFinder';
import { SavingsShowcase } from '../components/SavingsShowcase';
import { MortgageCalculator } from '../components/MortgageCalculator';
import { TrustStrip } from '../components/TrustStrip';
import { FeaturedIn } from '../components/FeaturedIn';
import { EducationStrip } from '../components/EducationStrip';
import { AwardStrip } from '../components/AwardStrip';
import { ProductCategoryGridV2 } from '../components/ProductCategoryGridV2';
import { InsurancePreview } from '../components/InsurancePreview';
import { InvestingPreview } from '../components/InvestingPreview';
import { SectionBridge } from '../components/SectionBridge';
import { useNav } from '../components/useNav';

export default function HomePage() {
  const go = useNav();
  return (
    <div>
      <HeroBannerV2 onFindRates={() => go('mortgages')} onNavigate={go} />
      <ProductCategoryGridV2 onNavigate={go} />
      <hr className="rh-section-divider" />
      <SectionBridge icon="house" eyebrow="Mortgages" heading="Today's best mortgage rates" cta="See all rates →" onCta={() => go('mortgages')} />
      <MortgageRateTable />
      <hr className="rh-section-divider" />
      <SectionBridge icon="credit-card" eyebrow="Credit Cards" heading="Find the right card for you" cta="See all cards →" onCta={() => go('cards')} />
      <CardFinder />
      <hr className="rh-section-divider" />
      <SectionBridge icon="piggy" eyebrow="Banking & Savings" heading="Earn more from every dollar" cta="See savings rates →" onCta={() => go('banking')} />
      <SavingsShowcase />
      <hr className="rh-section-divider" />
      <InsurancePreview onNavigate={go} />
      <hr className="rh-section-divider" />
      <InvestingPreview onNavigate={go} />
      <hr className="rh-section-divider" />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 0 0' }}>
        <SectionBridge icon="calculator" eyebrow="Tools & Calculators" heading="See your real monthly payment" cta="All calculators →" onCta={() => go('tools')} />
      </div>
      <MortgageCalculator onFindRates={() => go('mortgages')} />
      <hr className="rh-section-divider" />
      <TrustStrip />
      <FeaturedIn />
      <hr className="rh-section-divider" />
      <EducationStrip />
      <AwardStrip />
    </div>
  );
}
