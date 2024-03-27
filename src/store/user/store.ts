import { type Commit } from 'vuex'
import { type IUser } from './types'
import { account, type IAuthData } from '@/utils/appwrite'

export interface TState {
  user: IUser | null
}

const state: TState = {
  user: null
}

const getters = {
  user: (state: TState) => state.user
}

const mutations = {
  setUser(state: TState, user: IUser) {
    state.user = user
  }
}

const actions = {
  async login({ commit }: { commit: Commit }, { email, password }: IAuthData) {
    try {
      const user = await account.createEmailPasswordSession(email, password)

      commit('setUser', user)

      return true
    } catch (error) {
      console.error(error)
    }
    return false
  },
  async logout({ commit }: { commit: Commit }) {
    try {
      await account.deleteSession('current')

      commit('setUser', null)
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
