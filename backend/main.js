import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import mysql from 'mysql2'
import { Article } from './models/Article.js';
import { Quiz } from './models/Quiz.js';
import { User } from './models/User.js'; 
import cors from '@koa/cors';
import mysql_config from './config/mysql_config.json' assert { type: 'json' };
import koaJwt from 'koa-jwt';
import jwt from 'jsonwebtoken'
const secretKey = 'my_app_secret';

const app = new Koa();
const router = new Router();


// MongoDB 连接
mongoose.connect('mongodb://localhost:27017/SoftwareArchitecure', {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });


// 创建 MySQL 连接池
const pool = mysql.createPool({
  host: mysql_config.host, // 你的数据库地址
  user: mysql_config.user, // 你的数据库用户名
  password: mysql_config.password, // 你的数据库密码
  database: mysql_config.database, // 你的数据库名称
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


// 登录接口
router.post('/api/users/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  console.log(`Login attempt with username: ${username}`);
  console.log(`Received encrypted password: ${password}`);

  try {
      const foundUser = await User.findOne({ username });

      if (foundUser) {
          console.log(`User found: ${foundUser.username}`);
          console.log(`Stored encrypted password: ${foundUser.password}`);
          if (foundUser.password === password) {
              console.log('Password match, login successful.');
              const token = jwt.sign({ username: foundUser.username }, secretKey, { expiresIn: '24h' });
               console.log('Generated Token:', token);
              ctx.body = { status: 0, token };
          } else {
              console.log('Password does not match.');
              ctx.status = 401;  // Unauthorized
              ctx.body = { status: 1, msg: 'Username or Password error.' };
          }
      } else {
          console.log('User not found.');
          ctx.status = 401;  // Unauthorized
          ctx.body = { status: 1, msg: 'Username or Password error.' };
      }
  } catch (error) {
      console.error('Error during login:', error);
      ctx.status = 500;
      ctx.body = 'Internal server error';
  }
});


// 注册接口
router.post('/api/users/register', async (ctx) => {
  const { username, email, password } = ctx.request.body;

  try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
          ctx.body = { status: 1, msg: 'User Already Exist.' };
          console.log('User has been created')
      } else {
          const newUser = new User({ username, email ,password});
          await newUser.save();
          ctx.body = { status: 0, msg: 'Success' };
          console.log(`New user created: ${username}`);
      }
  } catch (error) {
      console.error('Error during signup:', error);
      ctx.status = 500;
      ctx.body = 'Internal server error';
  }
});


// 中间件
app.use(bodyParser());
app.use(cors());

// JWT 中间件，排除 /login 路径
app.use(
  koaJwt({
    secret: secretKey
  }).unless({ path:[/^\/api\/users\/login/, /^\/api\/users\/register/] })
);


router.get('/api/userinfo', async (ctx) => {
  try {
    const username=ctx.state.user.username;
    if (!username) {
      ctx.status = 401;
      ctx.body = { message: 'Token does not contain username' };
      return;
    }
    // 查询用户信息
    const user = await User.findOne({ username });
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
    } else {
      ctx.status = 200;
      ctx.body = { user }; // 返回用户信息
    }
  } catch (error) {
    console.error('Error verifying token or fetching user:', error);
    ctx.status = 500;
    ctx.body = { message: 'Internal server error' };
  }
});


// 通过解析 JWT 获取用户名并查询该用户的所有文章
router.get('/api/user/articles', async (ctx) => {
  try {
    const username=ctx.state.user.username;
    // 查询该用户发布的所有文章
    const articles = await Article.find({ author: username });
    if (!articles || articles.length === 0) {
      ctx.status = 404;
      ctx.body = { message: 'No articles found for this user' };
    } else {
      ctx.status = 200;
      ctx.body = { articles }; // 返回查询到的文章
    }
  } catch (error) {
    console.error('Error verifying token or fetching articles:', error);
    ctx.status = 500;
    ctx.body = { message: 'Internal server error' };
  }
});

