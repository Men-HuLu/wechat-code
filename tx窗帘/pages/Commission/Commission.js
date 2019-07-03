var a = require("../../utils/config.js"), e = getApp();

Page({
    data: {
        pageIndex: 0,
        CommList: [],
        CommType: 1,
        hasCommission: 0,
        waitCommission: 0,
        noCommission: 0,
        balance: "0.00",
        refreshSuccess: !0,
        RequestUrl: e.getRequestUrl
    },
    onLoad: function(t) {
        var i = this;
        e.getOpenId(function(t) {
            var o = {
                openId: t,
                pageIndex: i.data.pageIndex + 1,
                pageSize: 10,
                commissionType: i.data.CommType
            };
            wx.showNavigationBarLoading(), a.httpGet(e.getUrl("GetCommissionOrder"), o, i.getCommissionData);
        });
    },
    getCommissionData: function(a) {
        var e = this;
        if ("NOUser" == a.Message) wx.navigateTo({
            url: "../login/login"
        }); else if ("OK" == a.Status) {
            wx.hideNavigationBarLoading();
            var t = e.data.CommList;
            if (a.Data.order.length > 0) for (var i in a.Data.order) t.push(a.Data.order[i]);
            e.setData({
                hasCommission: a.Data.hasCommission,
                waitCommission: a.Data.waitCommission,
                noCommission: a.Data.noCommission,
                pageIndex: e.data.pageIndex + 1,
                CommList: t,
                balance: a.Data.balance,
                refreshSuccess: !0
            });
        } else wx.hideNavigationBarLoading();
    },
    onReachBottom: function() {
        var t = this;
        if (1 == t.data.refreshSuccess) {
            var i = t.data.pageIndex + 1;
            e.getOpenId(function(o) {
                var s = {
                    openId: o,
                    pageIndex: i,
                    pageSize: 10,
                    commissionType: t.data.CommType
                };
                wx.showNavigationBarLoading(), t.setData({
                    refreshSuccess: !1
                }), a.httpGet(e.getUrl("GetCommissionOrder"), s, t.getCommissionData);
            });
        }
    },
    bingTabTap: function(t) {
        var i = this, o = t.currentTarget.dataset.type;
        i.setData({
            pageIndex: 0,
            CommType: o,
            CommList: []
        }), e.getOpenId(function(t) {
            var o = {
                openId: t,
                pageIndex: i.data.pageIndex + 1,
                pageSize: 10,
                commissionType: i.data.CommType
            };
            wx.showNavigationBarLoading(), a.httpGet(e.getUrl("GetCommissionOrder"), o, i.getCommissionData);
        });
    }
});