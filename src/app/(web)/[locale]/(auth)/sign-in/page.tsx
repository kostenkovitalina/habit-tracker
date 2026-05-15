import { type NextPage } from 'next'
import { SignComponent } from '../../../../modules/sign'

// metadata
export const metadata = {
  title: 'Sign In',
}

// interface
interface IProps {
  params: Promise<{ locale: string }>
}

// component
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {

  // render
  return <SignComponent variant='sign-in' />
}

export default Page