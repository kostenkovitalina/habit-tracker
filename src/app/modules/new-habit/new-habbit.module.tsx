import { AddingHabitFormComponent } from '@/app/modules/new-habit/elements/adding-habit-form'
import HabitListComponent from '@/app/modules/new-habit/elements/habit-list/habit-list.component'

const NewHabbitModules = () => {
  return (
    <>
      <AddingHabitFormComponent />
      <HabitListComponent />
    </>
  )
}

export default NewHabbitModules
