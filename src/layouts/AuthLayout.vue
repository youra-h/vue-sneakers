<script lang="ts" setup>
import { computed } from 'vue';
const images: Array<string> = ['/screensaver1.png', '/screensaver2.png', '/screensaver3.png'];

const randomImage = computed<string>(() => images[Math.floor(Math.random() * images.length)]);
</script>

<template>
    <div class="grid lg:grid-cols-2 h-screen">
        <div class="flex h-full flex-col justify-center items-center">
            <slot></slot>
        </div>
        <div class="bg-slate-700 justify-center items-center object-cover hidden lg:flex"
            :style="{ backgroundImage: 'url(' + randomImage + ')' }">
        </div>
    </div>
</template>
<style scoped>
.object-cover {
    background: url('/screensaver3.png') repeat repeat;
    background-size: auto auto;
}
</style>