import { type Commit, type Dispatch } from 'vuex'
import { type TUser } from './types'
import { account } from '@/utils/appwrite'

export interface TState {
    user: TUser | null
}

const state: TState = {
    user: null
}

export interface IGetters {
    user: (state: TState) => TUser | null
    id: (state: TState) => string
}

const getters: IGetters = {
    user: (state: TState) => state.user,
    id: (state: TState) => state.user?.$id!
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
    },

    async logout({ commit }: { commit: Commit }) {
        try {
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
