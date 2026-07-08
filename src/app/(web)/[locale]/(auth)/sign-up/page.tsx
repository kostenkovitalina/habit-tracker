import { SignComponent } from '@/app/modules/sign'

// metadata
export const metadata = {
  title: 'Sign Up',
}

// component
const Page = async () => {
  // render
  return <SignComponent variant='sign-up' />
}

export default Page
