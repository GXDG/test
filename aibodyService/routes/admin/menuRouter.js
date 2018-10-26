let service = require('../../service');
let resCode = require("../../common/resCode");

module.exports = {


    getMenu: function(req, res, next) {
        service.Menu.getMenu(req.query).then(result => {
            res.send(result)
        }).catch(err => {
            console.error(err);
            res.send(resCode.fail)
        })
    },
    getMenuTreeData: function(req, res, next) {
        service.Menu.getMenuTreeData(req.query).then(result => {
            res.send(result)
        }).catch(err => {
            console.error(err);
            res.send(resCode.fail)
        })
    }
}