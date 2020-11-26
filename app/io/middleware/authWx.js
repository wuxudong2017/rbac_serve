'use strict'

module.exports = app=>{
    return async (ctx,next)=>{
        console.log('connect WECHAT !!');
        await next();
        console.log('disCONNECT!! WECHAT')

    }
}