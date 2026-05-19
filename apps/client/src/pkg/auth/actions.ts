'use server'

import { auth } from './auth'

export const signIn = async (email: string, password: string) => {
  return auth.api.signInEmail({ body: { email, password } })
}

export const signUp = async (name: string, email: string, password: string) => {
  return auth.api.signUpEmail({ body: { name, email, password } })
}
