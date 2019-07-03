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

var e = a(require("../../utils/interface.js")), n = a(require("../../libs/ajax.js")), o = getApp();

Page({
    data: {
        tab: "news",
        loading: !0,
        loadingText: "加载更多...",
        page: 1
    },
    searchScrollLower: function() {
        var a = this, i = this.data.page;
        i++, this.setData({
            page: i,
            loading: !0
        });
        var d = new n.default({
            reqtype: "GET",
            path: e.default.message,
            data: {
                userId: o.globalData.uid,
                tab: this.data.tab,
                page: this.data.page
            }
        });
        d.then(function(e) {
            a.setData(t({}, "data.comment", a.data.data.comment.concat(e.data.comment))), e.data.comment.length < 8 && a.setData({
                loadingText: "暂无其它数据"
            });
        }), d.catch(function(a) {
            console.log(a);
        });
    },
    tab: function(a) {
        var t = this;
        this.setData({
            page: 1
        });
        var i = a.currentTarget.dataset.tab, d = new n.default({
            reqtype: "GET",
            path: e.default.message,
            data: {
                userId: o.globalData.uid,
                tab: i,
                page: this.data.page
            }
        });
        d.then(function(a) {
            0 == a.data.comment.length ? t.setData({
                loadingText: "暂无数据"
            }) : a.data.comment.length < 8 && t.setData({
                loadingText: "暂无其他数据"
            }), t.setData({
                data: a.data,
                tab: i
            });
        }), d.catch(function(a) {
            console.log(a);
        });
    },
    onLoad: function(a) {
        var t = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var i = new n.default({
            reqtype: "GET",
            path: e.default.message,
            data: {
                userId: o.globalData.uid,
                tab: "news"
            }
        });
        i.then(function(a) {
            0 == a.data.comment.length ? t.setData({
                loadingText: "暂无数据"
            }) : a.data.comment.length < 8 && t.setData({
                loadingText: "暂无其他数据"
            }), t.setData({
                data: a.data
            }), wx.hideLoading();
        }), i.catch(function(a) {
            console.log(a);
        });
    },
    navigation: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../informationReview/informationReview?id=" + t
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