'use strict'

module.exports = app=>{
    return async (ctx,next)=>{
        console.log('connect Vue!!');
    
        await next();
       
        console.log('disCONNECT!! Vue')

    }
}