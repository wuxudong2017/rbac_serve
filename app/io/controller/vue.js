'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  async index() {
    const { ctx, app } = this;
    let workerId = ctx.packet[1].workerId;
    let orderId = ctx.packet[1].orderId;
    await app.redis.get('msg').lpush(workerId, orderId);
    let result = await app.redis.get('msg').lrange(workerId,0,-1);
    app.io.of('wx').emit(workerId,JSON.stringify(result));
    await ctx.socket.emit('vue', 'success');
  }
}

module.exports = ChatController;
