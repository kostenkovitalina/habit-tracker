import { Inter as FontPrimary, Montserrat as FontSecondary } from 'next/font/google'

// font primary
export const fontPrimary = FontPrimary({
  subsets: ['latin'],
  preload: true,
  variable: '--font-primary',
  display: 'swap',
  adjustFontFallback: false,
})

// font secondary
export const fontSecondary = FontSecondary({
  subsets: ['latin'],
  preload: true,
  variable: '--font-secondary',
  display: 'swap',
  adjustFontFallback: false,
})
