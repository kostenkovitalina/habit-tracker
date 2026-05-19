'use client'

import { useState } from 'react'
import { Button } from '../../../pkg/theme/ui/button'
import { Card } from '../../../pkg/theme/ui/card'
import { Input } from '../../../pkg/theme/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../pkg/theme/ui/select'
import { useCreateHabit } from '../../entities/api/habit'
import { THabitFrequency } from '../../shared/interface/habit.interface'

const CreateHabitsComponent = () => {
  const { mutate: createHabit, isPending: loading } = useCreateHabit()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [frequency, setFrequency] = useState<THabitFrequency>('daily')
  const [goalDays, setGoalDays] = useState('7')

  const handleSubmit = () => {
    createHabit({
      title: title || 'test',
      description: description || 'test',
      frequency,
      goalDays: Number(goalDays) || 7,
    })
  }

  return (
    <div className="max-w-md mx-auto space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create new habit</h1>
      </div>

      <Card className="p-6">
        <div className="flex flex-col space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <Input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <Select value={frequency} onValueChange={(value) => setFrequency(value as THabitFrequency)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input
              type="text"
              placeholder="Goal days"
              value={goalDays}
              onChange={(e) => setGoalDays(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <Button className="w-full" disabled={loading} onClick={handleSubmit}>
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CreateHabitsComponent
