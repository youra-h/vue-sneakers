<script setup lang="ts">
import Layer from '@/components/Layer/Layer.vue';
import DrawerHeader from './DrawerHeader.vue';
import InfoBlock from '@/components/Info/InfoBlock.vue';
import CartItemList from '@/components/CartItem/CartItemList.vue';
import { computed, ref } from 'vue'
import { store } from '@/store'

let isSendingOrders = ref<boolean>(false)

const send = async () => {
    isSendingOrders.value = true

    try {
        if (await store.dispatch('cart/send')) {
            console.log('send orders');
            alert('send orders');
        }
    } catch (error) {
        console.log(error);
    } finally {
        isSendingOrders.value = false
    }
}

const totalPrice = computed<number>(() => store.getters['cart/items'].totalPrice())
const tax = computed<number>(() => totalPrice.value * 0.05)
const disabled = computed<boolean>(() => !store.getters['cart/items'].is() || isSendingOrders.value)

</script>

<template>
    <Layer />
    <div class="flex flex-col bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
        <DrawerHeader />

        <InfoBlock v-if="!totalPrice" title="Корзина пустая"
            description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ" image="./package-icon.png" />

        <div v-else class="flex flex-col flex-grow">
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

                <button :disabled="disabled" @click="send"
                    class="bg-lime-500 w-full rounded-xl py-3 mt-4 text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-300 cursor-pointer">
                    Оформить заказ
                </button>
            </div>
        </div>


    </div>
</template>