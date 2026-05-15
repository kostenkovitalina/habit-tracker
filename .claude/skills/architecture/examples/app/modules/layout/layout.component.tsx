import dynamic from 'next/dynamic'
import { type FC, type ReactNode } from 'react'

import { HeaderComponent } from '@/app/widgets/header'

const FooterComponent = dynamic(() => import('@/app/widgets/footer').then((mod) => mod.FooterComponent))

// interface
interface IProps {
  children: ReactNode
  type: 'public' | 'protected'
}

// component
const LayoutComponent: FC<Readonly<IProps>> = (props) => {
  const { children, type } = props

  // render
  return (
    <div className='relative z-0'>
      {type === 'public' && <HeaderComponent />}

      {children}

      {type === 'public' && <FooterComponent />}
    </div>
  )
}

export default LayoutComponent
