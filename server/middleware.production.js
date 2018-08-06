"use strict";

module.exports = {
  "final:after": {
    "strong-error-handler": {}
  },
  "final": {
    "express-history-api-fallback": {
      params: [
        "index.html",
        {
          root: "$!../client/www"
        }
      ]
    },
    "loopback#urlNotFound": {}
  }
};
