<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
import { type TSize, type IProps, sizeMap } from './types'

const props = withDefaults(defineProps<IProps>(), {
    size: 'medium' as TSize,
    color: '#fff'
})

const spinnerSize: number = sizeMap[props.size as TSize]
</script>


<template>
    <span class="loader" :style="{ '--spinner-size': spinnerSize + 'px', '--color': props.color }"></span>
</template>

<style scoped>
.loader {
    width: var(--spinner-size);
    height: var(--spinner-size);
    border: 5px solid var(--color);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>