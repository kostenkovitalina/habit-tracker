import { ArrowRightIcon } from 'lucide-react'
import { type FC } from 'react'

import { AIToolComponent } from '@/app/shared/components/ai-tool'
import { FlickeringGridComponent } from '@/app/shared/components/flickering-grid'
import { WrapperComponent } from '@/app/shared/components/wrapper'
import { Link } from '@/pkg/locale'
import { Badge } from '@/pkg/theme/ui/badge'
import { Button } from '@/pkg/theme/ui/button'

// interface
interface IProps {}

// component
const MainComponent: FC<Readonly<IProps>> = () => {
  // render
  return (
    <WrapperComponent type='main' className='flex min-h-screen flex-col items-center gap-4 sm:items-start'>
      <section className='z-1 my-auto flex w-full flex-col items-center gap-4 text-center'>
        <div className='bg-muted flex items-center gap-1.5 rounded-full border p-1 md:gap-2.5 md:p-2'>
          <Badge>AI-Powered</Badge>

          <span className='text-muted-foreground mr-1 text-sm'>Solution for client-facing businesses</span>
        </div>

        <h1 className='text-3xl leading-[1.29167] font-bold text-balance sm:text-4xl lg:text-5xl'>
          Sizzling Summer Delights
          <br />
          <span className='relative'>
            Effortless
            <svg
              width='223'
              height='12'
              viewBox='0 0 223 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute inset-x-0 bottom-0 w-full translate-y-1/2 max-sm:hidden'
            >
              <path
                d='M1.11716 10.428C39.7835 4.97282 75.9074 2.70494 114.894 1.98894C143.706 1.45983 175.684 0.313587 204.212 3.31596C209.925 3.60546 215.144 4.59884 221.535 5.74551'
                stroke='url(#paint0_linear_10365_68643)'
                strokeWidth='2'
                strokeLinecap='round'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_10365_68643'
                  x1='18.8541'
                  y1='3.72033'
                  x2='42.6487'
                  y2='66.6308'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='var(--primary)' />
                  <stop offset='1' stopColor='var(--primary-foreground)' />
                </linearGradient>
              </defs>
            </svg>
          </span>{' '}
          Recipes for Parties!
        </h1>

        <p className='text-muted-foreground'>
          Dive into a world of flavor this summer with our collection of Sizzling Summer Delights!
          <br />
          From refreshing appetizers to delightful desserts
        </p>

        <div className='mt-3 flex flex-wrap items-center gap-4'>
          <Button asChild size='lg'>
            <Link href='/sign-in'>
              Get started <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
            </Link>
          </Button>

          <Button size='lg' variant='outline' asChild>
            <Link href='/book-demo'>Learn more</Link>
          </Button>
        </div>

        <section className='mt-10 w-full'>
          <AIToolComponent />
        </section>
      </section>

      <FlickeringGridComponent
        className='pointer-events-none fixed inset-0 -z-1'
        squareSize={4}
        gridGap={6}
        color='#53565a'
        maxOpacity={0.4}
        flickerChance={0.1}
      />
    </WrapperComponent>
  )
}

export default MainComponent
