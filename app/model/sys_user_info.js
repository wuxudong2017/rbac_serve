/* indent size: 2 */

module.exports = app => {
    const DataTypes = app.Sequelize;

    const Model = app.model.define('sysUserInfo', {
        id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            primaryKey: true,
            field: 'id'
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'name'
        },
        age: {
            type: DataTypes.INTEGER(2),
            allowNull: false,
            field: 'age'
        },
        sex: {
            type: DataTypes.STRING(2),
            allowNull: false,
            field: 'sex'
        },
        avatar: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'avatar'
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'address'
        },
        phone: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: 'phone'
        },
        entryTime: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'entry_time'
        }
    }, {
        tableName: 'sys_user_info'
    });

    Model.associate = function() {
        app.model.SysUserInfo.hasOne(app.model.SysUser, { foreignKey: 'id', targetKey: 'jobNumber' });

    }

    return Model;
};