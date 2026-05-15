import { type FC } from 'react'

import { Link } from '@/pkg/locale'

// interface
interface IProps {}

// component
const LogoComponent: FC<Readonly<IProps>> = () => {
  // render
  return <Link href='/'>Logo</Link>
}

export default LogoComponent
