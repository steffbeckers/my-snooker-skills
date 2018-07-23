'use strict';

var ObjectId = require('mongodb').ObjectId;
var _ = require('lodash');
var moment = require('moment');

module.exports = function(Match) {
  // Set createdBy, updatedBy before saving the model
  Match.observe('before save', function setAutoData(context, next) {
    if (context.instance) {
      if (context.isNewInstance) {
        context.instance.createdBy = context.options.accessToken.userId;
        context.instance.ownerId = context.options.accessToken.userId;
      }
      context.instance.updatedBy = context.options.accessToken.userId;
    }
    next();
  });

  // After save
  Match.observe('after save', function afterSave(ctx, next) {
    // Cascade on soft delete
    // If deletedOn is set, remove frames
    if (ctx.data && ctx.data.deletedOn !== null) {
      var Frame = Match.app.models.Frame;
      Frame.destroyAll(
        {
          matchId: ctx.where.and[0].id,
        },
        function(err, result) {}
      );
    }

    // TODO: Real-time updates - On create of new match
    // if (ctx.isNewInstance && ctx.options.accessToken != undefined && ctx.options.accessToken.userId != undefined) {
    //   var filter = {
    //     include: 'players'
    //   };
    //   Match.findById(ctx.instance.id, filter, function (err, match) {
    //     Match.app.mx.IO.emit('new-match', { userId: ctx.options.accessToken.userId, match: match });
    //   });
    // }
    next();
  });

  // Concede match
  Match.concede = function(id, cb) {
    Match.findById(id, {
      include: ['players', {
        relation: 'frames',
        scope: {
          order: 'endDateTime DESC',
          limit: 1,
        },
      }],
    }, function(err, match) {
      var matchJSON = match.toJSON();

      // Set end date time
      match.endDateTime = matchJSON.frames[0].endDateTime;

      // Calculate winner (highest score)
      var highestScore = 0;
      matchJSON.players.forEach(player => {
        var score = matchJSON.scores[String(player.id)].score;
        if (score > highestScore) {
          highestScore = score;
          match.winnerId = String(player.id);
        }
      });

      // Calculate statistics
      Match.statistics(match.id, function(err, statistics) {
        // Update/end match
        Match.upsert(match, function(err, match) {
          cb(null, match);
        });
      });
    });
  };
  Match.remoteMethod('concede', {
    http: {
      path: '/:id/concede',
      verb: 'post',
    },
    accepts: {
      arg: 'id',
      type: 'string',
    },
    returns: {
      type: 'object',
      root: true,
    },
  });

  // Get statistics of match
  Match.statistics = function(id, cb) {
    // Check on input
    if (!ObjectId.isValid(id)) {
      cb(null, 'Invalid Match ID');
      return;
    }

    // Statistics object
    var statistics = {};
    statistics.info = {};

    // Start calculations
    var startedCalculationAt = new Date();
    // console.log('> Started calculation at: ' + startedCalculationAt.toISOString());

    // Retrieve all data of match
    Match.findById(id, {
      include: [
        'players',
        {
          relation: 'frames',
          scope: {
            include: ['players', 'breaks'],
          },
        },
      ],
    }, function(err, match) {
      // Error
      if (err) {
        cb(err);
        return;
      }

      var matchJSON = match.toJSON();
      // console.log(matchJSON);

      // Make calculations on retrieved data
      var framesCount = matchJSON.frames.length;

      statistics.breaksCount = {};
      statistics.breaksCount.players = {};

      statistics.pointsScored = {};
      statistics.pointsScored.players = {};

      statistics.pointsPerFrameAverage = {};
      statistics.pointsPerFrameAverage.players = {};

      statistics.breaksPerRange = {};
      statistics.breaksPerRange.players = {};

      statistics.foulsCount = {};
      statistics.foulsCount.players = {};

      statistics.foulPoints = {};
      statistics.foulPoints.players = {};

      // Each frame
      _.each(matchJSON.frames, function(frame) {
        // breaksCount.total
        if (frame.breaks.length > 0) {
          if (statistics.breaksCount.total === undefined) {
            statistics.breaksCount.total = 0;
          }
          statistics.breaksCount.total += frame.breaks.length;
        }

        // Each break
        _.each(frame.breaks, function(breakO) {
          // breaksCount.players
          if (statistics.breaksCount.players[breakO.playerId] === undefined) {
            statistics.breaksCount.players[breakO.playerId] = 0;
          }
          statistics.breaksCount.players[breakO.playerId] += 1;
          // pointsScored
          if (breakO.score && breakO.score > 0) {
            if (statistics.pointsScored.total === undefined) {
              statistics.pointsScored.total = 0;
            }
            statistics.pointsScored.total += breakO.score;
            if (statistics.pointsScored.players[breakO.playerId] === undefined) {
              statistics.pointsScored.players[breakO.playerId] = 0;
            }
            statistics.pointsScored.players[breakO.playerId] += breakO.score;
            // breaksPerRange
            if (breakO.score >= 100) {
              if (statistics.breaksPerRange.players[breakO.playerId] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId] = {};
              }
              if (statistics.breaksPerRange.players[breakO.playerId]['100s'] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId]['100s'] = 0;
              }
              statistics.breaksPerRange.players[breakO.playerId]['100s'] += 1;
            } else if (breakO.score >= 90) {
              if (statistics.breaksPerRange.players[breakO.playerId] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId] = {};
              }
              if (statistics.breaksPerRange.players[breakO.playerId]['90s'] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId]['90s'] = 0;
              }
              statistics.breaksPerRange.players[breakO.playerId]['90s'] += 1;
            } else if (breakO.score >= 80) {
              if (statistics.breaksPerRange.players[breakO.playerId] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId] = {};
              }
              if (statistics.breaksPerRange.players[breakO.playerId]['80s'] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId]['80s'] = 0;
              }
              statistics.breaksPerRange.players[breakO.playerId]['80s'] += 1;
            } else if (breakO.score >= 70) {
              if (statistics.breaksPerRange.players[breakO.playerId] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId] = {};
              }
              if (statistics.breaksPerRange.players[breakO.playerId]['70s'] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId]['70s'] = 0;
              }
              statistics.breaksPerRange.players[breakO.playerId]['70s'] += 1;
            } else if (breakO.score >= 60) {
              if (statistics.breaksPerRange.players[breakO.playerId] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId] = {};
              }
              if (statistics.breaksPerRange.players[breakO.playerId]['60s'] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId]['60s'] = 0;
              }
              statistics.breaksPerRange.players[breakO.playerId]['60s'] += 1;
            } else if (breakO.score >= 50) {
              if (statistics.breaksPerRange.players[breakO.playerId] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId] = {};
              }
              if (statistics.breaksPerRange.players[breakO.playerId]['50s'] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId]['50s'] = 0;
              }
              statistics.breaksPerRange.players[breakO.playerId]['50s'] += 1;
            } else if (breakO.score >= 40) {
              if (statistics.breaksPerRange.players[breakO.playerId] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId] = {};
              }
              if (statistics.breaksPerRange.players[breakO.playerId]['40s'] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId]['40s'] = 0;
              }
              statistics.breaksPerRange.players[breakO.playerId]['40s'] += 1;
            } else if (breakO.score >= 30) {
              if (statistics.breaksPerRange.players[breakO.playerId] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId] = {};
              }
              if (statistics.breaksPerRange.players[breakO.playerId]['30s'] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId]['30s'] = 0;
              }
              statistics.breaksPerRange.players[breakO.playerId]['30s'] += 1;
            } else if (breakO.score >= 20) {
              if (statistics.breaksPerRange.players[breakO.playerId] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId] = {};
              }
              if (statistics.breaksPerRange.players[breakO.playerId]['20s'] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId]['20s'] = 0;
              }
              statistics.breaksPerRange.players[breakO.playerId]['20s'] += 1;
            } else if (breakO.score >= 10) {
              if (statistics.breaksPerRange.players[breakO.playerId] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId] = {};
              }
              if (statistics.breaksPerRange.players[breakO.playerId]['10s'] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId]['10s'] = 0;
              }
              statistics.breaksPerRange.players[breakO.playerId]['10s'] += 1;
            } else if (breakO.score < 10) {
              if (statistics.breaksPerRange.players[breakO.playerId] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId] = {};
              }
              if (statistics.breaksPerRange.players[breakO.playerId]['lt10'] === undefined) {
                statistics.breaksPerRange.players[breakO.playerId]['lt10'] = 0;
              }
              statistics.breaksPerRange.players[breakO.playerId]['lt10'] += 1;
            }
          }
          if (breakO.foul && breakO.foul.value != 0) {
            // foulsCount
            if (statistics.foulsCount.total === undefined) {
              statistics.foulsCount.total = 0;
            }
            statistics.foulsCount.total += 1;
            if (statistics.foulsCount.players[breakO.playerId] === undefined) {
              statistics.foulsCount.players[breakO.playerId] = 0;
            }
            statistics.foulsCount.players[breakO.playerId] += 1;
            // foulPoints
            if (statistics.foulPoints.total === undefined) {
              statistics.foulPoints.total = 0;
            }
            statistics.foulPoints.total += breakO.foul.value;
            if (statistics.foulPoints.players[breakO.playerId] === undefined) {
              statistics.foulPoints.players[breakO.playerId] = 0;
            }
            statistics.foulPoints.players[breakO.playerId] += breakO.foul.value;
          }
        });
      });

      // Each player
      _.each(matchJSON.players, function(player) {
        // pointsPerFrameAverage.players
        if (statistics.pointsScored.players[player.id] > 0) {
          statistics.pointsPerFrameAverage.players[player.id] =
          Math.round(
            statistics.pointsScored.players[player.id] /
            framesCount * 100
          ) / 100;
        }
      });

      // pointsPerFrameAverage.average
      if (statistics.pointsScored.total > 0) {
        statistics.pointsPerFrameAverage.average = Math.round(
          statistics.pointsScored.total / framesCount * 100
        ) / 100;
      }

      // Done calculating
      var calculatedAt = new Date();
      // console.log('> Calculation end at: ' + calculatedAt.toISOString());
      statistics.info.calculatedAt = calculatedAt.toISOString();

      // Update the match
      match.updateAttribute('statistics', statistics, function(err, match) {
        // Error
        if (err) {
          cb(err);
          return;
        }

        // Return response
        var response = {
          startedCalculationAt: startedCalculationAt.toISOString(),
          calculatedAt: calculatedAt.toISOString(),
          durationInMs: calculatedAt - startedCalculationAt,
          durationInSec: (calculatedAt - startedCalculationAt) / 1000,
          statistics: statistics,
        };
        cb(null, response);
      });
    });
  };
  Match.remoteMethod('statistics', {
    http: {
      path: '/:id/statistics',
      verb: 'get',
    },
    accepts: {
      arg: 'id',
      type: 'string',
    },
    returns: {
      type: 'object',
      root: true,
    },
  });
};
