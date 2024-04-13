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
    <div class="flex flex-col border border-slate-200 rounded-xl p-4 gap-4">
        <div class="flex gap-4 items-center">
            <img :src="item.item.imageUrl" alt="Sneakers" class="w-16 h-16">

            <div class="flex flex-col w-full">
                <p>Кросовки Nike</p>

                <div class="flex justify-between mt-2">
                    <b>{{ item.item.price }} руб</b>
                </div>
            </div>
        </div>
        <div class="flex justify-between mt-3">
            <div class="flex justify-between items-center basis-24">
                <button @click="store.dispatch('basket/add', item.item)"
                    class="border border-slate-300 w-7 h-full rounded-md transition opacity-40 hover:opacity-100">+</button>
                <b>{{ item.count }}</b>
                <button @click="store.dispatch('basket/remove', { item, dec: true })"
                    class="border border-slate-300 w-7 h-full rounded-md transition opacity-40 hover:opacity-100">-</button>
            </div>
            <img @click="store.dispatch('basket/remove', item)"
                class="opacity-40 hover:opacity-100 transition cursor-pointer" src="/close.svg" alt="Remove" />
        </div>
    </div>
</template>