const users = require('./users');

module.exports = (router) => {
  router.prefix('/v1');
  router.use('/users', users);
};
