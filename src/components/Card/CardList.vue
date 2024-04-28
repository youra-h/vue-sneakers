<script setup lang="ts">
import { defineProps } from 'vue'
import { type TItems } from '@/store/card'
import Card from './Card.vue'

interface IProps {
    items: TItems
}

defineProps<IProps>()

</script>

<template>
    <div class="grid grid-cols-5 gap-5" v-auto-animate>
        <Card v-for="item in items" :item="item" :key="item.$id" />
    </div>
</template>
