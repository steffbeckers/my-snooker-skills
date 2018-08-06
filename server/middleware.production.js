"use strict";

module.exports = {
  "final:after": {
    "strong-error-handler": {}
  },
  "final": {
    "loopback#urlNotFound": {},
    "express-history-api-fallback": {
      params: [
        "index.html",
        {
          root: "$!../client/www"
        }
      ]
    }
  }
};
