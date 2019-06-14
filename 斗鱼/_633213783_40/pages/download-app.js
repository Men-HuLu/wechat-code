Page({
    data: {},
    clipboardLink: function() {
        wx.setClipboardData({
            data: "https://www.douyu.com/special/xz?cd=480&ct=jnhoffline",
            success: function() {}
        });
    }
});