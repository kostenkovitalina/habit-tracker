'use client'

import { MenuIcon } from 'lucide-react'
import { type FC, useEffect, useState } from 'react'

import { LogoComponent } from '@/app/shared/components/logo'
import { WrapperComponent } from '@/app/shared/components/wrapper'
import { Link } from '@/pkg/locale'
import { cn } from '@/pkg/theme/lib/utils'
import { Button } from '@/pkg/theme/ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/pkg/theme/ui/drawer'

// interface
interface IProps {}

// component
const HeaderComponent: FC<Readonly<IProps>> = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // render
  return (
    <header className={cn('transition-bg fixed z-50 grid h-[88px] w-full items-center px-4')}>
      <WrapperComponent
        type='section'
        className={cn(
          'flex h-fit w-full items-center justify-between gap-8 rounded-xl border border-transparent p-0 transition-all',
          {
            'bg-background/90 border-border/50 p-2 shadow-xs md:p-4': isScrolled,
          },
        )}
      >
        <LogoComponent />

        <div className='flex items-center gap-2'>
          <Button asChild variant='outline' className='max-md:hidden'>
            <Link href='/book-demo'>Book a demo</Link>
          </Button>

          <Button asChild className='max-md:hidden'>
            <Link href='/sign-in'>Sign in</Link>
          </Button>

          <Drawer>
            <DrawerTrigger className='md:hidden' asChild>
              <Button variant='outline' size='icon'>
                <MenuIcon />

                <span className='sr-only'>Menu</span>
              </Button>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerHeader className='px-6'>
                <DrawerTitle>
                  <Button asChild variant='outline' className='w-full'>
                    <Link href='/book-demo'>Book a demo</Link>
                  </Button>
                </DrawerTitle>
              </DrawerHeader>

              <div className='grid gap-4 px-6 pb-[80vh]'>
                <Button asChild className='w-full'>
                  <Link href='/sign-in'>Sign in</Link>
                </Button>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </WrapperComponent>
    </header>
  )
}

export default HeaderComponent
