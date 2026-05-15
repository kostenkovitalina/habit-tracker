import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { type FC, type ReactNode } from 'react'

import { EAssetImage } from '@/app/shared/interfaces'
import { envClient } from '@/config/env'
import { fontPrimary, fontSecondary } from '@/config/fonts'
import { routing } from '@/pkg/locale'
import { RestApiProvider } from '@/pkg/rest-api'
import { ThemeProvider } from '@/pkg/theme'
import { Toaster } from '@/pkg/theme/ui/sonner'

import '@/config/styles/global.css'

// interface
interface IProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

// static params
export const generateStaticParams = async () => {
  return routing.locales.map((locale) => ({ locale }))
}

// metadata
export const generateMetadata = async (): Promise<Metadata> => {
  const favicon = EAssetImage.FAVICON
  const title = 'Website'
  const description = 'Website'
  const ogImage = EAssetImage.OG_IMAGE

  return {
    metadataBase: new URL(envClient.NEXT_PUBLIC_CLIENT_WEB_URL),
    icons: { icon: favicon },
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    applicationName: title,
    openGraph: {
      title: {
        default: title,
        template: `%s | ${title}`,
      },
      description: description,
      siteName: title,
      type: 'website',
      url: envClient.NEXT_PUBLIC_CLIENT_WEB_URL,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  }
}

// component
const LocaleLayout: FC<Readonly<IProps>> = async (props: IProps) => {
  const { children, params } = props

  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  // return
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontPrimary.className} ${fontSecondary.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <NextIntlClientProvider>
            <RestApiProvider>{children}</RestApiProvider>
          </NextIntlClientProvider>

          <Toaster position='top-center' duration={3000} />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default LocaleLayout
