'use client'

import { CheckIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/pkg/theme/ui/button'

interface HabitToggleFeatureProps {
  completed?: boolean
  onToggle?: (completed: boolean) => void
}

const HabitToggleFeature = ({ completed = false, onToggle }: HabitToggleFeatureProps) => {
  const [isCompleted, setIsCompleted] = useState(completed)

  const handleClick = () => {
    const nextCompleted = !isCompleted

    setIsCompleted(nextCompleted)
    onToggle?.(nextCompleted)
  }

  return (
    <Button type='button' variant={isCompleted ? 'default' : 'outline'} size='sm' onClick={handleClick}>
      <CheckIcon className='size-4' />
      {isCompleted ? 'Done' : 'Mark done'}
    </Button>
  )
}

export default HabitToggleFeature
