import React from 'react'
import { HexColorPicker } from 'react-colorful'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { Input } from './input'

export type ColorInputProps = {
  color: string
  setColor: (newColor: string) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export const ColorInput = React.forwardRef<HTMLInputElement, ColorInputProps>(
  ({ color, setColor, ...props }, ref) => {
    return (
      <div className="flex gap-2">
        <Input ref={ref} {...props} />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn('w-40')}
              style={{ backgroundColor: color }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <HexColorPicker
              color={color}
              onChange={(newColor) => setColor(newColor)}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }
)
