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

var e = a(require("../../libs/ajax")), n = a(require("../../utils/interface")), i = getApp();

Page({
    data: {
        activeInde: "1",
        inputVal: "",
        hasData: !1,
        page: 1
    },
    onLoad: function(a) {
        var t = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var o = {
            tabNum: this.data.activeInde,
            uid: i.globalData.uid,
            search: this.data.inputVal,
            shopId: i.globalData.shopId
        }, l = new e.default({
            reqtype: "GET",
            path: n.default.visitorList,
            data: o
        });
        l.then(function(a) {
            console.log(a), a.data.list.length ? t.setData({
                data: a,
                hasData: !1
            }) : t.setData({
                hasData: !0
            }), wx.hideLoading();
        }), l.catch(function(a) {
            console.log(a);
        });
    },
    tabNav: function(a) {
        var o = this;
        console.log(a.currentTarget.dataset.tabnum), this.setData({
            activeInde: a.currentTarget.dataset.tabnum,
            page: 1
        }), wx.showLoading({
            title: "加载中..."
        });
        var l = {
            tabNum: this.data.activeInde,
            uid: i.globalData.uid,
            search: this.data.inputVal,
            shopId: i.globalData.shopId
        }, s = new e.default({
            reqtype: "GET",
            path: n.default.visitorList,
            data: l
        });
        s.then(function(a) {
            console.log(a), a.data.list.length ? o.setData({
                data: a,
                hasData: !1
            }) : (o.setData(t({
                hasData: !0
            }, "data.data.list", [])), console.log(o.data.data)), wx.hideLoading();
        }), s.catch(function(a) {
            console.log(a);
        });
    },
    callPhone: function(a) {
        i.callPhone(a);
    },
    confirm: function(a) {
        var o = this;
        console.log(a.detail.value);
        a.detail.value;
        wx.showLoading({
            title: "加载中..."
        }), this.setData({
            page: 1
        });
        var l = {
            uid: i.globalData.uid,
            tabNum: "1",
            search: this.data.inputVal,
            shopId: i.globalData.shopId
        }, s = new e.default({
            reqtype: "GET",
            path: n.default.visitorListSearch,
            data: l
        });
        s.then(function(a) {
            console.log(a), a.data.list.length ? o.setData({
                data: a,
                hasData: !1,
                activeInde: "1"
            }) : o.setData(t({
                hasData: !0,
                activeInde: "1"
            }, "data.data.list", [])), wx.hideLoading();
        }), s.catch(function(a) {
            console.log(a);
        });
    },
    clear: function() {
        this.setData({
            inputVal: ""
        });
    },
    input: function(a) {
        var t = a.detail.value;
        this.setData({
            inputVal: t
        }), console.log(t), console.log(this.data.inputVal);
    },
    navigation: function(a) {
        console.log(a.currentTarget.dataset.id), wx.navigateTo({
            url: "../visitorInformation/visitorInformation?id=" + a.currentTarget.dataset.id
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
        var a = this, o = this.data.page;
        o += 1, this.setData({
            page: o
        }), wx.showLoading({
            title: "加载中..."
        });
        var l = {
            tabNum: this.data.activeInde,
            uid: i.globalData.uid,
            search: this.data.inputVal,
            shopId: i.globalData.shopId,
            page: this.data.page
        }, s = new e.default({
            reqtype: "GET",
            path: n.default.visitorList,
            data: l
        });
        s.then(function(e) {
            if (console.log(e), e.data.list.length) {
                var n;
                a.setData((n = {}, t(n, "data.data.list", a.data.data.data.list.concat(e.data.list)), 
                t(n, "hasData", !1), n)), console.log(a.data.data);
            } else a.setData({
                hasData: !0
            });
            wx.hideLoading();
        }), s.catch(function(a) {
            console.log(a);
        });
    }
});