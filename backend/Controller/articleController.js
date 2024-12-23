import * as articleService from '../Service/articleService.js';
import Router from 'koa-router';

const articleController = new Router();
// 通过解析 JWT 获取用户名并查询该用户的所有文章
articleController.get('/api/user/articles',articleService.getUserArticles );

// 通过查询所有文章
articleController.get('/api/articles', articleService.getArticles);

// 删除文章接口
articleController.delete('/api/article/:articleTitle', articleService.deleteArticle);

// 发布新文章的接口
articleController.post('/api/blog/publish',articleService.publishArticle );

//点赞文章接口
articleController.post('/api/article/:articleTitle/like',articleService.likeArticles );

//收藏文章接口
articleController.post('/api/article/:articleTitle/favorite', articleService.favoriteArticle);

export default articleController; 
