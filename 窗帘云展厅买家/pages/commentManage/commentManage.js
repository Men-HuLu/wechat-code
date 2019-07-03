function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../utils/interface.js")), n = a(require("../../libs/ajax.js")), e = getApp();

Page({
    data: {
        search: null
    },
    navigation: function() {
        wx.navigateTo({
            url: "../publishCommentSelf/publishCommentSelf"
        });
    },
    input: function(a) {
        var t = a.detail.value;
        this.setData({
            search: t
        }), console.log(t);
    },
    clear: function() {
        this.setData({
            search: null
        });
    },
    confirm: function() {
        var a = this;
        wx.showLoading({
            title: "加载中..."
        });
        var i = new n.default({
            path: t.default.commentManage,
            data: {
                uid: e.globalData.uid,
                search: this.data.search
            },
            reqtype: "GET"
        });
        i.then(function(t) {
            a.setData({
                data: t.data
            }), wx.hideLoading();
        }), i.catch(function(a) {
            e.showLoading();
        });
    },
    onLoad: function(a) {
        var i = this;
        wx.hideShareMenu(), wx.showLoading({
            title: "加载中..."
        });
        var o = new n.default({
            path: t.default.commentManage,
            data: {
                uid: e.globalData.uid,
                search: this.data.search
            },
            reqtype: "GET"
        });
        o.then(function(a) {
            i.setData({
                data: a.data
            }), wx.hideLoading();
        }), o.catch(function(a) {
            e.showLoading();
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