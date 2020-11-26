'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }

    // swagger2:{
    //   enable:true,
    //   package:'egg-swagger2'
    // },
    // cors 跨域
    cors: {
        enable: true,
        package: 'egg-cors'
    },
    // sequelize mysql orm plugins
    sequelize: {
        enable: true,
        package: 'egg-sequelize'
    },
    validate: {
        enable: true,
        package: 'egg-validate'
    },
    // redis 配置
    redis: {
        enable: true,
        package: 'egg-redis'
    },
    io: {
        enable: true,
        package: 'egg-socket.io'
    },
    swaggerdoc: {
        enable: true,
        package: 'egg-swagger-doc',
    },
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks'
    }
};