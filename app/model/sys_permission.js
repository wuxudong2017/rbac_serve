/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('sysPermission', {
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    menuCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'menu_code'
    },
    menuName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'menu_name'
    },
    permissionCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'permission_code'
    },
    permissionName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'permission_name'
    },
    isRequired: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      field: 'is_required'
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue:1,
      field: 'status'
    }
  }, {
    tableName: 'sys_permission'
  });

  Model.associate = function() {
    app.model.SysPermission.hasOne(app.model.SysRolePermission,{foreignKey:'roleId',targetKey:'id'})
   
  }

  return Model;
};
