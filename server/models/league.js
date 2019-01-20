'use strict';

module.exports = function(League) {
  // Set createdBy, updatedBy before saving the model
  League.observe('before save', function setAutoData(context, next) {
    if (context.instance) {
      if (context.isNewInstance) {
        context.instance.createdBy = context.options.accessToken.userId;
        context.instance.ownerId = context.options.accessToken.userId;
      }
      context.instance.updatedBy = context.options.accessToken.userId;
    }
    next();
  });

  // Detail
  League.detail = function(id, cb) {
    var filter = {
      where: {
        id: id,
      },
      include: [
        'club',
        {
          relation: 'tournaments',
          scope: {
            include: {
              relation: 'players',
              scope: {
                fields: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  username: true,
                  profilePicture: true,
                },
              },
            },
          },
        },
      ],
    };
    League.findOne(filter, function(err, league) {
      // On error
      if (err) {
        cb(err);
      }

      cb(null, league);
    });
  };
  League.remoteMethod('detail', {
    http: {path: '/:id/detail', verb: 'get'},
    accepts: {arg: 'id', type: 'string'},
    returns: {type: 'object', root: true},
  });
};
