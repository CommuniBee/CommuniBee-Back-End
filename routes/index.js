const usersRoutes = require('./users');
const regionsRoutes = require('./regions');

module.exports = (router) => {
  router.prefix('/v1');
  router.use('/users', usersRoutes);
  router.use('/regions', regionsRoutes);
};
