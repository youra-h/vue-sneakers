import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, Router } from 'vue-router'

import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Favorites from '@/pages/Favorites.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: Favorites
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            layout: 'auth'
        }
    }
]

export const router: Router = createRouter({
    history: createWebHistory(),
    routes
})
