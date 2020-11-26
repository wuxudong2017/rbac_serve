const axios = require('axios');
const authHeader ='Basic'+new Buffer.from('admin:password@1234').toString('base64')
const request = axios.create({
    // 正式环境
    baseURL:'http://oa.chinatiye.cn:9000/api/km-addin/kmAddinRestService',
    // 测试服务
    //  baseURL:'http://192.168.17.115:9001/api/km-addin/kmAddinRestService',
    timeOut:15000
});
request.interceptors.request.use(config=>{
    config.headers={
        'Authorization':authHeader 
    }
    return config
},err=>{
    return Promise.reject(err)
})

request.interceptors.response.use(res=>{
    return res.data
   
},err=>{
    return Promise.reject(err)
})
module.exports = {
    http:request
}
