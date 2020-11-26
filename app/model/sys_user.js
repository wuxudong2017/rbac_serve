
/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sysUser', {
    id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'username'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password'
    },
    roleId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'role_id'
    },
    updateTime: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'update_time'
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'create_time'
    },
    status: {
      type:  DataTypes.STRING(2),
      allowNull: false,
      field: 'status'
    },
    jobNumber: {
      type: DataTypes.STRING(13),
      allowNull: false,
      field: 'job_number'
    },
    isSuper:{
      type: DataTypes.STRING(2),
      allowNull: true,
      field: 'is_super'
    }
  }, {
    tableName: 'sys_user'
  });

  Model.associate = function() {
    app.model.SysUser.belongsTo(app.model.SysRole,{foreignKey:'roleId',targetKey:'id'})
    app.model.SysUser.belongsTo(app.model.SysUserInfo,{foreignKey:'jobNumber',targetKey:'id'})
  }

  return Model;
}
