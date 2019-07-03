function n(n, t, e) {
    return t in n ? Object.defineProperty(n, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : n[t] = e, n;
}

var t, e = require("../../utils/LPAPI/LPAPI.js");

Page((t = {
    data: {},
    onLoad: function(n) {
        wx.hideShareMenu(), this.setData({
            canvasWidth: 40,
            canvasHeight: 2
        }), this.draw();
    },
    openPrinter: function() {
        e.openPrinter("B11");
    },
    draw: function() {
        e.startDrawLabel("test", this, 60, 30, 0), e.setItemOrientation(0), e.drawQRCode("https://www.baidu.com", 15, 2, 16, 16), 
        e.setItemHorizontalAlignment(1), e.drawText("Hello 大家好", 23, 22, 3), e.endDrawLabel();
    },
    print: function() {
        e.print();
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
}, n(t, "onReachBottom", function() {}), n(t, "onPullDownRefresh", function() {}), 
t));