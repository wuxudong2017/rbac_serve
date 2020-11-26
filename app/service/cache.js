'use strict';
// redis 服务
const Service = require('egg').Service;

class CatchService extends Service {
    async set(key,value,seconds) {
        value = JSON.stringify(value);
        if(this.app.redis){
            if(!seconds){
                await this.app.redis.set(key,value);
            }else{
                await this.app.redis.set(key,value,'EX',seconds)
            }
        }
      }
    
      async get(key){
          if(this.app.redis){
              var data = await this.app.redis.get(key);
              if(!data) return;
              return JSON.parse(data)
          }
      }
      async remove(key){
        if(this.app.redis){
            var data = await this.app.redis.del(key);
           return data
        }
      }
}

module.exports = CatchService;
