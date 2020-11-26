'use strict'
module.exports = app=>{
    return async (ctx, next)=>{
        console.log(ctx.packet);
        await next();
        console.log('packet response Vue!!!')

    }

}