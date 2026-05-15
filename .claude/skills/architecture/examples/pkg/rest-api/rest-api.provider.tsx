'use client'

import type { FC, ReactNode } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { getQueryClient } from './service'

// interface
interface IProps {
  children: ReactNode
}

// component
const RestApiProvider: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  const queryClient = getQueryClient()

  // return
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default RestApiProvider
