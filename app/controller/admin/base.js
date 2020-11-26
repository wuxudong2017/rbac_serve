'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const pump = require('mz-modules/pump');
const sd = require('silly-datetime');
const mkDirp = require('mz-modules/mkdirp');
const Jimp = require('jimp')
const sequelize = require('sequelize')
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
// const nodeExcel = require('excel-export');

/**
 * @Controller base 公共方法
 * 
 */
class BaseController extends Controller {
  async test() {
    const { ctx, app } = this;
    const { model } = app;
    ctx.body = 'test'
  }
  async viewTable() {
    const { ctx } = this;
    let query = ctx.request.query;
    let t = new Date().getMonth() + 1;
    let month = Number(query.month) || t;
    let start = new Date(`${new Date().getFullYear()}/${month}/01`).getTime();
    let end;
    end = new Date(`${new Date().getFullYear()}/${month + 1}/01`).getTime();

    if (month == 12) {
      end = new Date(`${Number(new Date().getFullYear()) + 1}/01/01`).getTime();
    }
    let result = await ctx.service.admin.base.assessment([start, end]);
    let m = await ctx.service.admin.user.getAllUser();
    m.map(item => {
      item.serviceAttr = 0
      item.requireSpeed = 0
      item.totalScore = 0
      item.count = 0
      result.forEach(itemA => {
        if (itemA.workerId == item.id) {
          item.serviceAttr = itemA.serviceAttr
          item.requireSpeed = itemA.requireSpeed
          item.totalScore = itemA.totalScore
          item.count = itemA.count
        }
      })
    })
    let data = await ctx.service.admin.base.getdeviceTable([start, end]);
    data.result.map((item, index) => {
      item.breakdownNumM = 0
      item.unRepair = 0
      item.repairM = 0
      data.resultM.forEach(itemA => {

        if (item.fdAssetCategoryId == itemA.fdAssetCategoryId) {
          item.breakdownNumM = itemA.count
        }
      })
      data.resultL.forEach(itemA => {
        if (item.fdAssetCategoryId == itemA.fdAssetCategoryId) {
          item.unRepair = itemA.count
        }
      })
      data.resultH.forEach(itemA => {
        if (item.fdAssetCategoryId == itemA.fdAssetCategoryId) {
          item.repairM = itemA.count
        }
      })

    })
    await ctx.render('table.html', {
      assessment: m,
      getdeviceTable: data.result
    })
  }
  async searchTable() {
    const { ctx } = this;
    console.log(ctx.request.body);
    const result = ctx.request.body
    ctx.body = result;
  }


  // 首页数据显示,获取工人学校用户数据
  async index() {
    const { ctx, app } = this;
    const { model } = this.app;

    let schoolUser = await model.SysSchoolUser.count();
    let worker = await model.SysUser.count();
    let list = await model.SysOrder.count();
    let device = await model.KmAssetCard.count()
    ctx.body = {
      schoolUser,
      worker,
      list,
      device
    }
  }
  // 故障饼状图
  async getfault() {
    const { ctx, app } = this;
    const { model } = this.app;
    let result = await model.SysOrder.count({
      group: ['tag_id'],
      include: [{
        model: model.SysTag,
        attributes: []
      }],
      raw: true,
      attributes: [[sequelize.col('sysTag.name'), 'name']]
    })
    ctx.body = result;
  }
  // 首页工单每天状态
  async getDayList() {
    const { ctx, app } = this;
    const { model } = this.app;
    let result = await model.query(`SELECT d,count from (SELECT  DATE_FORMAT( ADDDATE( y.FIRST, x.d - 1 ),'%y/%m/%d') AS d 
    FROM
        (SELECT 1 AS d UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL
        SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL
        SELECT 15 UNION ALL SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19 UNION ALL SELECT 20 UNION ALL SELECT 21 UNION ALL
        SELECT 22 UNION ALL SELECT 23 UNION ALL SELECT 24 UNION ALL SELECT 25 UNION ALL SELECT 26 UNION ALL SELECT 27 UNION ALL SELECT 28 UNION ALL
        SELECT 29 UNION ALL SELECT 30 UNION ALL SELECT 31) x,
        (SELECT DATE_SUB(NOW(),INTERVAL 30 day) as FIRST, NOW() AS last) y
    WHERE x.d <= y.last ) as lefttable left join (SELECT DATE_FORMAT(from_unixtime(sys_order.create_time/1000),'%y/%m/%d') AS 'time'
    ,ifnull(count(*),0) as 'count'
    FROM sys_order GROUP BY 1 DESC) as righttable on lefttable.d = righttable.time ORDER BY d`, { raw: true, type: sequelize.QueryTypes.SELECT })
    ctx.body = result;
  }

