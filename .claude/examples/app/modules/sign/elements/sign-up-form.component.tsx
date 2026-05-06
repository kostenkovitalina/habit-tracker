'use client'

import { type FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { authClient } from '@/pkg/auth/client'
import { Link, useRouter } from '@/pkg/locale'
import { toastService } from '@/pkg/theme/services/toast.service'
import { Button } from '@/pkg/theme/ui/button'
import { Input } from '@/pkg/theme/ui/input'
import { Spinner } from '@/pkg/theme/ui/spinner'

// interface
interface IProps {}

// component
const SignUpFormComponent: FC<Readonly<IProps>> = () => {
  const router = useRouter()

  const [isPending, setIsPending] = useState(false)

  const { control, handleSubmit, setError } = useForm({ defaultValues: { email: '', password: '', name: '' } })

  const onSubmit = handleSubmit(async (data) => {
    const { email, password, name } = data

    setIsPending(true)

    try {
      const { data: res, error } = await authClient.signUp.email({ email, password, name })

      if (res?.token) {
        router.push('/dashboard')

        toastService.success('Sign up successfully')
      } else {
        setIsPending(false)
        toastService.error(error?.message || 'Something went wrong')

        setError('email', { type: 'manual' })
        setError('name', { type: 'manual' })
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
        name='name'
        control={control}
        render={({ field, fieldState: { invalid, error } }) => (
          <Input
            {...field}
            label='Name*'
            invalid={invalid}
            message={error?.message}
            placeholder='Enter your email address'
          />
        )}
        rules={{ required: 'Name is required' }}
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
        rules={{
          required: 'Password is required',
          minLength: { value: 8, message: 'Password must be at least 8 characters' },
          maxLength: { value: 20, message: 'Password must be at most 20 characters' },
        }}
      />

      <Button className='w-full' type='submit' size='lg' disabled={isPending}>
        {isPending ? <Spinner /> : null}
        Sign up
      </Button>

      <p className='text-muted-foreground text-center'>
        Already have an account?{' '}
        <Button asChild variant='link' className='text-primary!'>
          <Link href='/sign-in'>Sign in</Link>
        </Button>
      </p>
    </form>
  )
}

export default SignUpFormComponent
