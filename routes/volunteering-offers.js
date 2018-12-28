const Router = require('koa-router');
const VolunteeringOffer = require('../models/volunteering-offer');
const DBMethods = require('./base-db-methods');
const auth = require('../common/auth');

const router = new Router();

router.get('/', DBMethods.list(VolunteeringOffer))
  .get('/:id', DBMethods.getById(VolunteeringOffer))

  .use(auth.authenticate)
  .post('/', DBMethods.create(VolunteeringOffer))

  .use(auth.modificationIsAllowed)
  .put('/:id', DBMethods.update(VolunteeringOffer))
  .delete('/:id', DBMethods.remove(VolunteeringOffer));

module.exports = router.routes();
