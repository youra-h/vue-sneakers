<script lang="ts" setup>
import { defineModel, ref, onMounted, watch } from 'vue'
import { store } from '@/store'
import { debounce } from '@/types'

import CardList from '@/components/Card/CardList.vue'
import Spinner from '@/components/Spinner/Spinner.vue'


const selectedSortBy = defineModel<string, string>('sortBy', {
    get: () => store.getters['card/filters'].sortBy,
    set: (value: string) => {
        store.commit('card/setSortBy', value)
        store.dispatch('card/fetchItems')
    }
})

const search = defineModel<string, string>('search', {
    get: () => store.getters['card/filters'].search,
    set: (value: string) => {
        store.commit('card/setSearch', value)
        debounce(() => store.dispatch('card/fetchItems'), 500)
    }
})

const loaded = ref<boolean>(false)

onMounted(async () => {
    await store.dispatch('card/fetchItems')

    console.log('Cards loaded');
})

watch(() => store.getters['card/items'], () => {
    loaded.value = true
})

</script>

<template>
    <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold">Все кроссовки</h2>

        <div class="flex gap-4">
            <select v-model="selectedSortBy" class="py-2 px-3 border border-slate-200 rounded-md outline-none" name=""
                id="">
                <option value="title">По названию</option>
                <option value="price">По цене (дешевые)</option>
                <option value="-price">По цене (дорогие)</option>
            </select>

            <div class="relative">
                <img class="absolute left-3 top-3" src="/search.svg" alt="Search">
                <input type="text" v-model="search" placeholder="Поиск..."
                    class="border border-slate-200 rounded-md py-2 pl-10 pr-4 outline-none focus:border-slate-400" />
            </div>
        </div>
    </div>


    <div class="mt-10 flex-grow">
        <transition name="fade" mode="out-in">
            <div v-if="!loaded" class="flex justify-center">
                <Spinner size="large" color="#afc188" />
            </div>
            <CardList v-else :items="store.getters['card/items']" />
        </transition>

    </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>