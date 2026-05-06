import { type NextPage } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { MainComponent } from '@/app/modules/main'

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
  return <MainComponent />
}

export default Page
