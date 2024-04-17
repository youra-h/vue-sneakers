<script lang="ts" setup>
import { defineModel } from 'vue'
import CardList from '@/components/Card/CardList.vue'
import { store } from '@/store'
import { debounce } from '@/types'

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
</script>

<template>
    <div>
        <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold">Все кроссовки</h2>

            <div class="flex gap-4">
                <select v-model="selectedSortBy" class="py-2 px-3 border border-slate-200 rounded-md outline-none"
                    name="" id="">
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


        <div class="mt-10">
            <CardList :items="store.getters['card/items']" />
        </div>
    </div>
</template>