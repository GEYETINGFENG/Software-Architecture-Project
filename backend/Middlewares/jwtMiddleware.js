import koaJwt from 'koa-jwt';

const secretKey = 'my_app_secret';

const jwtMiddleware = koaJwt({
  secret: secretKey,
}).unless({ path: [/^\/api\/users\/login/, /^\/api\/users\/register/] });

export{jwtMiddleware}