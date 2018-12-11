const Router = require('koa-router');
const Content = require('../models/Content');
const DBMethods = require('./baseDBMethods');

const router = new Router();

router.get('/', async (ctx) => {
  await DBMethods.list(ctx, Content);
})
  .post('/', async (ctx) => {
    await DBMethods.create(ctx, Content);
  })
  .put('/', async (ctx) => {
    await DBMethods.update(ctx, Content);
  })
  .delete('/', async (ctx) => {
    await DBMethods.remove(ctx, Content);
  });

module.exports = router.routes();
