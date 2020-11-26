// 会话超时出路
const url = require('url')
module.exports = (option, app) => {
    return async function authAdmin(ctx, next) {
        let pathName = url.parse(ctx.url).pathname;
        let token = ctx.request.headers.token;
        let referer = ctx.request.headers.referer;
        console.log(referer)
        let arr = await ctx.app.redis.get('foo').get('userarr')
        if (arr.split(',').indexOf(token)>-1) {
            await next();
        } else {
            if (referer.indexOf('swagger')>-1|| pathName.indexOf('/login') > -1 || pathName.indexOf('/register') > -1 || pathName.indexOf('/schoolList') > -1 || pathName.indexOf('/upload') > -1) {
                await next()
            } else {
                ctx.body = {
                    code: 99,
                    message: '请登录',
                    data: null
                }
            }
        }
    }
}