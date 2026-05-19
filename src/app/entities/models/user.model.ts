import { useTranslations } from 'next-intl'
import { z } from 'zod'

//interface
interface IAuthFormTranslate {
  t: ReturnType<typeof useTranslations<'auth_schema'>>
}

//login schema
export const loginSchema = (props: IAuthFormTranslate) => {
  const { t } = props

  //render
  return z.object({
    email: z.email({ message: t('invalidEmail') }),
    password: z.string().min(10, { message: t('passwordMustBeAtLeast10CharactersLong') }),
  })
}

//register schema
export const registerSchema = (props: IAuthFormTranslate) => {
  const { t } = props

  //render
  return z
    .object({
      name: z.string().min(1, { message: t('nameIsRequired') }),
      email: z.email({ message: t('invalidEmail') }),
      password: z.string().min(10, { message: t('passwordMustBeAtLeast10CharactersLong') }),
      confirmPassword: z.string().min(1, { message: t('passwordConfirmationIsRequired') }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordsDoNotMatch'),
      path: ['confirmPassword'],
    })
}

//type
export type TRegisterFormValues = z.infer<ReturnType<typeof registerSchema>>
export type TLoginFormValues = z.infer<ReturnType<typeof loginSchema>>