  // 获取所有的设备类型
  async getAllType() {
    const { ctx, app } = this
    const { model } = this.app;
    let result = await model.SysEquipment.findAll({
      attributes: {
        exclude: ['createTime']
      },
      raw: true,
      where: {
        status: { $ne: 0 }
      }
    })
    ctx.body = result
  }
  // 全局工单模糊搜索
  async getOrder() {

    const { ctx, app } = this;
    const { model } = app;
    let result = await model.SysOrder.findAll({
      raw: true
    })
    ctx.body = result
  }

  // 获取学校列表
  async schoolList() {
    let { model } = this.app;
    let { ctx } = this;
    let keyword = ctx.request.query.keyword;
    let result;
    if (keyword) {
      result = await model.KmAssetAddress.findAll({
        where: {
          fdAddress: { // 模糊查询
            $like: '%' + keyword + '%'
          }
        },
        attributes: ['fdAddress', 'fdId']
      })
    } else {
      result = await model.KmAssetAddress.findAll({
        attributes: ['fdAddress', 'fdId']
      })
    }

    ctx.body = result
  }
  // 获取故障清档
  async getFaultList() {
    const { ctx, app } = this;
    let query = ctx.request.query;
    let limit = Number(query.limit) || 10;
    let offset = Number(query.offset) || 1;
    let timeRange = query.timeRange || null;
    let schoolId = query.schoolId || null;
    let fdAssetCategoryId = query.fdAssetCategoryId || null
    let result = await ctx.service.admin.base.getFaultList(offset, limit, timeRange, schoolId, fdAssetCategoryId);
    ctx.body = result
  }
  // 故障统计表
  async getdeviceTable() {
    const { ctx } = this;
    let query = ctx.request.query;
    let t = new Date().getMonth() + 1;
    let month = Number(query.month) || t;
    let start = new Date(`${new Date().getFullYear()}/${month}/1`).getTime();
    let end
    end = new Date(`${new Date().getFullYear()}/${month + 1}/1`).getTime();
    if (month + 1 > 12) {
      end = new Date(`${Number(new Date().getFullYear()) + 1}/1/1`).getTime();
    }

    let data = await ctx.service.admin.base.getdeviceTable([start, end]);
    data.result.map((item, index) => {
      item.breakdownNumM = 0
      item.unRepair = 0
      item.repairM = 0
      data.resultM.forEach(itemA => {

        if (item.fdAssetCategoryId == itemA.fdAssetCategoryId) {
          item.breakdownNumM = itemA.count
        }
      })
      data.resultL.forEach(itemA => {
        if (item.fdAssetCategoryId == itemA.fdAssetCategoryId) {
          item.unRepair = itemA.count
        }
      })
      data.resultH.forEach(itemA => {
        if (item.fdAssetCategoryId == itemA.fdAssetCategoryId) {
          item.repairM = itemA.count
        }
      })

    })
    ctx.body = data.result
  }
  // 维修人员考核清单
  async assessment() {
    const { ctx } = this;
    let query = ctx.request.query;
    let t = new Date().getMonth() + 1;
    let month = Number(query.month) || t;
    let start = new Date(`${new Date().getFullYear()}/${month}/01`).getTime();
    let end;
    end = new Date(`${new Date().getFullYear()}/${month + 1}/01`).getTime();

    if (month == 12) {
      end = new Date(`${Number(new Date().getFullYear()) + 1}/01/01`).getTime();
    }
    let result = await ctx.service.admin.base.assessment([start, end]);
    let m = await ctx.service.admin.user.getAllUser();
    m.map(item => {
      item.serviceAttr = 0
      item.requireSpeed = 0
      item.totalScore = 0
      item.count = 0
      result.forEach(itemA => {
        if (itemA.workerId == item.id) {
          item.serviceAttr = itemA.serviceAttr
          item.requireSpeed = itemA.requireSpeed
          item.totalScore = itemA.totalScore
          item.count = itemA.count
        }
      })
    })
    ctx.body = m
  }



