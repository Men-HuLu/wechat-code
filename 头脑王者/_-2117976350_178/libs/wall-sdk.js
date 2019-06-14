function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var t = 0; t < n.length; t++) {
            var o = n[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(n, t, o) {
        return t && e(n.prototype, t), o && e(n, o), n;
    };
}(), t = {};

t.Version = "0.1.8", t.NetUrl = {
    Test: "https://platform-test.hortorgames.com",
    Prod: "https://platform.hortorgames.com"
}, t.Requests = {
    GetTasks: "/wall/api/v1/tasks",
    GoTask: "/wall/api/v1/go_task",
    Log: "/wall/api/v1/log",
    GetAward: "/wall/api/v1/award"
}, t.Errors = {
    NetWorkErr: {
        errCode: 1e3,
        errMsg: "网络错误"
    },
    InvalidParamsErr: {
        errCode: 1001,
        errMsg: "无效参数"
    },
    NotUserInfoErr: {
        errCode: 1002,
        errMsg: "缺少用户信息"
    },
    RepeatTaskErr: {
        errCode: 1003,
        errMsg: "任务已经完成"
    },
    NotTaskErr: {
        errCode: 1003,
        errMsg: "任务不存在"
    },
    RepeatGetAwardErr: {
        errCode: 1004,
        errMsg: "已经领取奖励"
    },
    CantUseNavFun: {
        errCode: 0,
        errMsg: "无法使用方法跳转小程序"
    }
}, t.LogType = {
    Other: 1,
    OnLaunch: 2,
    OnLogined: 3,
    OnOpenTaskPanel: 4,
    OnGoTask: 5
};

var o = function() {
    function o() {
        e(this, o);
    }
    return n(o, null, [ {
        key: "assign",
        value: function(e, n) {
            if (Object.assign) return Object.assign(e, n);
            for (var t in n) e[t] = n[t];
            return e;
        }
    }, {
        key: "jsonToQuery",
        value: function(e, n) {
            if (!e) return "";
            var t = [];
            for (var o in e) {
                var r = n ? encodeURIComponent(e[o]) : e[o];
                t.push(o + "=" + r);
            }
            return t.join("&");
        }
    }, {
        key: "queryToJson",
        value: function(e) {
            var n = {};
            if (!e) return n;
            var t = decodeURIComponent(e).split("&");
            for (var o in t) {
                var r = t[o].split("=");
                n[r[0]] = r[1];
            }
            return n;
        }
    }, {
        key: "getSystemInfo",
        value: function() {
            return this.systemInfo ? this.systemInfo : (this.systemInfo = wx.getSystemInfoSync(), 
            this.systemInfo.wallSDKV = t.Version, this.systemInfo);
        }
    }, {
        key: "getSystemInfoStr",
        value: function() {
            if (this.systemInfoStr) return this.systemInfoStr;
            var e = [ "SDKVersion", "brand", "model", "system", "version", "wallSDKV" ], n = this.sliceJson(this.getSystemInfo(), e);
            return this.systemInfoStr = JSON.stringify(n), this.systemInfoStr;
        }
    }, {
        key: "sliceJson",
        value: function(e, n) {
            if (!e || !n) return {};
            "string" == typeof n && (n = n.replace(/\s+/g, "").split(","));
            var t = {};
            return n.map(function(n) {
                t[n] = e[n];
            }), t;
        }
    }, {
        key: "isFun",
        value: function(e) {
            return e && "function" == typeof e;
        }
    }, {
        key: "promisify",
        value: function(e) {
            return function() {
                var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return new Promise(function(t, o) {
                    n.success = function(e) {
                        t(e);
                    }, n.fail = function(e) {
                        o(e);
                    }, e(n);
                });
            };
        }
    }, {
        key: "setStorage",
        value: function(e, n, t) {
            var o = "_WSDK_" + e + (t ? "_" + t : "");
            if (o && void 0 !== n) try {
                wx.setStorageSync(o, n.toString());
            } catch (e) {
                console.warn("[WSDK] setStorage err", e);
            }
        }
    }, {
        key: "getStorage",
        value: function(e, n) {
            var t = "_CSDK_" + e + (n ? "_" + n : ""), o = "";
            try {
                o = wx.getStorageSync(t);
            } catch (e) {
                console.warn("[CSDK] getStorage err", e);
            }
            return o;
        }
    }, {
        key: "clearStorage",
        value: function(e) {
            wx.removeStorageSync(t.StorageKeys[e]);
        }
    }, {
        key: "isSystem",
        value: function(e) {
            e = e.toLowerCase();
            var n = this.is || {};
            if (void 0 !== n[e]) return n[e];
            var t = this.getSystemInfo().system.toLowerCase();
            return n[e] = t.indexOf(e) > -1, this.is = n, n[e];
        }
    }, {
        key: "isIOS",
        value: function() {
            return this.isSystem("ios");
        }
    }, {
        key: "isAndroid",
        value: function() {
            return this.isSystem("android");
        }
    }, {
        key: "showLoading",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "loading";
            wx.showLoading({
                title: e
            });
        }
    }, {
        key: "hideLoading",
        value: function() {
            wx.hideLoading({});
        }
    } ]), o;
}(), r = function() {
    function r(n) {
        e(this, r), this.HOST = t.NetUrl[n.env];
    }
    return n(r, [ {
        key: "request",
        value: function(e, n, r, i) {
            if (!e || !n) return !1;
            var s = r || {}, a = s.success, c = s.fail, u = s.complete, l = s.params;
            l.sysInfo = o.getSystemInfoStr();
            var f = {
                "content-type": i ? "application/json" : "application/x-www-form-urlencoded"
            }, d = function(e) {
                var n = {
                    errMsg: e.errMsg || e || "",
                    errCode: e.errCode || t.Errors.NetWorkErr.errCode
                };
                o.isFun(c) && c(n);
            };
            return wx.request({
                url: n,
                data: l,
                method: e,
                header: f,
                success: function(e) {
                    var n = e.data;
                    return 200 != e.statusCode ? d(n) : n.meta && 0 != n.meta.errCode ? d(n.meta) : void (o.isFun(a) && a(n.data));
                },
                complete: function(e) {
                    o.isFun(u) && u(e);
                },
                fail: d
            });
        }
    }, {
        key: "get",
        value: function(e, n) {
            return this.request("GET", e, n);
        }
    }, {
        key: "post",
        value: function(e, n) {
            return this.request("POST", e, n);
        }
    }, {
        key: "getJSON",
        value: function(e, n) {
            return this.request("GET", e, n, !0);
        }
    }, {
        key: "postJSON",
        value: function(e, n) {
            return this.request("POST", e, n, !0);
        }
    } ]), r;
}(), i = function() {
    function r(n, t) {
        e(this, r), this.isMiniGame = n, this.canvasId = t || "horwall_canvas";
    }
    return n(r, [ {
        key: "downloadFile",
        value: function(e, n, t) {
            return wx.downloadFile ? wx.downloadFile({
                url: e,
                success: n,
                fail: t
            }) : console.log("[SDK] download unsupport");
        }
    }, {
        key: "createImage",
        value: function(e, n, t) {
            var o = wx.createImage();
            return o.src = e, o.onload = n, o.onerror = t, o;
        }
    }, {
        key: "createQRCode",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1], t = e.codeUrl, r = e.backUrl;
            if (!t || !r || !o.isFun(n)) return console.log("[SDK] QRCode param err", e);
            this.isMiniGame ? this._createQRCodeMiniGame(e, n) : this._createQRCodeMiniProgram(e, n);
        }
    }, {
        key: "_createQRCodeMiniGame",
        value: function() {
            var e = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
            o.showLoading("请稍等...");
            var r = {
                code: n.codeUrl,
                back: n.backUrl
            };
            this._createImages(r, 2, function(n) {
                try {
                    e._drawQRCodeMiniGame(n, t);
                } catch (e) {
                    o.hideLoading(), t(e);
                }
            }, function(e) {
                o.hideLoading(), t(e);
            });
        }
    }, {
        key: "_createQRCodeMiniProgram",
        value: function() {
            var e = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
            o.showLoading("请稍等...");
            var r = {
                code: n.codeUrl,
                back: n.backUrl
            };
            this._downloadFiles(r, function(n) {
                try {
                    e._drawQRCodeMiniProgram(n, t);
                } catch (e) {
                    o.hideLoading(), t(e);
                }
            }, function(e) {
                o.hideLoading(), t(e);
            });
        }
    }, {
        key: "_downloadFiles",
        value: function(e, n, o) {
            var r = function() {
                var e = t.Errors.NetWorkErr;
                e.errMsg = "图片下载失败", o(e);
            }, i = function() {
                e.codeFile && e.backFile && n(e);
            };
            this.downloadFile(e.code, function(n) {
                console.log("[SDK] download code", e.code), e.codeFile = n.tempFilePath, i();
            }, r), this.downloadFile(e.back, function(n) {
                console.log("[SDK] download code", e.back), e.backFile = n.tempFilePath, i();
            }, r);
        }
    }, {
        key: "_createImages",
        value: function(e, n, o, r) {
            var i = this, s = {}, a = 0;
            for (var c in e) !function(c) {
                s[c] = i.createImage(e[c], function(t) {
                    console.log("[SDK] createImage", e[c]), ++a == n && setTimeout(function() {
                        o(s);
                    }, 100);
                }, function() {
                    var e = t.Errors.NetWorkErr;
                    e.errMsg = "图片" + c + "加载失败", r(e);
                });
            }(c);
        }
    }, {
        key: "_drawQRCodeMiniGame",
        value: function(e, n) {
            var t = {
                w: 750,
                h: 1334,
                cw: 260,
                cp: .05,
                cx: .5,
                cy: .828
            };
            t.cx = parseInt(t.cx * t.w, 10), t.cy = parseInt(t.cy * t.h, 10), t.cp = parseInt(t.cp * t.cw, 10), 
            t.cr = parseInt(t.cw / 2, 10), t.cqw = parseInt(t.cw - 2 * t.cp, 10), t.cqx = parseInt(t.cx - t.cqw / 2, 10), 
            t.cqy = parseInt(t.cy - t.cqw / 2, 10);
            var r = wx.createCanvas();
            r.width = t.w, r.height = t.h;
            var i = r.getContext("2d");
            i.drawImage(e.back, 0, 0, t.w, t.h), i.beginPath(), i.arc(t.cx, t.cy, t.cr, 0, 2 * Math.PI), 
            i.fillStyle = "rgba(255,255,255,1)", i.fill(), i.clip(), i.drawImage(e.code, t.cqx, t.cqy, t.cqw, t.cqw), 
            console.log("[SDK] drawQRCode", e, t), setTimeout(function() {
                r.toTempFilePath({
                    x: 0,
                    y: 0,
                    width: t.w,
                    height: t.h,
                    destWidth: t.w,
                    destHeight: t.h,
                    success: function(e) {
                        var t = e.tempFilePath;
                        console.log("[SDK] showImage", t), wx.previewImage({
                            urls: [ t ]
                        }), o.hideLoading(), n();
                    }
                });
            }, 100);
        }
    }, {
        key: "_drawQRCodeMiniProgram",
        value: function(e, n) {
            var t = this, r = {
                w: 750,
                h: 1334,
                cw: 260,
                cp: .05,
                cx: .5,
                cy: .828
            };
            r.cx = parseInt(r.cx * r.w, 10), r.cy = parseInt(r.cy * r.h, 10), r.cp = parseInt(r.cp * r.cw, 10), 
            r.cr = parseInt(r.cw / 2, 10), r.cqw = parseInt(r.cw - 2 * r.cp, 10), r.cqx = parseInt(r.cx - r.cqw / 2, 10), 
            r.cqy = parseInt(r.cy - r.cqw / 2, 10);
            var i = wx.createCanvasContext(this.canvasId);
            i.drawImage(e.backFile, 0, 0), i.draw(), i.beginPath(), i.arc(r.cx, r.cy, r.cr, 0, 2 * Math.PI), 
            i.fillStyle = "rgba(255,255,255,1)", i.fill(), i.clip(), i.drawImage(e.codeFile, r.cqx, r.cqy, r.cqw, r.cqw);
            var s = 0, a = function() {
                console.log("[WSDK] 绘制二维码成功"), s && (clearTimeout(s), s = 0), wx.canvasToTempFilePath({
                    canvasId: t.canvasId,
                    x: 0,
                    y: 0,
                    width: r.w,
                    height: r.h,
                    destWidth: r.w,
                    destHeight: r.h,
                    success: function(e) {
                        var t = e.tempFilePath;
                        console.log("[SDK] showImage", t), wx.previewImage({
                            urls: [ t ]
                        }), o.hideLoading(), n();
                    }
                });
            };
            i.draw(!0, a), s = setTimeout(function() {
                console.log("[WSDK] 等待绘制超时，如果是模拟器将无法显示，请忽略使用真机"), a();
            }, 600);
        }
    } ], [ {
        key: "getInstance",
        value: function(e) {
            return this.instance = this.instance || new r(e), this.instance;
        }
    } ]), r;
}(), s = function() {
    function s(n) {
        e(this, s), this.conf = n, this.network = new r(n), this.isOnLaunch = !1, this.isLogined = !1, 
        this.wallCode = "", this.traceId = "", this.tasks = [];
        var t = "undefined" != typeof GameGlobal && "undefined" == typeof App;
        this.canDirectJump = !1, wx.canIUse ? this.canDirectJump = wx.canIUse("navigateToMiniProgram") : this.canDirectJump = void 0 !== wx.navigateToMiniProgram;
        var o = n.isMiniGame, i = void 0 === o ? t : o;
        console.log("[WSDK] isMiniGame: " + i + "; supportNav:" + this.canDirectJump), this.isMiniGame = i, 
        this.canvasId = n.canvasId || "horwall_canvas", this.onLaunch(), this.onLogind();
    }
    return n(s, [ {
        key: "setConf",
        value: function(e) {
            this.conf = e;
        }
    }, {
        key: "onLaunch",
        value: function() {
            if (!this.isOnLaunch && this.conf.launchQuery) {
                var e = this.conf.launchQuery || {}, n = e.scene ? o.queryToJson(e.scene) : {}, r = n.horwall || e.horwall || n.wallCode || e.wallCode || "";
                r && (this.wallCode = r, this.isOnLaunch = !0, this.postLog(t.LogType.OnLaunch));
            }
        }
    }, {
        key: "onLogind",
        value: function() {
            !this.isLogined && this.conf.openId && (this.isLogined = !0, this.postLog(t.LogType.OnLogined));
        }
    }, {
        key: "getTasks",
        value: function() {
            var e = this, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (!o.isFun(n.success) && !o.isFun(n.complete)) return console.warn("[WSDK] 缺少回调");
            if (!this.isLogined) return o.isFun(n.fail) && n.fail(t.Errors.NotUserInfoErr), 
            console.warn("[WSDK] 缺少openId");
            var r = {
                gameId: this.conf.gameId,
                key: this.conf.key,
                openId: this.conf.openId,
                sex: this.conf.sex,
                gameServerId: this.conf.gameServerId
            }, i = function(e) {
                return o.isFun(n.fail) && n.fail(e), o.isFun(n.complete) && n.complete(e), console.log("[WSDK] 获取任务失败", e);
            };
            this.network.post(this.network.HOST + t.Requests.GetTasks, {
                params: r,
                success: function(t) {
                    if (!t.tasks) return i(t);
                    console.log("[WSDK] 获取任务成功"), e.tasks = t.tasks, o.isFun(n.success) && n.success(t), 
                    o.isFun(n.complete) && n.complete(t);
                },
                fail: i
            });
        }
    }, {
        key: "setCanvasId",
        value: function(e) {
            this.canvasId = e;
        }
    }, {
        key: "goTask",
        value: function(e) {
            var n = this, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!this.isLogined) return o.isFun(r.fail) && r.fail(t.Errors.NotUserInfoErr), 
            console.warn("[WSDK] 缺少openId");
            if (!e) return o.isFun(r.fail) && r.fail(t.Errors.InvalidParamsErr), console.warn("[WSDK] 缺少taskId");
            for (var s = null, a = 0; a < this.tasks.length; a++) {
                var c = this.tasks[a];
                if (c.taskId == e) {
                    s = c;
                    break;
                }
            }
            if (!s) return o.isFun(r.fail) && r.fail(t.Errors.NotTaskErr), console.warn("[WSDK] 任务不存在.taskId:", e);
            var u = function(e) {
                return o.isFun(r.fail) && r.fail(e), o.isFun(r.complete) && r.complete(e), console.log("[WSDK] 做任务失败", e);
            }, l = {
                taskId: e,
                gameId: this.conf.gameId,
                key: this.conf.key,
                openId: this.conf.openId,
                sex: this.conf.sex,
                gameServerId: this.conf.gameServerId
            };
            this.network.post(this.network.HOST + t.Requests.GoTask, {
                params: l,
                success: function(e) {
                    if (!e.traceId) return u(e);
                    console.log("[WSDK] 获取任务code成功");
                    var s = function() {
                        n.postLog(t.LogType.OnGoTask, {
                            taskId: e.taskId,
                            traceId: e.traceId
                        }), o.isFun(r.success) && r.success(e);
                    }, a = function(n) {
                        console.warn("[WSDK] 做任务失败.", n), o.isFun(r.fail) && r.fail(n), o.isFun(r.complete) && r.complete(e);
                    }, c = function() {
                        new i(n.isMiniGame, n.canvasId).createQRCode({
                            codeUrl: e.qrcodeImg,
                            backUrl: e.qrcodeBg,
                            posX: e.qrcodePosX,
                            posY: e.qrcodePosY
                        }, function(e) {
                            if (e) return console.warn("[WSDK] 生成二维码失败.", e), a({
                                errCode: 1001,
                                errMsg: e
                            });
                            s();
                        });
                    };
                    if (e.useNav && n.canDirectJump) {
                        var l = {
                            appId: e.appId,
                            path: e.appPath,
                            envVersion: e.appEnvVersion ? e.appEnvVersion : "release",
                            extraData: e.appExtraData ? JSON.parse(e.appExtraData) : {},
                            success: s,
                            fail: function() {
                                console.log("[WSDK] 使用navigateToMiniProgram失败了,尝试二维码"), c();
                            }
                        };
                        console.log("[WSDK] goApp", l), wx.navigateToMiniProgram(l);
                    } else c();
                },
                fail: u
            });
        }
    }, {
        key: "getAward",
        value: function(e) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (!this.isLogined) return o.isFun(n.fail) && n.fail(t.Errors.NotUserInfoErr), 
            console.warn("[WSDK] 缺少openId");
            if (!e) return o.isFun(n.fail) && n.fail(t.Errors.InvalidParamsErr), console.warn("[WSDK] 缺少taskId");
            for (var r = null, i = 0; i < this.tasks.length; i++) {
                var s = this.tasks[i];
                if (s.taskId == e) {
                    r = s;
                    break;
                }
            }
            if (!r) return o.isFun(n.fail) && n.fail(t.Errors.NotTaskErr), o.isFun(n.complete) && n.complete(t.Errors.NotTaskErr), 
            console.warn("[WSDK] 任务不存在.taskId:", e);
            if (0 != r.awareAccpetStatus) return o.isFun(n.fail) && n.fail(t.Errors.RepeatGetAwardErr), 
            o.isFun(n.complete) && n.complete(t.Errors.RepeatGetAwardErr), console.warn("[WSDK] 已经领取奖励");
            var a = function(e) {
                return o.isFun(n.fail) && n.fail(e), o.isFun(n.complete) && n.complete(e), console.log("[WSDK] 领取奖励失败", e);
            }, c = {
                taskId: e,
                gameId: this.conf.gameId,
                key: this.conf.key,
                openId: this.conf.openId,
                sex: this.conf.sex,
                gameServerId: this.conf.gameServerId
            };
            this.network.post(this.network.HOST + t.Requests.GetAward, {
                params: c,
                success: function(e) {
                    if (!e.traceId) return a(e);
                    console.log("[WSDK] 领取奖励成功"), o.isFun(n.success) && n.success(e), o.isFun(n.complete) && n.complete(e);
                },
                fail: a
            });
        }
    }, {
        key: "postLog",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : t.LogType.Other, n = arguments[1], r = {
                logType: e,
                gameId: this.conf.gameId,
                key: this.conf.key,
                openId: this.conf.openId || "",
                sex: this.conf.sex,
                gameVersion: this.conf.gameVersion || "",
                wallCode: this.wallCode,
                traceId: this.traceId,
                gameServerId: this.conf.gameServerId
            };
            r = o.assign(r, n || {}), this.network.post(this.network.HOST + t.Requests.Log, {
                params: r
            });
        }
    } ], [ {
        key: "getInstance",
        value: function(e) {
            return this.instance = this.instance || new s(e), this.instance;
        }
    } ]), s;
}(), a = {
    init: function(e) {
        if (console.log("[WSDK] init", e), !e.gameId) return console.warn("[WSDK] init gameId is null");
        if (!e.key) return console.warn("[WSDK] init key is null");
        if (-1 === [ "Test", "Prod" ].indexOf(e.env)) return console.warn("[WSDK] init env not Test or Prod");
        if (this.conf = e, "undefined" != typeof GameGlobal && "undefined" == typeof App) {
            var n = wx.getLaunchOptionsSync();
            this.conf.launchScene = n.scene, this.conf.launchQuery = n.query;
        } else !this.conf.launchScene && this.launchScene && (this.conf.launchScene = this.launchScene, 
        this.conf.launchQuery = this.launchQuery || {});
        this.bridge = new s(this.conf);
    },
    setLaunch: function(e, n) {
        this.bridge ? (this.conf.launchScene = e, this.conf.launchQuery = n, this.bridge.setConf(this.conf), 
        this.bridge.onLaunch()) : (console.log("[WSDK] 小程序自动获取场景参数", e, n), this.launchScene = e, 
        this.launchQuery = n);
    },
    setLogind: function(e, n) {
        var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
        if (!e) return console.warn("[WSDK] openId or sex is null");
        this.conf.openId = e, this.conf.sex = n, this.conf.gameServerId = t, this.bridge.setConf(this.conf), 
        this.bridge.onLogind();
    },
    setCanvasId: function(e) {
        this.bridge.setCanvasId(e);
    },
    getTasks: function(e) {
        this.bridge.getTasks(e);
    },
    goTask: function(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        this.bridge.goTask(e, n);
    },
    getAward: function(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        this.bridge.getAward(e, n);
    },
    logOpenTaskPanel: function() {
        this.bridge.postLog(t.LogType.OnOpenTaskPanel, {});
    },
    postLog: function(e, n) {
        this.bridge.postLog(e, n);
    },
    setLaunchOpt: function(e) {
        var n = "undefined" != typeof GameGlobal && "undefined" == typeof App;
        if (!(n || e && e.scene && e.query)) return console.warn("[WSDK] mini program scene or query is null");
        if (n) {
            var t = wx.getLaunchOptionsSync();
            (e = e || {}).scene = t.scene, e.query = t.query;
        }
        this.conf.launchScene = e.scene, this.conf.launchQuery = e.query;
    }
};

"undefined" != typeof App ? function(e) {
    function n(e) {
        this.wallSDK = new o(this), this.wallSDK.setLaunch(e.scene, e.query);
    }
    var t = function(e, n, t) {
        if (e[n]) {
            var o = e[n];
            e[n] = function(e) {
                t.call(this, e, n), o.call(this, e);
            };
        } else e[n] = function(e) {
            t.call(this, e, n);
        };
    }, o = function(e) {
        this.app = e;
    };
    o.prototype = e;
    var r = App;
    App = function(e) {
        t(e, "onLaunch", n), r(e);
    };
}(a) : "undefined" != typeof module ? (module.exports = a, "undefined" != typeof window && (window.wallSDK = a)) : "undefined" != typeof window && (window.wallSDK = a);