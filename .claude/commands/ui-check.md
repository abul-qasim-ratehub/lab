---
description: A comprehensive UI/UX QA checklist for validating the Ratehub design system
  at http://localhost:3000. Covers visual consistency, accessibility, and
  responsiveness across all pages and breakpoints. Provides actionable
  feedback with specific CSS fixes and visual comparisons. Ideal for ensuring
  adherence to CLAUDE.md specs before launch.
argument-hint: command  name | summary of command arguments
---
Validate the Ratehub design system UI at http://localhost:3000. Check page $ARGUMENTS
                                                                          
  **Visual consistency:**                                                 
  - Design tokens match colors_and_type.css (Gordita typeface, food-color
  taxonomy: blueberry, mint, lime, yuzu, stone, coconut, blackberry, etc.)
  - Hero sections: --rh-blueberry-darkest background, Pill eyebrow,
  h1.showDot, descriptive p, Button CTA                                   
  - Section containers: maxWidth 1280px, centered, padding 72px 28px
  - Responsive grids (rh-grid-6/4/3/2) collapse correctly at ≤768px       
  - Icons from /assets/icons/ only (no emoji, no Lucide/Heroicons)        
  - Primary CTA: #2d6e8a, hover #00729e                                   
                                                                          
  **Accessibility:**                                                      
  - Color contrast ≥4.5:1 on all text                                     
  - Interactive elements keyboard-navigable                               
  - Proper heading hierarchy (h1 once per page)
  - All images/icons have alt text or aria-labels                         
  - No motion sickness triggers (no bouncy animations)             
                                                                          
  **Responsiveness:**                                              
  - Mobile nav (rh-mobile-menu-btn) appears at ≤768px                     
  - Typography scales: rh-hero-h1 52px → 32px (768px) → 26px (480px)      
  - No horizontal scrolling on mobile                                     
  - Touch targets ≥44px                                                   
                                                                          
  **Data & voice:**                                                       
  - Numbers in Canadian format ($2,493/mo, 5.19%, comma thousands)
  - Sentence case throughout (no ALL CAPS)                                
  - No gradients, textures, or scroll-jacking                      
                                                                          
  Take viewport screenshots at 1440px, 768px, and 480px for each page.    
  Output a markdown report with:                                          
  - ✅/⚠️ /❌ status per page per breakpoint                               
  - Specific violations with CSS fixes if needed                          
  - Visual comparisons (side-by-side screenshots)                         
  - Accessibility issues with remediation steps                           
  - Actionable next steps                                                 
                                                                   
  Focus on deviations from CLAUDE.md specs, not cosmetic tweaks.          
                                                                   
  To use it: Just type this in chat (or save as a template) and Claude    
  will systematically validate your design system using the UI/UX QA
  agent.                                                                  
                                                                   
       