const Sequelize = require("sequelize");
let sequelizeInstance = require("../../config/sequelize");
let moment = require('moment');

let Admin = sequelizeInstance.define('t_admin', {
    id: { type: Sequelize.STRING(36), primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    login_name: { type: Sequelize.STRING(45), unique: true, allowNull: false }, //登录名
    password: { type: Sequelize.STRING(20), allowNull: false }, //密码
    phone: { type: Sequelize.STRING(11), unique: true }, //手机
    user_icon_url: { type: Sequelize.STRING(200) }, //头像
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
    indexes: [{
        unique: true,
        fields: ['phone']
    }, ],
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci"
})

module.exports = Admin;