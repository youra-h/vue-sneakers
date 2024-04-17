<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import { store } from '@/store'
import { type IDrawerActions } from '@/components/Drawer/types'

const user = ref<string>(store.getters['user/user'].email)
const totalPrice = computed<number>(() => store.getters['cart/items'].totalPrice())

const drawerActions = inject<IDrawerActions>('drawerActions')

if (!drawerActions) {
    throw new Error('No provider for "drawer" found.');
}

</script>
<template>
    <header class="flex justify-between border-b border-slate-200 px-10 py-8">

        <router-link :to="{ name: 'home' }">
            <div class="flex items-center gap-4">
                <img src="/logo.png" alt="Logo" class="w-10" />
                <div>
                    <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
                    <p class="text-slate-400">Магазин лучших кроссовок</p>
                </div>
            </div>
        </router-link>

        <ul class="flex items-center gap-10 text-gray-500">
            <li class="flex items-center gap-3 cursor-pointer hover:text-black" @click="drawerActions.open()">
                <img src="/cart.svg" alt="Cart">
                <b>{{ totalPrice }}руб.</b>
            </li>
            <router-link :to="{ name: 'favorites' }" class="flex items-center gap-3 cursor-pointer hover:text-black">
                <img src="/heart.svg" alt="Cart">
                <span>Закладки</span>
            </router-link>
            <li class="flex items-center gap-3 cursor-pointer hover:text-black">
                <img src="/profile.svg" alt="Cart">
                <span>{{ user }}</span>
            </li>
        </ul>

    </header>
</template>