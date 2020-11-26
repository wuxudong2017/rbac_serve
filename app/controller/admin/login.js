'use strict';

const baseController = require('./base');
const rules = {
  username: {
    type: 'string', required: true,
  },
  password: {
    type: 'string', required: true
  }
}
const md5 = require('md5');

class LoginController extends baseController {
  async doLogin() {
    const { ctx, app } = this;
    let formData = ctx.request.body;
    let username = formData.username;
    let password = formData.password;
    ctx.validate(rules, formData);
    let result = await ctx.service.admin.login.getUser(username, password);
    if (result) {
      // let id = result.id
      // let time = app.config.timeRedis
      // await ctx.service.tools.generateToken(token,result,time);

      const token = ctx.helper.loginToken({ corpid: result.username, userid: result.id }, app.config.jwtTime) // token生成
      await app.redis.get('foo').set(result.username + result.id, token, 'ex', app.config.jwtTime) // 保存到redis
      // ctx.body = { data: { token, expires: this.config.login_token_time }, code: 1, msg: '登录成功' } // 返回前端
      ctx.body = {
        code:1,
        token,
        message: '登录成功'
      }

    }
  }
  // 获取用户信息
  async userInfo() {
    let { ctx } = this
    let id =ctx.locals.userid
    let result = await ctx.service.admin.login.getUserInfo(id);
    if (result) {
      ctx.body = result;
      ctx.body.code=1
    }
  }
  // 用户 退出
  async layout() {
    let { ctx,app } = this
     await app.redis.get('foo').del(ctx.request.body.token)

  }
  async test() {
    let { ctx } = this;
    ctx.body = {
      token: ctx.session.userInfo
    }
  }
}

module.exports = LoginController;
