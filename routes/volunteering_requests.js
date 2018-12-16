const Router = require('koa-router');
const VolunteeringRequest = require('../models/VolunteeringRequest');
const DBMethods = require('./baseDBMethods');
const auth = require('../common/auth');

const router = new Router();

router.get('/', DBMethods.list(VolunteeringRequest))
  .get('/:id', DBMethods.getById(VolunteeringRequest))
  .post('/', auth.authenticate, DBMethods.create(VolunteeringRequest))
  .put('/:id', auth.authenticate, auth.modificationIsAllowed, DBMethods.update(VolunteeringRequest))
  .delete('/:id', auth.authenticate, auth.modificationIsAllowed, DBMethods.remove(VolunteeringRequest));

module.exports = router.routes();
