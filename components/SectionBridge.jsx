'use client';

import { Button, Icon } from './primitives';

export const SectionBridge = ({ icon, eyebrow, heading, cta, onCta }) => (
  <div style={{ padding: '60px 28px 0', maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <Icon name={icon} size={18} color="var(--rh-blueberry-dark)" />
        <span className="rh-vertical-eyebrow">{eyebrow}</span>
      </div>
      <h2 style={{ fontSize: 26, fontWeight: 500, margin: 0, letterSpacing: '-0.01em' }}>{heading}</h2>
    </div>
    {cta && <Button variant="ghost" onClick={onCta} style={{ padding: 0, fontSize: 14 }}>{cta}</Button>}
  </div>
);
