import Router from 'koa-router';
import * as userService from '../Service/userService.js';

const userRouter = new Router();

// 用户登录
userRouter.post('/api/users/login', userService.login);

// 用户注册
userRouter.post('/api/users/register', userService.register);

// 获取用户信息
userRouter.get('/api/userinfo', userService.getUserInfo);

export default userRouter; 