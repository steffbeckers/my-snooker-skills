'use strict';

module.exports = function(app) {
  // Realtime Match updates
  var Match = app.models.Match;
  Match.createChangeStream();

  // Realtime Frame updates
  var Frame = app.models.Frame;
  Frame.createChangeStream();

  // Realtime Break updates
  var Break = app.models.Break;
  Break.createChangeStream();
};
