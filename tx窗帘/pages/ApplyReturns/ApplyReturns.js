var e = require("../../utils/config.js"), t = getApp();

Page({
    data: {
        OrderId: "",
        SkuId: "",
        Name: "",
        AfterSaleType: 0,
        AfterSaleTypeText: "请选择售后类型",
        RefundType: 0,
        RefundTypeText: "请选择退款方式",
        RefundReasonText: "请选择退货原因",
        Remark: "",
        BankName: "",
        BankAccountName: "",
        BankAccountNo: "",
        UserCredentials: [ "../../images/return-img_03.jpg", "../../images/return-img_03.jpg", "../../images/return-img_03.jpg" ],
        ReturnNum: 1,
        MostMoney: 0,
        ShowReason: !0,
        ShowType: !0,
        ShowAfterType: !0,
        ApplyReturnNum: 1,
        TotalMoney: 0,
        UploadGredentials: [],
        FormId: "",
        ReturnMoney: 0,
        ImageIndex: 0,
        ShowReasonList: [ "拍错/多拍/不想要", "缺货", "未按约定时间发货" ],
        ShowReasonIndex: -1,
        RefundTextList: [ "退到预付款", "原路返回", "到店退款" ],
        ShowRefundIndex: -1,
        AfterSaleTypeList: [ "仅退款", "退款退货" ],
        AfterSaleTypeId: -1,
        OneReundAmount: 0,
        returnId: null
    },
    onLoad: function(e) {
        var a = this, n = e.orderid, o = e.skuId, r = e.pro, d = e.num, s = e.m, u = e.returnId;
        a.setData({
            OrderId: n,
            SkuId: o,
            Name: r,
            ReturnNum: d,
            MostMoney: s,
            TotalMoney: s,
            returnId: u
        }), t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl(t.globalData.getAfterSalePreCheck),
                data: {
                    openId: e,
                    IsReturn: !0,
                    OrderId: n,
                    SkuId: o
                },
                success: function(e) {
                    a.GetCheckData(e);
                }
            });
        });
    },
    GetCheckData: function(e) {
        var a = e.data;
        if ("NOUser" == a.Message) wx.navigateTo({
            url: "../login/login"
        }); else if ("OK" == a.Status) {
            var n = [];
            a.CanBackReturn && n.push("原路返回"), a.CanToBalance && n.push("退到预付款"), a.CanReturnOnStore && n.push("到店退款");
            var o = [];
            a.RefundReasons.forEach(function(e, t) {
                o.push(e.AfterSalesText);
            }), this.setData({
                MostMoney: a.MaxRefundAmount,
                RefundTextList: n,
                TotalMoney: a.MaxRefundAmount,
                ReturnNum: a.MaxRefundQuantity,
                ApplyReturnNum: a.MaxRefundQuantity,
                OneReundAmount: a.oneReundAmount,
                ShowReasonList: o
            });
        } else t.showErrorModal(a.Message, function(e) {
            e.confirm && wx.navigateBack({
                delta: 1
            });
        });
    },
    uploadImg: function(e) {
        var t = this, a = t.data.UserCredentials, n = e.currentTarget.dataset.index;
        wx.chooseImage({
            success: function(e) {
                a[n] = e.tempFilePaths[0];
                var o = parseInt(t.data.ImageIndex);
                o = o >= 2 ? 2 : o++, t.setData({
                    UserCredentials: a,
                    ImageIndex: o
                });
            }
        });
    },
    ShowAfterType: function(e) {
        var t = this;
        wx.showActionSheet({
            itemList: t.data.AfterSaleTypeList,
            success: function(e) {
                e.cancel || t.setData({
                    AfterSaleTypeId: e.tapIndex
                });
            },
            fail: function(e) {
                console.log(e.errMsg);
            }
        });
    },
    ShowResaon: function(e) {
        var t = this;
        wx.showActionSheet({
            itemList: t.data.ShowReasonList,
            success: function(e) {
                t.setData({
                    ShowReasonIndex: e.tapIndex
                });
            },
            fail: function(e) {
                console.log(e.errMsg);
            }
        });
    },
    ShowRefundType: function(e) {
        var t = this;
        wx.showActionSheet({
            itemList: t.data.RefundTextList,
            success: function(e) {
                if (!e.cancel) {
                    var a = t.data.RefundTextList[e.tapIndex], n = t.GetRefundTypeId(a);
                    t.setData({
                        ShowRefundIndex: e.tapIndex,
                        RefundTypeText: a,
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
        var t = this, a = e.currentTarget.dataset.name;
        t.setData({
            RefundReasonText: a,
            ShowType: !0,
            ShowReason: !0,
            ShowAfterType: !0
        });
    },
    GetRefundTypeId: function(e) {
        return "退到预付款" == e ? 3 : "退到银行卡" == e ? 2 : "原路返回" == e ? 1 : 4;
    },
    GetAfterSaleTypeId: function(e) {
        return "退货退款" == e ? 3 : "仅退款" == e ? 2 : 1;
    },
    ChooseAfterType: function(e) {
        var t = e.currentTarget.dataset.id, a = this, n = a.ShowAfterTypeName[t];
        a.setData({
            AfterSaleType: t,
            AfterSaleTypeText: n,
            ShowType: !0,
            ShowReason: !0,
            ShowAfterType: !0
        });
    },
    MuseNum: function(e) {
        var a = this, n = a.data.ApplyReturnNum;
        if (n <= 1) t.showErrorModal("最少退1件商品"); else {
            n -= 1;
            var o = parseFloat(n * a.data.OneReundAmount).toFixed(2);
            a.setData({
                ApplyReturnNum: n,
                TotalMoney: o
            });
        }
    },
    AddNum: function(e) {
        var a = this, n = parseInt(a.data.ApplyReturnNum), o = parseInt(a.data.ReturnNum);
        if (n >= o) t.showErrorModal("最多退" + o + "件商品"); else {
            n += 1;
            var r = parseFloat(n * a.data.OneReundAmount).toFixed(2);
            a.setData({
                ApplyReturnNum: n,
                TotalMoney: r
            });
        }
    },
    formSubmit: function(e) {
        var a = this, n = parseInt(a.data.ShowReasonIndex), o = a.data.AfterSaleTypeList[a.data.AfterSaleTypeId], r = a.GetAfterSaleTypeId(o), d = e.detail.formId, s = a.ToTrim(e.detail.value.txtBankName), u = a.ToTrim(e.detail.value.txtBankAccountName), i = a.ToTrim(e.detail.value.txtBankAccountNo), l = parseFloat(e.detail.value.txtmoney.replace("￥", "")), f = 2 == r ? 0 : parseInt(a.data.ApplyReturnNum);
        if (3 == r && f <= 0 || f > a.data.ReturnNum) t.showErrorModal("请输入正确的退货数量"); else if (l > a.data.OneReundAmount * parseInt(a.data.ApplyReturnNum)) t.showErrorModal("请输入正确的退款金额,金额必须小于等于" + a.data.OneReundAmount * f + "元"); else {
            var c = e.detail.value.txtarea, p = a.data.RefundType;
            if (2 == p && (s.length <= 0 || u.length <= 0 || i.length <= 0)) t.showErrorModal("银行卡信息不允许为空！"); else if (p <= 0) t.showErrorModal("请选择要退款的方式"); else if (n < 0) t.showErrorModal("请选择要退款的原因"); else if (r < 0) t.showErrorModal("请选择售后类型"); else if (a.data.OrderId.length <= 0) t.showErrorModal("请选择要退款的订单"); else {
                a.setData({
                    formId: d,
                    AfterSaleTypeId: r,
                    Remark: c,
                    BankName: s,
                    BankAccountName: u,
                    BankAccountNo: i,
                    ApplyReturnNum: f,
                    ReturnMoney: l,
                    UploadGredentials: []
                });
                var m = [];
                a.data.UserCredentials.find(function(e, t) {
                    "../../images/return-img_03.jpg" != e && m.push(e);
                }), a.UploadBatchImages(a, m);
            }
        }
    },
    UploadBatchImages: function(e, a) {
        var n = a.shift();
        void 0 != n ? t.getOpenId(function(o) {
            wx.uploadFile({
                url: t.getUrl("OrderRefund/PostUploadAppletImage"),
                filePath: n,
                name: "file",
                formData: {
                    openId: o
                },
                success: function(a) {
                    var n = JSON.parse(a.data);
                    if ("OK" == n.Status) {
                        var o = e.data.UploadGredentials;
                        o.push(n.Data[0].ImageUrl), e.setData({
                            UploadGredentials: o
                        });
                    } else "NOUser" == n.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : t.showErrorModal(n.ErrorResponse.ErrorMsg, function(e) {
                        e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    });
                },
                complete: function() {
                    a.length > 0 ? e.UploadBatchImages(e, a) : e.AddReturnInfo();
                }
            });
        }) : e.AddReturnInfo();
    },
    AddReturnInfo: function() {
        var a = this;
        t.getOpenId(function(n) {
            var o = {
                openId: n,
                skuId: a.data.SkuId,
                orderId: a.data.OrderId,
                Quantity: a.data.ApplyReturnNum,
                RefundAmount: a.data.ReturnMoney,
                afterSaleType: a.data.AfterSaleTypeId,
                RefundType: a.data.RefundType,
                RefundReason: a.data.ShowReasonList[a.data.ShowReasonIndex],
                Remark: a.data.Remark,
                BankName: a.data.BankName,
                BankAccountName: a.data.BankAccountName,
                BankAccountNo: a.data.BankAccountNo,
                UserCredentials: a.data.UploadGredentials.join(","),
                formId: a.data.formId,
                refundId: a.data.returnId
            };
            e.httpPost(t.getUrl("OrderRefund/PostApplyReturn"), o, function(e) {
                "OK" == e.Status ? wx.showModal({
                    title: "提示",
                    confirmColor: "#ff5722",
                    content: e.Message,
                    showCancel: !1,
                    success: function(e) {
                        wx.redirectTo({
                            url: "../applylist/applylist"
                        });
                    }
                }) : "NOUser" == e.Message ? wx.navigateTo({
                    url: "../login/login"
                }) : t.showErrorModal(e.Message, function(e) {
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