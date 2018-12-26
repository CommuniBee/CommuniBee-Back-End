const Router = require('koa-router');
const VolunteeringOffer = require('../models/volunteering-offer');
const DBMethods = require('../controllers/base-db-methods');

const router = new Router();

router.get('/', DBMethods.list(VolunteeringOffer))
  .get('/:id', DBMethods.getById(VolunteeringOffer))
  .post('/', DBMethods.create(VolunteeringOffer))
  .put('/:id', DBMethods.update(VolunteeringOffer))
  .delete('/:id', DBMethods.remove(VolunteeringOffer));

module.exports = router.routes();
