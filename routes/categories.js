const Router = require('koa-router');
const Category = require('../models/Category');

const router = new Router();

router.get('/', async (ctx) => {
  await Category.find({}, (err, doc) => {
    if (err) {
      ctx.internalServerError();
    }
    ctx.ok(doc);
  });
});

module.exports = router.routes();
