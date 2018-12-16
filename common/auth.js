const jwt = require('koa-jwt');

const USER_ROLE = 'user';
const FRC_TEAM_ROLE = 'frc_team';
const BUMBLEB_ROLE = 'bumbleb';

/*
  The roles are in an ascending order by their level of permission.
  This means that each role has all of the permissions of the roles which came before.
*/
const ROLES = [USER_ROLE, FRC_TEAM_ROLE, BUMBLEB_ROLE];

const hasRolePermissions = (role => ((ctx) => {
  if (ctx.state.user === undefined || ctx.state.user.role === undefined) {
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

module.exports = {
  authenticate: jwt({ secret: process.env.AUTH0_SECRET }),

  validateUserPermissions: validateRolePermissions(USER_ROLE),
  validateFRCTeamPermissions: validateRolePermissions(FRC_TEAM_ROLE),
  validateBumbleBPermissions: validateRolePermissions(BUMBLEB_ROLE),

  hasUserPermissions: hasRolePermissions(USER_ROLE),
  hasFRCTeamPermissions: hasRolePermissions(FRC_TEAM_ROLE),
  hasBumbleBPermissions: hasRolePermissions(BUMBLEB_ROLE),
};
