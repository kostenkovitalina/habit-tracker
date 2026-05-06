import { Github, Instagram, Twitter, Youtube } from 'lucide-react'
import { type FC } from 'react'

import { LogoComponent } from '@/app/shared/components/logo'
import { WrapperComponent } from '@/app/shared/components/wrapper'
import { Separator } from '@/pkg/theme/ui/separator'

// interface
interface IProps {}

// component
const FooterComponent: FC<Readonly<IProps>> = () => {
  // render
  return (
    <footer className='bg-background'>
      <WrapperComponent
        type='section'
        className='mx-auto grid gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-16 md:grid-cols-2 md:py-24 lg:grid-cols-5'
      >
        <div className='col-span-2 flex flex-col items-start gap-4 lg:col-span-3'>
          <LogoComponent />

          <p className='text-muted-foreground max-w-[600px] text-balance'>
            An open-source collection of copy-and-paste shadcn/ui components, blocks, and templates - paired with a
            powerful Shadcn theme generator to craft, customize, and ship faster.
          </p>

          <Separator className='max-w-35' />

          <div className='flex items-center gap-4'>
            <a href='#' target='#'>
              <Github className='size-5' />
            </a>
            <a href='#' target='#'>
              <Instagram className='size-5 text-sky-600 dark:text-sky-400' />
            </a>
            <a href='#' target='#'>
              <Twitter className='size-5 text-amber-600 dark:text-amber-400' />
            </a>
            <a href='#' target='#'>
              <Youtube className='text-destructive size-5' />
            </a>
          </div>
        </div>

        <div className='flex flex-col gap-5'>
          <div className='text-lg font-medium'>Help and Support</div>
          <ul className='text-muted-foreground space-y-3'>
            <li>
              <a href='#'>Support</a>
            </li>
            <li>
              <a href='#'>Affiliation Program</a>
            </li>
            <li>
              <a href='#'>FAQs</a>
            </li>
            <li>
              <a href='#'>Discord Community</a>
            </li>
            <li>
              <a href='#'>Blog</a>
            </li>
            <li>
              <a href='#'>About Us</a>
            </li>
            <li>
              <a href='#'>Contact Us</a>
            </li>
            <li>
              <a href='#'>Hire Us</a>
            </li>
          </ul>
        </div>

        <div className='flex flex-col gap-5'>
          <div className='text-lg font-medium'>Legal</div>
          <ul className='text-muted-foreground space-y-3'>
            <li>
              <a href='#'>License</a>
            </li>
            <li>
              <a href='#'>Privacy policy</a>
            </li>
            <li>
              <a href='#'>Terms & Condition</a>
            </li>
            <li>
              <a href='#'>Brand Guideline</a>
            </li>
          </ul>
        </div>
      </WrapperComponent>

      <Separator />

      <WrapperComponent className='mx-auto flex items-center justify-center gap-3 px-4 py-6 sm:px-6'>
        <p className='text-center font-medium'>
          {`©${new Date().getFullYear()}`} <a href='#'>Shadcn/studio</a>, Made with ❤️ for better web.
        </p>
      </WrapperComponent>
    </footer>
  )
}

export default FooterComponent
