var express = require('express');
var router = express.Router();
let loginRouter = require("./loginRouter");
let menuRouter = require("./menuRouter");
router.post('/doLogin', loginRouter.login);

router.get('/getMenu', menuRouter.getMenu);
router.get('/getMenuTreeData', menuRouter.getMenuTreeData);
module.exports = router;