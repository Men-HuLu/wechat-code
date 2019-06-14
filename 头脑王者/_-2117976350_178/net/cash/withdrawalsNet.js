var e = require("../../libs/cavenet/cavenet.js").cavenetClient, t = require("../../util/util.js"), r = require("../../const/consts.js"), n = module.exports;

n.getListWithdrawOrders = function() {
    return e.request(r.Route.getListWithdrawOrders, {});
}, n.doWithdraw = function(t) {
    return e.request(r.Route.doWithdraw, t);
}, n.enterInvitationCode = function(n) {
    return t.log("reqest <enterInvitationCode> params:", n), e.request(r.Route.enterInvitationCode, n);
};