import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken'; 
// import bcrypt from 'bcrypt'; 
import { Quiz } from './models/Quiz.js'; 
import { User } from './models/User.js'; 
import cors from '@koa/cors';
const app = new Koa();
const router = new Router();

// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/quiz-battle', {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

// 中间件
app.use(bodyParser());
app.use(cors());
// 用户注册
router.post('/api/users/register', async (ctx) => {
  const { username, email, password } = ctx.request.body;

  try {
    // 查询是否已有该用户
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      ctx.status = 400; // Bad Request
      ctx.body = { message: 'Username already exists' };
      return;
    }

    // 创建新用户
    const user = new User({ username, email, password });
    await user.save();
    ctx.status = 201; // Created
    ctx.body = { message: 'User registered successfully' };
  } catch (error) {
    console.error('Error during registration:', error);
    ctx.status = 500; // Internal Server Error
    ctx.body = { message: 'Failed to register user' };
  }
});

// 用户登录
router.post('/api/users/login', async (ctx) => {
  const { username, password } = ctx.request.body;

  try {
    // 查询用户是否存在
    const user = await User.findOne({ username });
    if (!user) {
      ctx.status = 404; // Not Found
      ctx.body = { message: 'User not found' };
      return;
    }

    // 比较密码
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      ctx.status = 401; // Unauthorized
      ctx.body = { message: 'Invalid credentials' };
      return;
    }

    // 登录成功的逻辑，比如生成JWT等
    ctx.status = 200; // OK
    ctx.body = { message: 'Login successful', userId: user._id };
  } catch (error) {
    console.error('Error during login:', error);
    ctx.status = 500; // Internal Server Error
    ctx.body = { message: 'Login failed' };
  }
});


// 创建选择题
router.post('/api/quizzes', async (ctx) => {
  const { questionId, question, answer, options } = ctx.request.body;

  try {
    // 查询题目是否已存在
    const existingQuiz = await Quiz.findOne({ questionId });
    if (existingQuiz) {
      ctx.status = 400; // Bad Request
      ctx.body = { message: 'Quiz with this questionId already exists' };
      return;
    }

    // 创建新选择题
    const quiz = new Quiz({ questionId, question, answer, options });
    await quiz.save();
    ctx.status = 201; // Created
    ctx.body = { message: 'Quiz created successfully' };
  } catch (error) {
    console.error('Error creating quiz:', error);
    ctx.status = 500; // Internal Server Error
    ctx.body = { message: 'Failed to create quiz' };
  }
});


// 获取题目
router.get('/api/quizzes', async (ctx) => {
  const quizzes = await Quiz.find();
  ctx.body = quizzes;
});



// 设置路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
