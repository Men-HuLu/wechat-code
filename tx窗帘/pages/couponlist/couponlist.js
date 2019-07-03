var e = require("../../utils/config.js"), a = getApp();

Page({
    data: {
        pageIndex: 0,
        couponsList: [],
        refreshSuccess: !0,
        counpimg: a.getRequestUrl + "/Templates/xcxshop/images/counp-background.jpg"
    },
    onLoad: function(e) {
        this.initData(1);
    },
    initData: function(t) {
        var n = this;
        t < 1 && (t = 1), n.setData({
            pageIndex: t
        }), a.getOpenId(function(t) {
            var s = {
                openId: t,
                pageIndex: n.data.pageIndex,
                pageSize: 10
            };
            wx.showNavigationBarLoading(), e.httpGet(a.getUrl(a.globalData.LoadSiteCoupon), s, n.getCouponsData);
        });
    },
    getCouponsData: function(e) {
        var a = this;
        if ("NOUser" == e.Message) wx.navigateTo({
            url: "../login/login"
        }); else if ("OK" == e.Status) {
            var t = a.data.couponsList;
            if (e.Data.length > 0) {
                for (var n = 0; n < e.Data.length; n++) {
                    var s = (g = e.Data[n]).StartTime.substring(0, 10).replace(/\-/g, "."), o = g.ClosingTime.substring(0, 10).replace(/\-/g, "."), i = "";
                    i = g.CanUseProducts && g.CanUseProducts.length > 0 ? "部分商品可用" : "全场通用";
                    var r = "";
                    r = g.OrderUseLimit > 0 ? "订单满" + g.OrderUseLimit + "元可用" : "订单金额无限制";
                    var g = {
                        couponsDate: s + "~" + o,
                        couponsPrice: g.Price,
                        couponsName: g.CouponName,
                        couponsCanUseProductse: i,
                        LimitText: r,
                        couponsId: g.CouponId,
                        canReceive: !0
                    };
                    t.push(g);
                }
                a.setData({
                    pageIndex: a.data.pageIndex + 1,
                    couponsList: t
                });
            }
            a.setData({
                refreshSuccess: !0
            }), wx.hideNavigationBarLoading();
        } else wx.hideNavigationBarLoading();
    },
    setCanReceive: function(e, a) {
        var t = this.data.couponsList, n = t.find(function(a) {
            return a.couponsId == e;
        });
        n && (n.canReceive = a, this.setData({
            couponsList: t
        }));
    },
    getCoupon: function(e) {
        var t = this, n = e.currentTarget.id;
        a.getOpenId(function(e) {
            wx.request({
                url: a.getUrl("UserGetCoupon"),
                data: {
                    openId: e,
                    couponId: n
                },
                success: function(e) {
                    "OK" == e.data.Status ? wx.showToast({
                        title: e.data.Message,
                        image: "../../images/succes.png"
                    }) : "NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : (t.setCanReceive(n, !1), wx.showToast({
                        title: e.data.Message,
                        image: "../../images/warning.png"
                    }));
                }
            });
        });
    },
    onReachBottom: function() {
        var e = this;
        if (1 == e.data.refreshSuccess) {
            var a = e.data.pageIndex + 1;
            e.initData(a);
        }
    }
});