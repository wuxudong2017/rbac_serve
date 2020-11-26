'use strict'

// app/middleware/error_handler.js
module.exports = () => {
    return async function responseHeader(ctx, next) {
        try {
            await next();
            if (ctx.status === 404 && !ctx.body) {
                ctx.body = { code:0,error: 'Not Found',status:404 };
            } else {
            
              if(ctx._matchedRoute == "/api/help/upload"){
                ctx.body = {
                    errno:ctx.body.code==0&&ctx.body.data==null?1:0,
                    message:ctx.body.message||'操作成功',
                    data:ctx.body.code==1?null:ctx.body
                }
            }else{
                ctx.body = {
                    code:ctx.body.code==0&&ctx.body.data==null?0:1,
                    message:ctx.body.message||'操作成功',
                    data:ctx.body.code==0?null:ctx.body
                }
            }
            }
        } catch (err) {
            // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
            ctx.app.emit('error', err, ctx);
            const status = err.status || 500;
            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const message = status === 500 && ctx.app.config.env === 'prod'
                ? 'Internal Server Error'
                : err.message;

            // 从 error 对象上读出各个属性，设置到响应中
            ctx.body = { code:0, status, message, data: null };
            if (status === 422) {
                ctx.body.detail = err.errors;
            }
            ctx.status = status;
        }
    };
};