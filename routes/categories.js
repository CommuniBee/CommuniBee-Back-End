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

  await category.validate().then(async () => {
    await category.save().then(async (doc) => {
      await ctx.ok(doc);
    }, async (saveRejectionReason) => {
      console.error(saveRejectionReason);

      await ctx.internalServerError();
    });
  }, async (validateRejectionReason) => {
    console.error('Invalid document');
    console.error(validateRejectionReason);

    await ctx.badRequest('Invalid document');
  });
});

module.exports = router.routes();
