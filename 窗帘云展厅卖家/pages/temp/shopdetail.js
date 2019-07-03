function n(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}

n(require("../../libs/userLogin.js")), n(require("../../utils/interface.js")), n(require("../../libs/ajax.js")), 
getApp();

Page({
    data: {},
    onLoad: function(n) {
        wx.hideShareMenu();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});