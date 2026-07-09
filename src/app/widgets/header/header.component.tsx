'use client'
import { Award, BarChart3, Bell, Bot, Home, Palette, Target } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React from 'react'

const iconMap: Record<string, React.ComponentType<any>> = {
  Home,
  BarChart3,
  Target,
  Award,
  Bell,
  Bot,
}

interface NavItem {
  title: string
  url?: string
  icon?: string | React.ComponentType<any>
  mobileIcon?: string
}

interface HeaderProps {
  data: NavItem[]
  className?: string
  children?: React.ReactNode
}

const HeaderComponent = ({ data, children, className }: HeaderProps) => {
  const params = useParams()
  const router = useRouter()
  const pathname = usePathname()

  return (
    <header
      className={`sticky top-0 z-30 w-full ${className || ''}`}
      style={{
        background: 'linear-gradient(135deg, rgb(249, 213, 229) 0%, rgb(232, 213, 240) 50%, rgb(213, 232, 240) 100%)',
        boxShadow: 'rgba(192, 132, 160, 0.133) 0px 2px 20px',
      }}
    >
      <div className='mx-auto flex max-w-2xl items-center justify-between px-5 py-4'>
        <div className='flex items-center gap-3'>
          <div
            className='flex h-10 w-10 items-center justify-center rounded-2xl text-xl'
            style={{ background: 'rgba(255, 255, 255, 0.35)' }}
          >
            🌸
          </div>
          <div>
            <h1
              className='text-lg leading-tight font-bold'
              style={{ fontFamily: '"Playfair Display", serif', color: 'rgb(61, 44, 44)' }}
            >
              Мої звички
            </h1>
            <p className='text-xs' style={{ color: 'rgb(154, 126, 126)' }}>
              Маленькі кроки до великих змін
            </p>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <button
            className='flex h-10 w-10 items-center justify-center rounded-2xl transition-all hover:scale-110'
            title='Змінити палітру'
            style={{ background: 'rgba(255, 255, 255, 0.35)' }}
          >
            <Palette size={18} style={{ color: 'rgb(61, 44, 44)' }} />
          </button>
          <div
            className='flex h-10 w-10 items-center justify-center rounded-2xl text-xl'
            style={{ background: 'rgba(255, 255, 255, 0.35)' }}
          >
            👩
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-2xl px-4 pb-3'>
        <div
          className='no-scrollbar flex gap-1 overflow-x-auto rounded-2xl p-1'
          style={{ background: 'rgba(255, 255, 255, 0.35)' }}
        >
          {data?.map((item) => {
            const isActive = item.url ? pathname.startsWith(item.url) : false

            let IconComponent = item.icon
            if (typeof item.icon === 'string' && iconMap[item.icon]) {
              IconComponent = iconMap[item.icon]
            }

            return (
              <button
                key={item.title}
                onClick={() => item.url && router.push(item.url)}
                className='flex min-w-[70px] flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-bold transition-all sm:min-w-0'
                style={
                  isActive
                    ? {
                        background: 'white',
                        color: 'rgb(192, 132, 160)',
                        boxShadow: 'rgba(192, 132, 160, 0.133) 0px 2px 8px',
                      }
                    : {
                        background: 'transparent',
                        color: 'rgb(154, 126, 126)',
                        boxShadow: 'none',
                      }
                }
              >
                {IconComponent && (
                  <span className='hidden sm:inline'>
                    {React.createElement(IconComponent as React.ComponentType<any>, { width: 17, height: 17 })}
                  </span>
                )}

                {item.mobileIcon && <span className='sm:hidden'>{item.mobileIcon}</span>}

                <span className='hidden sm:inline'>{item.title}</span>
              </button>
            )
          })}
        </div>
      </div>
      {children}
    </header>
  )
}

export default HeaderComponent
