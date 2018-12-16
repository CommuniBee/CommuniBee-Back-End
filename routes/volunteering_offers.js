const Router = require('koa-router');
const VolunteeringOffer = require('../models/VolunteeringOffer');
const DBMethods = require('./baseDBMethods');
const auth = require('../common/auth');

const router = new Router();

router.get('/', DBMethods.list(VolunteeringOffer))
  .get('/:id', DBMethods.getById(VolunteeringOffer))
  .post('/', auth.authenticate, auth.validateFRCTeamPermissions, DBMethods.create(VolunteeringOffer))
  .put('/:id', auth.authenticate, auth.validateFRCTeamPermissions, DBMethods.update(VolunteeringOffer))
  .delete('/:id', auth.authenticate, auth.validateFRCTeamPermissions, DBMethods.remove(VolunteeringOffer));

module.exports = router.routes();
