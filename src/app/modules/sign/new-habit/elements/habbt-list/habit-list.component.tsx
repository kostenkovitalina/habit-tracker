import { getHabitsWithTodayStatus } from "@/app/entities/api/habit/habit.api"

const HabitListComponent = async () => {
  const habits = await getHabitsWithTodayStatus()

  return (
    <>
      {habits.map((habit) => (
        <div key={habit.id}>
          <p>title</p>{habit.title}
          <p>targetSchedule</p>{habit.targetSchedule}
          <p>ifThenPlan</p>{habit.ifThenPlan}
          <p>microSteps</p>{habit.microSteps}
          <p>triggerRoutine</p>{habit.triggerRoutine}
          <p>pastAttempts</p>{habit.pastAttempts}
          <p>color</p>{habit.color}
          <p>createdAt</p>{habit.createdAt}
          <p>updatedAt</p>{habit.updatedAt}
          <p>completedToday</p>{habit.completedToday}
          <p>currentStreak</p>{habit.currentStreak}
          <p>weeklyCompletionRate</p>{habit.weeklyCompletionRate}
        </div>
      ))}
    </>
  )
}

export default HabitListComponent