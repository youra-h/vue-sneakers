<script setup lang="ts">
import CartItem from './CartItem.vue'
import { store } from '@/store'
import type { IBasket } from '@/store/basket';
import { ref } from 'vue';

const items = ref<IBasket[]>(store.getters['basket/items'].documents)

</script>

<template>
    <div class="flex flex-col gap-4 flex-1">
        <CartItem v-for="item in items" :item="item" :key="item.$id" />
    </div>
</template>