const Router = require('koa-router');
const VolunteeringOffer = require('../models/VolunteeringOffer');
const DBMethods = require('./baseDBMethods');

const router = new Router();

router.get('/', DBMethods.list(VolunteeringOffer))
  .get('/:id', DBMethods.getById(VolunteeringOffer))
  .post('/', DBMethods.create(VolunteeringOffer))
  .put('/:id', DBMethods.update(VolunteeringOffer))
  .delete('/:id', DBMethods.remove(VolunteeringOffer));

module.exports = router.routes();
