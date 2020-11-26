//jwt-token 生成
const jwt = require('jsonwebtoken') //引入jsonwebtoken
const path = require('path')
const fs = require('fs')
module.exports = {
  loginToken(data, expires = 7200) {
    const exp = Math.floor(Date.now() / 1000) + expires
    const cert = fs.readFileSync(path.join(__dirname, '../public/rsa_private_key.pem')) // 私钥，看后面生成方法
    // const cert = "123456"
    const token = jwt.sign({ data, exp }, cert, { algorithm: 'RS256' })
    return token
  },
  transDate(list, idstr, pidstr) {
    let result = [], temp = {};
    for (i = 0; i < list.length; i++) {
      temp[list[i][idstr]] = list[i];//将nodes数组转成对象类型  
    }
    for (j = 0; j < list.length; j++) {
      tempVp = temp[list[j][pidstr]]; //获取每一个子对象的父对象  
      if (tempVp) {//判断父对象是否存在，如果不存在直接将对象放到第一层  
        if (!tempVp["nodes"]) tempVp["nodes"] = [];//如果父元素的nodes对象不存在，则创建数组  
        tempVp["nodes"].push(list[j]);//将本对象压入父对象的nodes数组  
      } else {
        result.push(list[j]);//将不存在父对象的对象直接放入一级目录  
      }
    }
    return result;
  },
  permission(data) {
    let result = [], temp = {}; let arr = [];
    for (let i = 0; i < data.length; i++) {
      temp[data[i]['menuCode']] = data
    }
    for (let key in temp) {
      let t = temp[key];
      let obj = {}
      obj['permission'] = [];
      t.forEach(item => {
        if (item['menuCode'] == key) {
          obj['menuName'] = item['menuName'];
          obj['permission'].push({
            'id': item.id,
            'permissionName': item.permissionName,
            'isRequired': item.isRequired,
          })

        }
      });
      arr.push(obj);
    }
    return arr
  },
  // 设备类型树形生产方法
  toTree(data) {
    data.forEach(function (item) {
      delete item.children;
    });
    var map = {};
    data.forEach(function (item) {
      map[item.fdId] = item;
    });
    var val = [];
    data.forEach(function (item) {
      var parent = map[item.fdParentId];
      if (parent) {
        (parent.children || (parent.children = [])).push(item);
      } else {
        val.push(item);
      }
    });
    return val;
  }

}

