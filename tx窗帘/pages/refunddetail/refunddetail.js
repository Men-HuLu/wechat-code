require("../../utils/util.js");

var t = getApp();

Page({
    data: {
        RefundInfo: null,
        Credentials: [],
        ProgressStatue: [],
        isExpend: !0
    },
    ExpendProgress: function() {
        var t = !this.data.isExpend;
        this.setData({
            isExpend: t
        });
    },
    onLoad: function(e) {
        var a = this, n = e.id;
        t.getOpenId(function(e) {
            wx.request({
                url: t.getUrl(t.globalData.getRefundDetail),
                data: {
                    openId: e,
                    RefundId: n
                },
                success: function(t) {
                    if ("OK" == t.data.Status) {
                        var e = t.data.Data, n = [];
                        "".length > 0 && (n = "".split(",")), a.setData({
                            RefundInfo: e,
                            Credentials: n
                        }), a.ShowProgress(e);
                    } else "NOUser" == t.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: t.data.ErrorResponse.ErrorMsg,
                        showCancel: !1,
                        success: function(t) {
                            t.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {}
            });
        });
    },
    ShowProgress: function(t) {
        var e = this, a = parseInt(t.Status), n = [ {
            statue: 0,
            statuename: "申请退款中",
            time: t.ApplyForTime,
            ishidden: !1,
            isactive: !0,
            activestatusname: "申请退款中"
        }, {
            statue: 1,
            statuename: "待商家审核",
            time: t.DealTime,
            ishidden: !1,
            isactive: a > 1,
            activestatusname: 2 == a || 3 == a || 5 == a || 6 == a || 7 == a ? "商家通过审核" : 4 == a ? "商家拒绝" : ""
        }, {
            statue: 6,
            statuename: "待平台确认",
            time: t.FinishTime,
            ishidden: 4 == a,
            isactive: a > 6,
            activestatusname: "退款完成"
        } ];
        e.setData({
            ProgressStatue: n
        });
    },
    goToProductDetail: function(t) {
        var e = t.currentTarget.dataset.productid;
        wx.navigateTo({
            url: "../productdetail/productdetail?id=" + e
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