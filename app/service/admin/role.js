'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async indexTrue() {
    let {model} = this.app
    let result = await model.SysRole.findAll({
        where:{
            status:"1"
        },
        raw:true,
    })
    return result
  }
  async index() {
    let {model} = this.app
    let result = await model.SysRole.findAndCountAll({
      raw:true,
    })
    return result
  }


  async create(data){
    let {model} =this.app;
    let createTime = await this.ctx.service.tools.getTime();
    let result = await model.SysRole.create({
      roleName:data.roleName,
      status:data.status,
      createTime,
      updateTime:createTime
    })
    return result
  }
  //
  async edit(id){
    let {model} = this.app;
    let result = await model.SysRole.findOne({
      raw:true,
      where:{
        id
      }
    });
    return result
  }
  async update(id,formData){
    let {model} = this.app;
    let updateTime = await this.ctx.service.tools.getTime();
    let arr = formData.permissionCheck
    const  t = await model.transaction({ autoCommit: true });
    let res = [];
    arr.forEach(item => {
      res.push({
        roleId:id,
        permissionId:item

      })
    });
    try{
      await model.SysRole.update({
        roleName:formData.roleName,
        status:formData.status,
        updateTime
      },{
        where:{
          id
        }
      },{transaction:t});
      await model.SysRolePermission.destroy({
        where:{
          roleId:id
        }
      })
      await model.SysRolePermission.bulkCreate(res,{
        ignoreDuplicates : true
      });
    await t.commit();
    return true
    }catch(e){
    
      await t.rollback();
      return false
    }
  }
  async delete(id){
    let {model} = this.app;
    let result;

    let has= await model.SysUser.findAll({
      where:{
        roleId: id
      },
      raw:true,
    });
    if(has){
      return result = 2
    }else{
      result= await model.SysRole.destroy({
        where:{
          id
        }
      });
      return result;
    }
  }

}

module.exports = RoleService;
