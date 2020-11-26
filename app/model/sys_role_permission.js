/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sysRolePermission', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    roleId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'role_id'
    },
    permissionId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      field: 'permission_id'
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'create_time'
    },
    updataTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'updata_time'
    },
    status: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      field: 'status'
    }
  }, {
    tableName: 'sys_role_permission'
  });

  Model.associate = function() {
    app.model.SysRolePermission.belongsTo(app.model.SysRole,{foreignKey:'roleId',targetKey:'id'})
    app.model.SysRolePermission.belongsTo(app.model.SysPermission,{foreignKey:'permissionId',targetKey:'id'})
  }

  return Model;
};
