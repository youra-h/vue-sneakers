<script setup lang="ts">
import { defineProps } from 'vue'
import { type IItem } from '@/store/card/types'
import { store } from '@/store'

interface IProps {
    item: IItem
}

const props = defineProps<IProps>()

const addCart = () => {
    store.dispatch('cart/add', props.item)
}
</script>

<template>
    <div
        class="relative bg-white border border-slate-100 rounded-3xl p-8 transition hover:-translate-y-2 hover:shadow-xl">

        <img @click="store.dispatch('card/toggleFavorite', item)" :src="item.favorite ? '/like-2.svg' : 'like-1.svg'"
            alt="Like 1" class="cursor-pointer absolute top-0 left-0" />

        <img :src="item.imageUrl" alt="Sneakers">

        <p class="mt-2">{{ item.title }}</p>

        <div class="flex justify-between mt-5">
            <div class="flex flex-col">
                <span class="text-slate-400">Цена:</span>
                <b>{{ item.price }} руб</b>
            </div>

            <img @click="addCart" src="/plus.svg" alt="Plus"
                class="cursor-pointer opacity-50 transition hover:opacity-100">
        </div>
    </div>
</template>