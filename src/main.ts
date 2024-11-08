import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// Add the necessary CSS

import {createBootstrap} from 'bootstrap-vue-next'
import './assets/main.css'
import './assets/config.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// @ts-ignore
app.use(createBootstrap({components: true, directives: true}))

app.mount('#app')
