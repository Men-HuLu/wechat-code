var e = require("./../../util/util.js"), o = require("./../../const/consts.js"), r = require("./../../const/modeConsts.js"), n = require("./../../net/network.js"), s = getApp();

Page({
    data: {
        order: {},
        canIUserNav: !0,
        orderId: "",
        userId: "",
        orderStatus: !1,
        payFail: !0,
        qrHidden: !0,
        isSupport: s.onCheckSysAndVersion()
    },
    orderSuccess: function(o) {
        console.log(o), e.hideLoading(), o.totalFee = parseInt(o.totalFee / 100) + ".00";
        o.gameId;
        this.setData({
            order: o
        });
        var r = {
            orderId: this.data.orderId,
            openId: this.openId,
            alias: "tnwz_pay"
        };
        console.log("params", r), s.sdk.pay({
            params: r,
            success: this.paySuccess.bind(this),
            fail: this.payError.bind(this)
        });
    },
    orderError: function(o) {
        console.log("orderError(),err:", o), e.hideLoading(), this.setData({
            orderStatus: !0,
            orderId: "",
            payFail: !1
        });
    },
    paySuccess: function() {
        this.setData({
            payFail: !1
        }), e.hideLoading(), wx.showToast({
            icon: "success",
            title: "订单支付成功！",
            duration: 2e3
        });
    },
    payError: function(e) {
        console.log("支付失败", e);
        var o = "支付失败";
        switch (e.errCode) {
          case 1e3:
            o = "订单创建失败，请返回游戏重新下单";
            break;

          case 1002:
            o = "您已取消支付";
            break;

          case 1003:
            o = "等待超时，请重试";
        }
        wx.showToast({
            icon: "none",
            title: o,
            duration: 2e3
        }), this.setData({
            payFail: !0
        });
    },
    orderOnPay: function() {
        e.showLoading("订单处理中..."), console.log("orderOnPay() orderId:", this.data.orderId), 
        s.sdk.getOrderInfo({
            orderId: this.data.orderId,
            success: this.orderSuccess,
            fail: this.orderError
        });
    },
    moreGames: function(e) {
        wx.redirectTo({
            url: "/page/login/login",
            success: function() {},
            fail: function() {}
        });
    },
    onBackGame: function(e) {
        wx.navigateBackMiniProgram({
            success: function(e) {
                console.log("returnSuccess", e);
            },
            fail: function(e) {
                wx.showToast({
                    icon: "none",
                    title: "返回失败，点击右上角返回游戏"
                });
            }
        });
    },
    onLoad: function(o) {
        var n = this;
        s.sdk.init({
            gameId: "tnwz_pay",
            gameVersion: r.ClientVer,
            env: "Prod"
        }), console.log("option:", o);
        var t = s.sdk.util.queryToJson(o.scene);
        console.log("sceneQuery:", t), this.login(function(r) {
            r && r.openId ? (n.openId = r.openId, console.log("订单编号", o.order), n.setData({
                orderId: t.o
            }), n.orderOnPay()) : e.hideLoading();
        });
    },
    onShow: function() {
        console.log("onShow", this.data.orderId), this.data.orderId;
    },
    onHide: function() {
        this.data.payFail || this.setData({
            orderId: ""
        });
    },
    wxLogin: function(r) {
        var n = this;
        wx.login({
            success: function(s) {
                if (s && s.code) e.invokeCallback(r, null, s.code, "", ""); else {
                    console.warn("获取用户登录凭证失败。-" + s.errMsg);
                    var t = {
                        errCode: o.ExitCode.LoginErr4
                    };
                    n.loginErr(t);
                }
            },
            fail: function(e) {
                console.warn("获取用户登录态失败! -" + e.errMsg);
                var r = {
                    errCode: o.ExitCode.LoginErr5
                };
                n.loginErr(r);
            }
        });
    },
    entry: function(t, i, a, d, c) {
        var l = this, u = {}, g = s.mainData.loginArgs;
        u.code = i, u.scene = g.scene, g && g.from && (u.from = g.from), g && g.fromNum && (u.fromNum = g.fromNum), 
        u.clinentVersion = r.ClientVer, s.systemInfo && (u.SDKVersion = s.systemInfo.SDKVersion, 
        u.wxVersion = s.systemInfo.version, u.systemVersion = s.systemInfo.system, u.model = s.systemInfo.model), 
        g && g.friendCode && e.getStorageSync("friendCode") != g.friendCode && (u.friendCode = g.friendCode), 
        g && g.mp && (u.mp = g.mp);
        var f = s.getFriendFrom(g);
        f && (u.friendFrom = f), this.storageData && this.storageData.openId && (u.openId = this.storageData.openId), 
        a && (u.encryptedData = a), d && (u.iv = d), u.appType = r.CurAppKey, n.get(o.MessageHead.Entry, {
            params: u,
            success: function(n) {
                n && n.openId ? (n.http = t.http, n.ws = t.ws, n.ver = r.Version, e.setStorageSync(o.StorageKey.BaseRole, n), 
                e.invokeCallback(c, null, n)) : (console.warn("获取数据格式错误。--", JSON.stringify(n)), 
                l.loginErr({
                    errCode: o.ExitCode.LoginErr6
                }));
            },
            fail: function(e) {
                console.warn("尝试登录失败。-" + e.errMsg), l.loginErr(e);
            }
        });
    },
    queryServer: function(s) {
        var t = this, i = this, a = {
            version: r.Version
        };
        this.storageData && this.storageData.openId && (a.openId = this.storageData.openId), 
        a.appType = r.CurAppKey, n.post(o.MessageHead.Query, {
            params: a,
            success: function(o) {
                n.updateURL(o), e.invokeCallback(s, null, o);
            },
            fail: function(e) {
                console.warn("查询服务器地址失败，使用默认。-" + e.errMsg), i.loginErr(e), t.storageData && n.updateURL(t.storageData);
            }
        });
    },
    loginErr: function(o) {
        e.hideLoading(), this.underWay = !1, this.next = void 0, e.showToast("支付异常，重新下单"), 
        console.log("获取openid失败 err:", o);
    },
    login: function(o) {
        var r = this;
        this.next = o, this.underWay = !0, this.queryServer(function(n, s) {
            r.wxLogin(function(n, t, i, a) {
                r.entry(s, t, i, a, function(n, s) {
                    e.invokeCallback(o, s), r.next = void 0;
                });
            });
        });
    }
});