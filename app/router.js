'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller, io } = app;
    // 中间件  
    const authWechat = app.middleware.authWechat()

    router.get('/', controller.home.index);
    // router.get('/test', controller.home.test);

    router.post('/api/admin/login', controller.admin.login.doLogin)
        // 获取用户信息
    router.post('/api/admin/userInfo', controller.admin.login.userInfo);
    router.post('/api/admin/upload', controller.admin.base.upload)
    router.post('/api/admin/uploadFile', controller.admin.base.uploadFile)


    /**
     * VUE 后台接口
     *
     */


    // 用户退出
    router.post('/api/admin/layout', controller.admin.login.layout)
        // 首页用户信息数据
    router.get('/api/admin/index', controller.admin.base.index)
        // 故障饼状图
    router.get('/api/admin/getfault', controller.admin.base.getfault)
        // 每天工单数量
    router.get('/api/admin/getDay', controller.admin.base.getDayList)

    // 用户管理
    router.resources('user', '/api/admin/user', controller.admin.user)

    // 角色管理
    router.resources('role', '/api/admin/role', controller.admin.role)
        // 权限管理
    router.resources('permission', '/api/admin/permission', controller.admin.permission)

    //富文本多图片上传
    router.post('/api/help/upload', controller.admin.base.uploadEditor);

};