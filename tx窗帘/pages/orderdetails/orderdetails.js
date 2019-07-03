var t = getApp();

Page({
    data: {
        OrderInfo: null,
        LogisticsData: null,
        SendGifts: null,
        OrderId: 0,
        RequestUrl: t.getRequestUrl
    },
    onLoad: function(t) {
        this.setData({
            OrderId: t.orderid
        });
    },
    goToProductDetail: function(t) {
        var e = this, a = t.currentTarget.dataset.productid;
        e.data.OrderInfo.CountDownId > 0 ? wx.navigateTo({
            url: "../countdowndetail/countdowndetail?id=" + e.data.OrderInfo.CountDownId
        }) : wx.navigateTo({
            url: "../productdetail/productdetail?id=" + a
        });
    },
    orderPay: function(e) {
        var a = e.currentTarget.dataset.orderid;
        t.orderPay(a, 0, !1);
    },
    orderFinish: function(e) {
        var a = e.currentTarget.dataset.orderid;
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl(t.globalData.finishOrder),
                data: {
                    openId: e,
                    orderId: a
                },
                success: function(e) {
                    "OK" == e.data.Status ? wx.showModal({
                        title: "提示",
                        content: "确认收货成功！",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateTo({
                                url: "../orderlist/orderlist?status=0"
                            });
                        }
                    }) : "NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : t.showErrorModal(e.data.Message, function(t) {
                        t.confirm && wx.navigateTo({
                            url: "../orderlist/orderlist?status=0"
                        });
                    });
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = this, a = e.data.OrderId;
        t.getOpenId(function(r) {
            wx.request({
                url: t.getUrl(t.globalData.getOrderDetail),
                data: {
                    openId: r,
                    orderId: a
                },
                success: function(a) {
                    if ("OK" == a.data.Status) {
                        var r = a.data.Data, n = "";
                        null != r.express && r.express.length > 0 && (n = r.express);
                        e.setData({
                            OrderInfo: r,
                            SendGifts: "",
                            LogisticsData: n
                        });
                    } else "NOUser" == a.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : t.showErrorModal(a.data.Message, function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {
        return {
            title: "订单：" + this.data.OrderInfo.order_no,
            path: "",
            success: function(t) {},
            fail: function(t) {}
        };
    }
});