Page({
    data: {
        seek: 0,
        src: ""
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function(n) {
        var a = app.shareManager.getCompareShareData("video");
        return app.shareConf(a);
    }
});