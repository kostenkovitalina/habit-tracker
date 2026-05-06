import { type FC, type ReactNode } from 'react'

import { LayoutComponent } from '@/app/modules/layout'

// interface
interface IProps {
  children: ReactNode
}

// component
const PublicLayoutComponent: FC<Readonly<IProps>> = (props) => {
  const { children } = props

  // render
  return <LayoutComponent type='public'>{children}</LayoutComponent>
}

export default PublicLayoutComponent
