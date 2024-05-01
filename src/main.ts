import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { store, key } from './store'
import { router } from './routes'

import { SnackbarService, Vue3Snackbar } from 'vue3-snackbar'
import 'vue3-snackbar/styles'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(store, key)
app.use(router)
app.use(autoAnimatePlugin)
app.use(SnackbarService, {
    component: Vue3Snackbar,
    container: '#snackbar'
})

app.mount('#app')
