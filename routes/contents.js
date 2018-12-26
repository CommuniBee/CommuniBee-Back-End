const Router = require('koa-router');
const Content = require('../models/content');
const DBMethods = require('../controllers/base-db-methods');

const router = new Router();

router.get('/', DBMethods.list(Content))
  .get('/:id', DBMethods.getById(Content))
  .post('/', DBMethods.create(Content))
  .put('/:id', DBMethods.update(Content))
  .delete('/:id', DBMethods.remove(Content));

module.exports = router.routes();
