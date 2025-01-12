import { Size } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randomHexColorCode = () => {
  const n = (Math.random() * 0xfffff * 1000000).toString(16)
  return '#' + n.slice(0, 6)
}

export const dateJoinedText = (dateCreated: Date) => {
  return `Joined ${format(dateCreated, 'LLL yyy')}`
}

export const percentageFormatter = (percentage: number) => {
  return `${Math.round(percentage)}%`
}

export const convertSizeToStyle = (size: Size) => {
  switch (size) {
    case 'sm':
      return 'size-5'
    case 'md':
      return 'size-10'
    case 'lg':
      return 'size-20'
    case 'xl':
      return 'size-32'
  }
}
