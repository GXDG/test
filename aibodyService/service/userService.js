let model = require("./model")
let redisUtil = require("../common/redisUtils");
let smsUtil = require("../common/smsUtil");
let resCode = require("../common/resCode");

let phoneRegExp = /^1\d{10}$/;
let phoneRegExp1 = new RegExp(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/);


function checkPhoneFormat(phone) {
    return phoneRegExp1.test(phone)
}

function handleErr(err) {
    console.error(err)
    if (err.code) {
        return Promise.resolve({ code: -1, msg: err.msg })
    }
    return Promise.resolve({ code: -1, msg: "服务器异常" })
}

/**
 * 生成验证码(数字)
 * @param n   验证码位数
 */
function RndNum(n) {
    let rnd = "";
    for (let i = 0; i < n; i++) {
        let num = Math.floor(Math.random() * 10);
        while (num < 0) {
            num = Math.floor(Math.random() * 10);
        }
        rnd += num;
    }
    return rnd;
}
module.exports = {
    login: function(params) {
        let paramsErr = ''
        if (!params.phone) {
            paramsErr += '缺少参数:phone'
        }
        if (!params.password) {
            paramsErr += '缺少参数:password'
        }
        if (paramsErr != '') {
            return Promise.resolve({ code: -1, msg: paramsErr })
        }
        let findOpt = {
            where: {
                phone: params.phone,

            },
            attributes: {
                exclude: ['password']
            }
        }
        return model.User.findOne(findOpt).then(user => {
            if (!user) {
                return Promise.resolve({ code: 100, msg: "帐号未注册" })
            }
            if (user.password != params.password) {
                return Promise.resolve({ code: -1, msg: "用户密码错误" })
            }
            return Promise.resolve({
                code: 200,
                data: {
                    user: user
                }
            })
        }).catch(err => {
            return handleErr(err);
        })
    },
    register: function(params) {
        let paramsErr = ''
        if (!params.phone) {
            paramsErr += '缺少参数:phone'
        }
        if (!params.password) {
            paramsErr += '缺少参数:password'
        }
        if (!checkPhoneFormat(params.phone)) {
            paramsErr += 'phone不符合格式要求'
        }
        if (paramsErr != '') {
            return Promise.resolve({ code: -1, msg: paramsErr })
        }
        return model.User.findOne({ where: { phone: params.phone } }).then(user => {
            if (user) {
                return Promise.resolve({ code: -1, msg: "该手机号已注册" })
            }
            return model.User.create({
                user_name: "用户" + params.phone,
                phone: params.phone,
                password: params.password
            }).then(newUser => {
                let user = newUser.toJSON();
                delete user.password
                return Promise.resolve({ code: 200, data: { user: user } })
            })
        }).catch(err => {
            return handleErr(err);
        })
    },
    getSMSCode: function(params) {
        let paramsErr = '';
        let paramsArr = ['type', 'phone'];
        let value = {};
        for (let a of paramsArr) {
            if (!params[a]) {
                paramsErr += "缺少参数:" + a;
            }
            value[a] = params[a];
        }
        if (paramsErr != '') {
            return Promise.resolve({ code: -1, msg: paramsErr })
        }
        if (!checkPhoneFormat(value.phone)) {
            return Promise.resolve({ code: -1, msg: '手机号格式错误' })
        }
        if (1 || value.type == 'register') {
            return model.User.findOne({ where: { phone: value.phone } }).then(user => {
                if (user) {
                    return Promise.resolve({ code: -1, msg: '该手机已经注册' })
                } else {
                    return new Promise((resolve, reject) => {
                        redisUtil.getSMSCode(value.phone, function(err, code) {
                            if (err) {
                                resolve(resCode.fail)
                                return
                            }
                            if (code) {
                                resolve(resCode.code60Second)
                                return
                            }
                            resolve()

                        })
                    }).then(err => {
                        if (err) {
                            return Promise.resolve(err);
                        }

                        let code = RndNum(5);
                        return smsUtil.sendSMSCode({ phone: value.phone, code: code }).then(sendResult => {
                            redisUtil.setSMSCode(value.phone, code);
                            return Promise.resolve(resCode.success)
                        })
                    })
                }

            }).catch(err => {
                return handleErr(err)
            })
        }
    },
    getUserInfo: function(params) {
        let paramsErr = ''
        if (!params.userId) {
            paramsErr += '缺少参数:userId'
        }

        if (paramsErr != '') {
            return Promise.resolve({ code: -1, msg: paramsErr })
        }
        let findOpt = {
            where: {
                id: params.userId,
            },
            attributes: {
                exclude: ['password']
            }
        }
        return model.User.findOne(findOpt).then(user => {
            if (!user) {
                return Promise.resolve({ code: 100, msg: "找不到用户" })
            }
            return Promise.resolve({
                code: 200,
                data: user
            })
        }).catch(err => {
            return handleErr(err);
        })
    }


}