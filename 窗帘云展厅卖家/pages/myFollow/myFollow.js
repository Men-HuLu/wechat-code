function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function t(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

a(require("../../libs/userLogin.js"));

var e = a(require("../../utils/interface.js")), o = a(require("../../libs/ajax.js")), n = getApp();

Page({
    data: {
        loading: !1,
        loadingText: "加载更多...",
        page: 1
    },
    onLoad: function(a) {
        var t = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var i = new o.default({
            reqtype: "GET",
            path: e.default.myFollow,
            data: {
                userId: n.globalData.uid,
                page: this.data.page
            }
        });
        i.then(function(a) {
            console.log(a), t.setData({
                data: a.data
            }), wx.hideLoading();
        }), i.catch(function(a) {
            console.log(a);
        });
    },
    navigator: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/shop/shop?id=" + t
        });
    },
    searchScrollLower: function() {
        var a = this, i = this.data.page;
        i++, this.setData({
            loading: !0,
            page: i
        }), console.log(i);
        var l = new o.default({
            reqtype: "GET",
            path: e.default.myFollow,
            data: {
                userId: n.globalData.uid,
                page: i
            }
        });
        l.then(function(e) {
            a.setData(t({}, "data.follow", a.data.data.follow.concat(e.data.follow))), e.data.follow.length < 8 && a.setData({
                loadingText: "暂无其它数据"
            });
        }), l.catch(function(a) {
            console.log(a);
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