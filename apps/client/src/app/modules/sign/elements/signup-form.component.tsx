'use client'
import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { authClient } from '@/pkg/auth/client'
import { Button } from '@/pkg/theme/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/pkg/theme/ui/field'
import { Input } from '@/pkg/theme/ui/input'

const RegisterFormComponent = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const password = form.get('password') as string
    const confirm = form.get('confirm-password') as string

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await authClient.signUp.email({
      name: form.get('name') as string,
      email: form.get('email') as string,
      password,
    })

    if (error) {
      setError(error.message ?? 'Sign up failed')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='name'>Full Name</FieldLabel>
          <Input id='name' name='name' type='text' placeholder='John Doe' required />
        </Field>

        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input id='email' name='email' type='email' placeholder='m@example.com' required />
        </Field>

        <Field>
          <FieldLabel htmlFor='password'>Password</FieldLabel>
          <Input id='password' name='password' type='password' required />
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor='confirm-password'>Confirm Password</FieldLabel>
          <Input id='confirm-password' name='confirm-password' type='password' required />
        </Field>

        {error && <p className='text-destructive text-sm'>{error}</p>}

        <Field>
          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default RegisterFormComponent
