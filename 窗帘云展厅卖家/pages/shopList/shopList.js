function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../libs/userLogin.js"));

var t = e(require("../../utils/interface.js")), a = e(require("../../libs/ajax.js")), o = getApp();

Page({
    data: {
        loading: !1,
        loadingText: "加载更多...",
        page: 1
    },
    searchScrollLower: function() {
        var e = this.data.page;
        e++, this.setData({
            page: e,
            loading: !0
        }), console.log(this.data.page), wx.showToast({
            title: "下拉滚动到底部了",
            icon: "none"
        });
    },
    onLoad: function(e) {
        var n = this;
        wx.hideShareMenu(), this.setData({
            id: e.id
        });
        var i = wx.getStorageSync("key");
        wx.showLoading({
            title: "加载中..."
        });
        var s = new a.default({
            reqtype: "GET",
            path: t.default.shopList,
            data: {
                id: this.data.id,
                userId: o.globalData.uid,
                key: i
            }
        });
        s.then(function(e) {
            console.log(e), n.setData({
                data: e
            }), wx.hideLoading(), wx.removeStorageSync("key");
        }), s.catch(function(e) {
            console.log(e);
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