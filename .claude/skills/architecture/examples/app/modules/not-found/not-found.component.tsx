import { type FC } from 'react'

import { IconNotFound } from '@/app/shared/assets/icons/common'
import { WrapperComponent } from '@/app/shared/components/wrapper'
import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

// interface
interface IProps {}

// component
const NotFound: FC<Readonly<IProps>> = () => {
  // render
  return (
    <WrapperComponent
      type='main'
      className='flex min-h-screen flex-col items-center justify-center gap-6 px-8 py-8 sm:py-16 lg:py-24 [&_svg]:h-[clamp(200px,50vh,350px)]'
    >
      <IconNotFound />

      <div className='grid items-center justify-items-center gap-6 text-center'>
        <div className='grid gap-2'>
          <h4 className='text-2xl font-semibold'>Page Not Found</h4>

          <p className='text-muted-foreground'>We couldn&apos;t find the page you are looking for </p>
        </div>

        <Button asChild variant='outline' className='w-fit'>
          <Link href='/'>Back to home page</Link>
        </Button>
      </div>
    </WrapperComponent>
  )
}

export default NotFound
