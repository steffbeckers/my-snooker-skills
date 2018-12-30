'use strict';

var app = require('../../server/server');

// var elasticsearch = require('elasticsearch');
// var esClient = new elasticsearch.Client({
//   host: '141.135.159.251:9200',
// });

module.exports = function(Frame) {
  // Set createdBy, updatedBy before saving the model
  Frame.observe('before save', function setAutoData(context, next) {
    if (context.instance) {
      if (context.isNewInstance) {
        context.instance.createdBy = context.options.accessToken.userId;
        if (!context.instance.ownerId) {
          context.instance.ownerId = context.options.accessToken.userId;
        }
        // Update state to started
        if (!context.instance.state) {
          context.instance.state = 'started';
        }
        // Start date time
        if (!context.instance.startDateTime) {
          context.instance.startDateTime = new Date().toISOString();
        }
      }
      context.instance.updatedBy = context.options.accessToken.userId;
    }

    next();
  });

  // After save
  Frame.observe('after save', function afterSave(ctx, next) {
    // Link players to frame
    if (ctx &&
      ctx.instance &&
      ctx.instance.__cachedRelations &&
      ctx.instance.__cachedRelations.players &&
      ctx.instance.__cachedRelations.players.length) {
      ctx.instance.__cachedRelations.players.forEach(function(player) {
        ctx.instance.players.add(player.id);
      });
    }

    // Cascade on soft delete
    // If deletedOn is set, remove frames
    if (ctx.data && ctx.data.deletedOn !== null) {
      var Break = Frame.app.models.Break;
      Break.destroyAll({
        frameId: ctx.where.and[0].id,
      }, function(err, result) {});
    }

    // // Real-time updates
    // if (!ctx.isNewInstance &&
    //   ctx.options.accessToken != undefined &&
    //   ctx.options.accessToken.userId != undefined) {
    //   var filter = {
    //     include: [
    //       {
    //         match: 'players',
    //       },
    //       'players',
    //       {
    //         relation: 'breaks',
    //         scope: {
    //           order:
    //           'dateTime DESC',
    //         },
    //       },
    //     ],
    //   };
    //   Frame.findById(ctx.instance.id, filter, function(err, frame) {
    //     Frame.app.mx.IO.emit('update-frame:' + ctx.instance.id, {
    //       userId: ctx.options.accessToken.userId,
    //       token10: ctx.options.accessToken.id.toString().substr(0, 10),
    //       frame: frame,
    //     });
    //   });
    // }

    // // Elasticsearch - Add frame to elasticsearch after end
    // if (ctx.instance && ctx.instance.endDateTime) {
    //   esClient.ping({
    //     requestTimeout: 3000,
    //   }, function(error) {
    //     if (error) {
    //       console.log('elasticsearch cluster is down.');
    //     } else {
    //       console.log('Connected to elasticsearch!');
    //       console.log('NODE_ENV: ' + process.env.NODE_ENV);

    //       // Retrieve all data of frame
    //       Frame.findById(ctx.instance.id, {
    //         include: [
    //           'players',
    //           {
    //             relation: 'breaks',
    //             scope: {
    //               order: 'dateTime DESC',
    //             },
    //           },
    //         ],
    //       }, function(err, frame) {
    //         frame = frame.toJSON();

    //         // Send to Elasticsearch
    //         esClient.index({
    //           index: 'snooker' +
    //             (process.env.NODE_ENV === 'local' ? '-local' : ''),
    //           type: 'frame',
    //           body: frame,
    //           id: String(frame.id),
    //         }).then(function(resp) {
    //           console.log('Frame synced to elasticsearch!', resp);
    //         }, function(err) {
    //           console.error('Error syncing Frame to elasticsearch.', err);
    //         });
    //       });
    //     }
    //   });
    // }

    next();
  });

  // Get number of Frame
  Frame.getNumber = function(frameId, cb) {
    Frame.findById(frameId, function(err, frame) {
      cb(null, frame.number);
    });
  };
  Frame.remoteMethod(
    'getNumber',
    {
      http: {path: '/:id/getNumber', verb: 'get'},
      accepts: {arg: 'id', type: 'string', http: {source: 'query'}},
      returns: {arg: 'number', type: 'number'},
    }
  );

  // List of latest frames
  Frame.latestFrames = function(cb) {
    var filter = {
      order: 'startDateTime DESC',
      limit: 10,
      include: [
        'match',
        {
          relation: 'players',
          scope: {
            fields: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      ],
    };

    Frame.find(filter, function(err, frames) {
      cb(null, frames);
    });
  };
  Frame.remoteMethod(
    'latestFrames', {
      http: {
        path: '/latestFrames',
        verb: 'get',
      },
      returns: {
        type: 'array',
        root: true,
      },
    }
  );

  // Concede frame
  Frame.concede = function(id, cb) {
    Frame.findById(id, {include: 'players'}, function(err, frame) {
      var frameJSON = frame.toJSON();

      frame.turnOfId = null;

      // Set end date time
      frame.endDateTime = new Date();

      // Update state
      frame.state = 'finished';

      // Calculate winner (highest score)
      var highestScore = 0;
      frameJSON.players.forEach(player => {
        var score = frameJSON.scores[String(player.id)];
        if (score > highestScore) {
          highestScore = score;
          frame.winnerId = String(player.id);
        }
      });

      // Update frame
      Frame.upsert(frame, function(err, frame) {
        cb(null, frame);
      });
    });
  };
  Frame.remoteMethod(
    'concede',
    {
      http: {path: '/:id/concede', verb: 'post'},
      accepts: {arg: 'id', type: 'string'},
      returns: {type: 'object', root: true},
    }
  );
  Frame.afterRemote('concede', function(ctx, output, next) {
    app.models.Match.findById(output.matchId, {
      include: 'players',
    }, function(err, match) {
      var matchJSON = match.toJSON();

      // Add point for winner on match
      matchJSON.players.forEach(player => {
        if (String(player.id) == output.winnerId) {
          match.scores[String(player.id)] += 1;
        }
      });

      app.models.Match.upsert(match, function(err, match) {
        return next();
      });
    });
  });

  // Detail
  Frame.detail = function(id, cb) {
    var filter = {
      where: {
        id: id,
      },
      include: [
        {
          relation: 'user',
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
        'match',
        'tournament',
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
          relation: 'breaks',
          scope: {
            order: 'dateTime DESC',
          },
        },
        {
          relation: 'referee',
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
          relation: 'createdByUser',
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
          relation: 'updatedByUser',
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
      ],
    };
    Frame.findOne(filter, function(err, frame) {
      // On error
      if (err) {
        cb(err);
      }

      cb(null, frame);
    });
  };
  Frame.remoteMethod('detail', {
    http: {path: '/:id/detail', verb: 'get'},
    accepts: {arg: 'id', type: 'string'},
    returns: {type: 'object', root: true},
  });
};
