const Router = require('koa-router');
const Category = require('../models/Category');

const router = new Router();

/*router.get('/', async (ctx) => {
  await Category.find({}, async (err, doc) => {
    if (err) {
      await ctx.internalServerError();
    }
    await ctx.ok(doc);
  });
});*/

router.get('/', async (ctx) => {
  try {
    const docs = await Category.find({});
    ctx.ok(docs);
  } catch (err) {
    ctx.internalServerError();
  }
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
