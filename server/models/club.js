'use strict';

module.exports = function(Club) {
  Club.validatesUniquenessOf('name', {
    message: 'Club already exists',
  });
  Club.validatesUniquenessOf('slug', {
    message: 'Club already exists',
  });

  // Find by slug
  Club.bySlug = function(slug, cb) {
    Club.findOne({
      where: {
        slug: slug,
      },
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
    }, function(
      err,
      club
    ) {
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
};
