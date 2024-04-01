import CardStore, { type TState } from './store'
import { type IItem, type TItems } from './types'

export type { IItem, TItems, TState }

export default {
  ...CardStore
}
