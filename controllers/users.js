function hello(ctx) {
  ctx.ok({ user: ctx.request.query.user });
}

module.exports = {
  hello,
};
