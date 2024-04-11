import UserStore, { type TState } from './store'
import { type TUser } from './types'

export type { TUser, TState }

export default {
  ...UserStore
}
