import './assets/main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import Chart from 'chart.js/auto'; // 使用 chart.js/auto 代替 chart.js

const app = createApp(App)
const pinia = createPinia();

app.use(router)
app.use(pinia)

app.config.globalProperties.$Chart = Chart; // 移到 app 變數創建之後

app.mount('#app')
