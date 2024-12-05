import { createApp } from 'vue'
import * as ElIcons from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router/index';
const app = createApp(App)
app.use(router)
app.mount('#app')

for(const key in ElIcons) {
  app.component(key, ElIcons[key])
}
