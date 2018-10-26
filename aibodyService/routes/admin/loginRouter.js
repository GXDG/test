let service = require('../../service');
let resCode = require("../../common/resCode");
module.exports = {
    test: function(req, res, next) {
        res.render('test');
    },

    login: function(req, res, next) {
        service.Admin.login(req.body).then(result => {
            res.send(result)
        }).catch(err => {
            console.error(err);
            res.send(resCode.fail)
        })
    }
}