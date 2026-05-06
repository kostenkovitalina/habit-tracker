import { type FC, type ReactNode } from 'react'

import { cn } from '@/pkg/theme/lib/utils'

// interface
interface IProps {
  children: ReactNode
  type?: 'main' | 'section'
  className?: string
}

// component
const WrapperComponent: FC<Readonly<IProps>> = (props) => {
  const { children, type = 'main', className } = props

  // render
  return (
    <>
      {type === 'main' ? (
        <main className={cn('mx-auto w-full max-w-[1500px] px-4 pt-[88px] pb-20', className)}>{children}</main>
      ) : (
        <section className={cn('mx-auto w-full max-w-[1500px] px-4', className)}>{children}</section>
      )}
    </>
  )
}

export default WrapperComponent
