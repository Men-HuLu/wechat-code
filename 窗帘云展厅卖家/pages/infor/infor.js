function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

n(require("../../libs/userLogin.js")), n(require("../../utils/interface.js"));

var e = n(require("../../libs/ajax.js")), o = getApp(), t = require("../../wxParse/wxParse.js");

Page({
    data: {},
    UserInfoMask: function() {
        o.getUserInfo(this);
    },
    onLoad: function(n) {
        var o = this;
        wx.hideShareMenu();
        var a = new e.default({
            reqtype: "GET",
            path: "/intro/index"
        });
        a.then(function(n) {
            o.setData({
                data: n.data
            });
            var e = n.data;
            t.wxParse("article", "html", e, o, 5), console.log(e);
        }), a.catch(function(n) {
            console.log(n);
        });
    },
    onReady: function() {},
    onShow: function() {
        wx.hideLoading();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});