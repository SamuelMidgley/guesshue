import { convertSizeToStyle } from '@/lib/utils'
import { Size } from '@/types'

interface ProfilePictureProps {
  size?: Size
  firstColor: string
  secondColor: string
}

export const ProfilePicture = ({
  size = 'md',
  firstColor,
  secondColor,
}: ProfilePictureProps) => {
  const sizeStyle = convertSizeToStyle(size)

  return (
    <div
      className={`${sizeStyle} rounded`}
      style={{
        background: `linear-gradient(315deg, ${firstColor}, ${secondColor} )`,
      }}
    />
  )
}
