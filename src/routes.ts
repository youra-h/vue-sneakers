import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, Router } from 'vue-router'
import { store } from '@/store'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Favorites from '@/pages/Favorites.vue'
import NotFound from '@/pages/NotFound.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    },
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
            layout: 'auth',
            requiresVisitor: true
        }
    }
]

export const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(
    async (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ) => {
        // Check if the route requires authentication
        if (to.meta.requiresVisitor) {
            const validateSession: boolean = await store.dispatch('session/checkSessionValidity')

            if (validateSession) {
                router.back()
                return
            }
        }

        next()
    }
)
