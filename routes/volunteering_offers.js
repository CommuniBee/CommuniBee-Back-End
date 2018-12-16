const Router = require('koa-router');
const VolunteeringOffer = require('../models/VolunteeringOffer');
const DBMethods = require('./baseDBMethods');
const auth = require('../common/auth');

const router = new Router();

router.get('/', DBMethods.list(VolunteeringOffer))
  .get('/:id', DBMethods.getById(VolunteeringOffer))
  .post('/', auth.authenticate, DBMethods.create(VolunteeringOffer))
  .put('/:id', auth.authenticate, auth.modificationIsAllowed, DBMethods.update(VolunteeringOffer))
  .delete('/:id', auth.authenticate, auth.modificationIsAllowed, DBMethods.remove(VolunteeringOffer));

module.exports = router.routes();
