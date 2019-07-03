var t = require("../../utils/config.js"), a = getApp();

Page({
    data: {
        remark: "",
        RequestUrl: a.getRequestUrl,
        isSubmitting: !1,
        SingleParam: "",
        DiscountInput: ""
    },
    onLoad: function(t) {
        var o = this, e = t.productsku, d = t.buyamount, n = t.frompage, s = t.countdownid, r = t.shipaddressid, i = t.cartItemIds, u = t.param;
        a.getOpenId(function(t) {
            wx.request({
                url: a.getUrl("GetSubmitModel"),
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    Cookie: wx.getStorageSync("Cookie")
                },
                data: {
                    openId: t,
                    productSku: e || "",
                    cartItemIds: i || "",
                    fromPage: n,
                    countDownId: s || 0,
                    buyAmount: d || 0,
                    shipAddressId: r || 0,
                    paramJson: u || ""
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var c = t.data.Data, l = c.products;
                        o.setData({
                            ProductInfo: l,
                            orderAmount: c.totalAmount,
                            OrderFreight: c.freight,
                            TotalAmount: c.totalAmount,
                            userIntegrals: 0,
                            integralPerMoney: 0,
                            orderTotal: c.orderAmount,
                            ShippingAddressInfo: c.address,
                            ProductSku: e,
                            cartItemIds: i,
                            BuyAmount: d,
                            FromPage: n,
                            CountdownId: s,
                            ShipAddressId: r,
                            SingleParam: u
                        });
                    } else "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : a.showErrorModal(t.data.Message, function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    gotoAddress: function() {
        wx.navigateTo({
            url: "../choiceaddress/choiceaddress?productsku=" + this.data.ProductSku + "&cartItemIds=" + this.data.cartItemIds + "&buyamount=" + this.data.BuyAmount + "&frompage=" + this.data.FromPage + "&countdownid=" + this.data.CountdownId + "&shipaddressid=" + this.data.ShipAddressId + "&param=" + this.data.SingleParam
        });
    },
    addAddresstap: function() {
        var o = this;
        wx.showModal({
            title: "提示",
            content: "是否使用微信收货地址",
            cancelText: "否",
            confirmText: "是",
            success: function(e) {
                e.confirm ? wx.chooseAddress({
                    success: function(e) {
                        e && a.getOpenId(function(d) {
                            var n = {
                                openId: d,
                                shipTo: e.userName,
                                address: e.detailInfo,
                                cellphone: e.telNumber,
                                city: e.cityName,
                                county: e.countyName,
                                shippingId: 0,
                                regionId: 0,
                                isDefault: 1
                            };
                            t.httpPost(a.getUrl(a.globalData.AddWXChooseAddress), n, function(e) {
                                "OK" == e.Status ? t.httpGet(a.getUrl("ShippingAddress/GetShippingAddress"), {
                                    openId: d,
                                    shippingId: e.Message
                                }, function(t) {
                                    o.setData({
                                        ShippingAddressInfo: t.Data.ShippingAddressInfo
                                    });
                                }) : wx.showToast({
                                    title: e.Message,
                                    icon: "success"
                                });
                            });
                        });
                    }
                }) : e.cancel && o.gotoAddress();
            }
        });
    },
    bindRemarkInput: function(t) {
        this.setData({
            remark: t.detail.value
        });
    },
    ChkUsePoint: function(t) {
        var a = this, o = (a.data.orderTotal - a.data.integralPerMoney).toFixed(2);
        t.detail.value ? a.setData({
            orderAmount: o,
            DeductionPoints: a.data.userIntegrals
        }) : a.setData({
            orderAmount: a.data.orderTotal,
            DeductionPoints: 0
        });
    },
    submitOrder: function(o) {
        var e = this;
        if (!e.data.isSubmitting) if (null != e.data.ShippingAddressInfo && void 0 != e.data.ShippingAddressInfo) {
            e.setData({
                isSubmitting: !0
            });
            e.data.ProductInfo;
            var d = [];
            a.getOpenId(function(n) {
                var s = {
                    openId: n,
                    fromPage: e.data.FromPage,
                    shippingId: e.data.ShippingAddressInfo.id,
                    couponCode: d.join(","),
                    countDownId: e.data.CountdownId ? e.data.CountdownId : 0,
                    buyAmount: e.data.BuyAmount ? e.data.BuyAmount : 0,
                    productSku: e.data.ProductSku ? e.data.ProductSku : "",
                    cartItemIds: e.data.cartItemIds ? e.data.cartItemIds : "",
                    jsonOrderShops: e.data.remark,
                    deductionPoints: e.data.DeductionPoints,
                    formId: o.detail.formId,
                    singleParam: e.data.SingleParam,
                    discount: e.data.DiscountInput
                };
                t.httpPost(a.getUrl("SubmitOrder"), s, function(t) {
                    "OK" == t.Status ? wx.redirectTo({
                        url: "../orderlist/orderlist?status=1"
                    }) : (a.showErrorModal(t.Message), e.setData({
                        isSubmitting: !1
                    }));
                });
            });
        } else a.showErrorModal("请选择收货地址");
    },
    changeDiscountInput: function(t) {
        var a = parseFloat(this.data.orderAmount) - parseFloat(t.detail.value);
        a < 0 && (a = 0), this.setData({
            DiscountInput: t.detail.value,
            TotalAmount: a.toFixed(2)
        });
    }
});