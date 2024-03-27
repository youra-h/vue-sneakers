import UserStore, { type TState } from './store'
import { type IUser } from './types'

export type { IUser, TState }

export default {
  ...UserStore
}
