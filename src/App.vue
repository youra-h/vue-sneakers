<script setup lang="ts">
import { ref, onMounted, defineModel, provide } from 'vue'
import Spinner from '@/components/Spinner/Spinner.vue'
import Header from '@/components/Header/Header.vue'
import CardList from '@/components/Card/CardList.vue'
import Drawer from '@/components/Drawer/Drawer.vue'
import { debounce } from './types'
import { store } from '@/store'
import { type IDrawerActions } from '@/components/Drawer/types'

const loaded = ref<boolean>(false)

const selectedSortBy = defineModel<string, string>('sortBy', {
    get: () => store.getters['card/filters'].sortBy,
    set: (value: string) => {
        store.commit('card/setSortBy', value)
        store.dispatch('card/fetchItems')
    }
})

const search = defineModel<string, string>('search', {
    get: () => store.getters['card/filters'].search,
    set: (value: string) => {
        store.commit('card/setSearch', value)
        debounce(() => store.dispatch('card/fetchItems'), 500)
    }
})

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
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-3xl font-bold">Все кроссовки</h2>

                        <div class="flex gap-4">
                            <select v-model="selectedSortBy"
                                class="py-2 px-3 border border-slate-200 rounded-md outline-none" name="" id="">
                                <option value="title">По названию</option>
                                <option value="price">По цене (дешевые)</option>
                                <option value="-price">По цене (дорогие)</option>
                            </select>

                            <div class="relative">
                                <img class="absolute left-3 top-3" src="/search.svg" alt="Search">
                                <input type="text" v-model="search" placeholder="Поиск..."
                                    class="border border-slate-200 rounded-md py-2 pl-10 pr-4 outline-none focus:border-slate-400" />
                            </div>
                        </div>
                    </div>


                    <div class="mt-10">
                        <CardList :items="store.getters['card/items']" />
                    </div>
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