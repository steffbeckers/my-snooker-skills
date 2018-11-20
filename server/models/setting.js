'use strict';

module.exports = function(Setting) {
  // Set createdBy, updatedBy before saving the model
  Setting.observe('before save', function setAutoData(context, next) {
    if (context.instance) {
      if (context.isNewInstance) {
        context.instance.createdBy = context.options.accessToken.userId;
        context.instance.ownerId = context.options.accessToken.userId;
      }
      context.instance.updatedBy = context.options.accessToken.userId;
    }
    next();
  });
};
