export type TSize = 'small' | 'medium' | 'large'

export interface IProps {
  size?: TSize
  color: string
}

export const sizeMap: Record<TSize, number> = {
  small: 28,
  medium: 48,
  large: 96
}
