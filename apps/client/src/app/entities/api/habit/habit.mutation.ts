import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createHabit, deleteHabit } from './habit.api'

export const useCreateHabit = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createHabit,

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] }),
  })
}

export const useDeleteHabit = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteHabit,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] }),
  })
}
