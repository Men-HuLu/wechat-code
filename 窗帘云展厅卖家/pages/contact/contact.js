function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

n(require("../../libs/userLogin.js"));

var o = n(require("../../utils/interface.js")), t = n(require("../../libs/ajax.js")), e = getApp();

Page({
    data: {
        show: !1
    },
    onLoad: function(n) {
        console.log(n);
        var a = this;
        e.login(this, e, function() {
            var i = new t.default({
                contentType: !0,
                reqtype: "GET",
                path: o.default.contact,
                data: {
                    userId: e.globalData.uid,
                    shopId: n.shopId
                }
            });
            i.then(function(n) {
                "goods" === n.hasVisit ? a.setData({
                    data: n.shopInfo,
                    show: !0
                }) : wx.showToast({
                    title: "无法读取",
                    icon: "none"
                });
            }), i.catch(function(n) {
                wx.showToast({
                    title: n.msg,
                    icon: "none"
                });
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    navgation: function() {
        e.globalData.nav[0].selected = !0, e.globalData.nav[3].selected = !1, wx.navigateTo({
            url: "/pages/index/index"
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});