// 删除文章接口
router.delete('/api/article/:articleTitle', async (ctx) => {
  const { articleTitle } = ctx.params; 

  try {
    // 查找该文章
    const article = await Article.findOne({ title: articleTitle });
    // 如果找不到文章，返回 404 错误
    if (!article) {
      ctx.status = 404;
      ctx.body = { message: 'Article not found' };
      return;
    }
    // 删除该文章
    await Article.deleteOne({ title: articleTitle });
    // 返回删除成功的响应
    ctx.status = 200;
    ctx.body = { message: 'Article deleted successfully' };

  } catch (error) {
    console.error('Error deleting article:', error);
    ctx.status = 500;
    ctx.body = { message: 'Internal server error' };
  }
});


// 删除评论接口
router.delete('/api/article/:articleTitle/comment', async (ctx) => {
  const { articleTitle } = ctx.params;
  const { commentContent } = ctx.request.body;  // 从请求体中获取评论内容

  try {
    // 查找文章
    const article = await Article.findOne({ title: articleTitle });
    if (!article) {
      ctx.status = 404;
      ctx.body = { message: 'Article not found' };
      return;
    }

    // 查找该评论并删除
    const commentIndex = article.comments.findIndex(
      (comment) => comment === commentContent
    );

    if (commentIndex === -1) {
      ctx.status = 404;
      ctx.body = { message: 'Comment not found' };
      return;
    }

    // 删除评论
    article.comments.splice(commentIndex, 1);
    // 保存修改后的文章
    await article.save();

    ctx.status = 200;
    ctx.body = { message: 'Comment deleted successfully' };
  } catch (error) {
    console.error('Error deleting comment:', error);
    ctx.status = 500;
    ctx.body = { message: 'Internal server error' };
  }
});

// 查询接口
router.get('/qsRanking', async (ctx) => {
  const { name, year, location, sort_by, order_by } = ctx.query;
  console.log('Received parameters:', { name, year, location, sort_by, order_by });

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
  let conditions = [];
  let queryParams = [];
  if (validName) {
    conditions.push(`\`Institution_Name\` LIKE CONCAT('%', ?, '%')`);
    queryParams.push(validName);
  }
  if (validLocation && validLocation !== 'All') {
    conditions.push(`\`Location\` LIKE CONCAT('%', ?, '%')`);
    queryParams.push(validLocation);
  }

  if (conditions.length > 0) {
    sql += ` WHERE ` + conditions.join(' AND ');
  }

  // 排序部分
  sql += ` ORDER BY CAST(REPLACE(REPLACE(SUBSTRING_INDEX(\`${validSortBy}\`, '-', 1), '=', ''), '+', '') AS UNSIGNED) ${validOrderBy}`;

  try {
    // 执行查询，传入有效的查询参数
    const [rows] = await pool.promise().query(sql, queryParams);
    // 返回查询结果
    ctx.body = { data: rows };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { error: 'Database query failed' };
  }
});


// 发布新博客的接口
router.post('/api/blog/publish', async (ctx) => {
  try {
    const { title, content } = ctx.request.body;
    const author = ctx.state.user.username;
    // 检查是否提供了所有必要的字段
    if (!title || !author || !content) {
      ctx.status = 400;
      ctx.body = { message: 'Title, author, and content are required' };
      return;
    }

    // 创建一个新的文章对象
    const newArticle = new Article({ title, author, content });

    // 保存文章到数据库
    await newArticle.save();
    ctx.status = 201; // Created
    ctx.body = { message: 'Article published successfully', article: newArticle };

  } catch (error) {
    console.error('Error verifying token or saving article:', error);
    ctx.status = 500;
    ctx.body = { message: 'Failed to publish article' };
  }
});

//获取帖子信息
router.get('/api/blog_info/:title', async (ctx) => {
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
