var o = require("../../utils/config.js"), e = getApp();

Page({
    data: {
        CouponName: "",
        Price: 0,
        LimitText: "",
        CanUseProducts: "",
        CouponsDate: "",
        CouponId: "",
        coupimg: e.getRequestUrl + "/Images/coupdetail-back.jpg",
        coupimgLine: e.getRequestUrl + "/Images/coup-line.jpg"
    },
    onLoad: function(t) {
        var a = this, n = t.id;
        a.setData({
            CouponId: n
        });
        a = this;
        e.getOpenId(function(t) {
            var s = {
                openId: t,
                couponId: n
            };
            o.httpGet(e.getUrl(e.globalData.loadCouponDetails), s, a.getCouponsData);
        });
    },
    getCouponsData: function(o) {
        var t = this;
        if ("NOUser" == o.Message) wx.navigateTo({
            url: "../login/login"
        }); else if ("OK" == o.Status) {
            var a = o.Data, n = a.StartTime.substring(0, 10).replace("-", "."), s = a.ClosingTime.substring(0, 10).replace("-", "."), i = "";
            i = a.CanUseProducts && a.CanUseProducts > 0 ? "部分商品可用" : "全场通用";
            var u = "";
            u = a.OrderUseLimit > 0 ? "订单满" + a.OrderUseLimit.toFixed(2) + "元可用" : "订单金额无限制", 
            t.setData({
                CouponName: a.CouponName,
                Price: a.Price,
                LimitText: u,
                CanUseProducts: i,
                CouponsDate: n + "~" + s,
                CouponId: a.CouponId
            });
        } else e.showErrorModal(result.data.Message, function(o) {
            o.confirm && wx.navigateBack({
                delta: 1
            });
        });
    },
    GetCoupon: function() {
        var o = this.data.CouponId, t = this;
        "" == o || parseInt(o) <= 0 ? e.showErrorModal("领取的优惠券不存在", function(o) {
            o.confirm && wx.navigateBack({
                delta: 1
            });
        }) : e.getOpenId(function(a) {
            wx.request({
                url: e.getUrl(e.globalData.userGetCoupon),
                data: {
                    openId: a,
                    couponId: o
                },
                success: function(o) {
                    "OK" == o.data.Status ? wx.showModal({
                        title: "提示",
                        content: o.data.Message,
                        showCancel: !1
                    }) : "NO" == o.data.Status ? e.showErrorModal(o.data.Message) : "NOUser" == o.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : (t.setData({
                        backShow: "none",
                        couponShow: "none"
                    }), wx.showToast({
                        title: o.data.Message,
                        image: "../../images/warning.png"
                    }));
                }
            });
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