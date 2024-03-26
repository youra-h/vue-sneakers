import { type InjectionKey } from 'vue'
import { createStore, type Dispatch, type Commit, Store, useStore as baseUseStore } from 'vuex'
import axios from 'axios'
import { type TItems, type IItem } from './../components/Card/types.js'
import { type IFilters, Search } from './../types.js'

export interface State {
  items: TItems
  filters: IFilters
}

export const key: InjectionKey<Store<State>> = Symbol()

const state: State = {
  items: [],
  filters: {
    sortBy: 'title',
    search: new Search()
  }
}

const getters = {
  items: (state: State) => state.items,
  filters: (state: State) => state.filters
}

const mutations = {
  setItems(state: State, items: TItems) {
    state.items = items
  },
  setFilters(state: State, filters: IFilters) {
    state.filters = filters
  }
}

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get('https://bb50be424c3a9a73.mokky.dev/favorites')

    return data
  } catch (error) {
    console.error(error)
  }

  return []
}

const actions = {
  async fetchItems({ commit, state }: { commit: Commit; state: State }) {
    try {
      const params: { title?: string; sortBy?: string } = {}
      if (state.filters.search.value) {
        params.title = state.filters.search.toString()
      }
      if (state.filters.sortBy) {
        params.sortBy = state.filters.sortBy
      }
      const { data } = await axios.get('https://bb50be424c3a9a73.mokky.dev/items', {
        params
      })
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
  },
  updateSearch(
    { commit, state, dispatch }: { commit: Commit; state: State; dispatch: Dispatch },
    value: string
  ) {
    const newFilters = { ...state.filters }
    newFilters.search.value = value
    commit('setFilters', newFilters)
    dispatch('fetchItems')
  }
}

export const store = createStore<State>({
  state,
  getters,
  mutations,
  actions
})

export function useStore() {
  return baseUseStore(key)
}
