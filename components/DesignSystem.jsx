'use client';

import React from 'react';
import { Button, Pill, Icon, Card, Input, Select, CheckBullet } from './primitives';

export const DesignSystem = () => {
  const colors = [
    // Primary
    { name: 'Blueberry', shades: ['lightest', 'light', 'base', 'dark', 'darkest'] },
    // Semantics
    { name: 'Mint', shades: ['lightest', 'light', 'base', 'dark', 'darkest'] },
    { name: 'Lime', shades: ['lightest', 'light', 'base', 'dark', 'darkest'] },
    { name: 'Yuzu', shades: ['lightest', 'light', 'base', 'dark', 'darkest'] },
    // Accents
    { name: 'Grape', shades: ['lightest', 'light', 'base', 'dark', 'darkest'] },
    { name: 'Tangerine', shades: ['lightest', 'light', 'base', 'dark', 'darkest'] },
    { name: 'Watermelon', shades: ['lightest', 'light', 'base', 'dark', 'darkest'] },
    { name: 'Strawberry', shades: ['lightest', 'light', 'base', 'dark', 'darkest'] },
    // Neutrals
    { name: 'Stone', shades: ['lightest', 'light', 'base', 'dark', 'darkest'] },
    { name: 'Coconut', shades: ['base'] },
    { name: 'Blackberry', shades: ['base'] },
  ];

  const typeSizes = ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--rh-coconut)' }}>
      {/* Hero */}
      <section style={{
        background: 'var(--rh-blueberry-darkest)',
        color: 'var(--rh-coconut)',
        padding: '72px 28px',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '52px',
          fontWeight: 700,
          margin: '0 0 16px',
          letterSpacing: '-0.5px',
        }}>
          Design System
        </h1>
        <p style={{
          fontSize: '18px',
          fontWeight: 400,
          margin: 0,
          opacity: 0.9,
          maxWidth: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Complete reference of Ratehub's design tokens, components, and guidelines.
        </p>
      </section>

      {/* Main Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 28px' }}>
        {/* Colors Section */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            margin: '0 0 48px',
            color: 'var(--rh-blackberry)',
          }}>
            Colors
          </h2>
          <div style={{ display: 'grid', gap: 48 }}>
            {colors.map(color => (
              <div key={color.name}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  margin: '0 0 16px',
                  color: 'var(--rh-blackberry)',
                }}>
                  {color.name}
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 12 }}>
                  {color.shades.map(shade => (
                    <div key={shade} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <div style={{
                        width: '100%',
                        aspectRatio: '1',
                        background: shade === 'base' ? `var(--rh-${color.name.toLowerCase()})` : `var(--rh-${color.name.toLowerCase()}-${shade})`,
                        borderRadius: '8px',
                        border: '1px solid var(--rh-stone-light)',
                      }} />
                      <span style={{
                        fontSize: '12px',
                        color: 'var(--rh-stone-dark)',
                        fontFamily: 'monospace',
                      }}>
                        {shade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography Section */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            margin: '0 0 48px',
            color: 'var(--rh-blackberry)',
          }}>
            Typography
          </h2>
          <div style={{ display: 'grid', gap: 24 }}>
            {typeSizes.map(size => (
              <div key={size} style={{
                padding: '20px',
                background: 'var(--rh-blueberry-lightest)',
                borderRadius: '8px',
                borderLeft: '4px solid var(--rh-blueberry-dark)',
              }}>
                <div style={{
                  fontSize: `var(--rh-font-${size})`,
                  fontFamily: 'var(--rh-font-sans)',
                  fontWeight: 500,
                  margin: '0 0 8px',
                  color: 'var(--rh-blackberry)',
                }}>
                  The quick brown fox jumps over the lazy dog
                </div>
                <span style={{
                  fontSize: '12px',
                  color: 'var(--rh-stone-dark)',
                  fontFamily: 'monospace',
                }}>
                  var(--rh-font-size-{size})
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Components Section */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            margin: '0 0 48px',
            color: 'var(--rh-blackberry)',
          }}>
            Components
          </h2>

          {/* Buttons */}
          <div style={{ marginBottom: 56 }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              margin: '0 0 24px',
              color: 'var(--rh-blackberry)',
            }}>
              Buttons
            </h3>
            <div style={{ display: 'grid', gap: 24 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button variant="primary" size="s">Small Primary</Button>
                <Button variant="secondary" size="s">Small Secondary</Button>
              </div>
            </div>
          </div>

          {/* Pills */}
          <div style={{ marginBottom: 56 }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              margin: '0 0 24px',
              color: 'var(--rh-blackberry)',
            }}>
              Pills
            </h3>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <Pill>Default Pill</Pill>
              <Pill style={{ background: 'var(--rh-lime-light)', color: 'var(--rh-lime-darkest)' }}>Success</Pill>
              <Pill style={{ background: 'var(--rh-yuzu-light)', color: 'var(--rh-yuzu-darkest)' }}>Warning</Pill>
            </div>
          </div>

          {/* Inputs */}
          <div style={{ marginBottom: 56 }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              margin: '0 0 24px',
              color: 'var(--rh-blackberry)',
            }}>
              Forms
            </h3>
            <div style={{ display: 'grid', gap: 16, maxWidth: 400 }}>
              <Input placeholder="Text input" />
              <Select>
                <option>Select option</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </Select>
              <div style={{ display: 'flex', gap: 8 }}>
                <CheckBullet />
                <span>Checkbox option</span>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              margin: '0 0 24px',
              color: 'var(--rh-blackberry)',
            }}>
              Cards
            </h3>
            <Card style={{ maxWidth: 300 }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 600 }}>Card Title</h4>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--rh-stone-dark)' }}>
                This is a card component with padding and border styling.
              </p>
            </Card>
          </div>
        </section>

        {/* Spacing Section */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            margin: '0 0 48px',
            color: 'var(--rh-blackberry)',
          }}>
            Spacing Scale
          </h2>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              { px: 2,   token: '--rh-space-eighth'  },
              { px: 4,   token: '--rh-space-quarter' },
              { px: 8,   token: '--rh-space-half'    },
              { px: 12,  token: '--rh-space-0_75'    },
              { px: 16,  token: '--rh-space-1'       },
              { px: 20,  token: '--rh-space-1_25'    },
              { px: 24,  token: '--rh-space-1_5'     },
              { px: 28,  token: '--rh-space-1_75'    },
              { px: 32,  token: '--rh-space-2'       },
              { px: 40,  token: '--rh-space-2_5'     },
              { px: 48,  token: '--rh-space-3'       },
              { px: 64,  token: '--rh-space-4'       },
              { px: 80,  token: '--rh-space-5'       },
              { px: 96,  token: '--rh-space-6'       },
              { px: 128, token: '--rh-space-8'       },
            ].map(({ px, token }) => (
              <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: px,
                  height: 32,
                  background: 'var(--rh-blueberry)',
                  borderRadius: '4px',
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: '14px', color: 'var(--rh-blackberry)', fontFamily: 'monospace' }}>
                  {px}px ({token})
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Guidelines Section */}
        <section>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 700,
            margin: '0 0 8px',
            color: 'var(--rh-blackberry)',
          }}>
            Guidelines
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'var(--rh-stone-darkest)',
            margin: '0 0 48px',
            lineHeight: 1.6,
          }}>
            Core rules that keep every Ratehub surface consistent.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {[
              {
                icon: 'light-bulb',
                title: 'Typeface',
                body: 'Gordita is the only approved typeface. Use weights 400, 500, and 700. Never substitute system fonts or web fonts from external CDNs.',
                chips: ['400 Regular', '500 Medium', '700 Bold'],
                token: '--rh-font-sans',
                accent: 'var(--rh-blueberry)',
              },
              {
                icon: 'star',
                title: 'Icons',
                body: 'Use SVGs from /public/assets/icons/ exclusively. No emoji, no third-party icon libraries. All icons are 62×62 and stroked.',
                chips: ['SVG only', 'No emoji', 'No Lucide'],
                token: '/public/assets/icons/*.svg',
                accent: 'var(--rh-grape)',
              },
              {
                icon: 'maple-leaf',
                title: 'Numbers',
                body: 'Format all figures in Canadian style. Use specific numbers over vague adjectives — "30+ lenders" not "many lenders".',
                chips: ['$2,493/mo', '5.19%', '30+ lenders'],
                token: 'Comma thousands separator',
                accent: 'var(--rh-lime-dark)',
              },
              {
                icon: 'speech-bubble',
                title: 'Voice',
                body: 'Write in sentence case everywhere — headings, labels, CTAs. Be direct and specific. Avoid superlatives without data to back them up.',
                chips: ['Sentence case', 'Direct', 'Specific'],
                token: 'Never Title Case',
                accent: 'var(--rh-tangerine)',
              },
              {
                icon: 'trending',
                title: 'Primary CTA',
                body: 'Primary buttons use the desaturated blueberry #2d6e8a, not raw blueberry. On hover transition to --rh-blueberry-dark. Never use gradients.',
                chips: ['#2d6e8a', 'hover: #00729e', 'No gradients'],
                token: 'variant="primary"',
                accent: '#2d6e8a',
              },
              {
                icon: 'house',
                title: 'Hero sections',
                body: 'Hero backgrounds must use --rh-blueberry-darkest. Always include a Pill eyebrow, h1 with .showDot, a descriptor paragraph, and a CTA Button.',
                chips: ['Pill eyebrow', 'h1.showDot', 'CTA Button'],
                token: '--rh-blueberry-darkest',
                accent: 'var(--rh-blueberry-darkest)',
              },
            ].map(({ icon, title, body, chips, token, accent }) => (
              <div key={title} style={{
                background: 'var(--rh-coconut)',
                border: '1px solid var(--rh-stone-light)',
                borderRadius: 12,
                boxShadow: 'var(--rh-shadow-xs)',
                overflow: 'hidden',
              }}>
                {/* Coloured top bar */}
                <div style={{ height: 4, background: accent }} />

                <div style={{ padding: 24 }}>
                  {/* Icon + title row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'var(--rh-stone-lightest)',
                      border: '1px solid var(--rh-stone-light)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon name={icon} size={18} />
                    </div>
                    <h3 style={{
                      margin: 0,
                      fontSize: '16px',
                      fontWeight: 600,
                      color: 'var(--rh-blackberry)',
                    }}>
                      {title}
                    </h3>
                  </div>

                  {/* Body */}
                  <p style={{
                    margin: '0 0 16px',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'var(--rh-stone-darkest)',
                  }}>
                    {body}
                  </p>

                  {/* Chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {chips.map(chip => (
                      <span key={chip} style={{
                        padding: '3px 10px',
                        borderRadius: 9999,
                        fontSize: 11,
                        fontWeight: 500,
                        background: 'var(--rh-stone-lightest)',
                        color: 'var(--rh-stone-darkest)',
                        border: '1px solid var(--rh-stone-light)',
                      }}>
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* Token reference */}
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: 6,
                    background: 'var(--rh-blueberry-lightest)',
                    borderLeft: '3px solid var(--rh-blueberry-dark)',
                  }}>
                    <code style={{
                      fontSize: 12,
                      color: 'var(--rh-blueberry-darkest)',
                      fontFamily: 'var(--rh-font-mono)',
                      background: 'transparent',
                      padding: 0,
                    }}>
                      {token}
                    </code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
