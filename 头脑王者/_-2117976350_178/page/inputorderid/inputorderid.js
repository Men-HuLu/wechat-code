Page({
    data: {},
    onLoad: function(o) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onSubmit: function() {
        console.log("提交：", this.orderId);
        var o = "/page/pay/pay?order=" + this.orderId;
        wx.navigateTo({
            url: o
        });
    },
    bindKeyInput: function(o) {
        this.orderId = o.detail.value, console.log("orderId:", this.orderId);
    }
});