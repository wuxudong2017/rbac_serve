'use strict'
module.exports = app=>{
    return async function authOa(ctx,next){
        if(ctx.request.body.safeKey=='123'){
            await next()
        }else{
            ctx.throw(401,'Unauthorized')
        }
    }
}