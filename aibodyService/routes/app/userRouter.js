let service = require('../../service');
let tokenUtil = require('../../common/tokenUtils');
let redisUtil = require("../../common/redisUtils");
let resCode = require("../../common/resCode");
module.exports = {
    login: function(req, res, next) {
        service.User.login(req.body).then(data => {
            if (data.code == 200) {
                let token = tokenUtil.createToken(data.data.user.id);
                data.data.token = token;
                res.set('token', token)
            }
            res.send(data)
        }).catch(err => {
            console.log(err);
            res.send({ code: -1, msg: '服务器异常' })
        })
    },
    register: function(req, res, next) {

        if (!req.body || !req.body.code) {
            res.send({ code: -1, msg: "缺少参数code" })
            return
        }
        if (!req.body || !req.body.phone) {
            res.send({ code: -1, msg: "缺少参数phone" })
            return
        }
        //todo: 验证码 校验
        redisUtil.getUseSMSCode(req.body.phone, function(err, code) {
            if (err) {
                res.send(resCode.fail)
                return
            }
            if (req.body.code != code) {
                res.send(resCode.codeValidateErr)
                return
            }
            service.User.register(req.body).then(data => {
                res.send(data)
            }).catch(err => {
                console.log(err);
                res.send({ code: -1, msg: '服务器异常' })
            })
        })


    },
    getUserInfo: function(req, res, next) {
        service.User.getUserInfo(req.query).then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err);
            res.send({ code: -1, msg: '服务器异常' })
        })
    },
    getSMSCode: function(req, res, next) {
        service.User.getSMSCode(req.query).then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err);
            res.send({ code: -1, msg: '服务器异常' })
        })
    }
}