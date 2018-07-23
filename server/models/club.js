'use strict';

module.exports = function(Club) {
  Club.validatesUniquenessOf('name', {
    message: 'Club already exists',
  });
  Club.validatesUniquenessOf('slug', {
    message: 'Club already exists',
  });
};
