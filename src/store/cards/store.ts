import { type Commit } from 'vuex'
import { type TItems } from './types'
import { account, type IAuthData } from '@/utils/appwrite'

export interface TState {
  items: TItems
}

const state: TState = {
  items: []
}

const getters = {
  items: (state: TState) => state.items
}

const mutations = {
  setUser(state: TState, items: TItems) {
    state.items = items
  }
}

const actions = {
  async fetchItems({ commit, state }: { commit: Commit; state: TState }) {
    try {
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
      const favorites = await fetchFavorites()
      const items = (data as TItems).map((item: IItem) => {
        return {
          ...item
          // isFavorite: favorites.some((favorite: IItem) => favorite.id === item.id)
          // isAdded: false,
          // onAdd: () => {
          //   console.log('Add to cart', item.id)
          // },
          // onFavorite: () => {
          //   console.log('Add to favorites', item.id)
          // }
        }
      })
      commit('setItems', items)
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
