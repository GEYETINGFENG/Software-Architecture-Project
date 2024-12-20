import * as articleController from '../controllers/articleController.js';
import Router from 'koa-router';

const articleRouter = new Router();
// 通过解析 JWT 获取用户名并查询该用户的所有文章
articleRouter.get('/api/user/articles',articleController.getUserArticles );

// 通过查询所有文章
articleRouter.get('/api/articles', articleController.getArticles);

// 删除文章接口
articleRouter.delete('/api/article/:articleTitle', articleController.deleteArticle);

// 发布新文章的接口
articleRouter.post('/api/blog/publish',articleController.publishArticle );

//点赞文章接口
articleRouter.post('/api/article/:articleTitle/like',articleController.likeArticles );

//收藏文章接口
articleRouter.post('/api/article/:articleTitle/favorite', articleController.favoriteArticle);

export default articleRouter; 
