<script setup lang="ts">
import { ref, provide } from 'vue'
import Header from '@/components/Header/Header.vue'
import Drawer from '@/components/Drawer/Drawer.vue'
import { type IDrawerActions } from '@/components/Drawer/types'

const drawerState = ref<boolean>(false)

const drawerActions: IDrawerActions = {
    open: () => {
        drawerState.value = true
    },
    close: () => {
        drawerState.value = false
    }
}

provide('drawerActions', drawerActions)
</script>

<template>
    <Drawer v-if="drawerState" />

    <Header />

    <div class="p-10 flex flex-col flex-grow">
        <slot></slot>
    </div>
</template>