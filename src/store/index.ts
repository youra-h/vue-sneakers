import { type InjectionKey } from 'vue'
import { createStore, Store, createLogger } from 'vuex'
import { type IState } from './types'
import UserStore from './user/store'
import SessionStore from './session/store'
import CardStore from './card/store'
import BasketStore from './basket/store'

const debug = true //process.env.NODE_ENV !== 'production'

// define injection key
export const key: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
    modules: {
        user: UserStore,
        session: SessionStore,
        card: CardStore,
        basket: BasketStore
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
