import { type Commit } from 'vuex'
import { type TItems, type IItem, type IFilters, Search } from './types'
import { type Models } from 'appwrite'
import { db } from '@/utils/appwrite'
import { APP_WRITE_DB_ID, APP_WRITE_COLLECTION_ITEMS } from '@/utils/appwrite/constants'

export interface TState {
  items: TItems | []
  filters: IFilters
}

const state: TState = {
  items: [],
  filters: {
    sortBy: 'title',
    search: new Search()
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
  }
}

const actions = {
  async fetchItems({ commit, state }: { commit: Commit; state: TState }) {
    try {
      const list: Models.DocumentList<IItem> = await db.listDocuments(
        APP_WRITE_DB_ID,
        APP_WRITE_COLLECTION_ITEMS
      )

      // const params: { title?: string; sortBy?: string } = {}
      // if (state.filters.search.value) {
      //   params.title = state.filters.search.toString()
      // }
      // if (state.filters.sortBy) {
      //   params.sortBy = state.filters.sortBy
      // }
      // const { data } = await axios.get('https://bb50be424c3a9a73.mokky.dev/items', {
      //   params
      // })
      // const favorites = await fetchFavorites()
      // const items = (data as TItems).map((item: IItem) => {
      //   return {
      //     ...item
      //     // isFavorite: favorites.some((favorite: IItem) => favorite.id === item.id)
      //     // isAdded: false,
      //     // onAdd: () => {
      //     //   console.log('Add to cart', item.id)
      //     // },
      //     // onFavorite: () => {
      //     //   console.log('Add to favorites', item.id)
      //     // }
      //   }
      // })
      commit('setItems', list.documents)

      return list.documents
    } catch (error) {
      console.error(error)
    }

    return []
  }
}

export default {
  namespaced: true, // include named namespaces
  state,
  getters,
  mutations,
  actions
}
