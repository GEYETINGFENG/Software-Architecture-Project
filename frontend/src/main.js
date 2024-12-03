import './assets/main.css'

import { createApp } from 'vue'
import MainPage from './components/MainPage.vue';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

createApp(MainPage).mount('#app');
app.mount('#app')