import { toast } from 'sonner'

// toast service
export const toastService = {
  success: (message: string) => {
    toast.success(message, {
      style: {
        '--normal-bg': 'var(--primary)',
        '--normal-text': 'var(--color-white)',
        '--normal-border': 'transparent',
      } as React.CSSProperties,
    })
  },
  info: (message: string) => {
    toast.info(message, {
      style: {
        '--normal-bg': 'var(--color-sky-400)',
        '--normal-text': 'var(--color-white)',
        '--normal-border': 'transparent',
      } as React.CSSProperties,
    })
  },
  warning: (message: string) => {
    toast.warning(message, {
      style: {
        '--normal-bg': 'var(--color-amber-400)',
        '--normal-text': 'var(--color-white)',
        '--normal-border': 'transparent',
      } as React.CSSProperties,
    })
  },
  error: (message: string) => {
    toast.error(message, {
      style: {
        '--normal-bg': 'light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))',
        '--normal-text': 'var(--color-white)',
        '--normal-border': 'transparent',
      } as React.CSSProperties,
    })
  },
}
