'use strict';

var started = new Date();

module.exports = function(server) {
  // Install a `/api` route that returns server status
  var router = server.loopback.Router();
  router.get('/api', function(req, res) {
    res.send({
      status: {
        started: started,
        uptime: (Date.now() - Number(started)) / 1000,
      },
      version: require('../../client/package.json').version,
    });
  });

  server.use(router);
};
