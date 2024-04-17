<script lang="ts" setup>
import CardList from '@/components/Card/CardList.vue'
import { store } from '@/store'
</script>

<template>
    <div>
        <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold">Мои закладки</h2>
        </div>

        <div class="mt-10">
            <CardList :items="store.getters['card/favorites']" />
        </div>
    </div>
</template>