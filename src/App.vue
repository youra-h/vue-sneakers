<script setup lang="ts">
import { onMounted, computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '@/store'
import UserDataServices from '@/services/UserDataServices'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

import { Vue3Snackbar } from "vue3-snackbar";

onMounted(async () => {
    const validateSesssion: boolean = await store.dispatch('session/checkSessionValidity')

    if (validateSesssion) {
        await UserDataServices()
    }
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

    <vue3-snackbar bottom right :duration="6000"></vue3-snackbar>
</template>

