import { store } from '@/store'

export default async function UserDataServices(): Promise<boolean> {
    try {
        const userInit = await store.dispatch('user/load')

        if (!userInit) {
            console.error('Failed to load user')
            return false
        }

        console.log('User loaded')

        await store.dispatch('cart/fetchCarts')

        console.log('Cart loaded')

        return true
    } catch (error) {
        console.error(error)
        return false
    }
}
