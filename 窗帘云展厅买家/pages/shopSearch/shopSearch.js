function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../utils/interface.js")), e = a(require("../../libs/ajax.js")), n = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var o = this;
        wx.hideShareMenu();
        var i = a.searchVal;
        wx.showLoading({
            title: "加载中..."
        });
        var u = new e.default({
            reqtype: "GET",
            path: t.default.shopSearch,
            data: {
                searchVal: i,
                uid: n.globalData.uid
            }
        });
        u.then(function(a) {
            console.log(a), o.setData({
                data: a.data
            }), wx.hideLoading();
        }), u.catch(function(a) {
            n.showLoading();
        });
    },
    navigation: function(a) {
        console.log(a.currentTarget.dataset.id);
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../shopDetail/shopDetail?id=" + t
        });
    },
    add: function() {
        wx.reLaunch({
            url: "../newCommodity/newCommodity"
        });
    },
    confirm: function(a) {
        var o = this;
        wx.showLoading({
            title: "加载中..."
        });
        var i = new e.default({
            reqtype: "GET",
            path: t.default.shopSearch,
            data: {
                searchVal: this.data.search,
                uid: n.globalData.uid
            }
        });
        i.then(function(a) {
            console.log(a), o.setData({
                data: a.data
            }), wx.hideLoading();
        }), i.catch(function(a) {
            n.showLoading();
        });
    },
    clear: function() {
        this.setData({
            search: ""
        });
    },
    inputVal: function(a) {
        this.setData({
            search: a.detail.value
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