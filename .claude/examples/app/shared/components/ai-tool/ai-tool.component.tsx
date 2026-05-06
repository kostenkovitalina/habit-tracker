'use client'

import {
  BotMessageSquareIcon,
  CodeXmlIcon,
  DatabaseIcon,
  FigmaIcon,
  LayoutDashboardIcon,
  PaletteIcon,
} from 'lucide-react'
import { type FC, useRef } from 'react'

import { AnimatedBeam } from '@/pkg/theme/ui/animated-beam'

// interface
interface IProps {}

// component
const AIToolComponent: FC<Readonly<IProps>> = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const iconRef1 = useRef<HTMLDivElement>(null)
  const iconRef2 = useRef<HTMLDivElement>(null)
  const iconRef3 = useRef<HTMLDivElement>(null)
  const iconRef4 = useRef<HTMLDivElement>(null)
  const iconRef5 = useRef<HTMLDivElement>(null)
  const iconRef6 = useRef<HTMLDivElement>(null)
  const iconRef7 = useRef<HTMLDivElement>(null)
  const spanRef1 = useRef<HTMLSpanElement>(null)
  const spanRef2 = useRef<HTMLSpanElement>(null)
  const spanRef3 = useRef<HTMLSpanElement>(null)
  const spanRef4 = useRef<HTMLSpanElement>(null)
  const spanRef5 = useRef<HTMLSpanElement>(null)
  const spanRef6 = useRef<HTMLSpanElement>(null)
  const spanRef7 = useRef<HTMLSpanElement>(null)
  const spanRef8 = useRef<HTMLSpanElement>(null)

  // render
  return (
    <div ref={containerRef} className='relative flex w-full flex-col items-center'>
      <div className='flex w-full max-w-4xl items-center justify-between max-md:hidden'>
        <div className='flex items-center gap-30'>
          <div
            ref={iconRef1}
            className='bg-background flex size-12 items-center justify-center rounded-xl border-[1.5px] shadow-md lg:size-15'
          >
            <BotMessageSquareIcon className='size-7 stroke-1 lg:size-10' />
          </div>

          <span ref={spanRef1} className='size-0.5 max-md:hidden'></span>
        </div>

        <div className='flex items-center gap-30'>
          <span ref={spanRef2} className='size-0.5 max-md:hidden' />

          <div
            ref={iconRef2}
            className='bg-background flex size-12 items-center justify-center rounded-xl border-[1.5px] shadow-md lg:size-15'
          >
            <CodeXmlIcon className='size-7 stroke-1 lg:size-8' />
          </div>
        </div>
      </div>

      <div className='flex w-full items-center justify-between py-2.5'>
        <div
          ref={iconRef3}
          className='bg-background flex size-15 shrink-0 items-center justify-center rounded-xl border-[1.5px] shadow-xl md:size-18 lg:size-23'
        >
          <FigmaIcon className='size-8 stroke-1 md:size-10 lg:size-13' />
        </div>

        <div className='flex items-center justify-between md:w-full md:max-w-70 lg:max-w-100'>
          <div className='flex w-full max-w-20 justify-between max-md:hidden'>
            <span ref={spanRef3} className='size-0.5' />
            <span ref={spanRef4} className='size-0.5' />
          </div>

          <div ref={iconRef4} className='bg-background flex items-center justify-center rounded-xl border p-2'>
            <div className='bg-secondary flex size-16 items-center justify-center rounded-xl border-[1.5px] shadow-xl md:size-23'>
              <div className='flex size-10 items-center justify-center rounded-xl bg-black md:size-16'>Logo</div>
            </div>
          </div>

          <div className='flex w-full max-w-20 justify-between max-md:hidden'>
            <span ref={spanRef5} className='size-0.5' />
            <span ref={spanRef6} className='size-0.5' />
          </div>
        </div>

        <div
          ref={iconRef5}
          className='bg-background flex size-15 shrink-0 items-center justify-center rounded-xl border-[1.5px] shadow-xl md:size-18 lg:size-23'
        >
          <LayoutDashboardIcon className='size-8 stroke-1 md:size-10 lg:size-13' />
        </div>
      </div>

      <div className='flex w-full max-w-4xl items-center justify-between max-md:hidden'>
        <div className='flex items-center gap-30'>
          <div
            ref={iconRef6}
            className='bg-background flex size-12 items-center justify-center rounded-xl border-[1.5px] shadow-md lg:size-15'
          >
            <PaletteIcon className='size-6 stroke-1 lg:size-8' />
          </div>

          <span ref={spanRef7} className='size-0.5 max-md:hidden' />
        </div>

        <div className='flex items-center gap-30'>
          <span ref={spanRef8} className='size-0.5 max-md:hidden' />

          <div
            ref={iconRef7}
            className='bg-background flex size-12 items-center justify-center rounded-xl border-[1.5px] shadow-md lg:size-15'
          >
            <DatabaseIcon className='size-7 stroke-1 lg:size-11' />
          </div>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={iconRef1}
        toRef={spanRef1}
        gradientStartColor='var(--primary)'
        duration={4.5}
        className='-z-1 max-md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={spanRef1}
        toRef={spanRef3}
        gradientStartColor='var(--primary)'
        duration={4.5}
        curvature={-45}
        className='-z-1 max-md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={iconRef2}
        toRef={spanRef2}
        gradientStartColor='var(--primary)'
        duration={4.5}
        className='-z-1 max-md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={spanRef2}
        toRef={spanRef6}
        gradientStartColor='var(--primary)'
        duration={4.5}
        curvature={-45}
        className='-z-1 max-md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={iconRef6}
        toRef={spanRef7}
        gradientStartColor='var(--primary)'
        duration={4.5}
        className='-z-1 max-md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={spanRef7}
        toRef={spanRef4}
        gradientStartColor='var(--primary)'
        duration={4.5}
        curvature={40}
        className='-z-1 max-md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={iconRef7}
        toRef={spanRef8}
        gradientStartColor='var(--primary)'
        duration={4.5}
        className='-z-1 max-md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={spanRef8}
        toRef={spanRef5}
        gradientStartColor='var(--primary)'
        duration={4.5}
        curvature={40}
        className='-z-1 max-md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={iconRef3}
        toRef={spanRef3}
        gradientStartColor='var(--primary)'
        duration={4.5}
        className='-z-1 max-md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={spanRef3}
        toRef={spanRef4}
        gradientStartColor='var(--primary)'
        duration={4.5}
        className='-z-1 max-md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={spanRef4}
        toRef={iconRef4}
        gradientStartColor='var(--primary)'
        duration={4.5}
        className='-z-1 max-md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={iconRef4}
        toRef={spanRef5}
        gradientStartColor='var(--primary)'
        duration={4.5}
        className='-z-1 max-md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={spanRef5}
        toRef={spanRef6}
        gradientStartColor='var(--primary)'
        duration={4.5}
        className='-z-1 max-md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={spanRef6}
        toRef={iconRef5}
        gradientStartColor='var(--primary)'
        duration={4.5}
        className='-z-1 max-md:hidden'
      />

      {/* Smaller screen */}

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={iconRef3}
        toRef={iconRef4}
        gradientStartColor='var(--primary)'
        duration={4.5}
        className='-z-1 md:hidden'
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={iconRef4}
        toRef={iconRef5}
        gradientStartColor='var(--primary)'
        duration={4.5}
        className='-z-1 md:hidden'
      />
    </div>
  )
}

export default AIToolComponent
