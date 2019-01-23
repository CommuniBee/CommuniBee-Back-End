const jwt = require('koa-jwt');
const koaJwtSecret = require('jwks-rsa');
const ms = require('ms');

const USER_ROLE = 'user';
const FRC_TEAM_ROLE = 'frc_team';
const BUMBLEB_ROLE = 'bumbleb';

/*
  The roles are in an ascending order by their level of permission.
  This means that each role has all of the permissions of the roles which came before.
*/
const ROLES = [USER_ROLE, FRC_TEAM_ROLE, BUMBLEB_ROLE];

const hasRolePermissions = (role => ((ctx) => {
  if (!ctx.state.user || !ctx.state.user.role) {
    return false;
  }

  return ROLES.indexOf(ctx.state.user.role) >= ROLES.indexOf(role);
}));

const validateRolePermissions = (role => ((ctx, next) => {
  if (hasRolePermissions(role)(ctx)) {
    next();
  } else {
    ctx.unauthorized();
  }
}));

const modificationIsAllowed = (Model => (async (ctx, next) => {
  if (hasRolePermissions(FRC_TEAM_ROLE)(ctx)) {
    next();
  } else {
    const doc = await Model.findById(ctx.params.id);
    if (doc === null) {
      ctx.notFound(`Document with id ${ctx.params.id} not found`);
    } else if (doc.createdByUserId === ctx.state.user.user_id) {
      next();
    } else {
      ctx.unauthorized();
    }
  }
}));

const injectCreatedByUserId = async (ctx, next) => {
  ctx.request.body.createdByUserId = ctx.state.user.user_id;
  await next();
};

module.exports = {
  authenticate: jwt({
    secret: koaJwtSecret.koaJwtSecret({
      jwksUri: process.env.AUTH0_JWKS,
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: ms('10h'),
    }),
    algorithms: ['RS256'],
  }),

  validateUserPermissions: validateRolePermissions(USER_ROLE),
  validateFRCTeamPermissions: validateRolePermissions(FRC_TEAM_ROLE),
  validateBumbleBPermissions: validateRolePermissions(BUMBLEB_ROLE),

  hasUserPermissions: hasRolePermissions(USER_ROLE),
  hasFRCTeamPermissions: hasRolePermissions(FRC_TEAM_ROLE),
  hasBumbleBPermissions: hasRolePermissions(BUMBLEB_ROLE),

  modificationIsAllowed,
  injectCreatedByUserId,
};
