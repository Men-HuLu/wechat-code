Page({
    onReady: function() {},
    copyfilber: function() {
        var t = wx.getSystemInfoSync().system, i = void 0;
        wx.reportAnalytics("copylink_click", {
            copylink_click: "send"
        }), t.match(/iOS/i) && (i = "https://itunes.apple.com/cn/app/%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9-%E5%BC%B9%E5%B9%95%E7%95%AA%E5%89%A7%E7%9B%B4%E6%92%AD%E9%AB%98%E6%B8%85%E8%A7%86%E9%A2%91/id736536022?mt=8"), 
        t.match(/Android/i) && (i = "http://dl.hdslb.com/mobile/latest/iBiliPlayer-xcx.apk"), 
        wx.setClipboardData({
            data: i,
            success: function(t) {
                wx.showToast({
                    title: "复制成功",
                    icon: "success",
                    duration: 2e3
                });
            }
        });
    }
});