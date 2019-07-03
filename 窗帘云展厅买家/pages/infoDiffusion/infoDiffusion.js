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
        page: 1,
        hasData: !1
    },
    tab: function(a) {
        var t = this, i = a.currentTarget.dataset.tab, d = new n.default({
            reqtype: "GET",
            path: e.default.infoDiffusion,
            data: {
                uid: o.globalData.uid,
                tab: i,
                shopId: o.globalData.shopId,
                page: 1
            }
        });
        d.then(function(a) {
            console.log(1 == a.data.comment.length), a.data.comment.length ? t.setData({
                data: a.data,
                tab: i,
                hasData: !1
            }) : t.setData({
                data: [],
                tab: i,
                hasData: !0
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
            path: e.default.infoDiffusion,
            data: {
                uid: o.globalData.uid,
                tab: "news",
                shopId: o.globalData.shopId,
                page: 1
            }
        });
        i.then(function(a) {
            console.log(a), a.data.comment.length ? t.setData({
                data: a.data,
                hasData: !1
            }) : t.setData({
                data: [],
                hasData: !0
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
    onShareAppMessage: function() {
        wx.hideShareMenu();
    },
    pullUpLoad: function() {
        var a = this;
        if (1 != this.data.hasData) {
            var i = this.data.page;
            i += 1, this.setData({
                page: i
            }), wx.showLoading({
                title: "加载中..."
            });
            var d = new n.default({
                reqtype: "GET",
                path: e.default.infoDiffusion,
                data: {
                    uid: o.globalData.uid,
                    tab: this.data.tab,
                    shopId: o.globalData.shopId,
                    page: this.data.page
                }
            });
            d.then(function(e) {
                wx.hideLoading(), console.log(e.data), 1 == e.errcode ? (a.setData(t({}, "data.comment", a.data.data.comment.concat(e.data.comment))), 
                console.log(a.data.data)) : (wx.showLoading({
                    title: e.msg
                }), setTimeout(function() {
                    wx.hideLoading();
                }, 1e3));
            }), d.catch(function(a) {
                console.log(a);
            });
        }
    },
    newNews: function() {
        wx.navigateTo({
            url: "../newNews/newNews"
        });
    }
});