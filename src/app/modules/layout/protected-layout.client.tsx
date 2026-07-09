'use client'

import type { FC, ReactNode } from 'react'

import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { FooterComponent } from '@/app/widgets/footer'
import HeaderComponent from '@/app/widgets/header/header.component'
import { getQueryClient } from '@/pkg/rest-api'
import RestApiProvider from '@/pkg/rest-api/rest-api.provider'

interface IProps {
  children: ReactNode
  navData: Array<{ title: string; url: string; icon: string; mobileIcon: string }>
}

const ProtectedLayoutClient: FC<Readonly<IProps>> = (props) => {
  const { children, navData } = props

  const clientQuery = getQueryClient()

  return (
    <RestApiProvider>
      <HydrationBoundary state={dehydrate(clientQuery)}>
        <div className='grid h-dvh min-h-dvh w-full grid-cols-1 grid-rows-[auto_1fr_auto] bg-[#FDF6F0]'>
          <HeaderComponent data={navData} />
          {children}

          <FooterComponent />
        </div>
      </HydrationBoundary>
    </RestApiProvider>
  )
}

export default ProtectedLayoutClient
