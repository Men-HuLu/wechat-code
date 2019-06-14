var e = require("../../libs/cavenet/cavenet.js").cavenetClient, t = require("../../const/consts.js"), s = (require("./../../net/cash/cashNetwork.js"), 
module.exports);

s.login = function(s) {
    return console.log("cash login params:", s), e.request(t.Route.login, s);
}, s.getContestStatus = function(e) {};