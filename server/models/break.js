'use strict';

module.exports = function(Break) {
  // Set createdBy, updatedBy before saving the model
  Break.observe('before save', function setAutoData(context, next) {
    if (context.instance) {
      if (context.isNewInstance) {
        context.instance.createdBy = context.options.accessToken.userId;
        if (!context.instance.ownerId) {
          context.instance.ownerId = context.options.accessToken.userId;
        }
        // Date & time
        if (!context.instance.dateTime) {
          context.instance.dateTime = new Date().toISOString();
        }
      }
      context.instance.updatedBy = context.options.accessToken.userId;
    }
    next();
  });

  // After save
  // Break.observe('after save', function afterSave(ctx, next) {
  //   // Real-time updates (Frame)
  //   if (!ctx.isNewInstance &&
  //     ctx.options.accessToken != undefined &&
  //     ctx.options.accessToken.userId != undefined) {
  //     var filter = {
  //       include: [
  //         {
  //           match: 'players',
  //         },
  //         'players',
  //         {
  //           relation: 'breaks',
  //           scope: {
  //             order: 'dateTime DESC',
  //           },
  //         },
  //       ],
  //     };

  //     var Frame = Break.app.models.Frame;
  //     Frame.findById(ctx.instance.frameId, filter, function(err, frame) {
  //       Frame.app.mx.IO.emit('update-frame:' + ctx.instance.frameId,
  //         {
  //           userId: ctx.options.accessToken.userId,
  //           token10: ctx.options.accessToken.id.toString().substr(0, 10),
  //           frame: frame,
  //         }
  //       );
  //     });
  //   }
  //   next();
  // });
};
