'use strict';

module.exports = function(Tournament) {
  // Set createdBy, updatedBy before saving the model
  Tournament.observe('before save', function setAutoData(context, next) {
    if (context.instance) {
      if (context.isNewInstance) {
        context.instance.createdBy = context.options.accessToken.userId;
        context.instance.ownerId = context.options.accessToken.userId;
      }
      context.instance.updatedBy = context.options.accessToken.userId;
    }
    next();
  });

  // Tournament list to query
  Tournament.list = function(orderBy, orderDirection, skip, take, cb) {
    // Default query
    if (orderBy !== 'startDateTime' && orderBy !== 'endDateTime') {
      orderBy = 'startDateTime';
    }
    if (orderDirection !== 'ASC' && orderDirection !== 'DESC') {
      orderDirection = 'DESC';
    }
    if (skip === undefined) { skip = 0; }
    if (take === undefined) { take = 200; }

    var filter = {
      include: [
        {
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
        {
          relation: 'frames',
          scope: {
            order: 'startDateTime DESC',
          },
        },
        {
          relation: 'league',
          scope: {
            include: 'club',
          },
        },
      ],
      order: orderBy + ' ' + orderDirection,
      skip: skip,
      limit: take,
    };

    Tournament.find(filter, function(err, tournaments) {
      // On error
      if (err) {
        cb(err);
        return;
      }

      cb(null, tournaments);
    });
  };
  Tournament.remoteMethod('list', {
    http: {
      path: '/list',
      verb: 'get',
    },
    accepts: [
      {
        arg: 'orderBy',
        type: 'string',
        http: {
          source: 'query',
        },
      },
      {
        arg: 'orderDirection',
        type: 'string',
        http: {
          source: 'query',
        },
      },
      {
        arg: 'skip',
        type: 'number',
        http: {
          source: 'query',
        },
      },
      {
        arg: 'take',
        type: 'number',
        http: {
          source: 'query',
        },
      },
    ],
    returns: {
      type: 'array',
      root: true,
    },
  });

  // Detail
  Tournament.detail = function(id, cb) {
    var filter = {
      where: {
        id: id,
      },
      include: [
        {
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
        {
          relation: 'frames',
          scope: {
            order: 'startDateTime DESC',
          },
        },
        {
          relation: 'league',
          scope: {
            include: 'club',
          },
        },
      ],
    };
    Tournament.findOne(filter, function(err, tournament) {
      // On error
      if (err) {
        cb(err);
      }

      cb(null, tournament);
    });
  };
  Tournament.remoteMethod('detail', {
    http: {path: '/:id/detail', verb: 'get'},
    accepts: {arg: 'id', type: 'string'},
    returns: {type: 'object', root: true},
  });
};
