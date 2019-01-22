'use strict';

module.exports = function(Address) {
  // Before save
  Address.observe('before save', function(ctx, next) {
    // Clean input
    if (ctx.instance) {
      if (ctx.instance.street) ctx.instance.street = ctx.instance.street.trim();
      if (ctx.instance.number) ctx.instance.number = ctx.instance.number.trim();
      if (ctx.instance.extension)
        ctx.instance.extension = ctx.instance.extension.trim();
      if (ctx.instance.zipcode)
        ctx.instance.zipcode = ctx.instance.zipcode.trim();
      if (ctx.instance.city)
        ctx.instance.city = ctx.instance.city.toUpperCase().trim(); // Also to upper
      if (ctx.instance.googleMapsLink)
        ctx.instance.googleMapsLink = ctx.instance.googleMapsLink.trim();
      // TODO: Add country
    } else {
      if (ctx.data.street) ctx.data.street = ctx.data.street.trim();
      if (ctx.data.number) ctx.data.number = ctx.data.number.trim();
      if (ctx.data.extension) ctx.data.extension = ctx.data.extension.trim();
      if (ctx.data.zipcode) ctx.data.zipcode = ctx.data.zipcode.trim();
      if (ctx.data.city) ctx.data.city = ctx.data.city.toUpperCase().trim(); // Also to upper
      if (ctx.data.googleMapsLink)
        ctx.data.googleMapsLink = ctx.data.googleMapsLink.trim();
      // TODO: Add country
    }

    next();
  });
};
