function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

a(require("../../libs/userLogin.js"));

var e = a(require("../../utils/interface.js")), n = a(require("../../libs/ajax.js")), t = getApp();

Page({
    data: {
        imgUrls: [],
        indicatorDots: !1,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3,
        nowData: "",
        share: 0
    },
    onLoad: function(a) {
        var o = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        }), this.setData({
            share: a.share
        }), console.log(a.share);
        var i = new n.default({
            reqtype: "GET",
            path: e.default.details,
            data: {
                id: a.id,
                uid: t.globalData.uid
            }
        });
        i.then(function(a) {
            a.data.money = "¥" + a.data.money, console.log(a), o.setData({
                nowData: a.data,
                imgUrls: a.data.headImg
            }), wx.hideLoading();
        }), i.catch(function(a) {
            console.log(a);
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
    }
});