var t = getApp();

Page({
    data: {
        isEmpty: !0,
        Status: 0,
        OrderList: null,
        AllActive: "active",
        WaitPayActive: "",
        WaitSendActive: "",
        WaitReceiveActive: "",
        WaitReviewActive: "",
        PageIndex: 1,
        PageSize: 100,
        RequestUrl: t.getRequestUrl,
        nullOrder: t.getRequestUrl + "/Templates/xcxshop/images/nullOrder.png"
    },
    onLoad: function(t) {
        var e = t.status;
        "" != t.status && void 0 != t.status || (e = 0), this.setData({
            Status: e
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        t.setData({
            PageIndex: 1,
            OrderList: []
        }), t.loadData(t.data.Status, t, !1);
    },
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        var t = this, e = t.data.PageIndex + 1;
        t.setData({
            PageIndex: e
        }), t.loadData(t.data.Status, t, !0);
    },
    closeOrder: function(e) {
        var a = this, i = e.target.dataset.orderid;
        wx.showModal({
            title: "提示",
            content: "确定要取消订单吗？",
            success: function(e) {
                e.confirm && t.getOpenId(function(e) {
                    wx.request({
                        url: t.getUrl(t.globalData.closeOrder),
                        data: {
                            openId: e,
                            orderId: i
                        },
                        success: function(e) {
                            "OK" == e.data.Status ? a.loadData(a.data.Status, a, !1) : "NOUser" == e.data.Message ? wx.navigateTo({
                                url: "../login/login"
                            }) : t.showErrorModal(e.data.Message);
                        }
                    });
                });
            }
        });
    },
    orderPay: function(e) {
        var a = this, i = e.currentTarget.dataset.orderid;
        t.orderPay(i, a.data.Status, !0);
    },
    orderFinish: function(e) {
        var a = this, i = e.currentTarget.dataset.orderid;
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl(t.globalData.finishOrder),
                data: {
                    openId: e,
                    orderId: i
                },
                success: function(e) {
                    "OK" == e.data.Status ? wx.showModal({
                        title: "提示",
                        content: "确认收货成功！",
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateTo({
                                url: "../orderlist/orderlist?status=" + a.data.Status
                            });
                        }
                    }) : "NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : t.showErrorModal(e.data.Message);
                }
            });
        });
    },
    toproduct: function(t) {
        wx.switchTab({
            url: "../productcategory/productcategory"
        });
    },
    onTabClick: function(t) {
        var e = this, a = t.currentTarget.dataset.status;
        e.setData({
            PageIndex: 1
        }), e.loadData(a, e, !1);
    },
    showLogistics: function(t) {
        var e = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../logistics/logistics?orderid=" + e
        });
    },
    showReview: function(t) {
        var e = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../comment/comment?id=" + e
        });
    },
    goToOrderDetail: function(t) {
        var e = t.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: "../orderdetails/orderdetails?orderid=" + e
        });
    },
    RefundOrder: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.money;
        wx.navigateTo({
            url: "../ApplyRefund/ApplyRefund?orderid=" + e + "&&m=" + a
        });
    },
    ReturnsOrder: function(t) {
        var e = t.currentTarget.dataset.orderid, a = t.currentTarget.dataset.skuId, i = t.currentTarget.dataset.skuname, r = t.currentTarget.dataset.num, n = t.currentTarget.dataset.money;
        wx.navigateTo({
            url: "../ApplyReturns/ApplyReturns?orderid=" + e + "&&skuId=" + a + "&&pro=" + i + "&&num=" + r + "&&m=" + n
        });
    },
    loadData: function(e, a, i) {
        wx.showLoading({
            title: "加载中"
        }), this.pageActive(e, a), t.getOpenId(function(r) {
            wx.request({
                url: t.getUrl(t.globalData.orderList),
                data: {
                    openId: r,
                    status: e,
                    pageIndex: a.data.PageIndex,
                    pageSize: a.data.PageSize
                },
                success: function(r) {
                    if ("OK" == r.data.Status) {
                        var n = r.data.Data;
                        if (i) {
                            var s = a.data.OrderList;
                            s.push.apply(s, n), a.setData({
                                OrderList: s
                            });
                        } else {
                            var d = n.length > 0;
                            a.setData({
                                Status: e,
                                OrderList: n,
                                isEmpty: d
                            });
                        }
                    } else "NOUser" == r.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : t.showErrorModal(r.data.Message, function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    },
    pageActive: function(t, e) {
        0 == t ? e.setData({
            AllActive: "active",
            WaitPayActive: "",
            WaitSendActive: "",
            WaitReceiveActive: "",
            WaitReviewActive: ""
        }) : 1 == t ? e.setData({
            AllActive: "",
            WaitPayActive: "active",
            WaitSendActive: "",
            WaitReceiveActive: "",
            WaitReviewActive: ""
        }) : 2 == t ? e.setData({
            AllActive: "",
            WaitPayActive: "",
            WaitSendActive: "active",
            WaitReceiveActive: "",
            WaitReviewActive: ""
        }) : 3 == t ? e.setData({
            AllActive: "",
            WaitPayActive: "",
            WaitSendActive: "",
            WaitReceiveActive: "active",
            WaitReviewActive: ""
        }) : 4 == t && e.setData({
            AllActive: "",
            WaitPayActive: "",
            WaitSendActive: "",
            WaitReceiveActive: "",
            WaitReviewActive: "active"
        });
    }
});