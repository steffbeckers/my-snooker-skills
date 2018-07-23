'use strict';

var ObjectId = require('mongodb').ObjectId;

module.exports = function(app) {
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var UserModel = app.models.UserModel;

  Role.registerResolver('matchPlayer', function(role, context, cb) {
    // Q: Is the current request accessing a Match?
    if (context.modelName !== 'Match') {
      // A: No. This role is only for matches: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    // Q: Is the user logged in? (there will be an accessToken with an ID if so)
    var userId = context.accessToken.userId;
    if (!userId) {
      // A: No, user is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    if (!context.modelId) {
      return process.nextTick(() => cb(null, false));
    }

    // Q: Is the current logged-in user associated with this Match?
    // Step 1: lookup the requested match
    app.models.Match.findById(
      ObjectId(context.modelId),
      {include: 'players'},
      function(err, match) {
        // A: The datastore produced an error! Pass error to callback
        if (err) return cb(err);
        // A: There's no match by this ID! Pass error to callback
        if (!match) return cb(new Error('Match not found'));

        var matchJSON = match.toJSON();

        for (var i = 0; i < matchJSON.players.length; i++) {
          if (String(matchJSON.players[i].id) === String(userId)) {
            return cb(null, true);
          }
        }

        return cb(null, false);
      });
  });

  Role.registerResolver('matchReferee', function(role, context, cb) {
    // Q: Is the current request accessing a Match?
    if (context.modelName !== 'Match') {
      // A: No. This role is only for matches: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    // Q: Is the user logged in? (there will be an accessToken with an ID if so)
    var userId = context.accessToken.userId;
    if (!userId) {
      // A: No, user is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    if (!context.modelId) {
      return process.nextTick(() => cb(null, false));
    }

    // Q: Is the current logged-in user associated with this Match?
    // Step 1: lookup the requested match
    app.models.Match.findById(ObjectId(context.modelId), function(err, match) {
      // A: The datastore produced an error! Pass error to callback
      if (err) return cb(err);
      // A: There's no match by this ID! Pass error to callback
      if (!match) return cb(new Error('Match not found'));

      var matchJSON = match.toJSON();

      if (String(matchJSON.refereeId) === String(userId)) {
        return cb(null, true);
      }

      return cb(null, false);
    });
  });

  Role.registerResolver('framePlayer', function(role, context, cb) {
    // Q: Is the current request accessing a Frame?
    if (context.modelName !== 'Frame') {
      // A: No. This role is only for matches: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    // Q: Is the user logged in? (there will be an accessToken with an ID if so)
    var userId = context.accessToken.userId;
    if (!userId) {
      // A: No, user is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    if (!context.modelId) {
      return process.nextTick(() => cb(null, false));
    }

    // Q: Is the current logged-in user associated with this Frame?
    // Step 1: lookup the requested match
    app.models.Frame.findById(
      ObjectId(context.modelId),
      {include: 'players'},
      function(err, frame) {
      // A: The datastore produced an error! Pass error to callback
        if (err) return cb(err);
        // A: There's no frame by this ID! Pass error to callback
        if (!frame) return cb(new Error('Frame not found'));

        var frameJSON = frame.toJSON();

        for (var i = 0; i < frameJSON.players.length; i++) {
          if (String(frameJSON.players[i].id) === String(userId)) {
            return cb(null, true);
          }
        }

        return cb(null, false);
      });
  });

  Role.registerResolver('frameReferee', function(role, context, cb) {
    // Q: Is the current request accessing a Frame?
    if (context.modelName !== 'Frame') {
      // A: No. This role is only for matches: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    // Q: Is the user logged in? (there will be an accessToken with an ID if so)
    var userId = context.accessToken.userId;
    if (!userId) {
      // A: No, user is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }

    if (!context.modelId) {
      return process.nextTick(() => cb(null, false));
    }

    // Q: Is the current logged-in user associated with this Frame?
    // Step 1: lookup the requested match
    app.models.Frame.findById(ObjectId(context.modelId), function(err, frame) {
      // A: The datastore produced an error! Pass error to callback
      if (err) return cb(err);
      // A: There's no frame by this ID! Pass error to callback
      if (!frame) return cb(new Error('Frame not found'));

      var frameJSON = frame.toJSON();

      if (String(frameJSON.refereeId) === String(userId)) {
        return cb(null, true);
      }

      return cb(null, false);
    });
  });

  // Role relations
  RoleMapping.belongsTo(UserModel);
  UserModel.hasMany(RoleMapping, {foreignKey: 'principalId'});
  Role.hasMany(UserModel, {through: RoleMapping, foreignKey: 'roleId'});

  // Administrators
  // Role.create({
  //   name: 'admin'
  // }, function(err, role) {
  //   if (err) {
  //     console.log('> ERROR: ' + err);
  //   }
  //   console.log(role);

  //   // Steff
  //   role.principals.create({
  //     principalType: 'USER',
  //     principalId: '5a8823b2582d8d20840b11e8'
  //   }, function(err, principal) {
  //     if (err) {
  //       console.log('> ERROR: ' + err);
  //     }
  //     console.log(principal);
  //   });
  // });
};
