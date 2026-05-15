import { type NextPage } from 'next'

import { SignComponent } from '@/app/modules/sign'

// metadata
export const metadata = {
  title: 'Sign Up',
}

// interface
interface IProps {
  params: Promise<{ locale: string }>
}

// component
const Page: NextPage<Readonly<IProps>> = async (props: IProps) => {

  // render
  return <SignComponent variant='sign-up' />
}

export default Page