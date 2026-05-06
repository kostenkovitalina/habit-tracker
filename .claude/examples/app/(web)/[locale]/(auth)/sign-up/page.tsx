import { type NextPage } from 'next'
import { setRequestLocale } from 'next-intl/server'

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
  const { params } = props

  const { locale } = await params
  setRequestLocale(locale)

  // render
  return <SignComponent variant='sign-up' />
}

export default Page
