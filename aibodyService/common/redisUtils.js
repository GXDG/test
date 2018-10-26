let client = require('redis').createClient();
const constCode = {
    SMS_CODE: "SMS_CODE_"
}
let exp = module.exports;
exp.setSessionId = function(sessdionId, userId, nextFun) {
    client.set(sessdionId, userId, nextFun);
    client.expire(sessdionId, 3600 * 24);

}
exp.getSessionId = function(sessdionId, nextFun) {
    client.get(sessdionId, nextFun);
}

exp.setSMSCode = function(userId, code, nextFun) {
    client.set(constCode.SMS_CODE + "_register_" + userId, code, nextFun);
    client.expire(constCode.SMS_CODE + "_register_" + userId, 60 * 1);

    client.set(constCode.SMS_CODE + "use_register_" + userId, code, nextFun);
    client.expire(constCode.SMS_CODE + "use_register_" + userId, 60 * 5);
}

exp.getSMSCode = function(userId, nextFun) {
    client.get(constCode.SMS_CODE + "_register_" + userId, nextFun);
}
exp.getUseSMSCode = function(userId, nextFun) {
    client.get(constCode.SMS_CODE + "use_register_" + userId, nextFun);
}