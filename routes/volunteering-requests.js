const Router = require('koa-router');
const VolunteeringRequest = require('../models/volunteering-request');
const DBMethods = require('./base-db-methods');
const auth = require('../common/auth');

const router = new Router();

router.get('/', DBMethods.list(VolunteeringRequest))
  .get('/:id', DBMethods.getById(VolunteeringRequest))

  .use(auth.authenticate)
  .post('/', auth.injectCreatedByUserId, DBMethods.create(VolunteeringRequest))

  .use(auth.modificationIsAllowed)
  .put('/:id', DBMethods.update(VolunteeringRequest))
  .delete('/:id', DBMethods.remove(VolunteeringRequest));

module.exports = router.routes();
