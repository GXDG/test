const Sequelize = require('sequelize');
let config = require('./db.json');
let dev = "dev";
console.log(">>>>>>>>>>>>>>>>>>>>数据库<<<<<<<<<<<<<<<<<<<")
console.log(config[dev].host, config[dev].dbname, config[dev].username)

let mySequelize = new Sequelize(config[dev].dbname, config[dev].username, config[dev]['password'], {
    host: config[dev]['host'],
    dialect: 'mysql',
    operatorsAliases: true,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        underscored: true, //字段以下划线（_）来分割（默认是驼峰命名风格）
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci"
    }
})

function isConnected() {
    return mySequelize.authenticate();
}
mySequelize.dev = false;
mySequelize.isConnected = isConnected;

module.exports = mySequelize;