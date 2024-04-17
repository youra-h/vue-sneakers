<script lang="ts" setup>
import { defineProps } from 'vue'
import { type IInfoBlock } from './types'

defineProps<IInfoBlock>()

</script>

<template>
    <div class="flex flex-col items-center text-center flex-grow justify-center">
        <img :src="image" :alt="title" height="80" width="80">
        <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
        <p class="text-gray-400 mt-2">{{ description }}</p>
    </div>
</template>