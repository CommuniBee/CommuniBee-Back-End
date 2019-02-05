const Router = require('koa-router');
const Region = require('../models/region');
const SubRegion = require('../models/subregion');
const DBMethods = require('./base-db-methods');
const auth = require('../common/auth');

const router = new Router();

const getRecursiveRegionList = async (ctx) => {
  try {
    const docs = await SubRegion.find().populate({
      path: 'region',
      model: Region,
    });
    ctx.ok(docs);
  } catch (error) {
    DBMethods.handleErrors(ctx, error);
  }
};

router
  .get('/', getRecursiveRegionList)
  .get('/:id', DBMethods.getById(SubRegion))

  .use(auth.validateFRCTeamPermissions)
  .post('/', DBMethods.create(SubRegion))
  .put('/:id', DBMethods.update(SubRegion))
  .delete('/:id', DBMethods.remove(SubRegion));

module.exports = router.routes();
