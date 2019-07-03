function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

var a = n(require("../../utils/interface.js")), e = n(require("../../libs/ajax.js")), o = getApp();

Page({
    data: {},
    onLoad: function(n) {
        var t = this;
        wx.hideShareMenu(), console.log(o.globalData.shopId);
        var i = new e.default({
            path: a.default.classManagement,
            data: {
                id: o.globalData.shopId
            },
            reqtype: "GET"
        });
        i.then(function(n) {
            t.setData({
                classify: n.data
            });
        }), i.catch(function(n) {
            o.showLoading();
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