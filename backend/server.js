import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import { Article } from './models/Article.js'; 
import { User } from './models/User.js'; 
import cors from '@koa/cors';
const app = new Koa();
const router = new Router();

// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/blog', {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

// 中间件
app.use(bodyParser());
app.use(cors());

// 发布新帖子 
router.post('/api/blog/add', async (ctx) => {
  const { articleId, title, author, context } = ctx.request.body;

  try {
    // 查询是否已有该用户
    const existingTitle = await User.findOne({ title });
    if (existingTitle) {
      ctx.status = 400; // Bad Request
      ctx.body = { message: 'Title already exists' };
      return;
    }

    // 创建新用户
    const article = new Article({ articleId, title, author, context });
    await article.save();
    ctx.status = 201; // Created
    ctx.body = { message: 'article registered successfully' };
  } catch (error) {
    console.error('Error during registration:', error);
    ctx.status = 500; // Internal Server Error
    ctx.body = { message: 'Failed to register user' };
  }
});

//拉取帖子
router.get('/api/blog/get', async (ctx) => {
    try {
      const articles = await Article.find(); // 假设 Article 模型已经定义
      ctx.status = 200;
      ctx.body = articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      ctx.status = 500;
      ctx.body = { message: 'Failed to fetch articles' };
    }
  });

// 设置路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});