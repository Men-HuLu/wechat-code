function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

n(require("../../libs/ajax.js")), n(require("../../libs/userLogin.js")), n(require("./loginFun.js"));

var o = getApp();

require("../../utils/interface.js");

Page({
    data: {
        login: !0
    },
    onGotUserInfo: function() {
        o.login(this, o, function() {
            wx.navigateBack({});
        });
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});