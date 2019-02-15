const Router = require('koa-router');
const VolunteeringRequest = require('../models/volunteering-request');
const DBMethods = require('./base-db-methods');
const auth = require('../common/auth');
const Content = require('../models/content');
const SubRegion = require('../models/content');

const populates = [{ path: 'content', model: Content, select: ['title'] },
  { path: 'regions', populate: { path: 'SubRegion', model: SubRegion } }];
const router = new Router();

router.get('/', DBMethods.list(VolunteeringRequest, populates))
  .get('/:id', DBMethods.getById(VolunteeringRequest))
  .use(auth.authenticate)
  .post('/', auth.injectCreatedByUserId, DBMethods.create(VolunteeringRequest))
  .put('/:id', DBMethods.update(VolunteeringRequest))
  .use(auth.modificationIsAllowed)
  .delete('/:id', DBMethods.remove(VolunteeringRequest));

module.exports = router.routes();
