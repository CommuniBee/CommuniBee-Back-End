const Koa = require('koa');
const Router = require('koa-router');
const koaLogger = require('koa-logger');
const Cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const Helmet = require('koa-helmet');
const respond = require('koa-respond');
const serve = require('koa-static');
const koaSwagger = require('koa2-swagger-ui');

const logger = require('./common/logger');

const app = new Koa();
const router = new Router();

app.use(
  koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: 'http://localhost:3000/api-specs.json', // example path to json
    },
  }),
);

app.use(Helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(koaLogger(str => logger.info(str)));
}

app.use(Cors());
app.use(bodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: (err, ctx) => {
    ctx.throw('Invalid or too large JSON', 422);
  },
}));

app.use(respond());

app.use(serve(`${__dirname}/public`));

// API routes
require('./routes')(router);

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
