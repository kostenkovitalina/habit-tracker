import { getHabitsWithTodayStatus } from '@/app/entities/api/habit/habit.api'
import { authServer } from '@/pkg/auth/server'

const HabitListComponent = async () => {
  const session = await authServer.getSession()

  if (!session?.user) return null

  const habits = await getHabitsWithTodayStatus(session.user.id)

  return (
    <>
      {habits.map((habit) => (
        <div key={habit.id}>
          <p>{habit.title}</p>
        </div>
      ))}
    </>
  )
}

export default HabitListComponent
