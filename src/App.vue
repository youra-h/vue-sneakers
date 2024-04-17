<script setup lang="ts">
import { ref, onMounted, provide } from 'vue'
import Spinner from '@/components/Spinner/Spinner.vue'
import Header from '@/components/Header/Header.vue'
import Drawer from '@/components/Drawer/Drawer.vue'
import { store } from '@/store'
import { type IDrawerActions } from '@/components/Drawer/types'
import Home from '@/pages/Home.vue'

const loaded = ref<boolean>(false)

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

    await store.dispatch('card/fetchItems')

    console.log('Cards loaded');

    await store.dispatch('cart/fetchCarts')

    console.log('Cart loaded');

    loaded.value = true
})

const drawerState = ref<boolean>(false)

const drawerActions: IDrawerActions = {
    open: () => {
        drawerState.value = true
    },
    close: () => {
        drawerState.value = false
    }
}

provide('drawerActions', drawerActions)

</script>

<template>
    <transition name="fade" mode="out-in">
        <div v-if="!loaded" class="flex h-screen items-center justify-center">
            <Spinner size="large" color="#afc188" />
        </div>
        <div v-else>
            <Drawer v-if="drawerState" />

            <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
                <Header />

                <div class="p-10">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </transition>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>