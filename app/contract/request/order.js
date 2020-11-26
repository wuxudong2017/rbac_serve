'use strict';
module.exports = {
  wxOrderCreate:{
    fdId: { type: 'string', required: false, description: '设备id'},
    equipmentId: { type: 'string', required: true, description: '设备类型id' },
    schoolId: { type: 'string', required: true, description: '学校id' },
    tagId: { type: 'string', required: true, description: '故障类型id' },
    userId: { type: 'string', required: true, description: '学校用户id' },
  },
  wxOrderUpdate:{
    fdId: { type: 'string', required: false, description: '设备id'},
    equipmentId: { type: 'string', required: true, description: '设备类型id' },
    schoolId: { type: 'string', required: true, description: '学校id' },
    tagId: { type: 'string', required: true, description: '故障类型id' },
    userId: { type: 'string', required: true, description: '学校用户id' },
  }
}