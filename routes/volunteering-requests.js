const Router = require('koa-router');
const VolunteeringRequest = require('../models/volunteering-request');
const DBMethods = require('../controllers/base-db-methods');

const router = new Router();

router.get('/', DBMethods.list(VolunteeringRequest))
  .get('/:id', DBMethods.getById(VolunteeringRequest))
  .post('/', DBMethods.create(VolunteeringRequest))
  .put('/:id', DBMethods.update(VolunteeringRequest))
  .delete('/:id', DBMethods.remove(VolunteeringRequest));

module.exports = router.routes();
