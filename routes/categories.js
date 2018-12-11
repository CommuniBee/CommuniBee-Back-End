const Router = require('koa-router');
const Category = require('../models/Category');

const router = new Router();

const getCategories = async (ctx) => {
  try {
    const docs = await Category.find({});
    ctx.ok(docs);
  } catch (err) {
    ctx.internalServerError();
  }
};

const addCategory = async (ctx) => {
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
};

router.get('/', getCategories)
  .post('/', addCategory);

module.exports = router.routes();
