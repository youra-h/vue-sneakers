import { type InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store, createLogger } from 'vuex'
import UserStore, { type TState as TUserState } from './user/store'

const debug = true //process.env.NODE_ENV !== 'production'

// import { cards } from './cards'
export interface TState {
  UserStore: TUserState
}

// define injection key
export const key: InjectionKey<Store<TState>> = Symbol()

// export const store = createStore<State>({
//   modules: {
//     cards
//   }
// })

// export function useStore() {
//   return baseUseStore(key)
// }

export const store = createStore<TState>({
  modules: {
    user: UserStore
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
