'use client';

import { ToolsPage } from '../../components/ToolsPage';
import { MortgageCalculator } from '../../components/MortgageCalculator';
import { useNav } from '../../components/useNav';

export default function Page() {
  const go = useNav();
  return (
    <div>
      <ToolsPage />
      <MortgageCalculator onFindRates={() => go('mortgages')} />
    </div>
  );
}
