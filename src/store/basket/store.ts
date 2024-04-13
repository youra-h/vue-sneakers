import { type Commit, type Getters } from 'vuex'
import { type Models, ID } from 'appwrite'
import { db } from '@/utils/appwrite'
import { APP_WRITE_DB_ID, APP_WRITE_COLLECTION_BASKET } from '@/utils/appwrite/constants'
import { store } from '@/store'
import { type TUser } from '@/store/user'
import { type IItem } from '@/store/card'
import { type IState as IStoreState } from '@/store/types'
import { Baskets, Basket } from './classes'
import type { IBasket, IBasketInput, IBasketList } from './types'

export interface TState {
    items: Baskets
}

const state: TState = {
    items: new Baskets()
}

export interface IGetters {
    items: (state: TState) => Baskets
    documents: (state: TState) => IBasket[]
}

const getters: IGetters = {
    items: (state: TState) => state.items,
    documents: (state: TState) => state.items.documents
}

const mutations = {
    setItems(state: TState, items: IBasketList) {
        state.items.setData(items)
    },
    addItem(state: TState, item: IBasket) {
        state.items.add(item)
    },
    remove(state: TState, item: IBasket) {
        state.items.remove(item)
    },
    incItem(state: TState, item: IBasket) {
        state.items.inc(item)
    },
    decItem(state: TState, item: IBasket) {
        state.items.dec(item)
    }
}

const actions = {
    async fetchBaskets({
        commit,
        rootState
    }: {
        commit: Commit
        rootState: IStoreState
    }): Promise<IBasket[]> {
        try {
            const user: TUser = rootState.user.user!

            const list: Models.DocumentList<IBasket> = await db.listDocuments(
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
            const basket: Basket = getters.items.getBasketByItemId(item.$id)

            const input: IBasketInput = basket ? basket.getInput() : Basket.getInput(item, user.$id)

            let document = basket
                ? await db.getDocument(APP_WRITE_DB_ID, APP_WRITE_COLLECTION_BASKET, basket.$id)
                : null

            input.count++

            if (document) {
                await db.updateDocument(
                    APP_WRITE_DB_ID,
                    APP_WRITE_COLLECTION_BASKET,
                    basket.$id,
                    input
                )

                commit('incItem', basket)
            } else {
                document = await db.createDocument(
                    APP_WRITE_DB_ID,
                    APP_WRITE_COLLECTION_BASKET,
                    ID.unique(),
                    input
                )

                document.count--

                commit('addItem', document as IBasket)
            }

            return true
        } catch (error) {
            console.error(error)
        }

        return false
    },
    async remove(
        { commit }: { commit: Commit },
        { item, dec = false }: { item: Basket; dec?: boolean }
    ): Promise<void> {
        try {
            const input: IBasketInput = item.getInput()

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
