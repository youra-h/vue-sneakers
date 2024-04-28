<script lang="ts" setup>
import { defineModel } from 'vue'

const login = defineModel<string>('login')
const password = defineModel<string>('password')
</script>

<template>
    <div class="min-w-80">
        <div>
            <input type="text" v-model="login" placeholder="Введите email..."
                class="w-full border border-slate-200 rounded-md py-2 px-2 pr-4 outline-none focus:border-slate-400" />
        </div>

        <div class="mt-5">
            <input type="password" v-model="password" placeholder="Введите пароль..."
                class="w-full border border-slate-200 rounded-md py-2 px-2 pr-4 outline-none focus:border-slate-400" />
        </div>

        <div class="mt-5 flex">
            <router-link to="/register" class="flex-grow text-slate-600">Зарегистрироваться</router-link>
            <button class="bg-slate-600 text-white py-2 px-4 rounded-md">Войти</button>
        </div>
    </div>
</template>