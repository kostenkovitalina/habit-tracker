import { FC } from "react"
import { Link } from "../../../pkg/locale"
import { LoginFormComponent, RegisterFormComponent } from "./elements"

//interface
interface IProps {
  variant: 'sign-in' | 'sign-up'
}

//component
const SignComponent: FC<Readonly<IProps>> = async (props) => {
  const { variant } = props

  //render
  return (
    <div className='flex min-h-dvh items-center justify-center px-4'>
      <div className='bg-card w-full max-w-md space-y-6 rounded-xl border p-8 shadow-sm'>
        <div className='space-y-1 text-center'>
          <h1 className='text-2xl font-bold'>{variant === 'sign-in' ? 'Login' : 'Create account'}</h1>

          <p className='text-muted-foreground text-sm'>
            {variant === 'sign-in' ? 'Create a new account to get started' : 'Enter your credentials to access your account'}
          </p>
        </div>

        {variant === 'sign-in' ? <LoginFormComponent /> : <RegisterFormComponent />}

        <p className='text-muted-foreground text-center text-sm'>
          {variant === 'sign-in' ? (
            <>
              {'Do not have an account?'}{' '}
              <Link href='/sign-up' className='text-primary underline-offset-4 hover:underline'>
                {'Register'}
              </Link>
            </>
          ) : (
            <>
              {'Already have an account?'}{' '}
              <Link href='/sign-in' className='text-primary underline-offset-4 hover:underline'>
                {'Login'}
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}

export default SignComponent