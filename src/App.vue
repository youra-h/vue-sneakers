<script setup>
import Header from './components/Header/Header.vue'
import CardList from './components/Card/CardList.vue'
import Drawer from './components/Drawer/Drawer.vue'
</script>

<template>
    <!-- <Drawer /> -->
    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">

        <Header />

        <div class="p-10">
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-3xl font-bold">Все кроссовки</h2>

                <div class="flex gap-4">
                    <select class="py-2 px-3 border border-slate-200 rounded-md outline-none" name="" id="">
                        <option value="">По названию</option>
                        <option value="">По цене (дешевые)</option>
                        <option value="">По цене (дорогие)</option>
                    </select>

                    <div class="relative">
                        <img class="absolute left-3 top-3" src="/search.svg" alt="Search">
                        <input type="text" placeholder="Поиск..."
                            class="border border-slate-200 rounded-md py-2 pl-10 pr-4 outline-none focus:border-slate-400" />
                    </div>
                </div>
            </div>
            <CardList />
        </div>
    </div>
</template>
