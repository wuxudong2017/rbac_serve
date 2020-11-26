'use strict';

const Service = require('egg').Service;
const sequelize = require('sequelize')
class PermissionService extends Service {
    async index(limit, offset) {
        let { model } = this.app;
        let result = await model.SysPermission.findAndCountAll({
            raw: true,
            limit: limit,
            offset: (offset - 1) * 10,
            order: [['id', 'DESC']]
        });
        return result
    }
    async new() {
        let { model } = this.app;
        let result = await model.SysPermission.findAll({
            raw: true,
            where:{
                status:{
                    $gt:0
                }
            }
        });
        return result
    }
    async create(formData) {
        let { model } = this.app;
        let menuName = formData.menuName,
            permissionName = formData.permissionName,
            permissionCode = formData.permissionCode,
            isRequired = '1';
        let menuCode = permissionCode.split(':')[0]

        let result = await model.SysPermission.create({
            menuName,
            permissionName,
            permissionCode,
            menuCode,
            isRequired
        })
        return result
    }
    async edit(id) {
        let { model } = this.app;
        let result = await model.SysPermission.findOne({
            where: {
                id
            },
            raw:true,
        })
        return result
    }
    async update(id, formData) {
        let { model } = this.app;
        let menuName = formData.menuName,
            permissionName = formData.permissionName,
            permissionCode = formData.permissionCode,
            status=Number(formData.status);
        let menuCode = permissionCode.split(':')[0]
        let result = await model.SysPermission.update({
            menuName,
            permissionName,
            permissionCode,
            menuCode,
            status
        },{
            where:{id}
        })
        return result
    }
    async delete(id){
        let {model} = this.app
        return await model.SysPermission.destroy({
            where:{
                id
            }
        })
    }
    async getRolePermission(roleId){
        let {model} = this.app;
        let result = await model.SysRolePermission.findAll({
            where:{
                roleId
            },
            attributes:['permissionId'],
            raw:true
        })
        return result;
    }
}

module.exports = PermissionService;
