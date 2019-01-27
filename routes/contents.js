const Router = require('koa-router');
const Content = require('../models/content');
const DBMethods = require('./base-db-methods');
const Category = require('../models/category');
const auth = require('../common/auth');

const router = new Router();

const getContents = async (ctx) => {
  try {
    const requestedField = await Content.find().select('fileName title tags category information')
      .populate({
        path: 'category',
        model: Category,
      });
    DBMethods.handleDocResponse(ctx, requestedField);
  } catch (error) {
    DBMethods.handleErrors(ctx, error);
  }
};


const getFile = async (ctx) => {
  try {
    const requestedField = await Content.findById(ctx.params.id).select('file');
    DBMethods.handleDocResponse(ctx, requestedField);
  } catch (error) {
    DBMethods.handleErrors(ctx, error);
  }
};

router.get('/', getContents)
  .get('/:id', DBMethods.getById(Content))
  .get('/:id/file', getFile)

  .use(auth.authenticate)
  .post('/', DBMethods.create(Content))

  .use(auth.validateFRCTeamPermissions)
  .put('/:id', DBMethods.update(Content))
  .delete('/:id', DBMethods.remove(Content));

module.exports = router.routes();
