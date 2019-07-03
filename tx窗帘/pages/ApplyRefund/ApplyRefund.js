var e = require("../../utils/config.js"), a = getApp();

Page({
    data: {
        OrderId: "",
        SkuId: "",
        RefundType: 0,
        RefundTypeText: "请选择退款方式",
        RefundMoney: 0,
        RefundReason: 0,
        RefundReasonText: "请选择退款原因",
        Remark: "",
        BankName: "",
        BankAccountName: "",
        BankAccountNo: "",
        ShowReason: !0,
        ShowType: !0,
        ShowReasonList: [ "拍错/多拍/不想要", "缺货", "未按约定时间发货" ],
        ShowReasonIndex: -1,
        RefundTextList: [ "原路返回", "", "退到预付款" ],
        ShowRefundIndex: -1
    },
    onLoad: function(e) {
        var t = this, n = e.orderid;
        e.m;
        t.setData({
            OrderId: n
        }), a.getOpenId(function(e) {
            wx.request({
                url: a.getUrl(a.globalData.getAfterSalePreCheck),
                data: {
                    openId: e,
                    IsReturn: !1,
                    OrderId: n,
                    SkuId: ""
                },
                success: function(e) {
                    t.GetCheckData(e);
                }
            });
        });
    },
    GetCheckData: function(e) {
        var t = e.data;
        if ("NOUser" == t.Message) wx.navigateTo({
            url: "../login/login"
        }); else if ("OK" == t.Status) {
            var n = [];
            t.CanBackReturn && n.push("原路返回"), t.CanToBalance && n.push("退到预付款");
            var o = [];
            t.RefundReasons.forEach(function(e, a) {
                o.push(e.AfterSalesText);
            }), this.setData({
                RefundMoney: t.MaxRefundAmount,
                RefundTextList: n,
                ShowReasonList: o
            });
        } else a.showErrorModal(t.Message, function(e) {
            e.confirm && wx.navigateBack({
                delta: 1
            });
        });
    },
    InputText: function(e) {
        var a = this, t = e.currentTarget.dataset.names, n = e.detail.value;
        switch (t) {
          case "BankName":
            a.setData({
                BankName: n
            });
            break;

          case "BankAccountName":
            a.setData({
                BankAccountName: n
            });
            break;

          case "BankAccountNo":
            a.setData({
                BankAccountNo: n
            });
            break;

          default:
            a.setData({
                Remark: n
            });
        }
    },
    ShowReason: function(e) {
        var a = this;
        wx.showActionSheet({
            itemList: a.data.ShowReasonList,
            success: function(e) {
                console.log(e), a.setData({
                    ShowReasonIndex: e.tapIndex
                });
            },
            fail: function(e) {
                console.log(e.errMsg);
            }
        });
    },
    ShowType: function(e) {
        var a = this;
        wx.showActionSheet({
            itemList: a.data.RefundTextList,
            success: function(e) {
                if (!e.cancel) {
                    var t = a.data.RefundTextList[e.tapIndex], n = a.GetRefundTypeId(t);
                    console.log(t), console.log(n), a.setData({
                        ShowRefundIndex: e.tapIndex,
                        RefundTypeText: t,
                        RefundType: n
                    });
                }
            },
            fail: function(e) {
                console.log(e.errMsg);
            }
        });
    },
    ChooseReason: function(e) {
        var a = this, t = e.currentTarget.dataset.name;
        a.setData({
            RefundReasonText: t,
            ShowType: !0,
            ShowReason: !0
        });
    },
    ChooseType: function(e) {
        var a = this, t = a.RefundTextList[e.currentTarget.dataset.id], n = GetRefundTypeId(t);
        console.log(e.currentTarget.dataset.id), console.log(n), a.setData({
            RefundType: n,
            RefundTypeText: t,
            ShowType: !0,
            ShowReason: !0
        });
    },
    GetRefundTypeId: function(e) {
        return "退到预付款" == e ? 3 : "退到银行卡" == e ? 2 : "原路返回" == e ? 1 : 4;
    },
    formSubmit: function(t) {
        var n = this, o = parseInt(n.data.ShowReasonIndex), s = t.detail.formId, r = n.ToTrim(t.detail.value.txtBankName), d = n.ToTrim(t.detail.value.txtBankAccountName), u = n.ToTrim(t.detail.value.txtBankAccountNo), c = n.data.RefundType;
        2 == c && (r.length <= 0 || d.length <= 0 || u.length <= 0) ? a.showErrorModal("银行卡信息不允许为空！") : n.data.GetRefundTypeId < 0 ? a.showErrorModal("请选择要退款的方式") : o < 0 ? a.showErrorModal("请选择要退款的原因") : n.data.OrderId.length <= 0 ? a.showErrorModal("请选择要退款的订单") : a.getOpenId(function(t) {
            var i = {
                openId: t,
                skuId: n.data.SkuId,
                orderId: n.data.OrderId,
                RefundType: c,
                RefundReason: n.data.ShowReasonList[o],
                Remark: n.data.Remark,
                BankName: r,
                BankAccountName: d,
                BankAccountNo: u,
                FormId: s
            };
            e.httpPost(a.getUrl(a.globalData.applyRefund), i, function(e) {
                "OK" == e.Status ? a.showErrorModal(e.Message, function(e) {
                    wx.redirectTo({
                        url: "../applylist/applylist"
                    });
                }) : "NOUser" == e.Message ? wx.navigateTo({
                    url: "../login/login"
                }) : a.showErrorModal(e.Message, function(e) {
                    e.confirm && wx.navigateBack({
                        delta: 1
                    });
                });
            });
        });
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