function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var n = e(require("../../utils/interface.js")), o = e(require("../../libs/ajax.js")), t = getApp();

Page({
    data: {
        concentration: 0,
        speed: 0
    },
    onLoad: function(e) {
        wx.hideShareMenu();
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
    speed: function(e) {
        console.log(e), this.setData({
            speed: e.detail.value
        });
    },
    concentration: function(e) {
        console.log(e), this.setData({
            concentration: e.detail.value
        });
    },
    save: function(e) {
        wx.showLoading({
            title: "保存中.."
        }), new o.default({
            path: n.default.setDy,
            data: {
                concentration: this.data.concentration,
                speed: this.data.speed,
                shopId: t.globalData.shopId,
                uid: t.globalData.uid
            }
        }).then(function(e) {
            wx.hideLoading(), console.log(e.errcode), 0 == e.errcode ? wx.reLaunch({
                url: "../index/index"
            }) : wx.showToast({
                title: e.msg,
                icon: "loading"
            });
        });
    }
});