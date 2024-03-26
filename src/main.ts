import './assets/main.css'
import { store, key } from './store/cards'

import { createApp } from 'vue'
import App from './App.vue'

store.dispatch('fetchItems').then(() => {
  createApp(App).use(store, key).mount('#app')
})

createApp(App).use(store, key).mount('#app')
