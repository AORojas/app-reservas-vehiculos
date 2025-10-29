import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import type { JSX } from 'react/jsx-runtime'
import { useState } from 'react'
import type { Matcher } from 'react-day-picker'

interface datePickerProps {
  placeholder: string
  onDateChange?: (date: Date | undefined) => void
  disabled: Matcher | Matcher[]
  cssClasses?: string
}

export function DatePicker({
  placeholder,
  onDateChange,
  disabled,
  cssClasses
}: datePickerProps): JSX.Element {
  const [date, setDate] = useState<Date>()

  const handleSelect = (selectedDate: Date | undefined): void => {
    setDate(selectedDate)
    onDateChange?.(selectedDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className={`data-[empty=true]:text-muted-foreground justify-start text-left font-normal ${cssClasses}`}
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  )
}
