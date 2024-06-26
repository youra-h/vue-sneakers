import { type Commit, type Dispatch } from 'vuex'
import { type TSession } from './types'
import { type Models, type AppwriteException, ID } from 'appwrite'
import { account, type IAuthData } from '@/utils/appwrite'

export interface TState {
    session: TSession | null
}

const state: TState = {
    session: null
}

export interface IGetters {
    session: (state: TState) => TSession | null
}

const getters: IGetters = {
    session: (state: TState) => state.session
}

const mutations = {
    setSession(state: TState, session: TSession) {
        state.session = session
    }
}

const actions = {
    getSession({ commit, getters }: { commit: Commit; getters: IGetters }) {
        const session: string | null = localStorage.getItem('session')

        if (session) {
            commit('setSession', JSON.parse(session))
        }

        return getters.session
    },

    async login({ commit }: { commit: Commit }, { email, password }: IAuthData): Promise<boolean> {
        try {
            const session: Models.Session = await account.createEmailPasswordSession(
                email,
                password
            )

            localStorage.setItem('session', JSON.stringify(session))

            commit('setSession', session)

            return true
        } catch (error: unknown) {
            const appwriteError = error as AppwriteException
            console.error(appwriteError.response)
            throw appwriteError
        }
    },

    async logout({ commit }: { commit: Commit }) {
        try {
            await account.deleteSession('current')

            localStorage.removeItem('session')

            commit('setSession', null)
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async checkSessionValidity({ dispatch }: { dispatch: Dispatch }): Promise<boolean> {
        try {
            const session: TSession = await dispatch('getSession')

            if (!session) {
                return false
            }

            const state: TSession = await account.getSession(session.$id)

            return !!state.$id
        } catch (error) {
            console.error(error)
        }

        return false
    },

    async createAccount(context: any, { email, password }: IAuthData): Promise<boolean> {
        try {
            await account.create(
                ID.unique(),
                email,
                password
            )            

            return true
        } catch (error) {            
            console.error(error)
            throw error
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
