'use client'

import { useActionState, useEffect, useRef } from 'react'

import { addHabitAction, type AddHabitFormState } from '@/app/entities/api/habit/habit.mutation'

const initialState: AddHabitFormState = {}

const AddingHabitFormComponent = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [state, formAction, pending] = useActionState(addHabitAction, initialState)

  useEffect(() => {
    if (!pending && !state.error) formRef.current?.reset()
  }, [pending, state.error])

  return (
    <form ref={formRef} action={formAction}>
      <label htmlFor='title'>New habit</label>

      <input id='title' name='title' required />

      <button type='submit' disabled={pending}>
        {pending ? 'Adding…' : 'Add'}
      </button>

      {state.error && <p role='alert'>{state.error}</p>}
    </form>
  )
}

export default AddingHabitFormComponent
