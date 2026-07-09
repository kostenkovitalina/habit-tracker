'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { authClient } from '@/pkg/auth/client'
import { Button } from '@/pkg/theme/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/pkg/theme/ui/field'
import { Input } from '@/pkg/theme/ui/input'

const LoginFormComponent = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setLoading(true)
    setError(null)

    const { error } = await authClient.signIn.email({
      email: form.get('email') as string,
      password: form.get('password') as string,
    })

    if (error) {
      setError(error.message ?? 'Sign in failed')
      setLoading(false)
      return
    }

    router.push('/habits')
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input id='email' name='email' type='email' placeholder='m@example.com' required />
        </Field>

        <Field>
          <div className='flex items-center'>
            <FieldLabel htmlFor='password'>Password</FieldLabel>
            <a href='#' className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
              Forgot your password?
            </a>
          </div>
          <Input id='password' name='password' type='password' required />
        </Field>

        {error && <p className='text-destructive text-sm'>{error}</p>}

        <Field>
          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default LoginFormComponent
