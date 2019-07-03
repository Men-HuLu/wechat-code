var t = getApp();

Page({
    data: {
        userInfo: {}
    },
    onLoad: function(t) {},
    onShow: function() {
        var t = this;
        t.loadData(t);
    },
    onPullDownRefresh: function() {
        var n = this;
        t.globalData.userInfo = null, n.loadData(n);
    },
    loadData: function(n) {
        var n = this;
        t.globalData.isReloadUser = "1", t.getUserInfo(function(t) {
            n.setData({
                userInfo: t
            });
        });
    },
    bindWaitPayTap: function(t) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=1"
        });
    },
    bindWaitSendTap: function(t) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=2"
        });
    },
    bindWaitFinishTap: function(t) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=3"
        });
    },
    bindReviewTap: function(t) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=4"
        });
    },
    bindAllOrderTap: function(t) {
        wx.navigateTo({
            url: "../orderlist/orderlist?status=0"
        });
    },
    bindApply: function(t) {
        wx.navigateTo({
            url: "../applylist/applylist"
        });
    },
    bindMyAddressTap: function(t) {
        wx.navigateTo({
            url: "../address/address"
        });
    },
    bindMyCouponsTap: function(t) {
        wx.navigateTo({
            url: "../coupon/coupon"
        });
    },
    ExitLoginout: function() {
        t.getOpenId(function(n) {
            wx.request({
                url: t.getUrl(t.globalData.prcesslogout),
                data: {
                    openId: n
                },
                success: function(t) {
                    wx.navigateTo({
                        url: "../login/login"
                    });
                }
            });
        });
    },
    bindTelPhone: function(t) {
        var n = t.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: n
        });
    },
    bindScan: function() {
        var n = this;
        wx.scanCode({
            success: function(a) {
                if (-1 == a.result.indexOf(t.getRequestUrl)) return t.showErrorModal("不是我们家的码"), 
                !1;
                var e = n.getRequerstParam(a.result);
                void 0 != e.shareId && e.shareId > 0 && t.getOpenId(function(n) {
                    wx.request({
                        url: t.getUrl("BindParentUser"),
                        data: {
                            openId: n,
                            shareId: e.shareId
                        },
                        success: function(t) {}
                    });
                }), a.result.indexOf("/index/product") > -1 && wx.navigateTo({
                    url: "../productdetail/productdetail?id=" + e.id
                });
            }
        });
    },
    getRequerstParam: function(t) {
        var n = new Object();
        if (-1 != t.indexOf("?")) for (var a = t.split("?")[1].split("&"), e = 0; e < a.length; e++) n[a[e].split("=")[0]] = unescape(a[e].split("=")[1]);
        return n;
    },
    bindMyLikeTap: function() {
        wx.navigateTo({
            url: "../attention/attention"
        });
    },
    bindMyCommission: function() {
        wx.navigateTo({
            url: "../Commission/Commission"
        });
    }
});