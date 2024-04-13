<script setup lang="ts">
import Layer from '@/components/Layer/Layer.vue';
import DrawerHeader from './DrawerHeader.vue';
import CartItemList from '@/components/CartItem/CartItemList.vue';
import { computed } from 'vue'
import { store } from '@/store'

const totalPrice = computed < number > (() => store.getters['basket/items'].totalPrice())
const tax = computed < number > (() => totalPrice.value * 0.05)
</script>

<template>
    <Layer />
    <div class="flex flex-col bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
        <DrawerHeader />

        <CartItemList />

        <div class="flex flex-col gap-4 mt-7">

            <div class="flex gap-2">
                <span>Итого:</span>
                <div class="flex-1 border-b border-dashed"></div>
                <b>{{ totalPrice }} руб.</b>
            </div>

            <div class="flex gap-2">
                <span>Налог 5%:</span>
                <div class="flex-1 border-b border-dashed"></div>
                <b>{{ tax.toFixed(2) }} руб.</b>
            </div>

            <button disabled
                class="bg-lime-500 w-full rounded-xl py-3 mt-4 text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-300 cursor-pointer">
                Оформить заказ
            </button>
        </div>


    </div>
</template>