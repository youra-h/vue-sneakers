import { type TState as TUserState } from './user/store'
import { type TState as TSessionState } from './session/store'
import { type TState as TCardState } from './card/store'
import { type TState as TBasketState } from './basket/store'

export interface IState {
    user: TUserState
    session: TSessionState
    card: TCardState
    basket: TBasketState
}