  async getFaultFile() {
    const { ctx } = this;
    // var conf = {};
    // conf.name = "mysheet";
    // conf.cols = [{
    //   caption: 'string',
    //   type: 'string',
    //   beforeCellWrite: function (row, cellData) {
    //     return cellData.toUpperCase();
    //   },
    //   width: 28.7109375
    // }, {
    //   caption: 'date',
    //   type: 'date',
    //   beforeCellWrite: function () {
    //     var originDate = new Date(Date.UTC(1899, 11, 30));
    //     return function (row, cellData, eOpt) {
    //       if (eOpt.rowNum % 2) {
    //         eOpt.styleIndex = 1;
    //       }
    //       else {
    //         eOpt.styleIndex = 2;
    //       }
    //       if (cellData === null) {
    //         eOpt.cellType = 'string';
    //         return 'N/A';
    //       } else
    //         return (cellData - originDate) / (24 * 60 * 60 * 1000);
    //     }
    //   }()
    // }, {
    //   caption: 'bool',
    //   type: 'bool'
    // }, {
    //   caption: 'number',
    //   type: 'number'
    // }];
    // conf.rows = [
    //   ['pi', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
    //   ["e", new Date(2012, 4, 1), false, 2.7182],
    //   ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
    //   ["null date", null, true, 1.414]
    // ];
    // var result = nodeExcel.execute(conf);
    // ctx.set('Content-Type', 'application/vnd.openxmlformats');
    // ctx.set("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    // ctx.body = result

  }








