function t(t) {
    var e = parseInt(t / 86400), a = parseInt(t % 86400 / 3600), o = parseInt(t % 3600 / 60), n = parseInt(t % 3600 % 60), i = "";
    return e > 0 && (i += e + "天"), a < 10 && (a = "0" + a), o < 10 && (o = "0" + o), 
    n < 10 && (n = "0" + n), i += a + ":" + o + ":" + n;
}

function e(a, o) {
    a.setData({
        StartClock: t(o)
    }), o <= 0 ? a.setData({
        StartClock: "",
        CountDownStatus: "Normal"
    }) : setTimeout(function() {
        e(a, o -= 1);
    }, 1e3);
}

function a(e, o) {
    e.setData({
        EndClock: t(o)
    }), o <= 0 ? e.setData({
        EndClock: "",
        CountDownStatus: "ActivityEnd"
    }) : setTimeout(function() {
        a(e, o -= 1);
    }, 1e3);
}

var o = getApp(), n = require("../wxParse/wxParse.js");

Page({
    data: {
        CountDownId: 0,
        MaxCount: 0,
        CountDownStatus: "",
        StartDate: "",
        EndDate: "",
        NowTime: "",
        ProductId: 0,
        ProductName: "",
        TempMetaDescription: "",
        MetaDescription: "",
        ShortDescription: "",
        ShowSaleCounts: "",
        MarketPrice: "",
        IsfreeShipping: "",
        MaxSalePrice: "",
        MinSalePrice: "",
        ReviewCount: 0,
        ProductImgs: "",
        SkuItemList: "",
        Skus: "",
        Freight: "",
        Coupons: "",
        ShowPrice: "",
        backShow: "none",
        SkuShow: "none",
        couponShow: "none",
        skuImg: "",
        skuPrice: 0,
        skuStock: 0,
        selectedSku: "",
        selectedSkuContent: "",
        buyAmount: 1,
        selectedskuList: [],
        activeDateMsg: "",
        StartClock: "",
        EndClock: ""
    },
    onReachBottom: function() {
        var t = this;
        if (null == this.data.metaDescription || "" == this.metaDescription) {
            var e = t.data.TempMetaDescription;
            null != e && void 0 != e && n.wxParse("metaDescription", "html", e, t);
        }
    },
    onLoad: function(t) {
        var n = this, i = t.id;
        o.getOpenId(function(t) {
            wx.request({
                url: o.getUrl(o.globalData.getLimitBuyProduct),
                data: {
                    openId: t,
                    countDownId: i
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var i = t.data.Data;
                        if (i.NowTime < i.StartDate) {
                            var u = new Date(i.NowTime), s = (r = new Date(i.StartDate)).getTime() - u.getTime();
                            e(n, c = s / 1e3);
                        }
                        if (i.NowTime > i.StartDate && i.NowTime < i.EndDate) {
                            var u = new Date(i.NowTime), r = new Date(i.EndDate), c = (s = r.getTime() - u.getTime()) / 1e3;
                            a(n, c);
                        }
                        var d = "";
                        0 == i.SkuItemList.length && (d = i.Skus[0].SkuId), n.setData({
                            CountDownId: i.CountDownId,
                            MaxCount: i.MaxCount,
                            CountDownStatus: i.CountDownStatus,
                            StartDate: i.StartDate,
                            EndDate: i.EndDate,
                            NowTime: i.NowTime,
                            ProductId: i.ProductId,
                            ProductName: i.ProductName,
                            ShortDescription: i.ShortDescription ? i.ShortDescription : "",
                            ShowSaleCounts: i.ShowSaleCounts,
                            MarketPrice: i.MarketPrice,
                            IsfreeShipping: i.IsfreeShipping,
                            MaxSalePrice: i.MaxSalePrice,
                            MinSalePrice: i.MinSalePrice,
                            ReviewCount: i.ReviewCount,
                            ProductImgs: i.ProductImgs,
                            SkuItemList: i.SkuItemList,
                            Skus: i.Skus,
                            Freight: i.Freight,
                            Coupons: i.Coupons,
                            ShowPrice: i.MaxSalePrice == i.MinSalePrice ? i.MinSalePrice : i.MinSalePrice + "～" + i.MaxSalePrice,
                            skuImg: i.ThumbnailUrl60,
                            skuPrice: i.MinSalePrice,
                            skuStock: i.Stock,
                            selectedSku: d,
                            selectedSkuContent: "",
                            TempMetaDescription: i.MetaDescription,
                            buyAmount: 1
                        });
                    } else "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : o.showErrorModal(t.data.Message, function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                }
            });
        });
    },
    onShareAppMessage: function() {
        return {
            title: "限时抢购" + this.data.ProductName,
            path: "",
            success: function(t) {},
            fail: function(t) {}
        };
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    getCoupon: function(t) {
        var e = t.currentTarget.id;
        o.getOpenId(function(t) {
            wx.request({
                url: o.getUrl(o.globalData.userGetCoupon),
                data: {
                    openId: t,
                    couponId: e
                },
                success: function(t) {
                    "OK" == t.data.Status ? wx.showToast({
                        title: "领取成功",
                        image: "../../images/succes.png"
                    }) : "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showToast({
                        title: t.data.Message,
                        image: "../../images/warning.png"
                    });
                }
            });
        });
    },
    clickCouponList: function(t) {
        var e = this;
        void 0 != e.data.Coupons && null != e.data.Coupons && "" != e.data.Coupons && e.data.Coupons.length > 0 ? this.setData({
            backShow: "",
            couponShow: ""
        }) : wx.showToast({
            title: "暂时没有可以领取的优惠券",
            icon: "loading"
        });
    },
    onCouponHide: function(t) {
        this.setData({
            backShow: "none",
            couponShow: "none"
        });
    },
    clickSku: function(t) {
        this.setData({
            backShow: "",
            SkuShow: ""
        });
    },
    clickback: function(t) {
        this.setData({
            backShow: "none",
            SkuShow: "none",
            couponShow: "none"
        });
    },
    onSkuHide: function(t) {
        this.setData({
            backShow: "none",
            SkuShow: "none"
        });
    },
    changeAmount: function(t) {
        var e = this, a = parseInt(t.detail.value), n = this.data.MaxCount > this.data.skuStock ? this.data.skuStock : this.data.MaxCount;
        if (isNaN(a) || a > n || a <= 0) return e.setData({
            buyAmount: n
        }), void o.showErrorModal("请输入正确的数量,不能大于最大抢购数量和商品库存或者小于等于0");
        this.setData({
            buyAmount: a
        });
    },
    reduceAmount: function(t) {
        var e = this.data.buyAmount;
        (e -= 1) <= 0 || this.setData({
            buyAmount: e
        });
    },
    addAmount: function(t) {
        var e = this.data.buyAmount;
        (e += 1) > (this.data.MaxCount > this.data.skuStock ? this.data.skuStock : this.data.MaxCount) || this.setData({
            buyAmount: e
        });
    },
    commitBuy: function(t) {
        for (var e = !0, a = 0; a < this.data.selectedskuList.length; a++) if (void 0 == this.data.selectedskuList[a] || "" == this.data.selectedskuList[a] || null == this.data.selectedskuList[a]) {
            e = !1;
            break;
        }
        if (this.data.selectedskuList.length == this.data.SkuItemList.length && e) if (this.data.buyAmount <= 0) o.showErrorModal("请输入要购买的数量"); else {
            var n = this.data.buyAmount, i = this.data.selectedSku, u = this.data.CountDownId;
            wx.navigateTo({
                url: "../submitorder/submitorder?productsku=" + i + "&buyamount=" + n + "&frompage=1&countdownid=" + u
            });
        } else o.showErrorModal("请选择规格");
    },
    onSkuClick: function(t) {
        var e = this, a = t.target.dataset.indexcount, o = t.target.id, n = t.target.dataset.skuvalue, i = new Object();
        i.valueid = o, i.value = n;
        var u = this.data.selectedskuList;
        u[a] = i;
        var s = "", r = this.data.SkuItemList;
        r.length, u.length;
        for (var c = this.data.ProductId, d = 0; d < u.length; d++) {
            var l = u[d];
            void 0 != l && (s += "" == s ? l.value : "," + l.value);
        }
        var h = null;
        e.data.Skus.forEach(function(t, a, o) {
            for (var n = !0, i = 0; i < u.length; i++) void 0 != u[i] && -1 != t.SkuId.indexOf("_" + u[i].valueid) || (n = !1);
            if (n && r.length == u.length) return h = t, c = t.SkuId, void (e.data.buyAmount = t.CartQuantity > 0 ? t.CartQuantity : 1);
        });
        r[a];
        for (var S = 0; S < r[a].AttributeValue.length; S++) r[a].AttributeValue[S].ValueId == o ? r[a].AttributeValue[S].UseAttributeImage = "selected" : r[a].AttributeValue[S].UseAttributeImage = "False";
        this.setData({
            selectedskuList: u,
            selectedSku: c,
            selectedSkuContent: s,
            SkuItemList: r
        }), null != h && (this.setData({
            skuPrice: h.ActivityPrice,
            skuStock: h.ActivityStock
        }), "" != h.ThumbnailUrl40 && null != h.ThumbnailUrl40 && this.setData({
            skuImg: h.ThumbnailUrl40
        }));
    }
});