'use strict';

module.exports = {
  'loopback-component-explorer': null,
  '@mean-expert/loopback-component-realtime': {
    debug: false,
    auth: false,
    driver: {
      name: 'socket.io',
      options: {},
    },
    modules: [
      'IO',
    ],
    secure: true,
  },
};
