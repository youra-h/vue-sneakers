<script setup>
import Card from '@/components/Card/Card.vue'
</script>

<template>
    <div class="grid grid-cols-4 gap-5">
        <Card image-url="/sneakers/sneakers-1.jpg" title="Мужские кроссовки" :price="45345"
            :onAdd="() => console.log('qwe')" />
    </div>
</template>