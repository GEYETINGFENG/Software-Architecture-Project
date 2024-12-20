import * as commentController from '../controllers/commentController.js';
import Router from 'koa-router';

const commentRouter = new Router();

//发布评论接口
commentRouter.post('/api/article/:articleTitle/comment', commentController.publishComment);

// 删除评论接口
commentRouter.delete('/api/article/:articleTitle/comment', commentController.deleteComment);

export default commentRouter; 
