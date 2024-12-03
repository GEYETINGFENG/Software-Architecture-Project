import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import mysql from 'mysql2'
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


// 创建 MySQL 连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // 你的数据库用户名
  password: '123456', // 你的数据库密码
  database: 'qs_ranking', // 你的数据库名称
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试 MySQL 连接
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Successfully connected to MySQL!');
  connection.release();  // 释放连接回连接池
});


// 中间件
app.use(bodyParser());
app.use(cors());

// 查询接口
router.get('/University', async (ctx) => {
  const { year, name, location, sort_by, order_by } = ctx.query;

  // 根据年份选择表名
  let tableName = year === '2024' ? '2024university_rankings' : '2025university_rankings';

  // 确保 name 和 location 为空时默认设置为空字符串 ""
  const validName = name || '';
  const validLocation = location || '';

  // 排序字段，默认为 "This_Year_Rank" 和 "ASC"
  const validSortBy = sort_by && sort_by !== '' ? sort_by : 'This_Year_Rank';
  const validOrderBy = order_by && order_by !== '' ? order_by : 'ASC';

  // 构建 SQL 查询
  let sql = `SELECT * FROM \`${tableName}\` `;

  // 根据参数条件构建查询语句
  if (validName) {
    sql += ` WHERE \`Institution_Name\` LIKE CONCAT('%', ?, '%')`;
  }
  if (validLocation) {
    sql += ` WHERE \`Location\` LIKE CONCAT('%', ?, '%')`;
  }

  // 排序部分
  sql += `ORDER BY CAST(REPLACE(SUBSTRING_INDEX(\`${validSortBy}\`, ')', 1), ',', '') AS UNSIGNED) ${validOrderBy}`;


  try {
    // 执行查询，传入有效的查询参数
    const [rows] = await pool.promise().query(sql, [validName, validLocation].filter(Boolean));

    // 返回查询结果
    ctx.body = { data: rows };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Database query failed' };
  }
});

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
