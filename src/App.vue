<script setup lang="ts">
import { onMounted, ref, watch, reactive } from 'vue'
import Header from './components/Header/Header.vue'
import CardList from './components/Card/CardList.vue'
import { type TItems } from './components/Card/types.ts'
import Drawer from './components/Drawer/Drawer.vue'
import axios from 'axios'
import { type IFilters, Search, debounce } from './types.ts'

const items = ref<TItems>([])

const filters: IFilters = reactive({
    sortBy: 'title',
    search: new Search
})

const fetchItems = async () => {
    try {
        const params: { title?: string, sortBy?: string } = {};

        if (filters.search.value) {
            params.title = filters.search;
        }

        if (filters.sortBy) {
            params.sortBy = filters.sortBy;
        }

        const { data } = await axios.get('https://bb50be424c3a9a73.mokky.dev/items', {
            params
        })

        items.value = data as TItems
    } catch (error) {
        console.error(error)
    }
}

onMounted(fetchItems)

watch(filters, fetchItems)

const updateSearch = debounce((value: string) => {
    filters.search.value = value
}, 500)

</script>

<template>
    <!-- <Drawer /> -->
    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">

        <Header />

        <div class="p-10">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-3xl font-bold">Все кроссовки</h2>

                <div class="flex gap-4">
                    <select v-model="filters.sortBy" class="py-2 px-3 border border-slate-200 rounded-md outline-none"
                        name="" id="">
                        <option value="title">По названию</option>
                        <option value="price">По цене (дешевые)</option>
                        <option value="-price">По цене (дорогие)</option>
                    </select>

                    <div class="relative">
                        <img class="absolute left-3 top-3" src="/search.svg" alt="Search">
                        <input type="text" @input="updateSearch($event.target.value)" placeholder="Поиск..."
                            class="border border-slate-200 rounded-md py-2 pl-10 pr-4 outline-none focus:border-slate-400" />
                    </div>
                </div>
            </div>


            <div class="mt-10">
                <CardList :items="items" />
            </div>
        </div>
    </div>
</template>
