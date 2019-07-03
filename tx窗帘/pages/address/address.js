var t = require("../../utils/config.js"), a = getApp();

Page({
    data: {
        addressData: []
    },
    onLoad: function(t) {
        this.initData();
    },
    initData: function() {
        var e = this;
        a.getOpenId(function(i) {
            var d = {
                openId: i
            };
            wx.showNavigationBarLoading(), t.httpGet(a.getUrl(a.globalData.getUserShippingAddress), d, e.getUserShippingAddressData);
        });
    },
    getUserShippingAddressData: function(t) {
        var a = this;
        "NOUser" == t.Message ? wx.navigateTo({
            url: "../login/login"
        }) : "OK" == t.Status ? (a.setData({
            addressData: t.Data
        }), wx.hideNavigationBarLoading()) : "NO" == t.Status ? (a.setData({
            addressData: []
        }), wx.hideNavigationBarLoading()) : wx.hideNavigationBarLoading();
    },
    getAddressResultData: function(e) {
        var i = this;
        "NOUser" == e.Message ? wx.navigateTo({
            url: "../login/login"
        }) : "OK" == e.Status ? a.getOpenId(function(e) {
            var d = {
                openId: e
            };
            wx.hideNavigationBarLoading(), t.httpGet(a.getUrl(a.globalData.getUserShippingAddress), d, i.getUserShippingAddressData);
        }) : wx.hideNavigationBarLoading();
    },
    bindRadioAddressChange: function(e) {
        var i = this, d = e.currentTarget.dataset.shippingid;
        a.getOpenId(function(e) {
            var s = {
                openId: e,
                shippingId: d
            };
            wx.showNavigationBarLoading(), t.httpGet(a.getUrl(a.globalData.setDefaultShippingAddress), s, i.getAddressResultData);
        });
    },
    bindDeleteAddressTap: function(e) {
        var i = this, d = e.currentTarget.dataset.shippingid;
        wx.showModal({
            title: "确定删除该地址吗？",
            success: function(e) {
                e.confirm && a.getOpenId(function(e) {
                    var s = {
                        openId: e,
                        shippingId: d
                    };
                    wx.showNavigationBarLoading(), t.httpGet(a.getUrl(a.globalData.delShippingAddress), s, i.getAddressResultData);
                });
            }
        });
    },
    bindEditAddressTap: function(t) {
        var a = t.currentTarget.dataset.addressdata;
        console.log(JSON.stringify(a)), wx.navigateTo({
            url: "../editaddress/editaddress?extra=" + JSON.stringify(a) + "&title=编辑收货地址"
        });
    },
    gotoAddAddress: function() {
        wx.navigateTo({
            url: "../editaddress/editaddress?title=新增收货地址"
        });
    },
    bindAddAddressTap: function(t) {
        this.gotoAddAddress();
    }
});