'use strict';

var app = require('../../server/server');
var path = require('path');
var qs = require('querystring');
var ObjectId = require('mongodb').ObjectId;

var senderAddress = 'steff@steffbeckers.eu';

module.exports = function(UserModel) {
  // Send verification email after registration
  UserModel.afterRemote('create', function(ctx, userInstance, next) {
    console.log('> UserModel.afterRemote.create triggered');

    var options = {
      host: app.get('host') || '0.0.0.0',
      port: app.get('port') || 3000,
      type: 'email',
      to: userInstance.email,
      from: senderAddress,
      subject: 'My Snooker Skills - Thanks for registering',
      template: path.join(
        __dirname,
        '..',
        '..',
        'server',
        'templates',
        'usermodel',
        'verify.ejs'
      ),
      redirect: null,
      user: userInstance,
      verifyHref: app.get('confirmHrefApp') + '?' + qs.stringify({
        uid: String(userInstance.id),
      }),
    };

    userInstance.verify(options, function(err, response) {
      if (err) {
        console.log('> Error verifying, deleting user');
        UserModel.deleteById(userInstance.id);
        return next(err);
      }

      console.log('> Verification email sent: ', response);

      return next();
    });
  });

  // Send password reset email
  UserModel.on('resetPasswordRequest', function(info) {
    console.log('> UserModel.on.resetPasswordRequest triggered');
    console.log('> info');
    console.log(info);

    var html = '';
    html += '<h1>My Snooker Skills </h1>';
    html += '<p>Please follow the link below to reset your password.</p>';
    html += '<p>';
    html += '<a href="' + app.get('resetPasswordRequestHrefApp') +
      '?access_token=' + info.accessToken.id + '">';
    html += app.get('resetPasswordRequestHrefApp') +
      '?access_token=' + info.accessToken.id;
    html += '</a>';
    html += '</p>';

    UserModel.app.models.Email.send({
      to: info.email,
      from: senderAddress,
      subject: 'My Snooker Skills - Reset password',
      html: html,
    }, function(err) {
      if (err) return console.log('> Error sending password reset email');
      console.log('> Reset password email sent to:', info.email);
    });
  });

  // Resend verification email
  UserModel.resendVerificationEmail = function(usernameOrEmail, cb) {
    console.log('> UserModel.resendVerificationEmail triggered');

    var isEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail);

    var filter = {};

    if (isEmailAddress) {
      filter = {where: {email: usernameOrEmail}};
    } else {
      filter = {where: {username: usernameOrEmail}};
    }

    // Find the user by username or email address
    UserModel.findOne(filter, function(err, user) {
      if (err) {
        console.log('> Error identifying user by username or email address');
        return cb(err);
      }

      // If there is no user found
      if (user == null) {
        return cb(null, {code: 'USERNAME_OR_EMAIL_NOT_FOUND'});
      }

      // If the user isn't verified already resend a verification email
      if (!user.emailVerified) {
        var options = {
          host: app.get('host') || '0.0.0.0',
          port: app.get('port') || 3000,
          type: 'email',
          to: user.email,
          from: senderAddress,
          subject: 'My Snooker Skills - Thanks for registering',
          template: path.join(
            __dirname,
            '..',
            '..',
            'server',
            'templates',
            'usermodel',
            'verify.ejs'
          ),
          redirect: null,
          user: user,
          verifyHref: app.get('confirmHrefApp') + '?' + qs.stringify({
            uid: String(user.id),
          }),
        };

        user.verify(options, function(err, response) {
          if (err) {
            console.log('> Error verifying user');
            return cb(err);
          }

          console.log('> Verification email sent: ', response);

          return cb(null, {code: 'RESENT_VERIFICATION_EMAIL'});
        });
      } else {
        cb(null, {code: 'EMAIL_ALREADY_VERIFIED'});
      }
    });
  };
  UserModel.remoteMethod(
    'resendVerificationEmail',
    {
      http: {path: '/resendVerificationEmailTo/:usernameOrEmail', verb: 'post'},
      accepts: {
        arg: 'usernameOrEmail',
        type: 'string',
        http: {source: 'query'},
      },
      returns: {type: 'object', root: true},
    }
  );

  // Include roles, remove fields on login
  UserModel.afterRemote('login', function(ctx, userInstance, next) {
    console.log('> UserModel.afterRemote.login triggered');

    var resultJSON = ctx.result.toJSON();

    // Overwrite user with roles
    var filter = {
      fields: {
        emailVerified: false,
        email: false,
        telephone: false,
        createdOn: false,
        updatedOn: false,
      },
      include: 'roles',
    };
    UserModel.findById(ctx.result.userId, filter, function(err, user) {
      var userJSON = user.toJSON();
      // Simplify roles in string array
      var simpleRoleArray = [];
      userJSON.roles.forEach(role => {
        simpleRoleArray.push(role.name);
      });
      userJSON.roles = simpleRoleArray;

      // Replace user
      resultJSON.user = userJSON;
      ctx.result = resultJSON;
      next();
    });
  });

  // Search a by fullname or username
  UserModel.searchByFullnameOrUsername = function(name, cb) {
    var filter = {};

    if (name === '' || name == null || name == undefined) {
      filter = {
        fields: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
        order: 'firstName ASC',
        limit: 10,
      };
    } else {
      filter = {
        where: {
          or: [
            {firstName: {like: '.*' + name + '.*', options: 'i'}},
            {lastName: {like: '.*' + name + '.*', options: 'i'}},
            {username: {like: '.*' + name + '.*', options: 'i'}},
          ],
        },
        fields: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
        },
        order: 'firstName ASC',
        limit: 10,
      };
    }

    UserModel.find(filter, function(err, users) {
      cb(null, users);
    });
  };
  UserModel.remoteMethod('searchByFullnameOrUsername',
    {
      http: {
        path: '/searchByFullnameOrUsername',
        verb: 'get',
      },
      accepts: {
        arg: 'name',
        type: 'string',
        http: {
          source: 'query',
        },
      },
      returns: {
        type: 'array',
        root: true,
      },
    }
  );

  // List players, with filter
  UserModel.listPlayers = function(orderBy, orderDirection, skip, take, cb) {
    // Check on input
    if (orderBy !== 'firstName' && orderBy !== 'lastName') {
      orderBy = 'firstName';
    }
    if (orderDirection !== 'ASC' && orderDirection !== 'DESC') {
      orderDirection = 'ASC';
    }
    if (skip === undefined) { skip = 0; }
    if (take === undefined) { take = 20; }

    var filter = {
      fields: {
        id: true,
        firstName: true,
        lastName: true,
      },
      order: orderBy + ' ' + orderDirection,
      skip: skip,
      limit: take,
    };

    UserModel.find(filter, function(err, users) {
      cb(null, users);
    });
  };
  UserModel.remoteMethod('listPlayers',
    {
      http: {
        path: '/listPlayers',
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
    }
  );

  // Statistics
  // Refresh calculations (MapReduces, ..)
  // UserModel.calculateStatistics = function(cb) {
  //   UserModel.getDataSource().connector.connect((err, db) => {
  //     // Error
  //     if (err != null) { return cb(err, null); };

  //     var resultsOfCalculations = [];

  //     // Start calculations
  //     var startedCalculationAt = new Date();
  //     console.log('> Started calculation at: ' + startedCalculationAt.toISOString());

  //     // Frames Won
  //     db.collection('Frame').mapReduce(
  //       function() {
  //         emit(ObjectId(this.winnerId), 1);
  //       },
  //       function(userModelId, count) {
  //         return Array.sum(count);
  //       },
  //       {
  //         out: {merge: 'UserModel'},
  //         finalize: function(key, reducedVal) {
  //           return {framesWon: reducedVal};
  //         },
  //       },
  //       function(err, framesWonCollection) {
  //         console.log(framesWonCollection);

  //         // Error
  //         if (err) {
  //           console.log('> Error');
  //           console.log(err);
  //           return cb(err, null);
  //         };

  //         // Done calculating
  //         var calculatedAt = new Date();

  //         // Return response
  //         var response = {
  //           startedCalculationAt: startedCalculationAt.toISOString(),
  //           calculatedAt: calculatedAt.toISOString(),
  //           durationInMs: calculatedAt - startedCalculationAt,
  //           durationInSec: (calculatedAt - startedCalculationAt) / 1000,
  //           resultsOfCalculations,
  //         };
  //         cb(null, response);
  //       }
  //     );

  //     // Average Score
  //     // db.collection('Frame').mapReduce(
  //     //   function() {
  //     //     var score =
  //     //     emit(, 1);
  //     //   },
  //     //   function(userModelId, count) {
  //     //     return Array.sum(count);
  //     //   },
  //     //   { out: 'StatisticsAverageFrameScore' }
  //     // );
  //   });
  // };
  // UserModel.remoteMethod('calculateStatistics',
  //   {
  //     http: {path: '/statistics', verb: 'get'},
  //     returns: {type: 'object', root: true},
  //   }
  // );

  // // Get statistics of user
  // UserModel.statistics = function(id, cb) {
  //   // Check on input
  //   if (!ObjectId.isValid(id)) {
  //     return cb(null, {error: 'Invalid User ID'});
  //   }

  //   var stats = {};

  //   UserModel.getDataSource().connector.connect((err, db) => {
  //     // Matches Played
  //     db.collection('MatchUserModel').count({userModelId: id}, function(err, matchesPlayed) {
  //       stats.matchesPlayed = matchesPlayed || 0;

  //       // Matches Won
  //       db.collection('Match').count({winnerId: id}, function(err, matchesWon) {
  //         stats.matchesWon = matchesWon || 0;

  //         // Frames Played
  //         db.collection('FrameUserModel').count({userModelId: id}, function(err, framesPlayed) {
  //           stats.framesPlayed = framesPlayed || 0;

  //           // Frames Won
  //           db.collection('Frame').count({winnerId: id}, function(err, framesWon) {
  //             stats.framesWon = framesWon || 0;

  //             // Return stats
  //             cb(null, stats);
  //           });
  //         });
  //       });
  //     });
  //   });
  // };
  // UserModel.remoteMethod('statistics',
  //   {
  //     http: {path: '/:id/statistics', verb: 'get'},
  //     accepts: {arg: 'id', type: 'string'},
  //     returns: {type: 'object', root: true},
  //   }
  // );
};
