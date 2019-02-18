const Router = require('koa-router');
const VolunteeringOffer = require('../models/volunteering-offer');
const DBMethods = require('./base-db-methods');
const auth = require('../common/auth');
const Content = require('../models/content');
const SubRegion = require('../models/content');

const populates = [{ path: 'content', model: Content, select: ['title'] },
  { path: 'regions', populate: { path: 'SubRegion', model: SubRegion } }];
const router = new Router();

router.get('/', DBMethods.list(VolunteeringOffer, populates))
  .get('/:id', DBMethods.getById(VolunteeringOffer))
  .use(auth.authenticate)
  .post('/', auth.injectCreatedByUserId, DBMethods.create(VolunteeringOffer))
  .put('/:id', DBMethods.update(VolunteeringOffer))
  .use(auth.modificationIsAllowed)
  .delete('/:id', DBMethods.remove(VolunteeringOffer));

module.exports = router.routes();
