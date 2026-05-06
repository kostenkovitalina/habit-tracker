import { type FC } from 'react'

import { IconAuthBackgroundShape, IconAuthLines } from '@/app/shared/assets/icons/common'
import { FlickeringGridComponent } from '@/app/shared/components/flickering-grid'
import { WrapperComponent } from '@/app/shared/components/wrapper'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/pkg/theme/ui/card'
import { Separator } from '@/pkg/theme/ui/separator'

import { SignInFormComponent, SignUpFormComponent, SocialFormComponent } from './elements'

// interface
interface IProps {
  variant: 'sign-in' | 'sign-up'
}

// component
const SignComponent: FC<Readonly<IProps>> = (props) => {
  const { variant } = props

  // render
  return (
    <WrapperComponent type='main' className='flex min-h-screen items-center justify-center'>
      <div className='pointer-events-none absolute'>
        <IconAuthBackgroundShape width={770} height={770} className='max-h-screen max-w-screen' />
      </div>

      <Card className='relative w-full max-w-md overflow-hidden border-none pt-12 shadow-lg'>
        <div className='to-primary/10 pointer-events-none absolute top-0 h-52 w-full rounded-t-xl bg-gradient-to-t from-transparent' />

        <IconAuthLines className='pointer-events-none absolute inset-x-0 top-0' />

        <Separator className='pointer-events-none absolute inset-x-0 top-0' />

        <CardHeader className='justify-center gap-6 text-center'>
          <span>Logo</span>

          <div>
            <CardTitle className='mb-1.5 text-2xl'>{variant === 'sign-in' ? 'Welcome Back' : 'Welcome'}</CardTitle>

            <CardDescription className='text-base'>
              {variant === 'sign-in' ? 'Please enter your details to sign in' : 'Please enter your details to sign up'}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <SocialFormComponent />

          <div className='mb-6 flex items-center gap-4'>
            <Separator className='flex-1' />

            <p>or</p>

            <Separator className='flex-1' />
          </div>

          {variant === 'sign-in' ? <SignInFormComponent /> : <SignUpFormComponent />}
        </CardContent>
      </Card>

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

export default SignComponent
