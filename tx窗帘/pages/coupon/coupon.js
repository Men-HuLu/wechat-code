var a = require("../../utils/config.js"), e = getApp();

Page({
    data: {
        pageIndex: 0,
        couponType: 1,
        couponsList: [],
        refreshSuccess: !0,
        counpimg: e.getRequestUrl + "/storage/applet/images/counp-background.jpg",
        use_counpimg: e.getRequestUrl + "/storage/applet/images/use_counp.png",
        over_counpimg: e.getRequestUrl + "/storage/applet/images/over_counp.png"
    },
    onLoad: function(o) {
        var t = this;
        e.getOpenId(function(o) {
            var n = {
                openId: o,
                pageIndex: t.data.pageIndex + 1,
                pageSize: 10,
                couponType: t.data.couponType
            };
            wx.showNavigationBarLoading(), a.httpGet(e.getUrl(e.globalData.loadCoupon), n, t.getCouponsData);
        });
    },
    getCouponsData: function(a) {
        var e = this;
        if ("NOUser" == a.Message) wx.navigateTo({
            url: "../login/login"
        }); else if ("OK" == a.Status) {
            var o = e.data.couponsList;
            if (a.Data.length > 0) {
                for (var t = 0; t < a.Data.length; t++) {
                    var n = (i = a.Data[t]).StartTime.substring(0, 10).replace(/\-/g, "."), p = i.ClosingTime.substring(0, 10).replace(/\-/g, "."), g = "";
                    g = i.CanUseProducts && i.CanUseProducts.length > 0 ? "部分商品可用" : "全场通用";
                    var s = "";
                    s = i.OrderUseLimit > 0 ? "订单满" + i.OrderUseLimit.toFixed(2) + "元可用" : "订单金额无限制";
                    var i = {
                        couponsDate: n + "~" + p,
                        couponsPrice: i.Price,
                        couponsName: i.CouponName,
                        couponsCanUseProductse: g,
                        LimitText: s,
                        couponsId: i.CouponId
                    };
                    o.push(i);
                }
                e.setData({
                    pageIndex: e.data.pageIndex + 1,
                    couponsList: o
                });
            }
            e.setData({
                refreshSuccess: !0
            }), wx.hideNavigationBarLoading();
        } else wx.hideNavigationBarLoading();
    },
    bingNoUseTap: function(o) {
        var t = this;
        t.setData({
            pageIndex: 0,
            couponType: 1,
            couponsList: []
        }), e.getOpenId(function(o) {
            var n = {
                openId: o,
                pageIndex: t.data.pageIndex + 1,
                pageSize: 10,
                couponType: t.data.couponType
            };
            wx.showNavigationBarLoading(), a.httpGet(e.getUrl(e.globalData.loadCoupon), n, t.getCouponsData);
        });
    },
    binghasUseTap: function(o) {
        var t = this;
        t.setData({
            pageIndex: 0,
            couponType: 2,
            couponsList: []
        }), e.getOpenId(function(o) {
            var n = {
                openId: o,
                pageIndex: t.data.pageIndex + 1,
                pageSize: 10,
                couponType: t.data.couponType
            };
            wx.showNavigationBarLoading(), a.httpGet(e.getUrl(e.globalData.loadCoupon), n, t.getCouponsData);
        });
    },
    bingExpiredTap: function(o) {
        var t = this;
        t.setData({
            pageIndex: 0,
            couponType: 3,
            couponsList: []
        }), e.getOpenId(function(o) {
            var n = {
                openId: o,
                pageIndex: t.data.pageIndex + 1,
                pageSize: 10,
                couponType: t.data.couponType
            };
            wx.showNavigationBarLoading(), a.httpGet(e.getUrl(e.globalData.loadCoupon), n, t.getCouponsData);
        });
    },
    onReachBottom: function() {
        var o = this;
        if (1 == o.data.refreshSuccess) {
            var t = o.data.pageIndex + 1;
            e.getOpenId(function(n) {
                var p = {
                    openId: n,
                    pageIndex: t,
                    pageSize: 10,
                    couponType: o.data.couponType
                };
                wx.showNavigationBarLoading(), o.setData({
                    refreshSuccess: !1
                }), a.httpGet(e.getUrl(e.globalData.loadCoupon), p, o.getCouponsData);
            });
        }
    }
});