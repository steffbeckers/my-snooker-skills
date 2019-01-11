'use strict';

module.exports = function(Bug) {
  // Set createdBy and updatedBy (when we know who created it) before saving the model
  Bug.observe('before save', function setAutoData(context, next) {
    // Only when access token is known
    if (context.options &&
        context.options.accessToken &&
        context.options.accessToken.userId) {
      // If there is an instance of a bug
      if (context.instance) {
        // New? => set createdBy and ownerId
        if (context.isNewInstance) {
          context.instance.createdBy = context.options.accessToken.userId;
          context.instance.ownerId = context.options.accessToken.userId;
        }
        // Always update updatedBy prop on save
        context.instance.updatedBy = context.options.accessToken.userId;
      }
    }

    next();
  });

  // Tracking global app errors
  Bug.trackAppError = function(data, cb) {
    var newBug = {error: {}};

    // Vue
    if (data.state) {
      newBug.state = data.state;
    }
    if (data.route) {
      newBug.route = data.route;
    }

    // Location
    if (data.url) {
      newBug.url = data.url;
    }

    // Device/browser
    if (data.browser) {
      newBug.browser = data.browser;
    }
    if (data.mobile) {
      newBug.mobile = data.mobile;
    }
    if (data.os) {
      newBug.os = data.os;
    }
    if (data.userAgent) {
      newBug.userAgent = data.userAgent;
    }

    // Error
    if (data.errorText) {
      newBug.title = data.errorText;
      newBug.error.text = data.errorText;
    }
    if (data.errorName) {
      newBug.error.name = data.errorName;
    }
    if (data.lineNumber) {
      newBug.error.lineNumber = data.lineNumber;
    }
    if (data.columnNumber) {
      newBug.error.columnNumber = data.columnNumber;
    }
    if (data.errorStack) {
      newBug.error.stack = data.errorStack;
    }

    Bug.upsert(newBug, function(err, bug) {
      cb(err, bug);
    });
  };
  Bug.remoteMethod(
    'trackAppError',
    {
      http: {path: '/trackAppError', verb: 'post'},
      accepts: {arg: 'data', type: 'object', http: {source: 'body'}},
      returns: {type: 'object', root: true},
    }
  );
};
