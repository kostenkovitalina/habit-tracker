'use server'

import { revalidatePath } from 'next/cache'

import { authServer } from '@/pkg/auth/server'

import { createHabit } from './habit.api'

export interface AddHabitFormState {
  error?: string
}

export async function addHabitAction(_prevState: AddHabitFormState, formData: FormData): Promise<AddHabitFormState> {
  const session = await authServer.getSession()

  if (!session?.user) {
    return { error: 'Unauthorized' }
  }

  const title = formData.get('title')

  if (typeof title !== 'string' || !title.trim()) {
    return { error: 'Title is required' }
  }

  await createHabit(session.user.id, { title: title.trim() })

  revalidatePath('/habits')

  return {}
}
