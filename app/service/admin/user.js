'use strict';

const Service = require('egg').Service;
const sequelize = require('sequelize')
class UserService extends Service {
  async index(limit, offset) {
    let { model } = this.app;
    let result = await model.SysUser.findAndCountAll({
      include: [{
        model: model.SysUserInfo,
        attributes: [],
        raw: true,
      }, {
        model: model.SysRole,
        attributes: [],
        raw: true,

      }],
      raw: true,
      attributes: {
        include: [
          [sequelize.col('sysUserInfo.name'), 'name'],
          [sequelize.col('sysUserInfo.age'), 'age'],
          [sequelize.col('sysUserInfo.sex'), 'sex'],
          [sequelize.col('sysUserInfo.avatar'), 'avatar'],
          [sequelize.col('sysUserInfo.address'), 'address'],
          [sequelize.col('sysUserInfo.phone'), 'phone'],
          [sequelize.col('sysUserInfo.entry_time'), 'entryTime'],
          [sequelize.col('sysRole.role_name'), 'roleName']
        ],
        exclude: ['password', 'roleId', 'updateTime']
      },
      limit: limit,
      offset: (offset - 1) * 10,
      order: [['jobNumber', 'ASC']]
    })
    return result
  }
  // 新加用户
  async create(data) {
    let { ctx } = this;
    let { model } = this.app;
    let name = data.name,
      username = data.username,
      password = data.password,
      age = data.age,
      avatar = data.avatar,
      phone = data.phone,
      sex = data.sex,
      address = data.address,
      roleId = data.roleId,
      status = data.status,
      entryTime = data.entryTime,
      createTime = await ctx.service.tools.getTime(),
      id = await ctx.service.tools.uuid();
    const t = await model.transaction({ autoCommit: true });
    let jobNumber = Number(await model.SysUser.max('jobNumber')) + 1;
    let result = await model.SysUser.findOne({
      where: {
        username
      }
    });
    if (result != null) {
      return 1
    } else {
      try {
        await model.SysUser.create({
          id, username, password, roleId, createTime, jobNumber, status
        }, { transaction: t });

        await model.SysUserInfo.create({
          id: jobNumber, name, age, phone, sex, address, entryTime, avatar
        }, { transaction: t })
        await t.commit()
        return 2
      } catch (e) {
        await t.rollback()
        return 3
      }

    }
  }
  // 根据id 查询用户
  async edit(id){
    let {model} = this.app;
    let result = await model.SysUser.findOne({
      include: [{
        model: model.SysUserInfo,
        attributes: [],
        raw: true,
      }, {
        model: model.SysRole,
        attributes: [],
        raw: true,

      }],
      where:{
        id
      },
      raw: true,
      attributes: {
        include: [
          [sequelize.col('sysUserInfo.name'), 'name'],
          [sequelize.col('sysUserInfo.age'), 'age'],
          [sequelize.col('sysUserInfo.sex'), 'sex'],
          [sequelize.col('sysUserInfo.avatar'), 'avatar'],
          [sequelize.col('sysUserInfo.address'), 'address'],
          [sequelize.col('sysUserInfo.phone'), 'phone'],
          [sequelize.col('sysUserInfo.entry_time'), 'entryTime'],
          [sequelize.col('sysRole.role_name'), 'roleName']
        ],
      }
    })
    return result
  }
    // 根据id 更新用户
    async update(id,data) {
      let { ctx } = this;
      let { model } = this.app;
      let name = data.name,
        username = data.username,
        password = data.password,
        age = data.age,
        avatar = data.avatar,
        phone = data.phone,
        sex = data.sex,
        address = data.address,
        roleId = data.roleId,
        status = data.status,
        entryTime = data.entryTime,
        jobNumber = data.jobNumber;
      const t = await model.transaction({ autoCommit: true });
      
      try {
        await model.SysUser.update({
           username, password, roleId, status
        },{
          where:{
            id
          }
        }, { transaction: t });
        await model.SysUserInfo.update({
           name, age, phone, sex, address, entryTime, avatar
        },{
          where:{
            id:jobNumber
          }
        }, { transaction: t })
        await t.commit()
        return true
      } catch (e) {
        await t.rollback()
        return false
      }

    }
    // 根据id 删除用户
   async delete(id){
    let {model} = this.app;
    const t = await model.transaction({ autoCommit: true });
    let {jobNumber} = await model.SysUser.findOne({
      where:{
        id
      },
      raw:true
    })
    try{
      await model.SysUser.destroy({
        where:{
          id
        }
      })
      await model.SysUserInfo.destroy({
        where:{
          id:jobNumber
        }
      })
      await t.commit();
      return true;
    }catch(e){
      await t.rollback();
      return false
    }
    }
    async userTrue(){
      let {model} = this.app;
    let result = await model.SysUser.findAll({
      include: [{
        model: model.SysUserInfo,
        attributes: [],
        raw: true,
      }, {
        model: model.SysRole,
        attributes: [],
        raw: true,

      }],
      where:{
        status:'1'
      },
      raw: true,
      attributes: {
        include: [
          [sequelize.col('sysUserInfo.name'), 'name'],
          [sequelize.col('sysUserInfo.age'), 'age'],
          [sequelize.col('sysUserInfo.sex'), 'sex'],
          [sequelize.col('sysUserInfo.avatar'), 'avatar'],
          [sequelize.col('sysUserInfo.address'), 'address'],
          [sequelize.col('sysUserInfo.phone'), 'phone'],
          [sequelize.col('sysUserInfo.entry_time'), 'entryTime'],
          [sequelize.col('sysRole.role_name'), 'roleName']
        ],
      }
    })
    return result
    }
    async getAllUser(){
      const {model} = this.app;
      let result = await model.SysUserInfo.findAll({
        attributes:['id','name'],
        raw:true
      })
      return result;
    }

}

module.exports = UserService;
