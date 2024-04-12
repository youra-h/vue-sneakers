<script lang="ts" setup>
import { defineProps } from 'vue'
import type { IBasket } from '@/store/basket';
import { store } from '@/store'

interface IProps {
    item: IBasket
}

defineProps<IProps>()

</script>

<template>
    <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
        <img :src="item.item.imageUrl" alt="Sneakers" class="w-16 h-16">

        <div class="flex flex-col w-full">
            <p>Кросовки Nike</p>

            <div class="flex justify-between mt-2">
                <b>{{ item.item.price }} руб</b>
                <img @click="store.dispatch('basket/remove', item)"
                    class="opacity-40 hover:opacity-100 transition cursor-pointer" src="/close.svg" alt="Remove" />
            </div>
        </div>
    </div>
</template>