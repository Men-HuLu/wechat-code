require("../../utils/util.js");

var e = getApp();

Page({
    data: {
        RefundInfo: null,
        ProgressStatue: [],
        Credentials: [],
        isExpend: !0
    },
    onLoad: function(t) {
        var a = this, n = t.id;
        e.getOpenId(function(t) {
            wx.request({
                url: e.getUrl(e.globalData.getReturnDetail),
                data: {
                    openId: t,
                    returnId: n
                },
                success: function(e) {
                    if ("OK" == e.data.Status) {
                        var t = e.data.Data;
                        a.setData({
                            RefundInfo: t,
                            Credentials: t.UserCredentials
                        }), wx.setNavigationBarTitle({
                            title: t.IsOnlyRefund ? "退款详情" : "退货详情"
                        }), a.ShowProgress(t);
                    } else "NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: e.data.ErrorResponse.ErrorMsg,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                }
            });
        });
    },
    prevImage: function(e) {
        var t = this, a = (e.target.dataset.index, e.target.dataset.src);
        wx.previewImage({
            current: a,
            urls: t.data.Credentials
        });
    },
    ExpendProgress: function() {
        var e = !this.data.isExpend;
        this.setData({
            isExpend: e
        });
    },
    ShowProgress: function(e) {
        var t = this, a = parseInt(e.Status), n = !1;
        e.IsOnlyRefund || 6 != a && 7 != a || "" != e.UserSendGoodsTime || (n = !0);
        var s = [ {
            statue: 0,
            statuename: e.IsOnlyRefund ? "申请退款中" : "申请退货中",
            time: e.ApplyForTime,
            ishidden: !1,
            isactive: !0,
            activestatusname: e.IsOnlyRefund ? "申请退款中" : "申请退货中"
        }, {
            statue: 1,
            statuename: "待商家审核",
            time: e.DealTime,
            ishidden: !1,
            isactive: a > 1,
            activestatusname: 2 == a || 3 == a || 5 == a || 6 == a || 7 == a || "" != e.UserSendGoodsTime ? "商家通过审核" : 4 == a ? "商家拒绝" : ""
        }, {
            statue: 2,
            statuename: "待买家寄货",
            time: e.UserSendGoodsTime,
            ishidden: !!(n || e.IsOnlyRefund || "" == e.UserSendGoodsTime && 4 == a),
            isactive: a > 2,
            activestatusname: "买家已寄货"
        }, {
            statue: 3,
            statuename: "待商家收货",
            time: e.ConfirmGoodsTime,
            ishidden: !!(n || e.IsOnlyRefund || "" == e.UserSendGoodsTime && 4 == a),
            isactive: a > 3,
            activestatusname: 5 == a || "" != e.UserSendGoodsTime && (6 == a || 7 == a) ? "商家通过审核" : 4 == a ? "商家拒绝" : ""
        }, {
            statue: 6,
            statuename: "待平台确认",
            time: e.FinishTime,
            ishidden: 4 == a,
            isactive: a > 6,
            activestatusname: e.IsOnlyRefund ? "退款完成" : "退货完成"
        } ];
        s.forEach(function(e, t, a) {}), t.setData({
            ProgressStatue: s
        });
    },
    SendGood: function(e) {
        var t = e.currentTarget.dataset.id, a = e.currentTarget.dataset.skuid;
        wx.navigateTo({
            url: "../applysendgood/applysendgood?id=" + t + "&&skuId=" + a
        });
    },
    goToProductDetail: function(e) {
        var t = e.currentTarget.dataset.productid;
        wx.navigateTo({
            url: "../productdetail/productdetail?id=" + t
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