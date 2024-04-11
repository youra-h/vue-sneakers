import { type Commit } from 'vuex'
import { type IBasket, type TBaskets, type IBasketInput } from './types'
import { type Models, ID } from 'appwrite'
import { db } from '@/utils/appwrite'
import { APP_WRITE_DB_ID, APP_WRITE_COLLECTION_BASKET } from '@/utils/appwrite/constants'
import { store } from '@/store'
import { type TUser } from '@/store/user/types'
import { type IState as IStoreState } from '@/store/types'

export interface TState {
    items: TBaskets
}

const state: TState = {
    items: {
        list: [],
        count: 0
    }
}

export interface IGetters {
    items: (state: TState) => TBaskets
}

const getters: IGetters = {
    items: (state: TState) => state.items
}

const mutations = {
    setItems(state: TState, items: TBaskets) {
        state.items = items
    }
}

const actions = {
    async fetchBaskets({
        commit,
        rootState
    }: {
        commit: Commit
        state: TState
        rootState: IStoreState
    }): Promise<IBasket[]> {
        try {
            const user: TUser = rootState.user.user!

            const list: Models.DocumentList<IBasket> = await db.listDocuments(
                APP_WRITE_DB_ID,
                APP_WRITE_COLLECTION_BASKET,
                [`equal("user_id", "${user.$id}")`]
            )

            commit('setItems', list.documents)

            return list.documents
        } catch (error) {
            console.error(error)
        }

        return []
    },
    async add({ commit }: { commit: Commit }, item: IBasketInput) {
        try {
            const documentId: string = ID.unique()

            const document: IBasket = await db.createDocument(
                APP_WRITE_DB_ID,
                APP_WRITE_COLLECTION_BASKET,
                documentId,
                item
            )

            // commit('setItems', [...state.items, document])

            // return document
        } catch (error) {
            console.error(error)
        }

        return null
    },
    async remove({ commit }: { commit: Commit }, item: IBasket) {
        try {
            await db.deleteDocument(APP_WRITE_DB_ID, APP_WRITE_COLLECTION_BASKET, item.$id)

            // commit('setItems', state.items.filter((i: IBasket) => i.$id !== item.$id))
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
