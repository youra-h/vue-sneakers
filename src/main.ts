import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { store, key } from './store'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).use(store, key).use(autoAnimatePlugin).mount('#app')
