import { cn, convertSizeToStyle } from '@/lib/utils'
import { Size } from '@/types'

interface GuessHueLogoProps {
  size?: Size
}

export const GuessHueLogo = ({ size = 'md' }: GuessHueLogoProps) => {
  const sizeStyle = convertSizeToStyle(size)

  return (
    <div
      className={cn('rounded', sizeStyle)}
      style={{
        background:
          'linear-gradient(315deg, #A04BFF 10%, #4BA5EB 20%, #4BFFD7 30%, #B4FF4B 40%, #FFFF4B 50%, #FFD54B 60%, #FFB74B 70%, #FF6E4B 80%, #FF4B4B 90%)',
      }}
    />
  )
}
