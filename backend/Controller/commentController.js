import * as commentService from '../Service/commentService.js';
import Router from 'koa-router';

const commentRouter = new Router();

//发布评论接口
commentRouter.post('/api/article/:articleTitle/comment', commentService.publishComment);

// 删除评论接口
commentRouter.delete('/api/article/:articleTitle/comment', commentService.deleteComment);

export default commentRouter;
