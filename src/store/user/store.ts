import { type Commit } from 'vuex'
import { type TUser } from './types'
import { account } from '@/utils/appwrite'

export interface TState {
  user: TUser | null
}

const state: TState = {
  user: null
}

interface IGetters {
  user: (state: TState) => TUser | null
}

const getters: IGetters = {
  user: (state: TState) => state.user
}

const mutations = {
  setUser(state: TState, user: TUser) {
    state.user = user
  }
}

const actions = {
  async load({ commit }: { commit: Commit }) {
    const user: TUser = await account.get()

    if (!user) {
      return false
    }

    commit('setUser', user)

    return true
  }
}

export default {
  namespaced: true, // include named namespaces
  state,
  getters,
  mutations,
  actions
}
