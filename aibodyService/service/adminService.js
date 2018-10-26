let model = require("./model")
let redisUtil = require("../common/redisUtils");
let smsUtil = require("../common/smsUtil");
let resCode = require("../common/resCode");

module.exports = {
    login: function(params) {
        let paramsErr = ''
        let arr = ['login_name', 'password'];
        let val = {};
        for (let key of arr) {
            if (!params[key]) {
                paramsErr += '缺少参数:' + key;
            }
            val[key] = params[key];
        }
        if (paramsErr != '') {
            return Promise.resolve({ code: -1, msg: paramsErr });
        }
        let findOpt = {
            where: {
                login_name: val.login_name,
                password: val.password,
            }
        }
        return model.Admin.findOne(findOpt).then(admin => {
            if (!admin) {
                return Promise.resolve({ code: -1, msg: '帐号或密码错误' })
            }
            return Promise.resolve({ code: 200, data: {} })
        })
    }
}