'use strict';

const baseController = require('./base');
const createRule = {

}

class UserController extends baseController {
    // 查询 列表
    async index() {
            const { ctx } = this;
            let limit = Number(ctx.request.query.limit)
            let offset = Number(ctx.request.query.offset)
            let result = await ctx.service.admin.user.index(limit, offset);
            this.ctx.body = result;
            this.ctx.body.code = 1;
        }
        // 新建
    async create() {
            let { ctx } = this
            // 正则验证
            let formData = ctx.request.body
            ctx.validate({
                age: { type: 'int', required: true, convertType: 'int' },
                phone: { type: 'int', required: true, convertType: 'int' },
                entryTime: { type: 'int', required: true, convertType: 'int' },
            }, formData)
            let result = await ctx.service.admin.user.create(formData);
            if (result == 1) {
                ctx.body = {
                    code: 0,
                    message: "用户名重复",

                }
            } else if (result == 2) {
                ctx.body = {
                    code: 1,
                    message: "新加成功",

                }
            } else {
                ctx.body = {
                    code: 0,
                    message: "新加失败",
                }
            }

        }
        // 删除
    async destroy() {
            const { ctx } = this;
            let id = this.ctx.params.id
            let result = await ctx.service.admin.user.delete(id);
            if (result) {
                ctx.body = {
                    code: 1,
                    message: "删除成功",
                }
            } else {
                ctx.body = {
                    code: 0,
                    message: "删除失败",
                }
            }


        }
        // 更新
    async update() {
            const { ctx } = this;
            let id = ctx.params.id;
            let formData = ctx.request.body
            let result = await ctx.service.admin.user.update(id, formData);
            if (result) {
                ctx.body = {
                    code: 1,
                    message: "编辑成功"
                }
            } else {
                ctx.body = {
                    code: 0,
                    message: "编辑失败"
                }

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
        let result = await ctx.service.admin.user.userTrue()
        this.ctx.body = result;
    }
    // 编辑页面
    async edit() {
        const { ctx } = this;
        let id = this.ctx.params.id
        let result = await ctx.service.admin.user.edit(id);
        ctx.body = result
    }
}

module.exports = UserController;