import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { connectMongoDB} from './config/database.js';
import * as userController from './controllers/userController.js';
import * as universityController from './controllers/universityController.js';
import * as articleController from './controllers/articleController.js';
import * as commentController from './controllers/commentController.js';
import { jwtMiddleware } from './middlewares/jwtMiddleware.js';
const app = new Koa();
const router = new Router();

// 链接数据库
connectMongoDB();

// 中间件
app.use(bodyParser());
app.use(cors());
app.use(jwtMiddleware);// JWT 中间件，排除 /login 路径

// 登录接口
router.post('/api/users/login',userController.login );

// 注册接口
router.post('/api/users/register', userController.register);

// 查询院校排名接口
router.get('/qsRanking', universityController.getUniversityRanking);

// 获取用户信息接口
router.get('/api/userinfo', userController.getUserInfo);

// 通过解析 JWT 获取用户名并查询该用户的所有文章
router.get('/api/user/articles',articleController.getUserArticles );

// 通过查询所有文章
router.get('/api/articles', articleController.getArticles);

// 删除文章接口
router.delete('/api/article/:articleTitle', articleController.deleteArticle);

// 发布新文章的接口
router.post('/api/blog/publish',articleController.publishArticle );

//点赞帖子接口
router.post('/api/article/:articleTitle/like',articleController.likeArticles );

//收藏帖子接口
router.post('/api/article/:articleTitle/favorite', articleController.favoriteArticle);

//发布评论接口
router.post('/api/article/:articleTitle/comment', commentController.publishComment);

// 删除评论接口
router.delete('/api/article/:articleTitle/comment', commentController.deleteComment);

// 设置路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
