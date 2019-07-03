(function(n) {
    n && n.__esModule;
})(require("../../utils/interface.js")), getApp();

Page({
    data: {
        img: ""
    },
    onLoad: function(n) {
        var o = n.img.split("https://www.clyzt.cn/");
        this.setData({
            img: o[1],
            id: n.id
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