function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

n(require("../../libs/userLogin.js"));

var e = n(require("../../utils/interface.js")), t = n(require("../../libs/ajax.js"));

getApp();

Page({
    data: {},
    onLoad: function(n) {
        var o = this;
        wx.hideShareMenu();
        var a = n.id;
        new t.default({
            reqtype: "GET",
            path: e.default.qrcode,
            data: {
                id: a
            }
        }).then(function(n) {
            console.log(n.data.img), o.setData({
                data: n.data
            });
        });
    },
    scan: function() {
        wx.showToast({
            title: "小程序暂时不支持长按识别",
            icon: "none"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});