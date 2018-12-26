const Router = require('koa-router');
const VolunteeringRequest = require('../models/VolunteeringRequest');
const DBMethods = require('./baseDBMethods');
const auth = require('../common/auth');

const router = new Router();

router.get('/', DBMethods.list(VolunteeringRequest))
  .get('/:id', DBMethods.getById(VolunteeringRequest))

  .use(auth.authenticate)
  .post('/', DBMethods.create(VolunteeringRequest))

  .use(auth.modificationIsAllowed)
  .put('/:id', DBMethods.update(VolunteeringRequest))
  .delete('/:id', DBMethods.remove(VolunteeringRequest));

module.exports = router.routes();
