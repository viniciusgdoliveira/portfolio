/**
 * Design System Constants
 * 
 * This file contains design system constants following a 4px/8px grid system
 * for consistent spacing, sizing, and design tokens across the application.
 */

// Spacing System (4px base unit)
export const SPACING = {
  // Extra Small (4px)
  xs: '4px',
  // Small (8px) 
  sm: '8px',
  // Medium (16px)
  md: '16px',
  // Large (24px)
  lg: '24px',
  // Extra Large (32px)
  xl: '32px',
  // 2X Large (40px)
  '2xl': '40px',
  // 3X Large (48px)
  '3xl': '48px',
  // 4X Large (64px)
  '4xl': '64px',
} as const;

// Tailwind Spacing Classes Mapping
export const SPACING_CLASSES = {
  // Padding
  padding: {
    xs: 'p-1',     // 4px
    sm: 'p-2',     // 8px
    md: 'p-4',     // 16px
    lg: 'p-6',     // 24px
    xl: 'p-8',     // 32px
    '2xl': 'p-10', // 40px
    '3xl': 'p-12', // 48px
    '4xl': 'p-16', // 64px
  },
  // Margin
  margin: {
    xs: 'm-1',     // 4px
    sm: 'm-2',     // 8px
    md: 'm-4',     // 16px
    lg: 'm-6',     // 24px
    xl: 'm-8',     // 32px
    '2xl': 'm-10', // 40px
    '3xl': 'm-12', // 48px
    '4xl': 'm-16', // 64px
  },
  // Gap
  gap: {
    xs: 'gap-1',     // 4px
    sm: 'gap-2',     // 8px
    md: 'gap-4',     // 16px
    lg: 'gap-6',     // 24px
    xl: 'gap-8',     // 32px
    '2xl': 'gap-10', // 40px
    '3xl': 'gap-12', // 48px
    '4xl': 'gap-16', // 64px
  },
  // Space Between
  space: {
    xs: 'space-x-1 space-y-1',     // 4px
    sm: 'space-x-2 space-y-2',     // 8px
    md: 'space-x-4 space-y-4',     // 16px
    lg: 'space-x-6 space-y-6',     // 24px
    xl: 'space-x-8 space-y-8',     // 32px
    '2xl': 'space-x-10 space-y-10', // 40px
    '3xl': 'space-x-12 space-y-12', // 48px
    '4xl': 'space-x-16 space-y-16', // 64px
  },
} as const;

// Component Spacing Standards
export const COMPONENT_SPACING = {
  // Section vertical padding
  section: 'py-10', // 40px
  // Container horizontal padding
  container: {
    mobile: 'px-4',   // 16px
    desktop: 'px-6',  // 24px
  },
  // Card padding
  card: {
    small: 'p-4',     // 16px
    medium: 'p-6',    // 24px
    large: 'p-8',     // 32px
  },
  // Grid gaps
  grid: {
    small: 'gap-4',   // 16px
    medium: 'gap-6',  // 24px
    large: 'gap-8',   // 32px
  },
  // Button spacing
  button: {
    small: 'px-4 py-2',   // 16px x 8px
    medium: 'px-6 py-3',  // 24px x 12px
    large: 'px-8 py-4',   // 32px x 16px
  },
} as const;

// Responsive Spacing Utilities
export const RESPONSIVE_SPACING = {
  // Responsive padding
  padding: {
    mobile: 'p-4',      // 16px
    tablet: 'md:p-6',   // 24px
    desktop: 'lg:p-8',  // 32px
  },
  // Responsive margins
  margin: {
    mobile: 'm-4',      // 16px
    tablet: 'md:m-6',   // 24px
    desktop: 'lg:m-8',  // 32px
  },
  // Responsive gaps
  gap: {
    mobile: 'gap-4',    // 16px
    tablet: 'md:gap-6', // 24px
    desktop: 'lg:gap-8', // 32px
  },
} as const;

// Typography System
export const TYPOGRAPHY = {
  // Font families
  fontFamily: {
    sans: 'font-sans',      // Geist Sans + system fallbacks
    mono: 'font-mono',      // Geist Mono + system fallbacks
  },
  
  // Font weights
  fontWeight: {
    normal: 'font-normal',    // 400
    medium: 'font-medium',    // 500
    semibold: 'font-semibold', // 600
    bold: 'font-bold',        // 700
  },
  
  // Font sizes with responsive variants
  fontSize: {
    xs: 'text-xs',           // 12px
    sm: 'text-sm',           // 14px
    base: 'text-base',       // 16px
    lg: 'text-lg',           // 18px
    xl: 'text-xl',           // 20px
    '2xl': 'text-2xl',       // 24px
    '3xl': 'text-3xl',       // 30px
    '4xl': 'text-4xl',       // 36px
    '5xl': 'text-5xl',       // 48px
    '6xl': 'text-6xl',       // 60px
  },
  
  // Responsive font sizes
  responsiveFontSize: {
    hero: 'text-5xl md:text-6xl',      // 48px → 60px
    h1: 'text-5xl md:text-6xl',        // 48px → 60px
    h2: 'text-3xl md:text-4xl',        // 30px → 36px
    h3: 'text-xl md:text-2xl',         // 20px → 24px
    h4: 'text-lg',                     // 18px
    body: 'text-base',                 // 16px
    small: 'text-sm',                  // 14px
    caption: 'text-xs',                // 12px
  },
  
  // Line heights
  lineHeight: {
    none: 'leading-none',      // 1
    tight: 'leading-tight',    // 1.25
    snug: 'leading-snug',      // 1.375
    normal: 'leading-normal',  // 1.5
    relaxed: 'leading-relaxed', // 1.625
    loose: 'leading-loose',    // 2
  },
  
  // Letter spacing
  letterSpacing: {
    tighter: 'tracking-tighter', // -0.05em
    tight: 'tracking-tight',     // -0.025em
    normal: 'tracking-normal',   // 0em
    wide: 'tracking-wide',       // 0.025em
    wider: 'tracking-wider',     // 0.05em
    widest: 'tracking-widest',   // 0.1em
  },
  
  // Text colors with opacity
  textColor: {
    primary: 'text-white',
    secondary: 'text-white/90',
    muted: 'text-white/80',
    subtle: 'text-white/60',
    disabled: 'text-white/40',
    accent: 'text-white/95',
  },
} as const;

