'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ComponentProps, type FC, type ReactNode } from 'react'

// interface
interface IProps extends ComponentProps<typeof NextThemesProvider> {
  children: ReactNode
}

// component
const ThemeProvider: FC<Readonly<IProps>> = (props) => {
  const { children, ...rest } = props

  // return
  return (
    <NextThemesProvider attribute='class' defaultTheme='system' disableTransitionOnChange {...rest}>
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider
