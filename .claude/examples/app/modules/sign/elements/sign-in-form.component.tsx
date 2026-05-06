'use client'

import { type FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { authClient } from '@/pkg/auth/client'
import { Link, useRouter } from '@/pkg/locale'
import { toastService } from '@/pkg/theme/services/toast.service'
import { Button } from '@/pkg/theme/ui/button'
import { Checkbox } from '@/pkg/theme/ui/checkbox'
import { Input } from '@/pkg/theme/ui/input'
import { Label } from '@/pkg/theme/ui/label'
import { Spinner } from '@/pkg/theme/ui/spinner'

// interface
interface IProps {}

// component
const SignInFormComponent: FC<Readonly<IProps>> = () => {
  const router = useRouter()

  const [isPending, setIsPending] = useState(false)

  const { control, handleSubmit, setError } = useForm({ defaultValues: { email: '', password: '' } })

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data

    setIsPending(true)

    try {
      const { data: res, error } = await authClient.signIn.email({ email, password })

      if (res?.token) {
        router.push('/dashboard')

        toastService.success('Sign in successfully')
      } else {
        setIsPending(false)
        toastService.error(error?.message || 'Something went wrong')

        setError('email', { type: 'manual' })
        setError('password', { type: 'manual' })
      }
    } catch (error: any) {
      setIsPending(false)
      toastService.error(error?.message || 'Something went wrong')
    }
  })

  // render
  return (
    <form className='space-y-3' onSubmit={onSubmit}>
      <Controller
        name='email'
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            {...field}
            label='Email address*'
            invalid={invalid}
            message={error?.message}
            type='email'
            placeholder='Enter your email address'
          />
        )}
        rules={{ required: 'Email is required' }}
      />

      <Controller
        name='password'
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            {...field}
            label='Password*'
            invalid={invalid}
            message={error?.message}
            type={'password'}
            placeholder='••••••••••••••••'
          />
        )}
        rules={{ required: 'Password is required' }}
      />

      <div className='flex items-center justify-between gap-y-2'>
        <div className='flex items-center gap-3'>
          <Checkbox />

          <Label className='text-muted-foreground'>Remember Me</Label>
        </div>

        <Button asChild variant='link' size='sm'>
          <Link href='/forgot-password'>Forgot Password?</Link>
        </Button>
      </div>

      <Button className='w-full' type='submit' size='lg' disabled={isPending}>
        {isPending ? <Spinner /> : null}
        Sign in
      </Button>

      <p className='text-muted-foreground text-center'>
        New on our platform?{' '}
        <Button asChild variant='link' className='text-primary!'>
          <Link href='/sign-up'>Create an account</Link>
        </Button>
      </p>
    </form>
  )
}

export default SignInFormComponent
