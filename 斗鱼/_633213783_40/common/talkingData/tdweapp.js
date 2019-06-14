!function() {
    function e() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {}, a = e[t];
        e[t] = function(e) {
            a && a.call(this, e), n.call(this, e);
        };
    }
    var t = App, n = Page, a = require("./tdweapp-conf.js"), i = !1, o = {
        device: !0,
        network: !0,
        uid: !0
    }, s = {
        sdk: {
            version: "3",
            minorVersion: "0",
            build: "3",
            platform: "Weapp",
            partner: ""
        },
        app: {
            versionCode: a.config.versionCode || "1",
            versionName: a.config.versionName || "1.0.0",
            installTime: 0,
            displayName: a.config.appName,
            appKey: a.config.appkey,
            uniqueId: a.config.wxAppid,
            channel: ""
        },
        device: {
            type: "mobile",
            softwareConfig: {},
            hardwareConfig: {},
            deviceId: {}
        },
        networks: [ {
            type: "wifi",
            available: !1,
            connected: !1
        }, {
            type: "cellular",
            available: !1,
            connected: !1,
            current: []
        }, {
            type: "unknown",
            available: !1,
            connected: !1
        } ],
        locations: [ {} ],
        appContext: {}
    }, r = {
        firstInit: !1,
        initTime: 0,
        sessionId: "",
        sessionStartTime: 0,
        appLaunchInfo: null,
        sendFailTimes: 0,
        Store: {
            set: function(e, t) {
                return wx.setStorageSync("TDSDK_" + e, t), !0;
            },
            get: function(e) {
                return wx.getStorageSync("TDSDK_" + e);
            },
            remove: function(e) {
                return wx.removeStorageSync("TDSDK_" + e), !0;
            }
        },
        random: function() {
            for (var e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890", t = e.length, n = "", a = 0; a < 12; a++) n += e.charAt(Math.floor(Math.random() * t));
            return n;
        },
        timestamp: function() {
            return new Date().getTime();
        },
        deviceId: function() {
            return "weapp-" + this.timestamp() + "-" + this.random();
        },
        getEventId: function(e) {
            if (!e && !/0{1}/.test(e)) return "";
            var t = "";
            try {
                t = e.toString();
            } catch (n) {
                try {
                    t = JSON.stringify(e);
                } catch (e) {}
            }
            return t.split(" ")[0].slice(0, 64);
        },
        addStoreData: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = "EVENT_" + r.sessionId, n = r.Store.get(t);
            n = n && n.length ? n.concat(e) : e, r.Store.set(t, n), n.length >= 30 && (d.sessionContinue(), 
            d.startLoop());
        },
        eventHandle: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            if (e) {
                var n = getCurrentPages(), a = n[n.length - 1], i = {
                    eventId: e,
                    label: a.__route__,
                    count: 1,
                    startTime: r.timestamp()
                };
                if ("WeappShare" === e) {
                    i.shareTickets = t.shareTickets;
                    var o = JSON.parse(JSON.stringify(a.options || {}));
                    o.user = r.deviceId, o.title = t.title, o.desc = t.desc, o.path = t.path, i.params = o;
                }
                r.addStoreData([ i ]);
            }
        },
        getCacheData: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Object.keys(e), n = [], a = [];
            return t.length && t.forEach(function(t) {
                var i = e[t];
                i && i.sendFail && i.data && (n = n.concat(i.data), a.push(t));
            }), {
                data: n,
                keys: a
            };
        },
        sendCacheList: {},
        updateSendTime: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
            return e.forEach(function(n, a) {
                n.action && n.action.data && (e[a].action.data.start = t);
            }), e;
        },
        getRequestData: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = JSON.parse(JSON.stringify(e)), n = r.sendCacheList;
            if (Object.keys(n).length) {
                var a = r.getCacheData(n);
                t = t.concat(a.data), a.keys.forEach(function(e) {
                    return delete n[e];
                });
            }
            var i = t.length;
            if (i) {
                var o = [];
                i >= 30 ? (JSON.stringify(t) > 61440 && o.push(t.splice(0, i / 2)), o.push(t)) : o.push(t), 
                o.forEach(function(e) {
                    var t = r.timestamp();
                    n[t] = {
                        data: e,
                        sendFail: !1
                    };
                    var a = r.updateSendTime(e, r.timestamp());
                    r.request(t, a);
                });
            }
        },
        request: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            wx.request({
                url: "https://h5.udrig.com/app/wx/v1",
                data: JSON.stringify(t),
                method: "POST",
                success: function(t) {
                    200 === t.statusCode && (delete r.sendCacheList[e], r.sendFailTimes = 0, p.appIsHide || (clearTimeout(d.timeout), 
                    d.timeout = null, d.startLoop()));
                },
                fail: function() {
                    p.appIsHide ? (r.Store.set("RESEND_" + e, t), delete r.sendCacheList[e]) : (r.sendCacheList[e].sendFail = !0, 
                    r.sendFailTimes < 5 && r.sendFailTimes++);
                }
            });
        }
    }, c = {
        isFirst: !0,
        init: function() {
            var e = this, t = r.Store.get("deviceId"), n = r.Store.get("uid");
            if (n) {
                var a = t || n;
                e.setData(a, n);
            } else new Promise(this.getOpenid).then(function(n) {
                var a = void 0;
                t ? a = t : (a = n, r.Store.set("deviceId", n)), e.setData(a, n), r.Store.set("uid", n);
            }).catch(function(n) {
                var a = void 0;
                a = t || r.deviceId(), e.setData(a, ""), r.Store.set("deviceId", a);
            });
        },
        setData: function(e, t) {
            s.device.deviceId = {
                tid: e,
                uid: t
            }, o.uid = !1, d.getAppProfile();
        },
        getOpenid: function(e, t) {
            function n() {
                i.isFirst ? i.reGetOpenid(e, t) : t("error");
            }
            var i = c;
            new Date().getTime(), wx.login({
                timeout: 3e3,
                success: function(t) {
                    t.code ? wx.request({
                        url: "https://api.talkingdata.com/mpopenid/" + a.config.appkey + "/" + t.code,
                        success: function(t) {
                            var a = t.data;
                            a && 200 === a.code && a.openId ? e(a.openId) : n();
                        },
                        fail: function(e) {
                            n();
                        }
                    }) : n();
                },
                fail: function(e) {
                    n();
                }
            });
        },
        reGetOpenid: function(e, t) {
            c.isFirst = !1, c.getOpenid(e, t);
        }
    }, u = {
        sendTime: 0,
        statusType: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = [], n = JSON.parse(JSON.stringify(s)), a = {
                domain: e.domain,
                name: e.name,
                data: e.data
            };
            n.ts = e.data.start || r.timestamp(), n.action = a, t.push(n), r.getRequestData(t);
        },
        dataType: function(e, t) {
            var n = this.getStoreList(e, t);
            r.getRequestData(n);
        },
        getEventType: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (e.pageEvent) return {
                domain: "page",
                name: "leave"
            };
            if (e.eventId) {
                var t = {};
                switch (e.eventId) {
                  case "WeappShare":
                    t = {
                        domain: "user",
                        name: "share"
                    };
                    break;

                  case "WeappPullDownRefresh":
                    t = {
                        domain: "page",
                        name: "pullDownRefresh"
                    };
                    break;

                  case "WeappReachBottom":
                    t = {
                        domain: "page",
                        name: "reachBottom"
                    };
                    break;

                  default:
                    t = {
                        domain: "appEvent",
                        name: ""
                    };
                }
                return t;
            }
        },
        getStoreList: function(e, t) {
            var n = this, a = [], i = e || r.sessionId, o = JSON.stringify(s), c = r.Store.get("EVENT_" + i);
            return c && c.length && (c.forEach(function(e) {
                var i = n.getEventType(e), s = JSON.parse(o);
                t && s.appContext && (s.appContext.sessionStartTime = t);
                var c = JSON.parse(JSON.stringify(e));
                c.pageEvent && delete c.pageEvent, c.status = 2;
                var u = {
                    domain: i.domain,
                    name: i.name,
                    data: c
                };
                s.ts = c.startTime ? c.startTime : r.timestamp(), s.action = u, a.push(s);
            }), r.Store.remove("EVENT_" + i)), a;
        }
    }, d = {
        timeout: null,
        init: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            r.appLaunchInfo = e, r.appLaunchInfo.scene = e.scene ? e.scene.toString() : "", 
            c.init(), d.judgeRequireData(), d.getLocalParams(), a.config.getLocation && d.getLocation(), 
            d.getSystemInfo(), d.getNetwork();
        },
        launchRequest: function() {
            var e = {
                first: !0
            };
            u.statusType({
                domain: "app",
                name: "init",
                data: e
            });
        },
        sessionStart: function(e) {
            var t = r.appLaunchInfo || {}, n = {
                status: 1,
                duration: 0,
                name: t.path,
                scene: t.scene,
                query: t.query || {},
                shareTicket: t.shareTicket
            };
            e && d.setNewSession(), n.start = r.Store.get("session_time") || r.timestamp(), 
            n.url = d.getUrl(n.name, n.query), u.statusType({
                domain: "session",
                name: "begin",
                data: n
            });
        },
        getUrl: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = Object.keys(t).sort(function(e, t) {
                return e > t;
            }) || [], a = n.length ? e + "?" : e;
            return n.forEach(function(e, n) {
                0 !== n && (a += "&"), a += e + "=" + t[e];
            }), a;
        },
        sessionContinue: function() {
            u.dataType();
        },
        sessionEnd: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = {
                status: 3,
                start: e.startTime,
                duration: e.duration
            };
            u.statusType({
                domain: "session",
                name: "end",
                data: t
            });
        },
        sendTmpSession: function() {
            d.sessionContinue(), d.startLoop();
        },
        startLoop: function() {
            d.timeout && (clearTimeout(d.timeout), d.timeout = null);
            var e = 3e3 * (r.sendFailTimes + 1);
            d.timeout = setTimeout(function() {
                d.sendTmpSession();
            }, e);
        },
        judgeRequireData: function() {
            s.app.appKey || (s.app.appKey = "", console.error("请填写您在TalkingData申请的App ID")), 
            s.app.displayName || (s.app.displayName = "appname", console.error("请填写您的小程序名称"));
        },
        getLocalParams: function() {
            var e = r.Store.get("initTime");
            e ? r.initTime = e : (r.initTime = r.timestamp(), r.Store.set("initTime", r.initTime), 
            r.firstInit = !0), s.app.installTime = r.initTime;
            var t = r.appLaunchInfo.query || {}, n = t.TDChannelId ? t.TDChannelId : "";
            s.app.channel = n, d.setNewSession();
        },
        setNewSession: function() {
            r.sessionId = r.deviceId(), r.sessionStartTime = r.timestamp(), r.Store.set("session_time", r.sessionStartTime), 
            s.appContext.sessionId = r.sessionId, s.appContext.sessionStartTime = r.sessionStartTime;
        },
        getLaunchInfo: function() {
            var e = JSON.parse(JSON.stringify(d.launchOptions));
            return e.type = "appLaunch", e;
        },
        getAppProfile: function() {
            if (!i) {
                var e = !0;
                [ "device", "network", "uid" ].forEach(function(t) {
                    o[t] && (e = !1);
                }), e && (i = !0, this.startRequest());
            }
        },
        startRequest: function() {
            r.firstInit && d.launchRequest(), this.sessionStart(), this.startLoop();
        },
        getLocation: function() {
            wx.getLocation({
                type: "wgs84",
                complete: function(e) {
                    if (e.longitude || e.latitude || e.horizontalAccuracy || e.verticalAccuracy) {
                        var t = s.locations[0];
                        t.lng = e.longitude, t.lat = e.latitude, t.hAccuracy = e.horizontalAccuracy, t.vAccuracy = e.verticalAccuracy, 
                        t.speed = e.speed, t.altitude = e.altitude, t.ts = new Date().getTime();
                    }
                }
            });
        },
        getNetwork: function() {
            wx.getNetworkType({
                complete: function(e) {
                    var t = s.networks, n = e.networkType;
                    "wifi" === n ? (t[0].available = !0, t[0].connected = !0) : "unknown" === n ? (t[2].available = !0, 
                    t[2].connected = !0) : "none" !== n && (t[1].available = !0, t[1].connected = !0, 
                    t[1].current.push({
                        type: n
                    })), o.network = !1, d.getAppProfile();
                }
            });
        },
        getSystemInfo: function() {
            wx.getSystemInfo({
                complete: function(e) {
                    if (e.model || e.system || e.SDKVersion) {
                        var t = {
                            model: e.model,
                            pixel: e.screenWidth + "*" + e.screenHeight + "*" + e.pixelRatio,
                            densityDpi: e.pixelRatio,
                            brand: e.brand
                        }, n = {
                            os: e.system,
                            local: e.language,
                            language: "zh_CN",
                            osVersionCode: e.version,
                            timezone: -new Date().getTimezoneOffset() / 60,
                            mpVersion: e.SDKVersion
                        };
                        s.device.hardwareConfig = t, s.device.softwareConfig = n;
                    }
                    o.device = !1, d.getAppProfile();
                }
            });
        }
    }, p = {
        isHide2Show: !1,
        appIsHide: !1,
        show: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (p.appIsHide = !1, p.getlastTmpData(), p.isHide2Show) {
                var t = r.Store.get("TMP_time_end_" + r.sessionId), n = e.scene ? e.scene.toString() : "";
                e.scene && n === r.appLaunchInfo.scene ? r.timestamp() - t > 3e4 ? p.sessionRestart(t) : r.Store.remove("TMP_time_end_" + r.sessionId) : (r.appLaunchInfo = e, 
                r.appLaunchInfo.scene = n, p.sessionRestart(t)), p.isHide2Show = !1, d.startLoop();
            }
        },
        sessionRestart: function(e) {
            var t = r.Store.get("TMP_time_start_" + r.sessionId), n = {
                startTime: t,
                duration: parseInt((e - t) / 1e3)
            };
            d.sessionEnd(n), r.Store.remove("TMP_time_start_" + r.sessionId), r.Store.remove("TMP_time_end_" + r.sessionId), 
            r.Store.remove("session_time"), d.sessionStart(!0);
        },
        hide: function() {
            p.appIsHide = !0, clearTimeout(d.timeout), d.timeout = null, d.sessionContinue(), 
            p.isHide2Show = !0, r.Store.set("TMP_time_start_" + r.sessionId, r.Store.get("session_time")), 
            r.Store.set("TMP_time_end_" + r.sessionId, r.timestamp());
        },
        getlastTmpData: function() {
            var e = [], t = wx.getStorageInfoSync().keys || [], n = void 0, a = void 0;
            t && t.length && (n = t.filter(function(e) {
                return e.indexOf("TDSDK_EVENT") > -1;
            }), a = t.filter(function(e) {
                return e.indexOf("TDSDK_RESEND") > -1;
            })), n && n.length && (n.forEach(function(t) {
                var n = {};
                t.split("_")[2], n.id = t.split("_")[2], n.time = n.id.split("-")[1], e.push(n);
            }), p.sendLastTmpData(e)), a && a.length && a.forEach(function(e) {
                wx.getStorage({
                    key: e,
                    success: function(t) {
                        r.getRequestData(t.data), wx.removeStorage({
                            key: e,
                            success: function(e) {}
                        });
                    }
                });
            });
        },
        sendLastTmpData: function() {
            (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(e) {
                u.dataType(e.id, e.time);
            });
        }
    }, l = {
        event: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = r.getEventId(e.id);
            if (t) {
                var n = {};
                n.eventId = t, n.label = r.getEventId(e.label), n.count = e.count || 1, n.params = e.params, 
                n.startTime = r.timestamp(), r.addStoreData([ n ]);
            }
        },
        share: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            r.eventHandle("WeappShare", e);
        },
        pullDownRefresh: function() {
            r.eventHandle("WeappPullDownRefresh");
        },
        reachBottom: function() {
            r.eventHandle("WeappReachBottom");
        },
        setAccount: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return e.accountId || /0{1}/.test(e.accountId) ? e.accountType || /0{1}/.test(e.accountType) ? void (s.appContext.account = e) : void console.warn("accountType为必填字段！") : void console.warn("accountId为必填字段！");
        }
    };
    App = function(n) {
        var a = {
            onLaunch: d.init,
            onShow: p.show,
            onHide: p.hide
        };
        Object.keys(a).forEach(function(t) {
            e(n, t, a[t]);
        }), n.tdsdk = l, t(n);
    };
    var f = {
        curPagePath: "",
        refer: "",
        pageTime: 0,
        pageQuery: {},
        show: function() {
            var e = getCurrentPages(), t = e[e.length - 1];
            "" !== f.curPagePath && (f.refer = f.curPagePath), f.curPagePath = t.__route__, 
            f.pageTime = r.timestamp(), f.pageQuery = t.options;
        },
        hide: function() {
            var e = [ {
                name: f.curPagePath,
                from: f.refer || "",
                query: f.pageQuery,
                scene: r.appLaunchInfo.scene,
                duration: parseInt((r.timestamp() - f.pageTime) / 1e3),
                startTime: f.pageTime,
                pageEvent: !0
            } ];
            r.addStoreData(e);
        }
    };
    Page = function(t) {
        var i = {
            onShow: f.show,
            onHide: f.hide,
            onUnload: f.hide
        };
        a.config.autoOnPullDownRefresh && (i.onPullDownRefresh = l.pullDownRefresh), a.config.autoOnReachBottom && (i.onReachBottom = l.reachBottom), 
        Object.keys(i).forEach(function(n) {
            e(t, n, i[n]);
        }), n(t);
    };
}();