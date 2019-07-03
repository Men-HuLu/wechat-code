var e = getApp();

Page({
    data: {
        ExpressCompanyName: "",
        ShipOrderNumber: "",
        ShipTo: "",
        CellPhone: "",
        Address: "",
        LogisticsData: null
    },
    onLoad: function(a) {
        var n = this, t = a.orderid;
        e.getOpenId(function(a) {
            wx.request({
                url: e.getUrl("GetExpressInfo"),
                data: {
                    openId: a,
                    orderId: t
                },
                success: function(e) {
                    if ("OK" == e.data.Status) {
                        var a = e.data.Data;
                        a.LogisticsData;
                        n.setData({
                            ExpressCompanyName: a.ename,
                            ShipOrderNumber: a.express_no,
                            ShipTo: a.accept_name,
                            CellPhone: a.mobile,
                            Address: a.pname + " " + a.cname + " " + a.oname + " " + a.addr,
                            LogisticsData: a.data
                        });
                    } else "NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: e.data.Message,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});