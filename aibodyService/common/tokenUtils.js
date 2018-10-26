let jwt = require('jsonwebtoken')
let secret = 'aibody';
let redisUtil = require('./redisUtils');
module.exports = {
    createToken: function(userId) {
        let token = jwt.sign({
            userId: userId
        }, secret, {
            expiresIn: 60 * 60 * 24 //秒到期时间
        });

        redisUtil.setSessionId(userId, token)
        return token;
    },

    checkToken: function(token, userId, callback) {
        jwt.verify(token, secret, (err, decode) => {
            console.log("err:", err)
            console.log("decode:", decode)
            if (err) {
                callback(false)
                return
            }
            if (userId && decode.userId != userId) {
                callback(false)
                return
            }
            redisUtil.getSessionId(decode.userId, (err, data) => {
                if (token == data) {
                    callback(true)
                } else {
                    callback(false)
                }
            })
        })

    }
}