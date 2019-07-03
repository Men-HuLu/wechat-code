function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function a(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var e = t(require("../../utils/interface.js")), o = t(require("../../libs/ajax.js")), n = getApp();

Page({
    data: {
        tab: "1",
        left: "0",
        page: 1
    },
    onLoad: function(t) {
        var a = this;
        wx.hideShareMenu(), wx.clearStorage(), wx.showLoading({
            title: "加载中..."
        });
        var i = new o.default({
            reqtype: "GET",
            path: e.default.shop,
            data: {
                uid: n.globalData.uid,
                tab: this.data.tab,
                left: this.data.left
            }
        });
        i.then(function(t) {
            console.log(t), a.setData({
                data: t.data
            }), wx.hideLoading();
        }), i.catch(function(t) {
            console.log(t);
        });
    },
    navigator: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../shopDetail/shopDetail?id=" + a
        });
    },
    tabNavigator: function(t) {
        var a = this, i = t.currentTarget.dataset.type;
        console.log(i), this.setData({
            tab: i,
            left: 0,
            page: 1
        }), wx.showLoading({
            title: "加载中..."
        });
        var d = new o.default({
            reqtype: "GET",
            path: e.default.shop,
            data: {
                uid: n.globalData.uid,
                tab: this.data.tab,
                left: this.data.left
            }
        });
        d.then(function(t) {
            console.log(t), a.setData({
                data: t.data
            }), wx.hideLoading();
        }), d.catch(function(t) {
            console.log(t);
        });
    },
    leftNavigator: function(t) {
        var a = this, i = t.currentTarget.dataset.left;
        console.log(this.data.tab + " " + i), this.setData({
            left: i
        }), wx.showLoading({
            title: "加载中..."
        });
        var d = new o.default({
            reqtype: "GET",
            path: e.default.shop,
            data: {
                uid: n.globalData.uid,
                tab: this.data.tab,
                left: this.data.left
            }
        });
        d.then(function(t) {
            console.log(t), a.setData({
                data: t.data
            }), wx.hideLoading();
        }), d.catch(function(t) {
            console.log(t);
        });
    },
    confirm: function() {
        wx.navigateTo({
            url: "../shopSearch/shopSearch?searchVal=" + this.data.search
        });
    },
    add: function() {
        wx.navigateTo({
            url: "../newCommodity/newCommodity"
        });
    },
    clear: function() {
        this.setData({
            search: ""
        });
    },
    inputVal: function(t) {
        this.setData({
            search: t.detail.value
        });
    },
    pullUpLoad: function() {
        var t = this, i = this.data.page;
        i += 1, this.setData({
            page: i
        }), wx.showLoading({
            title: "加载中..."
        });
        var d = new o.default({
            reqtype: "GET",
            path: e.default.shop,
            data: {
                uid: n.globalData.uid,
                tab: this.data.tab,
                left: this.data.left,
                page: this.data.page
            }
        });
        d.then(function(e) {
            wx.hideLoading(), console.log(e.data), 0 == e.errcode ? (t.setData(a({}, "data.product", t.data.data.product.concat(e.data.product))), 
            console.log(t.data.data)) : (wx.showLoading({
                title: e.msg
            }), setTimeout(function() {
                wx.hideLoading();
            }, 1e3));
        }), d.catch(function(t) {
            console.log(t);
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