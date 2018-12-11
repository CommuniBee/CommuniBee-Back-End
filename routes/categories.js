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

router.post('/', async (ctx) => {
  const category = Category(ctx.request.body);

  try {
    const doc = await category.save({
      validateBeforeSave: true,
    });
    ctx.ok(doc);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      ctx.badRequest('Invalid document');
    } else {
      ctx.internalServerError();
    }
  }
});

module.exports = router.routes();
