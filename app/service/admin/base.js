'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize')
class BaseService extends Service {
    async getFaultList(offset, limit,timeRange,schoolId,equipmentId) {
        const { model } = this.app;
        let result = await model.SysFaultList.findAndCountAll({
            include: [{
                model: model.KmAssetCategory,
                raw:true,
                attributes:[]
            },{
                model:model.KmAssetAddress,
                raw:true,
                attributes:[],
            },{
                model:model.SysTag,
                raw:true,
                attributes:[],
            }],
            attributes:{
                include:[
                    [Sequelize.col('kmAssetCategory.fd_name'),'type'],
                    [Sequelize.col('kmAssetAddress.fd_address'),'xxmc'],
                    [Sequelize.col('sysTag.name'),'tagName'], 
                    [Sequelize.fn('FROM_UNIXTIME',Sequelize.literal('sysFaultList.create_time DIV 1000'),'%Y-%m-%d'),'createTime']
                ]
            },
            where:{
                $and:[
                    timeRange?{createTime:{
                        $between:timeRange.split(',')
                    }}:null,
                    schoolId?{schoolId}:null,
                    equipmentId?{equipmentId}:null,
                ]
            },
            limit,
            offset:(offset-1)*limit,
            raw: true,
            order:[['createTime','DESC']]
        })
        return result
    }
    async getFaultAll(){
        // const {model} = this.app;
        // let result = await model.SysFaultList.findAll({
        //     include: [{
        //         model: model.SysEquipment,
        //         raw:true,
        //         attributes:[]
        //     },{
        //         model:model.XxJbxx,
        //         raw:true,
        //         attributes:[],
        //     },{
        //         model:model.SysTag,
        //         raw:true,
        //         attributes:[],
        //     }],
        //     attributes:{
        //         include:[
        //             [Sequelize.col('sysEquipment.type'),'type'],
        //             [Sequelize.col('xxJbxx.xxmc'),'xxmc'],
        //             [Sequelize.col('sysTag.name'),'tagName'], 
        //             [Sequelize.col('sysEquipment.provider'),'provider'],
        //             [Sequelize.fn('FROM_UNIXTIME',Sequelize.literal('sysFaultList.create_time DIV 1000'),'%Y-%m-%d'),'createTime']
        //         ]
        //     },
        //     raw: true,
        //     order:[['createTime','DESC']]
        // })
        // return result
    }
    // 故障统计表
    async getdeviceTable(month){
        const {model} = this.app;
        // 设备数量和设备故障总数
        let result =await model.KmAssetCard.count({
          group:'fdName',
          attributes:['fdName','fdAssetCategoryId',[Sequelize.fn('SUM',Sequelize.col('failure_num')),'breakdownNum']]
        });
           // 设备设备本月故障总数
        let resultM =await  model.SysFaultList.count({
          group:'fdAssetCategoryId',
          where:{
            createTime:{
              $between:month
            }
          },  
          attributes:['fdAssetCategoryId']
        });
          // 设备设备修复数
        let resultH = await model.SysOrder.count({
          group:'fd_asset_category_id',
          where:{
            createTime:{
              $between:month
            },
            status:3
          }, 
          attributes:['fdAssetCategoryId'] 
        })
        // 设备未修复数
        let resultL = await model.SysOrder.count({
          group:'fd_asset_category_id',
          attributes:['fdAssetCategoryId'],
          where:{
            status:{
              $lt:3
            }
          } 
        })
        return {resultH,resultL,result,resultM,};
    }
    // 维修人员考核
    async assessment(month){
      const {model} = this.app;
      // 设备数量和设备故障总数
      let result = await model.Evaluate.count({
        group:'worker_id',
        attributes:['workerId',[Sequelize.fn('sum',Sequelize.col('service_attr')),'serviceAttr'],
        [Sequelize.fn('sum',Sequelize.col('require_speed')),'requireSpeed'],
        [Sequelize.fn('sum',Sequelize.col('total_score')),'totalScore'],
        [Sequelize.col('sysUserInfo.name'),'name']],
        where:{
          createTime:{
            $between:month
          }
        },
        include:[{
          model:model.SysUserInfo,
          raw:true,
          attributes:[]
        }]  
      })
      return result
    }

}
module.exports = BaseService