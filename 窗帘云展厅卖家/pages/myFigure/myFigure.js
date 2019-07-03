function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

a(require("../../libs/userLogin.js"));

var t = a(require("../../utils/interface.js")), e = a(require("../../libs/ajax.js")), i = getApp();

Page({
    data: {
        auditing: 0,
        loading: !0,
        loadingText: "加载更多...",
        page: 1
    },
    searchScrollLower: function() {
        var a = this, n = this.data.page;
        n++, this.setData({
            page: n,
            loading: !0
        }), this.data.data.figure.length <= 8 && this.setData({
            loading: !1
        });
        var d = new e.default({
            reqtype: "GET",
            path: t.default.myFigure,
            data: {
                auditing: this.data.auditing,
                userId: i.globalData.uid,
                page: this.data.page
            }
        });
        d.then(function(t) {
            for (var e = a.data.data, i = 0; i <= t.data.figure.length - 1; i++) {
                var n = t.data.figure[i].price.toFixed(2);
                t.data.figure[i].price = n.split("."), e.figure.push(t.data.figure[i]);
            }
            t.data.figure.length <= 8 && a.setData({
                loadingText: "暂无其它数据"
            }), a.setData({
                data: e
            }), wx.hideLoading();
        }), d.catch(function(a) {
            console.log(a);
        });
    },
    onLoad: function(a) {
        var n = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var d = new e.default({
            reqtype: "GET",
            path: t.default.myFigure,
            data: {
                auditing: this.data.auditing,
                userId: i.globalData.uid
            }
        });
        d.then(function(a) {
            0 == a.data.figure.length ? n.setData({
                loadingText: "暂无数据"
            }) : a.data.figure.length < 8 && n.setData({
                loadingText: "暂无其他数据"
            });
            for (var t = 0; t <= a.data.figure.length - 1; t++) {
                var e = a.data.figure[t].price.toFixed(2);
                a.data.figure[t].price = e.split(".");
            }
            n.setData({
                data: a.data
            }), wx.hideLoading();
        }), d.catch(function(a) {
            console.log(a);
        });
    },
    tab: function(a) {
        var n = this;
        wx.showLoading({
            title: "加载中..."
        });
        var d = a.currentTarget.dataset.auditing;
        this.setData({
            auditing: d,
            page: 1
        });
        var r = new e.default({
            reqtype: "GET",
            path: t.default.myFigure,
            data: {
                auditing: this.data.auditing,
                userId: i.globalData.uid
            }
        });
        r.then(function(a) {
            0 == a.data.figure.length && n.setData({
                loadingText: "暂无数据"
            });
            for (var t = 0; t <= a.data.figure.length - 1; t++) {
                var e = a.data.figure[t].price.toFixed(2);
                a.data.figure[t].price = e.split(".");
            }
            n.setData({
                data: a.data
            }), wx.hideLoading();
        }), r.catch(function(a) {
            console.log(a);
        });
    },
    navigator: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../figureDetail/figureDetail?id=" + t
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