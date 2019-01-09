'use strict';

var app = require('../../server/server');
var path = require('path');
var qs = require('querystring');

module.exports = function(user) {
  // Validations
  user.validatesUniquenessOf('username', {ignoreCase: true});
  user.validatesUniquenessOf('email', {ignoreCase: true});

  // Before save
  user.observe('before save', function(ctx, next) {
    console.log('> user.observe.before save triggered');

    // Clean input
    if (ctx.instance) {
      if (ctx.instance.username) ctx.instance.username = ctx.instance.username.trim();
      if (ctx.instance.firstName) ctx.instance.firstName = ctx.instance.firstName.trim();
      if (ctx.instance.lastName) ctx.instance.lastName = ctx.instance.lastName.trim();
      if (ctx.instance.email) ctx.instance.email = ctx.instance.email.toLowerCase().trim(); // Also toLowerCase
    } else {
      if (ctx.data.username) ctx.data.username = ctx.data.username.trim();
      if (ctx.data.firstName) ctx.data.firstName = ctx.data.firstName.trim();
      if (ctx.data.lastName) ctx.data.lastName = ctx.data.lastName.trim();
      if (ctx.data.email) ctx.data.email = ctx.data.email.toLowerCase().trim(); // Also toLowerCase
    }

    next();
  });

  // After save
  user.observe('after save', function(ctx, next) {
    console.log('> user.observe.after save triggered');

    // TODO: Send email verification after changing email address
    // if (ctx.instance.email && !ctx.instance.emailVerified) {
    //   user.resendVerificationEmail(ctx.instance.email, function(err, response) {
    //     console.log(err, response);
    //     next();
    //   });
    // } else {
    //   next();
    // }

    next();
  });

  // Login logic
  user.beforeRemote('login', function(ctx, userInstance, next) {
    console.log('> user.beforeRemote.login triggered');

    // Lower case email address and trim
    if (ctx &&
        ctx.req &&
        ctx.req.body &&
        ctx.req.body.email) {
      ctx.req.body.email = ctx.req.body.email.toLowerCase().trim();
    }

    next();
  });

  // Send verification email after registration
  user.afterRemote('create', function(ctx, userInstance, next) {
    console.log('> user.afterRemote.create triggered');

    var options = {
      host: app.get('host') || '0.0.0.0',
      port: app.get('port') || 3000,
      type: 'email',
      to: userInstance.email,
      from: '🔴 My Snooker Skills <registration@mysnookerskills.com>',
      subject: 'Thanks for registering',
      template: path.join(
        __dirname,
        '..',
        '..',
        'server',
        'templates',
        'user',
        'verify.ejs'
      ),
      redirect: null,
      user: userInstance,
      mailer: app.models.EmailFromRegistration,
      verifyHref: app.get('confirmHrefApp') + '?' + qs.stringify({
        uid: String(userInstance.id),
      }),
    };

    userInstance.verify(options, function(err, response) {
      if (err) {
        console.log('> Error verifying, deleting user');
        user.deleteById(userInstance.id);
        return next(err);
      }

      console.log('> Verification email sent: ', response);

      return next();
    });
  });

  // Resend verification email
  user.resendVerificationEmail = function(usernameOrEmail, cb) {
    console.log('> user.resendVerificationEmail triggered');

    var isEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail);

    var filter = {};

    if (isEmailAddress) {
      filter = {where: {email: usernameOrEmail}};
    } else {
      filter = {where: {username: usernameOrEmail}};
    }

    // Find the user by username or email address
    user.findOne(filter, function(err, userInstance) {
      if (err) {
        console.log('> Error identifying user by username or email address');
        return cb(err);
      }

      // If there is no user found
      if (userInstance == null) {
        return cb(null, {code: 'USERNAME_OR_EMAIL_NOT_FOUND'});
      }

      // If the user isn't verified already resend a verification email
      if (!userInstance.emailVerified) {
        var options = {
          host: app.get('host') || '0.0.0.0',
          port: app.get('port') || 3000,
          type: 'email',
          to: userInstance.email,
          from: '🔴 My Snooker Skills <account@mysnookerskills.com>',
          subject: 'Verify your email address',
          template: path.join(
            __dirname,
            '..',
            '..',
            'server',
            'templates',
            'user',
            'verify.ejs'
          ),
          redirect: null,
          user: userInstance,
          mailer: app.models.EmailFromAccount,
          verifyHref: app.get('confirmHrefApp') + '?' + qs.stringify({
            uid: String(userInstance.id),
          }),
        };

        userInstance.verify(options, function(err, response) {
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
  user.remoteMethod('resendVerificationEmail', {
    http: {path: '/resendVerificationEmailTo', verb: 'post'},
    accepts: {
      arg: 'usernameOrEmail',
      type: 'string',
    },
    returns: {type: 'object', root: true},
  });

  // Send password reset email
  user.on('resetPasswordRequest', function(info) {
    console.log('> user.on.resetPasswordRequest triggered');
    // console.log('> info');
    // console.log(info);

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

    user.app.models.EmailFromAccount.send({
      to: info.email,
      from: '🔴 My Snooker Skills <account@mysnookerskills.com>',
      subject: 'Reset password',
      mailer: app.models.EmailFromAccount,
      html: html,
    }, function(err) {
      if (err) return console.log('> Error sending password reset email');
      console.log('> Reset password email sent to:', info.email);
    });
  });

  // Include roles, remove fields on login
  user.afterRemote('login', function(ctx, userInstance, next) {
    console.log('> user.afterRemote.login triggered');

    var resultJSON = ctx.result.toJSON();

    // Overwrite user with roles
    var filter = {
      include: ['roles', 'friends', 'subscriptions', 'identities', 'club', 'address'],
    };
    user.findById(ctx.result.userId, filter, function(err, userInstance) {
      var userJSON = userInstance.toJSON();

      // Simplify roles in string array
      var simpleRoleArray = [];
      userJSON.roles.forEach(role => {
        simpleRoleArray.push(role.name);
      });
      userJSON.roles = simpleRoleArray;

      // Simplify friends in array
      var simpleFriendsArray = [];
      userJSON.friends.forEach(friend => {
        simpleFriendsArray.push({
          id: friend.id,
          firstName: friend.firstName,
          lastName: friend.lastName,
          username: friend.username,
          profilePicture: friend.profilePicture,
        });
      });
      userJSON.friends = simpleFriendsArray;

      // Simplify subscriptions in string array
      var simpleSubscriptionArray = [];
      userJSON.subscriptions.forEach(subscription => {
        simpleSubscriptionArray.push(subscription.name);
      });
      userJSON.subscriptions = simpleSubscriptionArray;

      // Replace user
      resultJSON.user = userJSON;
      ctx.result = resultJSON;
      next();
    });
  });

  // Search a by fullname or username
  user.searchByFullnameOrUsername = function(name, cb) {
    var filter = {};

    if (name === '' || name == null || name == undefined) {
      filter = {
        fields: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
          profilePicture: true,
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
          profilePicture: true,
        },
        order: 'firstName ASC',
        limit: 10,
      };
    }

    user.find(filter, function(err, users) {
      cb(null, users);
    });
  };
  user.remoteMethod('searchByFullnameOrUsername', {
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
  });

  // Players list to query
  user.list = function(orderBy, orderDirection, skip, take, options, cb) {
    const token = options && options.accessToken;
    const userId = token && token.userId;

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
        username: true,
        profilePicture: true,
        createdOn: true,
      },
      include: 'club',
      where: {id: {neq: userId}}, // Exclude the logged in player
      order: orderBy + ' ' + orderDirection,
      skip: skip,
      limit: take,
    };

    user.find(filter, function(err, users) {
      cb(null, users);
    });
  };
  user.remoteMethod('list', {
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
      {
        arg: 'options',
        type: 'object',
        http: 'optionsFromRequest',
      },
    ],
    returns: {
      type: 'array',
      root: true,
    },
  });

  // Me
  user.me = function(options, cb) {
    console.log('> user.me triggered');

    var filter = {
      include: ['roles', 'friends', 'subscriptions', 'identities', 'club', 'address'],
    };
    user.findById(options.accessToken.userId, filter,
      function(err, userInstance) {
        var userJSON = userInstance.toJSON();

        // Simplify roles in string array
        var simpleRoleArray = [];
        userJSON.roles.forEach(role => {
          simpleRoleArray.push(role.name);
        });
        userJSON.roles = simpleRoleArray;

        // Simplify friends in array
        var simpleFriendsArray = [];
        userJSON.friends.forEach(friend => {
          simpleFriendsArray.push({
            id: friend.id,
            firstName: friend.firstName,
            lastName: friend.lastName,
            username: friend.username,
            profilePicture: friend.profilePicture,
          });
        });
        userJSON.friends = simpleFriendsArray;

        // Simplify subscriptions in string array
        var simpleSubscriptionArray = [];
        userJSON.subscriptions.forEach(subscription => {
          simpleSubscriptionArray.push(subscription.name);
        });
        userJSON.subscriptions = simpleSubscriptionArray;

        cb(null, userJSON);
      });
  };
  user.remoteMethod('me', {
    http: {
      path: '/me',
      verb: 'get',
    },
    accepts: [
      {
        arg: 'options',
        type: 'object',
        http: 'optionsFromRequest',
      },
    ],
    returns: {
      type: 'object',
      root: true,
    },
  });

  // Profile
  user.profileByUsername = function(username, cb) {
    var filter = {
      where: {
        username: username,
      },
      fields: {
        settings: false,
        telephone: false,
        email: false,
        emailVerified: false,
        updatedOn: false,
      },
      include: [
        {
          relation: 'friends',
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
          relation: 'club',
          scope: {
            fields: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      ],
    };
    user.findOne(filter, function(err, userInstance) {
      // On error
      if (err) {
        cb(err);
      }

      cb(null, userInstance);
    });
  };
  user.remoteMethod('profileByUsername', {
    http: {path: '/:username/profile', verb: 'get'},
    accepts: {arg: 'username', type: 'string'},
    returns: {type: 'object', root: true},
  });

  // Uploads
  user.on('attached', function() {
    // Define the variations for various UI uses that
    // will be created by s3-uploader on upload
    var versions = {
      profilePicture: [
        {
          suffix: '-large',
          aspect: '1:1',
          quality: 90,
          maxHeight: 1024,
          maxWidth: 1024,
        },
        {
          suffix: '-medium',
          aspect: '1:1',
          quality: 90,
          maxHeight: 480,
          maxWidth: 480,
        },
        {
          suffix: '-small',
          aspect: '1:1',
          quality: 90,
          maxHeight: 150,
          maxWidth: 150,
        },
        {
          suffix: '-thumb',
          aspect: '1:1',
          quality: 90,
          maxHeight: 60,
          maxWidth: 60,
        },
      ],
    };

    var uploadable = require('../../server/lib/uploadable')();
    // Pass the model class, model name and the array of variations
    uploadable(user, 'user', versions);
  });

  // Statistics
  // Refresh calculations (MapReduces, ..)
  // user.calculateStatistics = function(cb) {
  //   user.getDataSource().connector.connect((err, db) => {
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
  //         out: {merge: 'user'},
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
  // user.remoteMethod('calculateStatistics',
  //   {
  //     http: {path: '/statistics', verb: 'get'},
  //     returns: {type: 'object', root: true},
  //   }
  // );

  // // Get statistics of user
  // user.statistics = function(id, cb) {
  //   // Check on input
  //   if (!ObjectId.isValid(id)) {
  //     return cb(null, {error: 'Invalid User ID'});
  //   }

  //   var stats = {};

  //   user.getDataSource().connector.connect((err, db) => {
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
  // user.remoteMethod('statistics',
  //   {
  //     http: {path: '/:id/statistics', verb: 'get'},
  //     accepts: {arg: 'id', type: 'string'},
  //     returns: {type: 'object', root: true},
  //   }
  // );
};
