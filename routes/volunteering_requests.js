const Router = require('koa-router');
const VolunteeringRequest = require('../models/VolunteeringRequest');
const DBMethods = require('./baseDBMethods');

const router = new Router();

router.get('/', DBMethods.list(VolunteeringRequest))
  .get('/:id', DBMethods.getById(VolunteeringRequest))
  .post('/', DBMethods.create(VolunteeringRequest))
  .put('/:id', DBMethods.update(VolunteeringRequest))
  .delete('/:id', DBMethods.remove(VolunteeringRequest));

module.exports = router.routes();
