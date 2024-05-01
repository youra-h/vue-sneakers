<script lang="ts" setup>
import { computed, defineModel, ref } from 'vue'
import { store } from '@/store'
import { useRouter } from 'vue-router'
import { useSnackbar } from "vue3-snackbar"
import { type AppwriteException } from 'appwrite'
import UserDataServices from '@/services/UserDataServices'

const snackbar = useSnackbar()
const router = useRouter()

const login = defineModel<string>('login')
const password = defineModel<string>('password')

const isLoading = ref<boolean>(false)
const hasError = ref<boolean>(false)

const submit = async () => {
    isLoading.value = true

    try {
        await store.dispatch('session/login', {
            email: login.value,
            password: password.value
        })

        hasError.value = false

        await UserDataServices()

        router.push({ name: 'home' })
    } catch (err: unknown) {
        hasError.value = true

        const e = err as AppwriteException

        snackbar.add({
            type: 'error',
            text: e.message
        })
    } finally {
        isLoading.value = false
    }
}

const classInput = computed(() => {
    return {
        'border-red-300': hasError.value,
        'border-slate-200': !hasError.value
    }
})

</script>

<template>
    <div class="min-w-80">
        <form @submit.prevent="submit">
            <div>
                <input :disabled="isLoading" type="text" v-model="login" placeholder="Введите email..."
                    class="w-full border rounded-md py-2 px-2 pr-4 outline-none focus:border-slate-400"
                    :class="classInput" />
            </div>


            <div class="mt-5">
                <input :disabled="isLoading" type="password" v-model="password" placeholder="Введите пароль..."
                    class="w-full border rounded-md py-2 px-2 pr-4 outline-none focus:border-slate-400"
                    :class="classInput" />
            </div>

            <div class=" mt-5 text-end">
                <button type="submit" :disabled="isLoading"
                    class="bg-slate-600 text-white py-2 px-4 rounded-md disabled:bg-slate-200">Войти</button>
            </div>
        </form>

        <div class="mt-5 text-end">
            <router-link :to="{ name: 'register' }"
                class="flex-grow text-slate-600 text-sm">Зарегистрироваться</router-link>
        </div>
    </div>
</template>