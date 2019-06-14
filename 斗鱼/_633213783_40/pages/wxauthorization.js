function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var n = e(require("../config/index")), t = e(require("../common/httpClient")), o = e(require("../common/tokenstorage")), a = getApp();

Page({
    data: {
        isAjaxing: !1
    },
    onLoad: function() {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onPageScroll: function() {},
    onTabItemTap: function() {},
    bindGetUserInfo: function(e) {
        var n = this;
        if (e) {
            var t = e.detail;
            t && "getUserInfo:ok" === t.errMsg && this.getWxUserToken().then(function(e) {
                return n.getNewToken(e);
            }).then(function(e) {
                n.data.isAjaxing || (n.setData({
                    isAjaxing: !0
                }), n.wxLoginDY(e));
            }).catch(function(e) {
                var n = e && e.data || "网络异常";
                wx.showToast({
                    title: n,
                    icon: "none",
                    duration: 2e3
                });
            });
        }
    },
    wxLoginDY: function(e) {
        var i = this, r = e.token, c = e.iv, u = e.encryptedData;
        t.default.request({
            url: n.default.HOST + "/wxapi/auth/unionLogin",
            method: "POST",
            data: {
                iv: c,
                encryptedData: u,
                token: r,
                did: a.globalData.did
            }
        }).then(function(e) {
            if (i.setData({
                isAjaxing: !1
            }), e) {
                var n = parseInt(e.code, 10);
                if (0 === n) {
                    var t = e.data, r = t && t.short_token, c = t && t.long_token;
                    r && (0, o.default)(r, c, function() {
                        console.log("dfads"), i.gotoOriginPage();
                    });
                } else 10012 === n ? (a.globalData.userInfo.token = "", wx.showToast({
                    title: e.data || "网络异常，请重试",
                    icon: "none",
                    duration: 2e3
                })) : wx.showToast({
                    title: e.data || "网络异常",
                    icon: "none",
                    duration: 2e3
                });
            }
        }).catch(function() {
            i.setData({
                isAjaxing: !1
            }), wx.showToast({
                title: "网络异常",
                icon: "none",
                duration: 2e3
            });
        });
    },
    getNewToken: function(e) {
        var o = e.wxCode, a = e.iv, i = e.encryptedData;
        return new Promise(function(e, r) {
            t.default.request({
                url: n.default.API.LOGIN,
                method: "POST",
                data: {
                    code: o
                }
            }).then(function(n) {
                if (n) if (0 == +n.error) {
                    var t = {
                        token: n.data.token,
                        iv: a,
                        encryptedData: i
                    };
                    e(t);
                } else r(n);
            }).catch(function() {
                r();
            });
        });
    },
    getWxUserToken: function() {
        return new Promise(function(e, n) {
            wx.login({
                success: function(t) {
                    var o = t.code;
                    wx.getSetting({
                        success: function(n) {
                            n.authSetting["scope.userInfo"] && wx.getUserInfo({
                                withCredentials: !0,
                                success: function(n) {
                                    var t = n.iv, a = n.encryptedData;
                                    e({
                                        wxCode: o,
                                        iv: t,
                                        encryptedData: a
                                    });
                                }
                            });
                        },
                        fail: function() {
                            n();
                        }
                    });
                },
                fail: function() {
                    n();
                }
            });
        });
    },
    gotoOriginPage: function() {
        var e = a.getUrlParam("type"), n = a.getUrlParam("param");
        switch (e) {
          case "mycenter":
            wx.reLaunch({
                url: "mycenter"
            });
            break;

          case "game-recharge":
            wx.redirectTo({
                url: e
            });
            break;

          case "room":
            wx.redirectTo({
                url: "room?roomId=" + n
            });
            break;

          case "treasureBox":
            wx.redirectTo({
                url: "treasureBox"
            });
        }
    }
});