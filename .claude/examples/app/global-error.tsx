'use client'

import { type NextPage } from 'next'
import Error from 'next/error'
import { useEffect } from 'react'

// interface
interface IProps {
  error: Error & { digest?: string }
  reset: () => void
}

// component
const Page: NextPage<Readonly<IProps>> = (props) => {
  const { error } = props

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error)
  }, [error])

  // return
  return (
    <html>
      <body className='flex h-screen w-screen flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold'>Something went wrong!</h1>

        <button
          className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-white'
          onClick={() => (window.location.href = '/')}
        >
          Go to Home
        </button>
      </body>
    </html>
  )
}

export default Page