  // 后台图片上传
  async upload() {
    let { ctx, app } = this;
    // 文件上传 操作文件流
    const stream = await ctx.getFileStream();
    // 新建一个文件名 ,使用md5 加密
    const filename1 = md5(stream.filename + stream.length)
    const filename2 = path.extname(stream.filename).toLocaleLowerCase();
    const filename = filename1 + filename2
    // 生成绝对文件路径,存储
    let day = 'admin'
    await mkDirp(path.join(this.app.config.uploadDir, day))
    const target = path.join(this.app.config.uploadDir, day, filename);
    // 生成一个文件,写入文件流
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));

    } catch (error) {
      await sendToWormhole(stream);
      throw error;
    }
    Jimp.read(target, (err, lenna) => {
      if (err) throw err;
      lenna
        .resize(200, 200) // resize
        .quality(60) // set JPEG quality
        .write(path.join(this.app.config.uploadDir, day) + '/' + filename + '200x200' + filename2); // save
    });
    let imgUrl = target.slice(3).replace(/\\/g, '/');
    let imgUrlT = app.config.host + imgUrl + '200x200' + filename2;
    //文件响应
    ctx.response.type = "application/json"
    ctx.body = imgUrlT
  }
   /**
   * @summary 富文本上传图片
   * @description 上传图片
   * @router post /api/help/upload
   * @request formData file *file
   */
  async uploadEditor() {
    
    let { ctx, app } = this;
    // 获取文件流组
    const streams = ctx.multipart();
    let stream;
    // 保存返回的文件信息
    let files = [];
    // 其他form 参数
    let fields = {}
    while ((stream = await streams()) != null) {
      // 检查是否有其他参数 如果有写入 这里做案例 不做处理
      if (stream.length) {
        fields[stream[0]] = stream[1]
      } else {
        // 空文件处理
        if (!stream.filename) {
          return;
        }
        // 设置文件名称
        const filename1 = md5(stream.filename + stream.length)
        const filename2 = path.extname(stream.filename).toLocaleLowerCase();
        const filename = filename1 + filename2
        // 生成绝对文件路径,存储
        let day = 'admin'
        await mkDirp(path.join(this.app.config.uploadDir, day))
        const target = path.join(this.app.config.uploadDir, day, filename);
        // 生成一个文件,写入文件流
        const writeStream = fs.createWriteStream(target);
        try {
          // 保存
          await awaitWriteStream(stream.pipe(writeStream));
          // 写入数组
          let imgUrl = target.slice(3).replace(/\\/g, '/');
          let imgUrlT = app.config.host + imgUrl;
          files.push(imgUrlT)
        } catch (err) {
          await sendToWormhole(stream);
          this.ctx.body = { code: 422, message: '上传失败，请重试！' }
          throw err;
        }
      }
    }
    try {
      this.ctx.body = files;
    } catch (error) {
      this.ctx.body = {
        error
      };
    }
    
  }

  async uploadFile() {
    let { ctx, app } = this;
    // 文件上传 操作文件流
    const stream = await ctx.getFileStream();
    // 新建一个文件名 ,使用md5 加密
    const filename1 = md5(stream.filename + stream.length)
    const filename2 = path.extname(stream.filename).toLocaleLowerCase();
    const filename = filename1 + filename2
    // 生成绝对文件路径,存储
    let day = 'admin/file'
    await mkDirp(path.join(this.app.config.uploadDir, day))
    const target = path.join(this.app.config.uploadDir, day, filename);
    // 生成一个文件,写入文件流
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));

    } catch (error) {
      await sendToWormhole(stream);
      throw error;
    }
    let fileUrl = target.slice(3).replace(/\\/g, '/');
    //文件响应
    ctx.response.type = "application/json"
    ctx.body =app.config.host + fileUrl
  }
  async getOrderCount() {
    const { ctx, app } = this;
    const { model } = app;
    const result = await model.SysOrder.count({
      where: {
        status: {
          $gt: 0
        }
      },
      attributes: ['workerName', 'status'],
      group: ['worker_id', 'status'],
      plain: false,
      raw: true,
    })
    ctx.body = result
  }
  /**
   * @description:oa 添加
   * @param {type} 
   * @return: 
   * @author: 吴旭东
   */
  async addDevice() {
    const { ctx, app } = this;
    const { model } = app
    const formData = ctx.request.body;
    console.log(formData)
    ctx.validate({
      fdId: { required: true, type: 'string' },
      fdName: { required: true, type: 'string' },
      fdCode: { required: true, type: 'string' },
      fdAssetCategoryId: { required: true, type: 'string' },
      fdAssetAddressId: { required: true, type: 'string' }
    }, formData);
    const fdId = formData.fdId
    let result = await model.KmAssetCard.findOrCreate({
      where: {
        fdId
      },
      defaults: formData
    });
    if (result[1]) {
      ctx.body = {
        code: 1,
        message: '新增数据成功',
      }
    } else {
      let t = await model.KmAssetCard.update(formData, {
        where: { fdId }
      })
      if (t[1]) {
        ctx.body = {
          code: 1,
          message: '新增数据成功--->更新'
        }
      } else {
        ctx.body = {
          code: 0,
          message: '新增数据失败'
        }
      }

    }


  }
  /**
   * @description: oa 编辑
   * @param {type} 
   * @return: 
   * @author: 吴旭东
   */
  async updateDevice() {
    const { ctx, app } = this;
    const { model } = app;
    const fdId = ctx.params.fdId
    const formData = ctx.request.body;
    await model.KmAssetCard.update({
      ...formData
    }, {
      where: {
        fdId
      }
    });
    ctx.body = {
      code: 1,
      message: '更新数据成功'
    };
  }
  async deleteDevice() {
    const { ctx, app } = this;
    const fdId = ctx.params.fdId;
    const { model } = app;
    const result = await model.KmAssetCard.destroy({
      where: {
        fdId
      }
    })
    if (result == 1) {
      ctx.body = {
        code: 1,
        message: '删除数据成功'
      }
    } else {
      ctx.body = {
        code: 0,
        message: '数据已经删除'
      }
    }
  }
  // 从oa中更新设备
  async getEquipmentFromOa() {
    const { ctx, app } = this;
    const { model } = app
    const query = ctx.request.query;
    const { fdId } = query
    try {
      let result = await ctx.http.get(`/getAssetCategory/${fdId}`)
      const { data } = result;
      for (let i = 0; i < data.length; i++) {
        await model.KmAssetCategory.findOrCreate({
          where: { fdId: data[i].fdId },
          defaults: data[i]
        })
      }
      ctx.body = {
        code: 1,
        message: '更新成功'
      }
    } catch (e) {
      ctx.throw(500, e)
    }
  }
  // 清除多余的设备变量
  async clearEquipment() {
    const { ctx, app } = this;
    const { model } = app;
    const query = ctx.request.query;
    const { fdId } = query;
    ctx.body = await model.KmAssetCategory.destroy({
      where: {
        fdHierarchyId: {
          $like: `%${fdId}%`,
        },
        fdParentId: {
          $ne: null
        }
      }
    })
  }
  // h获取地理位置根
  async getAddressRoot() {
    const { ctx, app } = this;
    const { model } = app;
    const data = await model.KmAssetAddressCate.findAll({
      raw: true,
      attributes: ['fdId', 'fdName', 'fdParentId']
    });
    ctx.body = ctx.helper.toTree(data)
  }
  // 地理位置
  async getAddress() {
    const { ctx, app } = this;
    const { model } = app
    const { fdId, limit = 10, offset = 1 } = ctx.request.query;
    let result = await model.KmAssetAddress.findAndCountAll({
      where: {
        fdCategoryId: fdId
      },
      attributes: ['fdId', 'fdAddress', 'fdCategoryId'],
      limit: +limit,
      offset: (offset - 1) * limit,
      raw: true,

    })
    ctx.body = result
  }
  // 存放地点更新
  async updateAddress() {
    const { ctx, app } = this;
    const { model } = app;
    const { fdId = '' } = ctx.request.query;
    const result = await ctx.http.get(`/getAddressList/${fdId}`);
    if (result.code == 200) {
      const { data } = result;
      for (let i = 0; i < data.length; i++) {
        await model.KmAssetAddress.findOrCreate({
          where: { fdId: data[i].fdId },
          defaults: data[i]
        })
      }
      ctx.body = data

    } else {
      ctx.throw(500, '获取数据失败')
    }
  }
  async updateAssetCard() {
    const { ctx, app } = this;
    const { model } = app;
    const { fdId = '' } = ctx.request.query;
    try {
      const result = await ctx.http.get(`/getAssetCard/${fdId}/1/100`);
      if (result.code == 200) {
        let t = await model.KmAssetCard.destroy({
          where: { fdAssetCategoryId: fdId }
        });
        if (t == 0) {
          for (let i = 1; i <= result.data.totalPage; i++) {
            let resultS = await ctx.http.get(`/getAssetCard/${fdId}/${i}/100`);
            let dataS = resultS.data.list;
            await model.KmAssetCard.bulkCreate(dataS, {
              ignoreDuplicates: false
            })
          }
        }
      } else {
        ctx.body = {
          code: 1,
          message: result.msg
        }
      }
    } catch (err) {
      ctx.throw(err)
    }




  }

}

module.exports = BaseController;
