const Sequelize = require("sequelize");
let sequelizeInstance = require("../../config/sequelize");
let moment = require('moment');

let User = sequelizeInstance.define('t_user', {
    id: { type: Sequelize.STRING(36), primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    user_name: { type: Sequelize.STRING(45), unique: true, allowNull: false }, //用户昵称
    password: { type: Sequelize.STRING(20) }, //密码
    phone: { type: Sequelize.STRING(11), unique: true }, //手机
    user_icon_url: { type: Sequelize.STRING(200) }, //头像
    sex: { type: Sequelize.INTEGER(1), defaultValue: 0 }, //性别 0:男 1:女
    birthday: { type: Sequelize.DATEONLY }, //生日  日期
    height: { type: Sequelize.INTEGER }, //身高
    weight: { type: Sequelize.DECIMAL(6, 2) }, //体重
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

module.exports = User;