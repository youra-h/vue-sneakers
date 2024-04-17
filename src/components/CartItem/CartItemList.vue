<script setup lang="ts">
import CartItem from './CartItem.vue'
import { store } from '@/store'
import type { ICart } from '@/store/cart';
import { ref } from 'vue';

const items = ref<ICart[]>(store.getters['cart/items'].documents)

</script>

<template>
    <div class="flex flex-col gap-4 flex-grow" v-auto-animate>
        <CartItem v-for="item in items" :item="item" :key="item.$id" />
    </div>
</template>