module.exports = {
    noUserErr: { code: 100, msg: "找不到用户" },
    userPasswordErr: { code: 101, msg: "用户密码错误" },
    code60Second: { code: 256, msg: "验证码获取需要60秒一次！" },
    codeValidateErr: { code: 257, msg: "验证码验证失败！" },
    success: { code: 200, msg: "请求成功！" },
    fail: { code: 210, msg: "服务器异常！" },
}