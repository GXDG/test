const Sequelize = require("sequelize");
let sequelizeInstance = require("../../config/sequelize");
let moment = require('moment');

let Menu = sequelizeInstance.define('t_menu', {
    id: { type: Sequelize.STRING(36), primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    parent_id: { type: Sequelize.STRING(36) }, //上一级id
    parent_ids: { type: Sequelize.STRING(2000) }, //所有上级id  ',' 分割
    menu_type: { type: Sequelize.TINYINT }, //目录类型
    name: { type: Sequelize.STRING(100), unique: true }, //目录名称
    icon: { type: Sequelize.STRING(200) }, //目录图标
    sort: { type: Sequelize.INTEGER(10), defaultValue: 0 }, //排序
    href: { type: Sequelize.STRING(500) }, //目录链接
    remarks: { type: Sequelize.STRING(255) }, //备注信息
    is_show: { type: Sequelize.BOOLEAN, defaultValue: true }, //是否显示
    permission: { type: Sequelize.STRING(200) }, //权限标识
    del_flag: { type: Sequelize.BOOLEAN, defaultValue: false }, //逻辑删除标记
    created_at: {
        type: Sequelize.DATE,
        get() {
            let time = this.getDataValue('created_at')
            if (time) {
                return moment(time).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    },
    updated_at: {
        type: Sequelize.DATE,
        get() {
            let time = this.getDataValue('updated_at')
            if (time) {
                return moment(time).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    },

}, {
    underscored: true,
    // indexes: [{
    //     unique: true,
    //     fields: ['phone']
    // }, ],
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci"
})

module.exports = Menu;