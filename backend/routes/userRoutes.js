// routes/userRoutes.js
import Router from 'koa-router';
import * as userController from '../controllers/userController.js';

const userRouter = new Router();

// 用户登录
userRouter.post('/api/users/login', userController.login);

// 用户注册
userRouter.post('/api/users/register', userController.register);

// 获取用户信息
userRouter.get('/api/userinfo', userController.getUserInfo);

export {userRouter};
