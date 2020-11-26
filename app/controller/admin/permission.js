'use strict';

const baseController = require('./base');

class PermissionController extends baseController {
    // 查询 列表
    async index() {
        const { ctx } = this;
        let limit = Number(ctx.request.query.limit)
        let offset= Number(ctx.request.query.offset)
        let result = await ctx.service.admin.permission.index(limit, offset) 
        ctx.body = result
      
    }
    // 新建
    async create() {
        let { ctx } = this
        // 正则验证
        let formData = ctx.request.body
        let result =await ctx.service.admin.permission.create(formData);
        if(result){
            this.ctx.body={
                code:1,
                message:'添加权限成功'
            }
        }else{
            this.ctx.body={
                code:0,
                message:'添加权限失败'
            }
        }
      
    }
    // 删除
    async destroy() {
        const { ctx } = this;
        let id = this.ctx.params.id
        let result  = await ctx.service.admin.permission.delete(id);
        if(result){
          ctx.body = {
            code: 1,
            message:"删除成功",
          }
        }else{
          ctx.body = {
            code:0,
            message:"删除失败",
          }
        }
    }
    // 更新
    async update() {
        const { ctx } = this;
        let id = this.ctx.params.id
        let formData = ctx.request.body;
        let result = await ctx.service.admin.permission.update(id,formData);
        ctx.body = {
            code:1,
            message:'编辑权限成功'
        }
    }
    // 根据id查询 
    async show() {
        const { ctx } = this;
        let id = this.ctx.params.id
        this.ctx.body = {
            content: '查询',
            id
        };
    }
    // 创建页面
    async new() {
        const { ctx } = this;
        let result = await ctx.service.admin.permission.new();
        let arr = await ctx.helper.permission(result);
        ctx.body = arr
    }
    // 编辑页面
    async edit() {
        const { ctx } = this;
        let id = this.ctx.params.id
        let result = await ctx.service.admin.permission.edit(id);
        ctx.body = result
    }
}

module.exports = PermissionController;
