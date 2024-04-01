// import './assets/main.css'
// import { store, key } from './store/cards'

// import { createApp } from 'vue'
// import App from './App.vue'

// store.dispatch('fetchItems').then(() => {
//   createApp(App).use(store, key).mount('#app')
// })

// createApp(App).use(store, key).mount('#app')

// import { db, account } from '@/utils/appwrite/appwrite'
// import { APP_WRITE_DB_ID, APP_WRITE_COLLECTION_ITEMS } from './utils/appwrite/constants'

// // account.createSession('email', 'password').then(() => {
// //   console.log('Logged in')
// // })

// async function login(email: string, password: string) {
//   try {
//     const response = await account.createEmailPasswordSession('test@mail.ru', 'testtest')
//     console.log(response)
//   } catch (error) {
//     console.error(error)
//   }
// }

// async function test() {
//   await login('test@mail.ru', 'testtest')
//   const data = await db.listDocuments(APP_WRITE_DB_ID, APP_WRITE_COLLECTION_ITEMS)
//   console.log(data)
// }

// test()

import './assets/main.css'
import { store, key } from './store'

import { createApp } from 'vue'
import App from './App.vue'

async function init(): Promise<boolean> {
  const validateSesssion: boolean = await store.dispatch('session/checkSessionValidity')

  if (!validateSesssion) {
    const login: boolean = await store.dispatch('session/login', {
      email: 'test@mail.ru',
      password: 'testtest'
    })

    if (!login) {
      console.error('Failed to login')

      return false
    }
  }

  console.log('Session is valid')

  const userInit = await store.dispatch('user/load')

  if (!userInit) {
    console.error('Failed to load user')

    return false
  }

  console.log('User loaded')

  createApp(App).use(store, key).mount('#app')

  return true
}

init()
