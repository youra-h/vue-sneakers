import { type Commit, type Getters } from 'vuex'
import { type Models, ID } from 'appwrite'
import { db } from '@/utils/appwrite'
import { APP_WRITE_DB_ID, APP_WRITE_COLLECTION_BASKET } from '@/utils/appwrite/constants'
import { type TUser } from '@/store/user'
import { type IItem } from '@/store/card'
import { type IState as IStoreState } from '@/store/types'
import { Carts, Cart } from './classes'
import type { ICart, ICartInput, ICartList } from './types'

export interface TState {
    items: Carts
}

const state: TState = {
    items: new Carts()
}

export interface IGetters {
    items: (state: TState) => Carts
    documents: (state: TState) => ICart[]
}

const getters: IGetters = {
    items: (state: TState) => state.items,
    documents: (state: TState) => state.items.documents
}

const mutations = {
    setItems(state: TState, items: ICartList) {
        state.items.setData(items)
    },
    addItem(state: TState, item: ICart) {
        state.items.add(item)
    },
    remove(state: TState, item: ICart) {
        state.items.remove(item)
    },
    incItem(state: TState, item: ICart) {
        state.items.inc(item)
    },
    decItem(state: TState, item: ICart) {
        state.items.dec(item)
    }
}

const actions = {
    async fetchCarts({
        commit,
        rootState
    }: {
        commit: Commit
        rootState: IStoreState
    }): Promise<ICart[]> {
        try {
            const user: TUser = rootState.user.user!

            const list: Models.DocumentList<ICart> = await db.listDocuments(
                APP_WRITE_DB_ID,
                APP_WRITE_COLLECTION_BASKET,
                [`equal("user_id", "${user.$id}")`]
            )

            commit('setItems', list)

            return list.documents
        } catch (error) {
            console.error(error)
        }

        return []
    },
    async add(
        {
            commit,
            rootState,
            getters
        }: { commit: Commit; rootState: IStoreState; getters: Getters },
        item: IItem
    ): Promise<boolean> {
        try {
            const user: TUser = rootState.user.user!
            // const item = store.getters['card/getItemById'](itemId) as IItem
            const cart: Cart = getters.items.getCartByItemId(item.$id)

            const input: ICartInput = cart ? cart.getInput() : Cart.getInput(item, user.$id)

            let document = cart
                ? await db.getDocument(APP_WRITE_DB_ID, APP_WRITE_COLLECTION_BASKET, cart.$id)
                : null

            input.count++

            if (document) {
                await db.updateDocument(
                    APP_WRITE_DB_ID,
                    APP_WRITE_COLLECTION_BASKET,
                    cart.$id,
                    input
                )

                commit('incItem', cart)
            } else {
                document = await db.createDocument(
                    APP_WRITE_DB_ID,
                    APP_WRITE_COLLECTION_BASKET,
                    ID.unique(),
                    input
                )

                document.count--

                commit('addItem', document as ICart)
            }

            return true
        } catch (error) {
            console.error(error)
        }

        return false
    },
    async remove(
        { commit }: { commit: Commit },
        { item, dec = false }: { item: Cart; dec?: boolean }
    ): Promise<void> {
        try {
            const input: ICartInput = item.getInput()

            if (dec) {
                input.count--
            } else {
                input.count = 0
            }

            if (input.count === 0) {
                await db.deleteDocument(APP_WRITE_DB_ID, APP_WRITE_COLLECTION_BASKET, item.$id)
            } else {
                await db.updateDocument(
                    APP_WRITE_DB_ID,
                    APP_WRITE_COLLECTION_BASKET,
                    item.$id,
                    input
                )
            }

            if (dec) {
                commit('decItem', item)
            } else {
                commit('remove', item)
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export default {
    namespaced: true, // include named namespaces
    state,
    getters,
    mutations,
    actions
}