import { type Commit } from 'vuex'
import { type TItems, type IItem, type IFilters } from './types'
import { type Models } from 'appwrite'
import { db } from '@/utils/appwrite'
import { APP_WRITE_DB_ID, APP_WRITE_COLLECTION_ITEM } from '@/utils/appwrite/constants'
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
    getItemById: (state: TState) => (id: string) => IItem | undefined
    favorites: (state: TState) => TItems
}

const getters: IGetters = {
    items: (state: TState) => state.items,
    filters: (state: TState) => state.filters,
    getItemById: (state: TState) => (id: string) => state.items.find((item) => item.$id === id),
    favorites: (state: TState) => state.items.filter((item) => item.favorite)
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
    },
    setItem(state: TState, item: IItem) {
        const index = state.items.findIndex((i) => i.$id === item.$id)

        if (index !== -1) {
            state.items[index] = item
        }
    }
}

const actions = {
    async fetchItems({ commit, state }: { commit: Commit; state: TState }) {
        try {
            const filters: string[] = []

            if (state.filters.sortBy) {
                const order: string =
                    state.filters.sortBy.indexOf('-') === 0 ? 'orderDesc' : 'orderAsc'
                const field: string = state.filters.sortBy.replace('-', '')
                filters.push(`${order}("${field}")`)
            }

            if (state.filters.search) {
                filters.push(`search("title", ["${state.filters.search}"])`)
            }

            const list: Models.DocumentList<IItem> = await db.listDocuments(
                APP_WRITE_DB_ID,
                APP_WRITE_COLLECTION_ITEM,
                filters
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
    },
    async toggleFavorite({ commit }: { commit: Commit }, item: IItem) {
        const favorite = !item.favorite

        try {
            await db.updateDocument(APP_WRITE_DB_ID, APP_WRITE_COLLECTION_ITEM, item.$id, {
                favorite
            })

            commit('setItem', { ...item, favorite })
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
