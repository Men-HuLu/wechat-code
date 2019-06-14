function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    }
    return Array.from(e);
}

var n = e(require("./common/httpClient")), o = e(require("./config/index")), a = require("./lib/events/events"), i = e(require("./common/util")), r = e(require("./common/storage"));

require("./lib/talkingData/tdweapp.js"), App({
    onLaunch: function(e) {
        this.initApp(e);
    },
    onShow: function(e) {
        console.log("app onshow scene: " + e.scene), e.referrerInfo && (this.globalData.referrerInfo = e.referrerInfo), 
        this.globalData.scene = e.scene, this.getToken(function() {}, !0), r.default.get("gameRecharged").then(function(e) {
            console.log(e);
        }, function(e) {
            console.log(e);
        });
    },
    initApp: function(e) {
        this.events = new a.EventEmitter(), this.renewalLocalToken(), this.getStaticConfig(), 
        this.networkListern(), e.scene && (this.globalData.scene = e.scene), this.isIphoneX();
    },
    isIphoneX: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.globalData.systemInfo = t, e.globalData.isIphoneX = -1 !== (t.model || "").indexOf("iPhone X"), 
                e.globalData.systemInfo.windowHeight / e.globalData.systemInfo.windowWidth > 1.7 && "ios" === e.globalData.systemInfo.platform && (e.globalData.isIphoneX = !0);
            }
        });
    },
    onHide: function() {},
    onError: function() {},
    onPageNotFound: function() {},
    globalData: {
        userInfo: Object.create(null),
        systemInfo: null,
        isIphoneX: !1,
        did: "100000000000000000000000000015q1",
        $SYS: o.default.DEFAULT_SYS,
        isComplete: !1,
        scene: 0,
        isFromAppShare: !1
    },
    gotoLogin: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        wx.showActionSheet({
            itemList: [ "微信一键登录", "斗鱼帐号登录" ],
            success: function(n) {
                var o = n.tapIndex;
                0 === o ? "mycenter" === e ? wx.navigateTo({
                    url: "wxauthorization?type=" + e + "&param=" + t
                }) : wx.redirectTo({
                    url: "wxauthorization?type=" + e + "&param=" + t
                }) : 1 === o && ("mycenter" === e ? wx.navigateTo({
                    url: "weblogin?type=" + e + "&param=" + t
                }) : wx.redirectTo({
                    url: "weblogin?type=" + e + "&param=" + t
                }));
            },
            fail: function(e) {
                console.log(e.errMsg);
            }
        });
    },
    renewalLocalToken: function(e) {
        var t = this, n = wx.getStorageSync("dyUserInfo") || {}, a = n && n.tokenCreateTime || "";
        Date.now() - 1e3 * a < 5184e5 || wx.getSetting({
            success: function(e) {
                if (e.authSetting["scope.userInfo"]) {
                    var a = n && n.localToken || "", i = n && n.longToken || "";
                    a && t.getToken(function(e) {
                        httpClient.request({
                            url: o.default.HOST + "/wxapi/auth/extendToken",
                            method: "POST",
                            data: {
                                token: e.token,
                                long_token: i,
                                did: t.globalData.did
                            }
                        }).then(function(e) {
                            if (e) {
                                var n = parseInt(e.code, 10);
                                if (0 === n) {
                                    var o = e.data, a = o && o.short_token, i = o && o.long_token;
                                    a && createLocalToken(a, i);
                                } else 10012 === n && (t.globalData.userInfo.token = "");
                            }
                        }).catch(function() {
                            console.log("error");
                        });
                    });
                }
            },
            fail: function() {
                console.log("授权失败");
            }
        });
    },
    createLocalToken: function(e, t, n, o) {
        var a = e.uid;
        this.globalData.userInfo.uid = a;
        var i = e.biz_type, r = e.short_token, s = e.client_type, l = e.long_token_id, c = e.create_time, u = [ a, i, r, s, l ].join("_"), d = wx.getStorageSync("dyUserInfo") || {};
        wx.setStorageSync("dyUserInfo", Object.assign(d, {
            uid: a,
            biz_type: i,
            short_token: r,
            client_type: s,
            long_token_id: l,
            localToken: u,
            tokenCreateTime: c,
            longToken: t
        })), this.getUserNameFn(d, u, n, o);
    },
    getUserNameFn: function(e, t, a, i) {
        "center" !== a && n.default.request({
            url: o.default.HOST + "/api/usernc/info",
            method: "POST",
            data: {
                log_token: t,
                did: this.globalData.did
            }
        }).then(function(n) {
            if (n) {
                var o = parseInt(n.code, 10);
                if (0 === o) {
                    var r = n.data, s = r && r.username || "";
                    wx.setStorageSync("dyUserInfo", Object.assign(e, {
                        userName: s
                    })), i && "function" == typeof i && i(t);
                } else 10007 === o ? wx.redirectTo({
                    url: "wxauthorization?type=" + (a || "center")
                }) : wx.showToast({
                    title: n.data || "网络异常",
                    icon: "none",
                    duration: 2e3
                });
            }
        }).catch(function() {
            wx.showToast({
                title: "网络异常",
                icon: "none",
                duration: 2e3
            });
        });
    },
    checkBoundDYAccount: function(e, t, n) {
        var o = wx.getStorageSync("dyUserInfo") || {}, a = o && o.localToken || "";
        this.globalData.isComplete || (this.globalData.isComplete = !0, a ? (n(a), this.globalData.isComplete = !1) : (this.globalData.isComplete = !1, 
        this.gotoLogin(e, t)));
    },
    emit: function(e) {
        var n;
        (n = this.events).emit.apply(n, t(i.default.decodeFlashData(e)));
    },
    getCode: function(e) {
        wx.login({
            success: function(t) {
                e(t.code);
            }
        });
    },
    getToken: function(e, t) {
        var a = this;
        if (!this.globalData.userInfo.token || t) this.getCode(function(t) {
            n.default.request({
                url: o.default.API.LOGIN,
                method: "POST",
                data: {
                    code: t
                }
            }).then(function(t) {
                t && (0 === parseInt(t.error, 10) ? (a.globalData.userInfo.token = t.data.token, 
                a.globalData.userInfo.hashOid = t.data.hashOid, a.globalData.did = t.data.hashOid, 
                e && "function" == typeof e && e(t.data)) : wx.showToast({
                    title: t.msg || "网络繁忙",
                    icon: "none",
                    duration: 2e3
                }));
            }).catch(function() {
                wx.showToast({
                    title: "网络繁忙",
                    icon: "none",
                    duration: 2e3
                });
            });
        }); else {
            var i = {
                token: this.globalData.userInfo.token,
                hashOid: this.globalData.userInfo.hashOid || ""
            };
            e(i);
        }
    },
    getUrlParam: function(e) {
        var t = getCurrentPages(), n = t[t.length - 1], o = n && n.options, a = i.default.scanCodeParse(o);
        a && (o = a);
        var r = o[e];
        return r || null;
    },
    changeData: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, n = 1 * e;
        return n >= 1e4 && n < 1e8 ? (n / 1e4).toFixed(t) + "万" : n >= 1e8 ? (n / 1e8).toFixed(t) + "亿" : n;
    },
    getDid: function(e) {
        var t = this;
        n.default.request(e + "/lapi/did/api/get?client_id=85").then(function(e) {
            e && 0 === parseInt(e.error, 10) && (t.globalData.did = e.data && e.data.did || "");
        });
    },
    getStaticConfig: function() {
        var e = this;
        n.default.request(o.default.API.DYCONFIG).then(function(t) {
            if (t) if (0 === parseInt(t.code, 10)) {
                e.globalData.$SYS = t.data || {};
                var n = t.data && t.data.authUrl || "https://passport.douyu.com", o = n.length;
                "/" === n.charAt(o - 1) && (n = n.substring(0, o - 1), e.globalData.$SYS.authUrl = n);
            } else wx.showToast({
                title: t.data || "获取配置失败",
                icon: "none",
                duration: 2e3
            });
        });
    },
    networkListern: function() {
        var e = this, t = this;
        wx.getNetworkType({
            success: function(e) {
                t.globalData.networkType = e.networkType;
            }
        }), wx.onNetworkStatusChange(function(t) {
            t.isConnected ? e.emit([ "network_connected" ]) : wx.showToast({
                title: o.default.DES.NETWORK_BREAK,
                icon: "none",
                duration: 2500
            });
        });
    }
});