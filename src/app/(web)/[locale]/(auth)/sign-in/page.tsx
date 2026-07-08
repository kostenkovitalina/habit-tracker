import { SignComponent } from '../../../../modules/sign'

// metadata
export const metadata = {
  title: 'Sign In',
}

// component
const Page = async () => {
  // render
  return <SignComponent variant='sign-in' />
}

export default Page
