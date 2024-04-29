<script lang="ts" setup>
import { computed } from 'vue';
const images: Array<string> = ['/screensaver1.png', '/screensaver2.png', '/screensaver3.png'];

const randomImage = computed<string>(() => images[Math.floor(Math.random() * images.length)]);
</script>

<template>
    <div class="grid grid-cols-2 h-screen">
        <div>
            <slot></slot>
        </div>
        <div class="bg-slate-700 flex justify-center items-center object-cover"
            :style="{ backgroundImage: 'url(' + randomImage + ')' }">
        </div>
    </div>
</template>
<style scoped>
.object-cover {
    background: url('/screensaver3.png') repeat repeat;
    background-size: 70% 70%;
}
</style>