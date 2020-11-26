'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v1');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const sd = require('silly-datetime')
class ToolsService extends Service {
  // uuid
  async uuid() {
    let res = uuid()
    return md5(res)
  }
  // 工单号生成方案
  async setOrderId(){
    let data = (new Date().getTime())*3
    return data
  }
  // 获取现在时间(int 类型)
  async getTime() {
    let date = new Date();
    return date.getTime()
  }
    //时间格式化为yyyy-MM-dd hh:mm:ss
async formatDateTime(inputTime){
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}
//生成由字母与数字组合的随机字符串
async randomRange(min, max){
  var returnStr = "",
      range = (max ? Math.round(Math.random() * (max-min)) + min : min),
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  for(var i=0; i<range; i++){
      var index = Math.round(Math.random() * (arr.length-1));
      returnStr += arr[index];
  }
  return returnStr;
}



  // jwt 会话验证机制
  /**
  *@filename:generateToken
  *@Description:
  * data:用户id
  * time:保存时间
  * cert:密钥
  */
  async generateToken(id,data, time) {
    let {ctx} = this;
    let cert = "123456" // 加密秘钥
    let token = jwt.sign({data}, cert, {
      expiresIn: time,  // 1小时过期
  });
    // 保存到redis
    await ctx.service.cache.set(id, token,time)
  }
  // 上传文件
  


}

module.exports = ToolsService;
