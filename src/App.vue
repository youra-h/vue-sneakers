<script setup lang="ts">
import { onMounted, computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '@/store'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

onMounted(async () => {
    const validateSesssion: boolean = await store.dispatch('session/checkSessionValidity')

    if (!validateSesssion) {
        const login: boolean = await store.dispatch('session/login', {
            email: 'test@mail.ru',
            password: 'testtest'
        })

        if (!login) {
            console.error('Failed to login')

            return false
        }
    }

    console.log('Session is valid')

    const userInit = await store.dispatch('user/load')

    if (!userInit) {
        console.error('Failed to load user')

        return false
    }

    console.log('User loaded')

    await store.dispatch('cart/fetchCarts')

    console.log('Cart loaded');
})

const route = useRoute()

type TLayouts = {
    default: typeof DefaultLayout
    auth: typeof AuthLayout
}

const layouts: TLayouts = {
    default: DefaultLayout,
    auth: AuthLayout
}

const layout: ComputedRef<typeof DefaultLayout | typeof AuthLayout> = computed(() => {
    const layoutName: keyof TLayouts = (route.meta.layout as keyof TLayouts) || 'default'

    return layouts[layoutName]
})

</script>

<template>
    <component :is="layout">
        <router-view></router-view>
    </component>
</template>

