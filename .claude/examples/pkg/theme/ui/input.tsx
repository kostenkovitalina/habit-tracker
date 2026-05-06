import { EyeIcon, EyeOffIcon } from 'lucide-react'
import * as React from 'react'
import { useState } from 'react'

import { cn } from '@/pkg/theme/lib/utils'

import { Button } from './button'
import { Label } from './label'

function Input({
  className,
  type,
  size = 'lg',
  invalid,
  message,
  ...props
}: Omit<React.ComponentProps<'input'>, 'size'> & {
  size?: 'lg' | 'md'
  label?: string
  invalid?: boolean
  message?: string
}) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className='space-y-0'>
      {props.label && (
        <Label className={cn('mb-1 leading-5', { 'text-destructive': invalid })} htmlFor={props.name}>
          {props.label}
        </Label>
      )}

      <div className='relative'>
        <input
          type={type === 'password' ? (isVisible ? 'text' : 'password') : type}
          data-slot='input'
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent',
            'px-3 pt-0.5 pb-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            size === 'lg' ? 'h-12 rounded-lg' : 'h-10 rounded-md',
            className,
            {
              'border-destructive': invalid,
              'pr-12': type === 'password' && size === 'lg',
              'pr-10': type === 'password' && size === 'md',
            },
          )}
          {...props}
        />

        {type === 'password' && (
          <Button
            type='button'
            variant='ghost'
            size={size === 'lg' ? 'icon-lg' : 'icon-sm'}
            className='absolute top-1/2 right-1 -translate-y-1/2'
            onClick={() => setIsVisible((prevState) => !prevState)}
          >
            {isVisible ? (
              <EyeOffIcon className={cn('text-muted-foreground', { 'size-5': size === 'lg' })} />
            ) : (
              <EyeIcon className={cn('text-muted-foreground', { 'size-5': size === 'lg' })} />
            )}

            <span className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
          </Button>
        )}
      </div>

      {message && <span className={cn('pl-2 text-[12px]', { 'text-destructive': invalid })}>{message}</span>}
    </div>
  )
}

export { Input }
