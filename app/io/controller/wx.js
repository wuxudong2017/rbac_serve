'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  async index() {
    const {ctx,app} = this;
    let workerId = ctx.packet[1].workerId
    let sureOrder = ctx.packet[1].sureOrder;
    if(sureOrder){
      await app.redis.get('msg').del(workerId);
    }else{
      let result = await app.redis.get('msg').lrange(workerId,0,-1);
      if(result.length>0){
       ctx.socket.emit(workerId,JSON.stringify(result))
      }
    }
   
  }
}

module.exports = ChatController;