// Typography Spacing (Legacy - keeping for backward compatibility)
export const TYPOGRAPHY_SPACING = {
  // Line heights
  lineHeight: {
    tight: 'leading-tight',    // 1.25
    normal: 'leading-normal',  // 1.5
    relaxed: 'leading-relaxed', // 1.625
  },
  // Letter spacing
  letterSpacing: {
    tight: 'tracking-tight',    // -0.025em
    normal: 'tracking-normal',  // 0em
    wide: 'tracking-wide',      // 0.025em
  },
} as const;

// Border Radius Standards
export const BORDER_RADIUS = {
  none: 'rounded-none',    // 0px
  sm: 'rounded-sm',        // 2px
  md: 'rounded-md',        // 6px
  lg: 'rounded-lg',        // 8px
  xl: 'rounded-xl',        // 12px
  '2xl': 'rounded-2xl',    // 16px
  '3xl': 'rounded-3xl',    // 24px
  full: 'rounded-full',    // 9999px
  custom: 'rounded-[20px]', // Custom for liquid glass effect
} as const;

// Shadow Standards
export const SHADOWS = {
  none: 'shadow-none',
  sm: 'shadow-sm',         // 0 1px 2px 0 rgb(0 0 0 / 0.05)
  md: 'shadow-md',         // 0 4px 6px -1px rgb(0 0 0 / 0.1)
  lg: 'shadow-lg',         // 0 10px 15px -3px rgb(0 0 0 / 0.1)
  xl: 'shadow-xl',         // 0 20px 25px -5px rgb(0 0 0 / 0.1)
  '2xl': 'shadow-2xl',     // 0 25px 50px -12px rgb(0 0 0 / 0.25)
} as const;

// Typography Component Standards
export const TYPOGRAPHY_COMPONENTS = {
  // Headings
  heading: {
    h1: 'text-5xl md:text-6xl font-bold text-white',
    h2: 'text-3xl md:text-4xl font-bold text-white',
    h3: 'text-xl md:text-2xl font-bold text-white',
    h4: 'text-lg font-semibold text-white',
    h5: 'text-base font-semibold text-white',
    h6: 'text-sm font-semibold text-white',
  },
  
  // Body text
  body: {
    large: 'text-lg text-white/80 leading-relaxed',
    base: 'text-base text-white/80 leading-relaxed',
    small: 'text-sm text-white/80 leading-relaxed',
    caption: 'text-xs text-white/60',
  },
  
  // Interactive elements
  interactive: {
    button: 'font-semibold',
    link: 'text-white/80 hover:text-white transition-colors',
    label: 'text-sm font-medium text-white',
    badge: 'text-xs font-medium',
  },
  
  // Special text
  special: {
    hero: 'text-5xl md:text-6xl font-bold text-white',
    subtitle: 'text-xl md:text-2xl text-white/90',
    description: 'text-lg text-white/80',
    muted: 'text-white/60',
    accent: 'text-white/95',
  },
} as const;

// Design System Type Definitions
export type SpacingSize = keyof typeof SPACING;
export type ComponentSpacing = keyof typeof COMPONENT_SPACING;
export type ResponsiveSpacing = keyof typeof RESPONSIVE_SPACING;
export type BorderRadiusSize = keyof typeof BORDER_RADIUS;
export type ShadowSize = keyof typeof SHADOWS;
export type TypographySize = keyof typeof TYPOGRAPHY.fontSize;
export type TypographyWeight = keyof typeof TYPOGRAPHY.fontWeight;
export type TypographyColor = keyof typeof TYPOGRAPHY.textColor;

// Helper function to get spacing class
export function getSpacingClass(type: 'padding' | 'margin' | 'gap' | 'space', size: SpacingSize): string {
  return SPACING_CLASSES[type][size] as string;
}

// Helper function to get component spacing
export function getComponentSpacing(component: ComponentSpacing): string | Record<string, string> {
  return COMPONENT_SPACING[component];
}

// Helper function to get responsive spacing
export function getResponsiveSpacing(type: 'padding' | 'margin' | 'gap', size: 'mobile' | 'tablet' | 'desktop'): string {
  return RESPONSIVE_SPACING[type][size];
}

// Typography Helper Functions
export function getTypographyClass(type: 'heading' | 'body' | 'interactive' | 'special', variant: string): string {
  return TYPOGRAPHY_COMPONENTS[type][variant as keyof typeof TYPOGRAPHY_COMPONENTS[typeof type]];
}

export function getHeadingClass(level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'): string {
  return TYPOGRAPHY_COMPONENTS.heading[level];
}

export function getBodyTextClass(size: 'large' | 'base' | 'small' | 'caption'): string {
  return TYPOGRAPHY_COMPONENTS.body[size];
}

export function getInteractiveTextClass(type: 'button' | 'link' | 'label' | 'badge'): string {
  return TYPOGRAPHY_COMPONENTS.interactive[type];
}

export function getSpecialTextClass(type: 'hero' | 'subtitle' | 'description' | 'muted' | 'accent'): string {
  return TYPOGRAPHY_COMPONENTS.special[type];
}
