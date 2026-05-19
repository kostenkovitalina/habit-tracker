export const createHabit = async (data: {
  title: string
  description?: string
  frequency: 'daily' | 'weekly' | 'custom'
  goalDays?: number
}) => {
  return fetch('/api/habits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const deleteHabit = async (id: string) => {
  return fetch(`/api/habits/${id}`, {
    method: 'DELETE',
  })
}
