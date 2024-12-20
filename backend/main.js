import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { connectMongoDB} from './config/database.js';
import userRouter from './routes/userRoutes.js';
import universityRouter from './routes/universityRoutes.js';
import articleRouter from './routes/articleRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import { jwtMiddleware } from './middlewares/jwtMiddleware.js';
const app = new Koa();

// 链接数据库
connectMongoDB();

// 中间件
app.use(bodyParser());
app.use(cors());
app.use(jwtMiddleware);// JWT 中间件，排除 /login 路径

// 设置路由
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(universityRouter.routes()).use(universityRouter.allowedMethods());
app.use(articleRouter.routes()).use(articleRouter.allowedMethods());
app.use(commentRouter.routes()).use(commentRouter.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
