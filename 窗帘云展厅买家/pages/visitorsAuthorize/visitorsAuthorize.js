function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../libs/ajax")), i = a(require("../../utils/interface")), e = getApp();

Page({
    data: {
        activeInde: "1",
        visit: !1,
        userId: "",
        isVisit: "",
        hasData: !1,
        page: 1
    },
    onLoad: function(a) {
        var n = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var o = {
            tabNum: this.data.activeInde,
            uid: e.globalData.uid
        }, d = new t.default({
            reqtype: "GET",
            path: i.default.visitorsAuthorize,
            data: o
        });
        d.then(function(a) {
            console.log(a.data.length), a.data.length ? n.setData({
                data: a.data,
                hasData: !1
            }) : n.setData({
                hasData: !0
            }), wx.hideLoading();
        }), d.catch(function(a) {
            e.showLoading();
        });
    },
    tabNav: function(a) {
        var n = this;
        console.log(a.currentTarget.dataset.tabnum), this.setData({
            activeInde: a.currentTarget.dataset.tabnum,
            page: 1
        }), wx.showLoading({
            title: "加载中..."
        });
        var o = {
            tabNum: this.data.activeInde,
            uid: e.globalData.uid
        }, d = new t.default({
            reqtype: "GET",
            path: i.default.visitorsAuthorize,
            data: o
        });
        d.then(function(a) {
            console.log(a), a.data.length ? n.setData({
                data: a.data,
                hasData: !1
            }) : n.setData({
                data: [],
                hasData: !0
            }), wx.hideLoading();
        }), d.catch(function(a) {
            e.showLoading();
        });
    },
    showModal: function(a) {
        console.log(a), this.setData({
            visit: !0,
            userId: a.currentTarget.dataset.id
        });
    },
    isVisit: function(a) {
        var n = this;
        wx.showLoading({
            title: "发送中..."
        }), this.setData({
            isVisit: a.currentTarget.dataset.visit
        });
        var o = new t.default({
            path: i.default.visitorsAuthorizePost,
            data: {
                isVisit: this.data.isVisit,
                id: this.data.userId,
                uid: e.globalData.uid,
                tabNum: this.data.activeInde
            }
        });
        o.then(function(a) {
            n.setData({
                visit: !1
            }), 0 == a.errcode ? (wx.hideLoading(), n.setData({
                data: a.data
            }), console.log(a.data), console.log(n.data.data), wx.showLoading({
                title: "授权成功"
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3)) : (wx.hideLoading(), wx.showLoading({
                title: a.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        }), o.catch(function(a) {
            e.showLoading();
        });
    },
    close: function() {
        this.setData({
            visit: !1
        });
    },
    callPhone: function(a) {
        e.callPhone(a);
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
        var a = this, n = this.data.page;
        n += 1, this.setData({
            page: n
        }), wx.showLoading({
            title: "加载中..."
        });
        var o = {
            tabNum: this.data.activeInde,
            uid: e.globalData.uid,
            page: this.data.page
        }, d = new t.default({
            reqtype: "GET",
            path: i.default.visitorsAuthorize,
            data: o
        });
        d.then(function(t) {
            console.log(t.data.length), t.data.length ? a.setData({
                data: a.data.data.concat(t.data),
                hasData: !1
            }) : a.setData({
                hasData: !0
            }), wx.hideLoading();
        }), d.catch(function(a) {
            e.showLoading();
        });
    }
});