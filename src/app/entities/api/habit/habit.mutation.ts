import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createHabit } from "./habit.api"

export const useCreateHabit = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createHabit,

        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['habits'] })
    })
}