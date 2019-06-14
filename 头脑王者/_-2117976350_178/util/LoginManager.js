function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var o = 0; o < n.length; o++) {
            var r = n[o];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(n, o, r) {
        return o && e(n.prototype, o), r && e(n, r), n;
    };
}(), o = require("./../net/network.js"), r = require("./../net/wsconnect.js"), i = require("./../net/fightNet.js"), a = require("./../net/roleNet.js"), t = require("./../const/consts.js"), s = require("./../const/modeConsts.js"), c = require("./../util/util.js"), l = require("./../libs/rsa.js"), u = require("./../data/MainData.js"), d = require("./../util/daliyTask/DailyTaskData.js"), g = void 0, f = function() {
    function f() {
        e(this, f);
    }
    return n(f, [ {
        key: "init",
        value: function(e) {
            g = e;
        }
    }, {
        key: "login",
        value: function(e) {
            var n = this;
            g.uid ? c.invokeCallback(e) : this.underWay || (c.showLoading("登录中..."), this.underWay = !0, 
            this.next = e, this.storageData = this.getStorage(), this.queryServer(function(o, i) {
                n.checkSession(function(o, a) {
                    o || !n.storageData ? n.wxLogin(function(o, a, t, s) {
                        n.entry(i, a, t, s, function(o, i) {
                            n.postLogin(i, function(o, i) {
                                r.connectServer(), n.updateMocha(function() {
                                    g.refreshUserInfo(function(o) {
                                        o ? n.loginErr(o) : n.checkVersion() ? n.loginOK() : (n.underWay = !1, n.login(t, s, e));
                                    });
                                });
                            });
                        });
                    }) : n.postLogin(n.storageData, function(o, i) {
                        r.connectServer(), n.updateMocha(function() {
                            g.refreshUserInfo(function(o) {
                                o ? n.loginErr(o) : n.checkVersion() ? n.loginOK() : (n.underWay = !1, n.login(encryptedData, iv, e));
                            });
                        });
                    });
                });
            }));
        }
    }, {
        key: "checkSession",
        value: function(e) {
            wx.checkSession({
                success: function() {
                    console.info("登录未过期", s.RunMode, s.Version), c.invokeCallback(e);
                },
                fail: function() {
                    console.warn("登录已过期", s.RunMode, s.Version), e({
                        errCode: t.ExitCode.LoginErr1
                    });
                }
            });
        }
    }, {
        key: "getStorage",
        value: function() {
            var e = c.getStorageSync(t.StorageKey.BaseRole);
            if (e && e.uid && e.ver == s.Version) return e;
        }
    }, {
        key: "wxLogin",
        value: function(e) {
            var n = this;
            wx.login({
                success: function(o) {
                    if (o && o.code) wx.getUserInfo({
                        withCredentials: !0,
                        lang: "zh_CN",
                        success: function(n) {
                            c.invokeCallback(e, null, o.code, n.encryptedData, n.iv);
                        },
                        fail: function(e) {
                            n.loginErr({
                                errCode: "",
                                errMsg: e.errMsg
                            }), c.reportAnalytics_debug_log("getUserInfo err");
                        }
                    }); else {
                        console.warn("获取用户登录凭证失败。-" + o.errMsg);
                        var r = {
                            errCode: t.ExitCode.LoginErr4
                        };
                        console.log("wx.login:", o), n.loginErr(r);
                    }
                },
                fail: function(e) {
                    console.warn("获取用户登录态失败! -" + e.errMsg);
                    var o = {
                        errCode: t.ExitCode.LoginErr5
                    };
                    n.loginErr(o);
                }
            });
        }
    }, {
        key: "queryServer",
        value: function(e) {
            var n = this, r = this, i = {
                version: s.Version
            };
            this.storageData && this.storageData.openId && (i.openId = this.storageData.openId), 
            i.appType = s.CurAppKey, o.post(t.MessageHead.Query, {
                params: i,
                success: function(n) {
                    o.updateURL(n), c.invokeCallback(e, null, n);
                },
                fail: function(e) {
                    console.warn("查询服务器地址失败，使用默认。-" + e.errMsg), r.loginErr(e), n.storageData && o.updateURL(n.storageData);
                }
            });
        }
    }, {
        key: "entry",
        value: function(e, n, r, i, a) {
            var l = this, u = {}, d = g.mainData.loginArgs;
            u.code = n, u.scene = d.scene, d && d.from && (u.from = d.from), d && d.fromNum && (u.fromNum = d.fromNum), 
            u.clinentVersion = s.ClientVer, g.systemInfo && (u.SDKVersion = g.systemInfo.SDKVersion, 
            u.wxVersion = g.systemInfo.version, u.systemVersion = g.systemInfo.system, u.model = g.systemInfo.model), 
            d && d.friendCode && c.getStorageSync("friendCode") != d.friendCode && (u.friendCode = d.friendCode), 
            d && d.mp && (u.mp = d.mp);
            var f = g.getFriendFrom(d);
            f && (u.friendFrom = f), this.storageData && this.storageData.openId && (u.openId = this.storageData.openId), 
            r && (u.encryptedData = r), i && (u.iv = i), u.appType = s.CurAppKey, o.get(t.MessageHead.Entry, {
                params: u,
                success: function(n) {
                    n && n.openId ? (n.http = e.http, n.ws = e.ws, n.ver = s.Version, c.setStorageSync(t.StorageKey.BaseRole, n), 
                    c.invokeCallback(a, null, n)) : (console.warn("获取数据格式错误。--", JSON.stringify(n)), 
                    l.loginErr({
                        errCode: t.ExitCode.LoginErr6
                    }));
                },
                fail: function(e) {
                    console.warn("尝试登录失败。-" + e.errMsg), l.loginErr(e);
                }
            });
        }
    }, {
        key: "postLogin",
        value: function(e, n) {
            var i = {
                scene: g.mainData.loginArgs.scene,
                openId: e.openId,
                playerId: e.uid,
                clientVer: s.ClientVer
            };
            g.mainData.loginArgs.friendCode && c.getStorageSync("friendCode") != g.mainData.loginArgs.friendCode && (i.friendCode = g.mainData.loginArgs.friendCode);
            var a = this;
            i.appType = s.CurAppKey, o.post(t.MessageHead.Login, {
                params: i,
                success: function(o) {
                    e.playerId = o.uid, o.openId = e.openId, o.sign = e.sign, o.unionId = e.unionId, 
                    g.mainData.role = o, g.openId = e.openId, g.token = o.token, g.uid = o.uid, g.playerId = o.uid, 
                    d.dailyTasks = o.dailyTasks || {}, o.activities && o.activities.length > 0 && (g.mainData.role.bannerInfo = {
                        base: o.activities[0]
                    }), c.setServerTime(o.sysTime), g.initShareTimeWhenLogin(), r.updateURL(o), i.friendCode && c.setStorageSync("friendCode", i.friendCode), 
                    u.setInitData(g.mainData), c.invokeCallback(n, null);
                },
                fail: function(e) {
                    console.warn("玩家登录失败。-" + e.errMsg), 20003 == e.errCode && (wx.clearStorageSync(), 
                    console.warn("清除用户缓存")), a.loginErr(e);
                }
            });
        }
    }, {
        key: "loginOK",
        value: function() {
            this.underWay = !1, c.hideLoading(), c.invokeCallback(this.next), this.next = void 0;
        }
    }, {
        key: "loginErr",
        value: function(e) {
            c.hideLoading(), this.underWay = !1, c.invokeCallback(this.next, e), this.next = void 0;
        }
    }, {
        key: "clearLoginData",
        value: function() {
            c.removeAllCache(), c.clearStorageSync();
        }
    }, {
        key: "checkVersion",
        value: function() {
            try {
                var e = c.getStorageSync(t.StorageKey.ServerVer);
                if (e) {
                    if (e != g.mainData.role.version) return console.warn("版本不一致, ", e, g.mainData.role.version), 
                    this.clearLoginData(), !1;
                } else c.setStorageSync(t.StorageKey.ServerVer, g.mainData.role.version);
            } catch (e) {}
            return !0;
        }
    }, {
        key: "checkResult",
        value: function(e, n) {
            g.mainData.role.roomID ? g.mainData.role.roomID > 0 && i.fightResult(g.mainData.role.roomID, 1, !1, -1, function(e, o) {
                e && e.errCode == t.ExitCode.RequestErr || (g.mainData.role.roomID = 0), e ? c.invokeCallback(n) : (g.updateFightData(o), 
                c.invokeCallback(n), 1 == o.type && g.showPVEModal(o));
            }) : c.invokeCallback(n);
        }
    }, {
        key: "updateMocha",
        value: function(e) {
            var n = this, o = new l.JSEncrypt();
            o.setPublicKey(t.publicKey);
            var r = o.encrypt(g.aeskey);
            a.updateMocha(r, function(o, r) {
                o ? n.loginErr(o) : c.invokeCallback(e);
            });
        }
    } ]), f;
}();

module.exports = new f();