import { authServer } from '@/pkg/auth/server'
import { Link } from '@/pkg/locale'
import { Button } from '@/pkg/theme/ui/button'

//interface
interface IUserSession {
  user?: {
    name?: string
  }
}

//component
const MainComponent = async () => {

  const session = (await authServer.getSession()) as IUserSession | null
  const user = session?.user

  //render
  return (
    <>
      <div className='flex flex-1 flex-col items-center justify-center p-4'>
        <div className='flex items-center justify-center gap-4'>
          <Button asChild size='lg'>
            <Link href='/sign-in'>{'Sign In'}</Link>
          </Button>

          <Button asChild size='lg' variant='outline'>
            <Link href='/sign-up'>{'Sign up'}</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default MainComponent