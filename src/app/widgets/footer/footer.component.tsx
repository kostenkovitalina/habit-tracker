'use client'
import { Heart } from 'lucide-react'

const FooterComponent = () => {
  return (
    <footer
      className='flex w-full justify-center'
      style={{
        background: 'linear-gradient(135deg, rgb(232, 213, 240) 0%, rgb(213, 232, 240) 50%, rgb(249, 213, 229) 100%)',
        borderTop: '1.5px solid rgba(192, 132, 160, 0.22)',
      }}
    >
      <div className='flex w-full max-w-[1280px] items-center justify-between px-5 py-4'>
        <div className='flex items-center gap-2'>
          <span>🌸</span>
          
          <span
            className='text-sm font-semibold'
            style={{ fontFamily: '"Playfair Display", serif', color: 'rgb(61, 44, 44)' }}
          >
            Мої звички
          </span>
        </div>

        <p className='hidden text-xs sm:block' style={{ color: 'rgb(154, 126, 126)' }}>
          Кожен день — новий шанс
        </p>

        <div className='flex items-center gap-1 text-xs' style={{ color: 'rgb(154, 126, 126)' }}>
          <span>Зроблено з</span>

          <Heart size={11} className='mx-1 fill-current' style={{ color: 'rgb(224, 112, 112)' }} />

          <span>для вас</span>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
