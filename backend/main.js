import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { connectMongoDB} from './config/database.js';
import userController from './Controller/userController.js';
import universityController from './Controller/universityController.js';
import articleController from './Controller/articleController.js';
import commentController from './Controller/commentController.js';
import { jwtMiddleware } from './Middlewares/jwtMiddleware.js';
const app = new Koa();

// 链接数据库
connectMongoDB();

// 中间件
app.use(bodyParser());
app.use(cors());
app.use(jwtMiddleware);// JWT 中间件，排除 /login 路径

// 设置路由
app.use(userController.routes()).use(userController.allowedMethods());
app.use(universityController.routes()).use(universityController.allowedMethods());
app.use(articleController.routes()).use(articleController.allowedMethods());
app.use(commentController.routes()).use(commentController.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
