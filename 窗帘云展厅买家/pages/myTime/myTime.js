function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

var a = n(require("../../utils/interface.js")), e = n(require("../../libs/ajax.js")), t = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var o = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        }), new e.default({
            path: a.default.myTime,
            data: {
                shopId: t.globalData.shopId,
                uid: t.globalData.uid
            },
            reqtype: "GET"
        }).then(function(n) {
            wx.hideLoading(), n.data.forEach(function(n, a) {
                null == n.package_id && (n.package_id = "邀请获赠");
            }), o.setData({
                data: n.data
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        wx.hideShareMenu();
    },
    upgrade: function() {
        wx.navigateTo({
            url: "../openFlyBox/openFly/openFly?return=true"
        });
    }
});