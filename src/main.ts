import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css' // Import de Tailwind

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)  // On active Pinia
app.use(router) // On active le Routeur

app.mount('#app')