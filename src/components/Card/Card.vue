<script setup lang="ts">
import { defineProps } from 'vue'
import { type IItem } from '@/store/card/types'
import { store } from '@/store'

interface IProps {
    item: IItem
}

defineProps<IProps>()

// const store = useStore()

// const onFavorite = () => {
//     console.log('onFavorite')
// }

</script>

<template>
    <div
        class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl">

        <img @click="store.dispatch('card/toggleFavorite', item)" :src="item.favorite ? '/like-2.svg' : 'like-1.svg'"
            alt="Like 1" class="absolute top-0 left-0" />

        <img :src="item.imageUrl" alt="Sneakers">

        <p class="mt-2">{{ item.title }}</p>

        <div class="flex justify-between mt-5">
            <div class="flex flex-col">
                <span class="text-slate-400">Цена:</span>
                <b>{{ item.price }} руб</b>
            </div>

            <!-- <img @click="onAdd" :src="isAdded ? '/checked.svg' : '/plus.svg'" alt="Plus"> -->
        </div>
    </div>
</template>