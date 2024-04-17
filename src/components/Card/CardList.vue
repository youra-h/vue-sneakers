<script setup lang="ts">
import { defineProps } from 'vue'
import { type TItems } from './types'
import Card from './Card.vue'

interface IProps {
    items: TItems
}

defineProps<IProps>()

</script>

<template>
    <div class="grid grid-cols-4 gap-5" v-auto-animate>
        <Card v-for="item in items" :item="item" :key="item.$id" />
    </div>
</template>
