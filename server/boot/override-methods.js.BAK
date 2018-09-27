'use strict';

module.exports = function overrideMethods(server) {
  var userIdentity = server.models.userIdentity;

  userIdentity.stringToRef = function(object, reference) {
    function arrDeref(o, ref, i) {
      return !ref ? o : o[ref.slice(0, i ? -1 : ref.length)];
    }
    function dotDeref(o, ref) {
      return ref.split('[').reduce(arrDeref, o);
    }

    // Steff
    if (reference === 'true') {
      return true;
    } else if (reference === 'false') {
      return false;
    }

    return !reference ? object : reference.split('.').reduce(dotDeref, object);
  };
};
