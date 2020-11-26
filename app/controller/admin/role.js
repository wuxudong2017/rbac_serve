'use strict';

const baseController = require('./base');

class RoleController extends baseController {
  // 查询 列表
  async index() {
    const { ctx } = this;
    let result = await ctx.service.admin.role.index();
    ctx.body = result
  }

  // 新建
  async create() {
    let { ctx } = this
    let formData = ctx.request.body
    let result = await ctx.service.admin.role.create(formData);
    if (result) {
      this.ctx.body = {
        code: 1,
        message: '新加角色成功'
      }
    }

  }
  // 删除
  async destroy() {
    const { ctx } = this;
    let id = this.ctx.params.id;
    let result = await ctx.service.admin.role.delete(id)
    if (result == 1) {
      this.ctx.body = {
        code: 1,
        message: '删除成功'

      };
    } else if(result = 2) {
      this.ctx.body = {
        code: 0,
        message: '当前角色下有用户'
      }
    }else{
      this.ctx.body = {
        code: 0,
        message: '删除失败'
      }
    }
  }
  // 更新
  async update() {
    const { ctx } = this;
    let id = ctx.params.id
    let formData = ctx.request.body;
    let result = await ctx.service.admin.role.update(id, formData)
    if (result) {
      this.ctx.body = {
        code: 1,
        message: '修改成功'

      };
    } else {
      this.ctx.body = {
        code: 0,
        message: '修改失败'
      }
    }

  }
  // 根据id查询 
  async show() {
    const { ctx } = this;
    let result = this.ctx.params.id
    this.ctx.body = {
      content: '查询',
      result
    };
  }
  // 创建页面
  async new() {
    const { ctx } = this;
    let result = await ctx.service.admin.role.indexTrue();
    ctx.body = result
  }
  // 编辑页面
  async edit() {
    const { ctx } = this;
    let id = this.ctx.params.id;
    let result = await ctx.service.admin.role.edit(id)
    let permission =await ctx.service.admin.permission.getRolePermission(id);
    result.permission=[]
    permission.forEach(item => {
      result.permission.push(item.permissionId)      
    });

    this.ctx.body = result
  }
}

module.exports = RoleController;
