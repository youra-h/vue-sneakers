import { type TState as TUserState } from './user/store'
import { type TState as TSessionState } from './session/store'
import { type TState as TCardState } from './card/store'
import { type TState as TCartState } from './cart/store'

export interface IState {
    user: TUserState
    session: TSessionState
    card: TCardState
    cart: TCartState
}
