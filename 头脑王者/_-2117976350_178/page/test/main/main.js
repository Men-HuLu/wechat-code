Page({
    data: {},
    onLoad: function(n) {
        var t = this;
        this.seek = 0, this.timeFlag_countDown || (this.timeFlag_countDown = setInterval(function() {
            t.seek++;
        }, 1e3));
    },
    onReady: function() {},
    onShow: function() {
        this.btnLock = !1;
    },
    onBtn: function() {
        this.btnLock || (this.btnLock = !0, wx.navigateTo({
            url: "/page/test/video/video?seek=" + this.seek
        }));
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});