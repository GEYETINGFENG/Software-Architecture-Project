

import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index'; // 确保路径正确
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App); // 创建应用实例

app.use(router); // 使用路由
app.use(ElementPlus); // 使用 Element Plus

app.mount('#app'); // 挂载应用