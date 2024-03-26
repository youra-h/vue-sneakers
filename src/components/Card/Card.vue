<script setup lang="ts">
import { defineProps } from 'vue'
import { type IItem } from './types'

interface IProps extends IItem {
    isFavorite: Boolean
    isAdded: Boolean
    onAdd: Function
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

        <!-- <img @click="onFavorite" :src="isFavorite ? '/like-2.svg' : 'like-1.svg'" alt="Like 1"
            class="absolute top-0 left-0" /> -->

        <img :src="imageUrl" alt="Sneakers">

        <p class="mt-2">{{ title }}</p>

        <div class="flex justify-between mt-5">
            <div class="flex flex-col">
                <span class="text-slate-400">Цена:</span>
                <b>{{ price }} руб</b>
            </div>

            <!-- <img @click="onAdd" :src="isAdded ? '/checked.svg' : '/plus.svg'" alt="Plus"> -->
        </div>
    </div>
</template>