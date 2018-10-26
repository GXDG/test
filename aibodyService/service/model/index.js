let sequelizeInstance = require('../../config/sequelize');
let m = {
    User: require('./user'),
    Admin: require('./admin'),
    Menu: require('./menu'),
}

module.exports = m;

m.User.sync({ force: sequelizeInstance.dev }).then(() => {});
m.Admin.sync({ force: sequelizeInstance.dev }).then(() => {});
m.Menu.sync({ force: sequelizeInstance.dev }).then(() => {});