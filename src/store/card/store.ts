import { type Commit } from 'vuex'
import { type TItems, type IItem, type IFilters } from './types'
import { type Models } from 'appwrite'
import { db } from '@/utils/appwrite'
import { APP_WRITE_DB_ID, APP_WRITE_COLLECTION_ITEMS } from '@/utils/appwrite/constants'
import { watch } from 'vue'

export interface TState {
    items: TItems | []
    filters: IFilters
}

const state: TState = {
    items: [],
    filters: {
        sortBy: 'title',
        search: ''
    }
}

export interface IGetters {
    items: (state: TState) => TItems
    filters: (state: TState) => IFilters
}

const getters: IGetters = {
    items: (state: TState) => state.items,
    filters: (state: TState) => state.filters
}

const mutations = {
    setItems(state: TState, items: TItems) {
        state.items = items
    },
    setSortBy(state: TState, sortBy: string) {
        state.filters.sortBy = sortBy
    },
    setSearch(state: TState, search: string) {
        state.filters.search = search
    }
}

const actions = {
    async fetchItems({ commit, state }: { commit: Commit; state: TState }) {
        try {
            const list: Models.DocumentList<IItem> = await db.listDocuments(
                APP_WRITE_DB_ID,
                APP_WRITE_COLLECTION_ITEMS,
                [
                    `orderDesc("${state.filters.sortBy}")`,
                    `startsWith("title", ["${state.filters.search}"])`
                ]
            )

            commit('setItems', list.documents)

            return list.documents
        } catch (error) {
            console.error(error)
        }

        return []
    },
    watchFilters({ dispatch, state }: { dispatch: Function; state: TState }) {
        watch(state.filters, () => {
            dispatch('fetchItems')
        })
    }
}

export default {
    namespaced: true, // include named namespaces
    state,
    getters,
    mutations,
    actions
}
