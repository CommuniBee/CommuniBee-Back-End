const Koa        = require('koa')
const Router     = require('koa-router')
const Logger     = require('koa-logger')
const Cors       = require('@koa/cors')
const BodyParser = require('koa-bodyparser')
const Helmet     = require('koa-helmet')
const respond    = require('koa-respond')
const serve      = require('koa-static');
const koaSwagger = require('koa2-swagger-ui')

const app = new Koa()
const router = new Router()

app.use(
  koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: 'http://petstore.swagger.io/v2/swagger.json', // example path to json
    },
  }),
);


app.use(Helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors())
app.use(BodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}))

app.use(respond())

app.use(serve(__dirname + '/public'));

// API routes
require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
