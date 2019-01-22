'use strict';

module.exports = function(Club) {
  // Validations
  Club.validatesUniquenessOf('name', {
    message: 'Club already exists',
  });
  Club.validatesUniquenessOf('slug', {
    message: 'Club already exists',
  });

  // Before save
  Club.observe('before save', function(ctx, next) {
    // Set createdBy, updatedBy before saving the model
    if (ctx.instance) {
      if (ctx.isNewInstance) {
        ctx.instance.createdBy = ctx.options.accessToken.userId;
        ctx.instance.ownerId = ctx.options.accessToken.userId;
      }
      ctx.instance.updatedBy = ctx.options.accessToken.userId;
    }

    // Clean input
    if (ctx.instance) {
      if (ctx.instance.name) ctx.instance.name = ctx.instance.name.trim();
      if (ctx.instance.slug) ctx.instance.slug = ctx.instance.slug.trim();
    } else {
      if (ctx.data.name) ctx.data.name = ctx.data.name.trim();
      if (ctx.data.slug) ctx.data.slug = ctx.data.slug.trim();
    }

    next();
  });

  // Club list to query
  Club.list = function(orderBy, orderDirection, skip, take, cb) {
    // Default query
    if (!orderBy) {
      orderBy = 'name';
    }
    if (orderDirection !== 'ASC' && orderDirection !== 'DESC') {
      orderDirection = 'ASC';
    }
    if (skip === undefined) { skip = 0; }
    if (take === undefined) { take = 200; }

    var filter = {
      include: 'address',
      order: orderBy + ' ' + orderDirection,
      skip: skip,
      limit: take,
    };

    Club.find(filter, function(err, clubs) {
      // On error
      if (err) {
        cb(err);
        return;
      }

      cb(null, clubs);
    });
  };
  Club.remoteMethod('list', {
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

  // Find by slug
  Club.bySlug = function(slug, cb) {
    Club.findOne({
      where: {
        slug: slug,
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
          relation: 'leagues',
          scope: {
            include: {
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
          },
        },
      ],
    }, function(err, club) {
      if (err) {
        return cb(err);
      }
      cb(null, club);
    });
  };
  Club.remoteMethod('bySlug', {
    http: {path: '/slug/:slug', verb: 'get'},
    accepts: {arg: 'slug', type: 'string'},
    returns: {type: 'object', root: true},
  });

  // Uploads
  Club.on('attached', function() {
    // Define the variations for various UI uses that
    // will be created by s3-uploader on upload
    var versions = {
      banner: [
        {
          quality: 90,
          maxHeight: 1024,
          maxWidth: 1024,
        },
        {
          suffix: '-card',
          aspect: '5:2',
          quality: 90,
          maxHeight: 200,
          maxWidth: 500,
        },
      ],
    };

    var uploadable = require('../../server/lib/uploadable')();
    // Pass the model class, model name and the array of variations
    uploadable(Club, 'Club', versions);
  });
};

// Club players list to query
// Club.players = function(id, orderBy, orderDirection, skip, take, cb) {
//   // Default query
//   if (!orderBy) {
//     orderBy = 'firstName';
//   }
//   if (orderDirection !== 'ASC' && orderDirection !== 'DESC') {
//     orderDirection = 'ASC';
//   }
//   if (skip === undefined) { skip = 0; }
//   if (take === undefined) { take = 200; }

//   var filter = {
//     include: {
//       relation: 'players',
//       scope: {
//         fields: {
//           id: true,
//           firstName: true,
//           lastName: true,
//           username: true,
//           profilePicture: true,
//         },
//         order: orderBy + ' ' + orderDirection,
//         skip: skip,
//         take: take,
//       },
//     },
//   };

//   Club.findById(id, filter, function(err, club) {
//     // On error
//     if (err) {
//       cb(err);
//       return;
//     }

//     if (club && club.players) {
//       cb(null, club.players.toJSON());
//     } else {
//       cb(null);
//     }
//   });
// };
// Club.remoteMethod('players', {
//   http: {
//     path: '/:id/players',
//     verb: 'get',
//   },
//   accepts: [
//     {
//       arg: 'id',
//       type: 'string',
//     },
//     {
//       arg: 'orderBy',
//       type: 'string',
//       http: {
//         source: 'query',
//       },
//     },
//     {
//       arg: 'orderDirection',
//       type: 'string',
//       http: {
//         source: 'query',
//       },
//     },
//     {
//       arg: 'skip',
//       type: 'number',
//       http: {
//         source: 'query',
//       },
//     },
//     {
//       arg: 'take',
//       type: 'number',
//       http: {
//         source: 'query',
//       },
//     },
//   ],
//   returns: {
//     type: 'array',
//     root: true,
//   },
// });
