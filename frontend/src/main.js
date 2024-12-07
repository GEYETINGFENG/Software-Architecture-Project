import { createApp } from 'vue'
import * as ElIcons from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router/index';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.mount(ElementPlus)
app.mount('#app')

for(const key in ElIcons) {
  app.component(key, ElIcons[key])
}
