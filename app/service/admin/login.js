'use strict';

const Service = require('egg').Service;
const sequelize =require('sequelize')
class LoginService extends Service {
  async getUser(username,password) {
    let {model} = this.app;
    let result = await model.SysUser.findOne({
        where:{
            $or:[{username},{jobNumber:username}],
            password
        },
        raw:true
    })
    return result
  }
  async getUserInfo(token){
    let {model} = this.app;
    let result = await model.SysUser.findOne({
      include:[{
        model:model.SysRole,
        raw:true,
        attributes:[],
      },{
        model:model.SysUserInfo,
        raw:true,
        attributes:[],
      }],
      where:{
        id:token
      },
      attributes:['roleId','id',[
        sequelize.col('sysRole.role_name'),'roleName',
       
      ],[
        sequelize.col('sysUserInfo.name'),'name'
      ]],
      raw:true
    })
    let roleId = result.roleId;
    let permissionList = await this.ctx.service.admin.login.getUserPermission(roleId);
    let menuList =  await this.ctx.service.admin.login.getUserPermissionMenu(roleId)
    result.permissionList = permissionList;
    result.menuList= menuList;
    return result
  }
  // 根据角色id 查询权限表
  async getUserPermission(roleId){
    let {model} =this.app;
    let result =await model.SysRolePermission.findAll({
      include:{
        model:model.SysPermission,
        raw:true,
        attributes:[]
      },
      where:{
        roleId
      },
      attributes:[[
        sequelize.col('sysPermission.permission_code'),'code'
      ]],
      raw:true
    })

    const arr =[]
    result.forEach(async (item) => {
      await arr.push(item.code)
    });


    return arr
  }
  // 根据角色id 查询menuCode
  async getUserPermissionMenu(roleId){
    let {model} =this.app;
    let result =await model.SysRolePermission.findAll({
      include:{
        model:model.SysPermission,
        raw:true,
        attributes:[]
      },
      where:{
        roleId
      },
      attributes:[[
        sequelize.col('sysPermission.menu_code'),'code'
      ]],
      raw:true
    })
    let arr =[]
    result.forEach(async (item)=>{
      if(arr.indexOf(item.code)<0){
        await arr.push(item.code)
      }
    })
    return arr
  }



}

module.exports = LoginService;
