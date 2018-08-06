"use strict";

module.exports = {
  "final:after": {
    "strong-error-handler": {}
  },
  "express-history-api-fallback": {
    params: [
      "index.html",
      {
        root: "$!../client/www"
      }
    ]
  }
};
