var e = getApp(), t = require("../../utils/config.js");

Page({
    data: {
        ApplySendGood: null,
        ProductName: "",
        formId: "",
        express: "请选择物流公司",
        shipOrderNumber: "",
        IsShowExpress: !0,
        ExpressList: [],
        index: 0
    },
    onLoad: function(t) {
        var a = this, s = t.id;
        t.skuId;
        e.getOpenId(function(t) {
            wx.request({
                url: e.getUrl(e.globalData.getReturnDetail),
                data: {
                    openId: t,
                    returnId: s
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var s = t.data.Data;
                        a.setData({
                            ApplySendGood: s
                        });
                    } else "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : e.showErrorModal(t.data.Message, function(e) {
                        e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                },
                complete: function() {
                    a.LoadExpress();
                }
            });
        });
    },
    bindPickerChange: function(e) {
        var t = this, a = e.detail.value, s = t.data.ExpressList;
        t.setData({
            express: s[a]
        });
    },
    ShowExpress: function(t) {
        var a = this;
        a.data.ExpressList.length > 0 ? a.setData({
            IsShowExpress: !1
        }) : e.showErrorModal("物流公司加载失败");
    },
    LoadExpress: function() {
        var t = this;
        wx.request({
            url: e.getUrl(e.globalData.getExpressList),
            success: function(e) {
                if ("OK" == e.data.Status) {
                    var a = new Array();
                    e.data.Data.find(function(e, t) {
                        void 0 != e.ExpressName && a.push(e.ExpressName);
                    }), t.setData({
                        ExpressList: a
                    });
                }
            }
        });
    },
    formSubmit: function(a) {
        var s = this, o = a.detail.formId;
        if ("请选择物流公司" != s.data.express) {
            var n = s.ToTrim(a.detail.value.txtshipOrderNumber);
            null == n || "undefined" == n || n.length <= 0 ? e.showErrorModal("快递单号不允许为空") : e.getOpenId(function(a) {
                var r = {
                    openId: a,
                    skuId: s.data.ApplySendGood.SkuId,
                    orderId: s.data.ApplySendGood.OrderId,
                    ReturnsId: s.data.ApplySendGood.ReturnId,
                    express: s.data.express,
                    shipOrderNumber: n,
                    formId: o
                };
                t.httpPost(e.getUrl(e.globalData.returnSendGoods), r, function(t) {
                    "OK" == t.Status ? wx.showModal({
                        title: "提示",
                        content: t.Message,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    }) : "NOUser" == t.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : e.showErrorModal(t.ErrorResponse.ErrorMsg, function(e) {
                        e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                });
            });
        } else e.showErrorModal("请选择物流公司");
    },
    ToTrim: function(e) {
        return e.replace(/(^\s*)|(\s*$)/g, "");
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});