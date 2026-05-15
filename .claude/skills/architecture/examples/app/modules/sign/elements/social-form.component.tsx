'use client'

import Image from 'next/image'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/pkg/theme/ui/button'

// interface
interface IProps {}

// component
const SocialFormComponent: FC<Readonly<IProps>> = () => {
  const { handleSubmit } = useForm()

  const onSubmit = handleSubmit((_data) => {
    console.log(_data)
  })

  // render
  return (
    <form className='mb-6 flex items-center gap-2.5' onSubmit={onSubmit}>
      <Button type='submit' variant='outline' size='lg' className='grow'>
        <Image
          src='https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png'
          alt='google icon'
          width={20}
          height={20}
        />
      </Button>
    </form>
  )
}

export default SocialFormComponent
