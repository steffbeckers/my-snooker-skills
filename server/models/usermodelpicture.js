'use strict';

module.exports = function(UserModelPicture) {
  // UserModelPicture.beforeRemote('download', (ctx, output, next) => {
  //   const AccessToken = UserModelPicture.app.models.AccessToken;

  //   if (!ctx.req.query.access_token)
  //     return next({
  //       message: 'Authorization Required',
  //       statusCode: 401
  //     });

  //   AccessToken.resolve(ctx.req.query.access_token, (err, token) => {
  //     if (err)
  //       return next(err);

  //     if (!token)
  //       return next({
  //         message: 'Invalid Token',
  //         statusCode: 401
  //       });
  //     return next();
  //   });
  // });
};
