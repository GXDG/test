var express = require('express');
var router = express.Router();
let userRouter = require('./userRouter');
router.post("/login", userRouter.login); //登录
router.post("/register", userRouter.register); //注册
router.get("/getSMSCode", userRouter.getSMSCode); //注册验证码
router.get("/my/info", userRouter.getUserInfo); //用户信息
module.exports = router;