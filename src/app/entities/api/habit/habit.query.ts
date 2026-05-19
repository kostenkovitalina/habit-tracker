'use client'

import { useQuery } from '@tanstack/react-query'

export const useHabits = () =>
  useQuery({
    queryKey: ['habits'],
    queryFn: () => fetch('/api/habits').then((r) => r.json()),
  })
