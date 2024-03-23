<script setup lang="ts">
import { defineProps } from 'vue'
import { type TItems } from './types.ts'
import Card from './Card.vue'

interface IProps {
    items: TItems
}

defineProps<IProps>()

</script>

<template>
    <div class="grid grid-cols-4 gap-5">
        <Card v-for="item in items" :key="item.id" :id="item.id" :image-url="item.imageUrl" :title="item.title"
            :price="item.price" />
    </div>
</template>
