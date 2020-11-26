/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sysRole', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    roleName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'role_name'
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'create_time'
    },
    updateTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'update_time'
    },
    status: {
      type: DataTypes.STRING(2),
      allowNull: false,
      field: 'status'
    }
  }, {
    tableName: 'sys_role'
  });

  Model.associate = function() {
    app.model.SysRole.hasOne(app.model.SysUser,{foreignKey:'id',targetKey:'roleId'});
    app.model.SysRole.hasMany(app.model.SysRolePermission,{foreignKey:'roleId',targetKey:'id'})
  }

  return Model;
};
