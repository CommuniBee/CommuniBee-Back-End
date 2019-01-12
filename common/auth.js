const jwt = require('koa-jwt');
// var jwt = require('jsonwebtoken');
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

module.exports = {
  authenticate: jwt({
    secret: process.env.AUTH0_SECRET
  }),

  // authenticate: ctx => {
  //   var jwksClient = require('jwks-rsa');
  //   var client = jwksClient({
  //     jwksUri: 'https://sandrino.auth0.com/.well-known/jwks.json'
  //   });
  //   function getKey(header, callback){
  //     client.getSigningKey(header.kid, function(err, key) {
  //       var signingKey = key.publicKey || key.rsaPublicKey;
  //       callback(null, signingKey);
  //     });
  //   }
  //
  //   jwt.verify(token, getKey, options, function(err, decoded) {
  //     console.log(decoded.foo) // bar
  //   });
  // },

  validateUserPermissions: validateRolePermissions(USER_ROLE),
  validateFRCTeamPermissions: validateRolePermissions(FRC_TEAM_ROLE),
  validateBumbleBPermissions: validateRolePermissions(BUMBLEB_ROLE),

  hasUserPermissions: hasRolePermissions(USER_ROLE),
  hasFRCTeamPermissions: hasRolePermissions(FRC_TEAM_ROLE),
  hasBumbleBPermissions: hasRolePermissions(BUMBLEB_ROLE),

  modificationIsAllowed,
};
