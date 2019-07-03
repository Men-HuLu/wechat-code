var t = require("../../utils/config.js"), d = getApp();

Page({
    data: {
        ProductSku: "",
        BuyAmount: 0,
        FromPage: "",
        CountdownId: "",
        ShipAddressId: "",
        AddressList: null,
        AddressCount: 0,
        DelshipId: 0,
        IsCheck: 0,
        jumpUrl: "",
        SingleParam: ""
    },
    onLoad: function(t) {
        var d = this, a = t.productsku, e = t.cartItemIds, s = t.buyamount, r = t.frompage, i = t.countdownid, n = t.shipaddressid, o = t.param, u = "../editaddress/editaddress?Source=choiceaddress&productsku=" + a + "&cartItemIds=" + e + "&buyamount=" + s + "&frompage=" + r + "&countdownid=" + i + "&param=" + o;
        d.setData({
            jumpUrl: u,
            ProductSku: a,
            cartItemIds: e,
            BuyAmount: s,
            FromPage: r,
            CountdownId: i,
            ShipAddressId: n,
            SingleParam: o
        }), d.initData();
    },
    initData: function() {
        var t = this;
        d.getOpenId(function(a) {
            wx.request({
                url: d.getUrl("GetAddressList"),
                data: {
                    openId: a
                },
                success: function(d) {
                    var a = d.data.Data;
                    "OK" == d.data.Status ? t.setData({
                        AddressCount: "[]" == a ? 0 : a.length,
                        AddressList: a
                    }) : wx.redirectTo({
                        url: jumpUrl
                    });
                }
            });
        });
    },
    bindDeleteAddressTap: function(a) {
        var e = this, s = a.currentTarget.dataset.shippingid;
        wx.showModal({
            title: "确定删除该地址吗？",
            success: function(a) {
                a.confirm && d.getOpenId(function(a) {
                    var r = {
                        openId: a,
                        shippingId: s
                    };
                    e.setData({
                        DelshipId: s
                    }), wx.showNavigationBarLoading(), t.httpGet(d.getUrl(d.globalData.delShippingAddress), r, e.getAddressResultData);
                });
            }
        });
    },
    getAddressResultData: function(t) {
        var a = this;
        "NOUser" == t.Message ? wx.redirectTo({
            url: "../login/login"
        }) : "OK" == t.Status ? d.getOpenId(function(t) {
            wx.hideNavigationBarLoading();
            var d = a.data.AddressList.filter(function(t, d, e) {
                return t.ShippingId != a.data.DelshipId;
            });
            a.setData({
                AddressList: d
            });
        }) : wx.hideNavigationBarLoading();
    },
    bindEditAddressTap: function(t) {
        var d = t.currentTarget.dataset.addressdata, a = this;
        0 == this.data.IsCheck && wx.redirectTo({
            url: "../editaddress/editaddress?extra=" + JSON.stringify(d) + "&title=编辑收货地址&Source=choiceaddress&productsku=" + a.data.ProductSku + "&cartItemIds=" + a.data.cartItemIds + "&buyamount=" + a.data.BuyAmount + "&frompage=" + a.data.FromPage + "&countdownid=" + a.data.CountdownId + "&param=" + this.data.SingleParam
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onAddShippingAddress: function(t) {
        this.gotoAddAddress();
    },
    gotoAddAddress: function() {
        wx.redirectTo({
            url: "../editaddress/editaddress?Source=choiceaddress&productsku=" + this.data.ProductSku + "&cartItemIds=" + this.data.cartItemIds + "&buyamount=" + this.data.BuyAmount + "&frompage=" + this.data.FromPage + "&countdownid=" + this.data.CountdownId + "&title=新增收货地址&param=" + this.data.SingleParam
        });
    },
    onAddressCheck: function(t) {
        var a = this, e = t.detail.value;
        a.data.IsCheck = 1, d.getOpenId(function(t) {
            wx.request({
                url: d.getUrl("SetDefaultAddress"),
                data: {
                    openId: t,
                    shippingId: e
                },
                success: function(t) {
                    "OK" == t.data.Status && wx.redirectTo({
                        url: "../submitorder/submitorder?productsku=" + a.data.ProductSku + "&cartItemIds=" + a.data.cartItemIds + "&buyamount=" + a.data.BuyAmount + "&frompage=" + a.data.FromPage + "&countdownid=" + a.data.CountdownId + "&shipaddressid=" + e + "&param=" + a.data.SingleParam
                    });
                }
            });
        });
    }
});