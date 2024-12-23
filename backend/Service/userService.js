import { User } from '../Models/User.js';
import jwt from 'jsonwebtoken';
const secretKey = 'my_app_secret';

// 登录接口
const login = async (ctx) => {
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
};

// 注册接口
const register = async (ctx) => {
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
  };

// 获取用户信息
const getUserInfo = async (ctx) => {
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
  };
  export { login,register,getUserInfo };