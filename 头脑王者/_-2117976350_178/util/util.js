function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = require("./../libs/md5/md5.js"), r = require("./../const/consts.js"), a = require("./../const/modeConsts.js"), o = require("/AudioController.js"), i = require("/AudioController_Old.js"), u = null, l = [ "", "K", "M", "B", "T", "aa", "bb", "cc" ], s = function() {
    function s() {
        e(this, s);
    }
    return t(s, [ {
        key: "init",
        value: function(e) {
            u = e;
        }
    }, {
        key: "invokeCallback",
        value: function(e) {
            e && "function" == typeof e && e.apply(null, Array.prototype.slice.call(arguments, 1));
        }
    }, {
        key: "assign",
        value: function(e, t) {
            if (Object.assign) return Object.assign(e, t);
            for (var n in t) e[n] = t[n];
            return e;
        }
    }, {
        key: "getWechatUrlBySize",
        value: function(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 96;
            return e ? e.replace(/\/[0-9]+$/, "/" + t) : "";
        }
    }, {
        key: "formatNumber",
        value: function(e) {
            e = Math.floor(e);
            var t = Math.floor(this.getExponent(e)), n = Math.floor(t / 3), r = t % 3;
            return String(e / Math.pow(10, 3 * n)).substr(0, 4 + r) + this.getUnit(t);
        }
    }, {
        key: "getExponent",
        value: function(e) {
            for (var t = 0; e > 10; ) t++, e /= 10;
            return t;
        }
    }, {
        key: "getUnit",
        value: function(e) {
            var t = Math.floor(e / 3);
            if (e < 15) return l[t];
            if (e < 93) {
                var n = 92 + t, r = String.fromCharCode(n);
                return r + r;
            }
            return "e+" + 3 * (t = Math.floor(e / 3));
        }
    }, {
        key: "formatTime",
        value: function(e) {
            if ("number" != typeof e || e < 0) return e;
            var t = parseInt(e / 3600);
            e %= 3600;
            var n = parseInt(e / 60);
            return e %= 60, [ t, n, parseInt(e) ].map(function(e) {
                return (e = e.toString())[1] ? e : "0" + e;
            }).join(":");
        }
    }, {
        key: "formatTime_mm_ss",
        value: function(e) {
            if ("number" != typeof e || e < 0) return e;
            var t = parseInt(e / 60);
            return e %= 60, [ t, parseInt(e) ].map(function(e) {
                return (e = e.toString())[1] ? e : "0" + e;
            }).join(":");
        }
    }, {
        key: "formatTime_yymmdd",
        value: function(e) {
            var t = new Date(1e3 * e);
            return t.getFullYear() + "年" + (t.getMonth() + 1) + "月" + t.getDate() + "日";
        }
    }, {
        key: "formatTime_ddhhmm",
        value: function(e) {
            var t = Math.floor(e / 86400);
            e %= 86400;
            var n = Math.floor(e / 3600);
            return e %= 3600, t + "天" + n + "小时" + Math.floor(e / 60) + "分";
        }
    }, {
        key: "showPastTime",
        value: function(e) {
            var t = "刚刚", n = e, r = Math.floor(n / 60), a = Math.floor(n / 60 / 60), o = Math.floor(n / 60 / 60 / 24);
            return o < 1 ? a < 1 ? r > 0 && (t = r + "分钟前") : t = a + "小时前" : t = (o = o > 30 ? 30 : o) + "天前", 
            t;
        }
    }, {
        key: "ShowConfirm",
        value: function(e, t, n) {
            wx.showModal({
                title: e + "",
                content: t + "",
                showCancel: !1,
                complete: function() {
                    n && "function" == typeof n && n();
                }
            });
        }
    }, {
        key: "ShowConfirmCancel",
        value: function(e, t, n) {
            wx.showModal({
                title: e + "",
                content: t + "",
                showCancel: !0,
                complete: function(e) {
                    e.confirm ? n && "function" == typeof n && n() : e.cancel;
                }
            });
        }
    }, {
        key: "GetMatchInfo",
        value: function(e) {
            if (u.mainData.role.matchInfo) {
                var t = !0, n = !1, r = void 0;
                try {
                    for (var a, o = u.mainData.role.matchInfo[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
                        var i = a.value;
                        if (i.id == e) return i;
                    }
                } catch (e) {
                    n = !0, r = e;
                } finally {
                    try {
                        !t && o.return && o.return();
                    } finally {
                        if (n) throw r;
                    }
                }
            }
            return u.mainData.role.matchInfo[0];
        }
    }, {
        key: "ShakeLong",
        value: function(e) {
            wx.vibrateLong && wx.vibrateLong({
                success: function() {},
                fail: function() {},
                complete: function() {
                    e && e();
                }
            });
        }
    }, {
        key: "ShowToast",
        value: function(e) {
            wx.showToast({
                title: e,
                icon: "none",
                duration: 2e3
            });
        }
    }, {
        key: "showLoading",
        value: function(e) {
            !this.loading && wx.showLoading && (this.loading = !0, wx.showLoading({
                title: e,
                mask: !0
            }));
        }
    }, {
        key: "hideLoading",
        value: function(e) {
            this.loading = !1, wx.showLoading && wx.hideLoading();
        }
    }, {
        key: "GenNetSign",
        value: function(e, t) {
            var r = "", a = (t += "&token=" + e).split("&");
            a.sort();
            for (var o = 0; o < a.length; o++) r += a[o];
            return r = n.hex_md5(r);
        }
    }, {
        key: "randomFloat",
        value: function(e, t) {
            return Math.random() * (t - e) + e;
        }
    }, {
        key: "randomInt",
        value: function(e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e;
        }
    }, {
        key: "andomRate",
        value: function(e) {
            return Math.random() < e;
        }
    }, {
        key: "formatGroupName",
        value: function(e) {
            return this.formatNameBase(e, r.UserNameWidth, null);
        }
    }, {
        key: "formatNameEx",
        value: function(e) {
            return this.formatName(e, r.UserNameWidth);
        }
    }, {
        key: "formatName",
        value: function(e, t) {
            return this.formatNameBase(e, t, "---");
        }
    }, {
        key: "formatNameBase",
        value: function(e, t, n) {
            if (!e) return n;
            if (n && this.isStringEndWith(e, "...")) return e;
            for (var r = String(e), a = new RegExp("^[一-龥]"), o = 0, i = 0; i < r.length; i++) {
                var u = r.substr(i, 1);
                if ((o += a.test(u) ? 1 : .6) > t) return r.substring(0, i) + "...";
            }
            return r;
        }
    }, {
        key: "getWordLength",
        value: function(e) {
            if (!e) return 0;
            for (var t = String(e), n = new RegExp("^[一-龥]"), r = 0, a = 0; a < t.length; a++) {
                var o = t.substr(a, 1);
                r += n.test(o) ? 1 : .5;
            }
            return r;
        }
    }, {
        key: "getTextScale",
        value: function(e, t, n) {
            var r = this.getWordLength(e);
            r += 2;
            var a = n / (r *= t);
            return a = Math.min(1, a), a = Math.max(.5, a);
        }
    }, {
        key: "getWord",
        value: function(e, t) {
            if (!e) return 0;
            for (var n = String(e), r = new RegExp("^[一-龥]"), a = 0, o = 0; o < n.length; o++) {
                var i = n.substr(o, 1);
                if ((a += r.test(i) ? 1 : .5) >= t) return e.substr(0, o);
            }
            return e;
        }
    }, {
        key: "getServerTimeBaseSecond",
        value: function() {
            return Math.floor(this.getServerTime() / 1e3);
        }
    }, {
        key: "setServerTime",
        value: function(e) {
            this.serverTime = 1e3 * e, this.time = new Date().getTime(), this.deltaTime = this.serverTime - this.time;
        }
    }, {
        key: "getServerTime",
        value: function() {
            return this.serverTime ? new Date().getTime() + this.deltaTime : new Date().getTime();
        }
    }, {
        key: "isStringStartWith",
        value: function(e, t) {
            return !(!e || "string" != typeof e) && (!(!t || "string" != typeof t) && (t.length >= 0 && 0 == e.indexOf(t)));
        }
    }, {
        key: "isStringEndWith",
        value: function(e, t) {
            if (!e || "string" != typeof e) return !1;
            if (!t || "string" != typeof t) return !1;
            var n = e.length - t.length;
            return n >= 0 && e.lastIndexOf(t) == n;
        }
    }, {
        key: "trimStr",
        value: function(e) {
            return e.replace(/(^\s*)|(\s*$)/g, "");
        }
    }, {
        key: "showShareMenu",
        value: function() {
            "function" == typeof wx.showShareMenu && wx.showShareMenu({
                withShareTicket: !0
            });
        }
    }, {
        key: "getCurPage",
        value: function() {
            var e = getCurrentPages();
            return e && e.length > 0 && e[e.length - 1] ? e[e.length - 1] : {};
        }
    }, {
        key: "startsWith",
        value: function(e, t) {
            return !(!e || !t) && e.slice(0, t.length) === t;
        }
    }, {
        key: "getCity",
        value: function(e, t) {
            return "北京" == e ? e : "上海" == e ? e : "天津" == e ? e : "重庆" == e ? e : t;
        }
    }, {
        key: "getCurPath",
        value: function() {
            var e = this.getCurPage();
            return e.route ? e.route : "";
        }
    }, {
        key: "getFullPath",
        value: function() {
            var e = "", t = getCurrentPages();
            if (t) for (var n = t.length, r = 0; r < n; r++) {
                var a = t[r];
                if (a && a.route) {
                    var o = a.route.lastIndexOf("/"), i = a.route.substr(o + 1, a.route.length - o - 1);
                    e += r != n - 1 ? i + "/" : i;
                }
            }
            return e;
        }
    }, {
        key: "reportAnalytics_Try",
        value: function(e) {
            "function" == typeof wx.reportAnalytics && e && a.RunMode == a.RunModeType.Prod && wx.reportAnalytics("try", {
                uid: u.uid + "",
                msg: e.message,
                stack: e.stack,
                sdk_version: u.systemInfo ? u.systemInfo.SDKVersion : "---"
            });
        }
    }, {
        key: "reportAnalytics_catch_err",
        value: function(e) {
            "function" == typeof wx.reportAnalytics && a.RunMode == a.RunModeType.Prod && wx.reportAnalytics("catch_err", {
                err: e,
                uid: u.uid + "",
                sdk_version: u.systemInfo ? u.systemInfo.SDKVersion : "---"
            });
        }
    }, {
        key: "reportAnalytics_cmd_err",
        value: function(e, t, n, r, o) {
            "function" == typeof wx.reportAnalytics && a.RunMode == a.RunModeType.Prod && wx.reportAnalytics("cmd_err", {
                uid: u.uid + "",
                msg: o,
                cmd: e,
                err_code: n,
                status_code: r,
                params: t,
                sdk_version: u.systemInfo ? u.systemInfo.SDKVersion : "---"
            });
        }
    }, {
        key: "reportAnalytics_debug_log",
        value: function(e) {
            "function" == typeof wx.reportAnalytics && a.RunMode == a.RunModeType.Prod && wx.reportAnalytics("debug_log_event", {
                user_id: u.uid + "",
                debug_log: e
            });
        }
    }, {
        key: "getSavedFileList",
        value: function(e) {
            wx.getSavedFileList ? wx.getSavedFileList({
                success: function(t) {
                    e(void 0, t);
                },
                fail: function(t) {
                    e(t, void 0);
                }
            }) : e("不兼容", void 0);
        }
    }, {
        key: "getSavedFileInfo",
        value: function(e, t) {
            wx.getSavedFileInfo ? wx.getSavedFileInfo({
                filePath: e,
                success: function(e) {
                    t(void 0, e);
                },
                fail: function(e) {
                    t(e, void 0);
                }
            }) : t("不兼容", void 0);
        }
    }, {
        key: "removeSavedFile",
        value: function(e, t) {
            wx.removeSavedFile ? wx.removeSavedFile({
                filePath: e,
                success: function(e) {
                    t(void 0, e);
                },
                fail: function(e) {
                    t(e, void 0);
                }
            }) : t("不兼容", void 0);
        }
    }, {
        key: "saveFile",
        value: function(e, t) {
            wx.saveFile ? wx.saveFile({
                tempFilePath: e,
                success: function(e) {
                    t(void 0, e);
                },
                fail: function(e) {
                    t(e, void 0);
                }
            }) : t("不兼容", void 0);
        }
    }, {
        key: "downloadFile",
        value: function(e, t) {
            wx.downloadFile ? wx.downloadFile({
                url: e,
                success: function(e) {
                    t(void 0, e);
                },
                fail: function(e) {
                    t(e, void 0);
                }
            }) : t("不兼容", void 0);
        }
    }, {
        key: "getNumLinearArray",
        value: function(e, t) {
            for (var n = e, r = [ n ]; ;) {
                var a = t - n;
                if (Math.abs(a) <= 1) {
                    r.push(t);
                    break;
                }
                n += Math.floor(.5 * a), r.push(n);
            }
            return r;
        }
    }, {
        key: "addSound",
        value: function(e, t, n, r) {
            e.audioCtrl || ("createInnerAudioContext" in wx ? e.audioCtrl = new o(e) : e.audioCtrl = new i(e)), 
            e.audioCtrl.addSound(t, n, r);
        }
    }, {
        key: "destoryAudio",
        value: function(e) {
            e.audioCtrl && e.audioCtrl.destory();
        }
    }, {
        key: "playTapSound",
        value: function(e) {
            e.audioCtrl && e.audio_playEff("audioTap", "sound_eff");
        }
    }, {
        key: "isSameDay",
        value: function(e, t) {
            var n = new Date(e);
            n.setHours(0, 0, 0, 0);
            var r = new Date(t);
            return r.setHours(0, 0, 0, 0), n.getTime() == r.getTime();
        }
    }, {
        key: "getFirstCupId",
        value: function(e) {
            if (e) for (var t in e) return t;
        }
    }, {
        key: "solveName",
        value: function(e, t) {
            for (var n = 0, r = "", a = 0; a < e.length; a++) {
                if (e.charCodeAt(a) > 127 || 94 == e.charCodeAt(a) ? n += 2 : n++, n > t) return [ r + "...", n ];
                r += e.charAt(a);
            }
            return [ r, n ];
        }
    }, {
        key: "log",
        value: function() {
            a.RunMode != a.RunModeType.Prod && console.log.apply(console, arguments);
        }
    }, {
        key: "getCallStack",
        value: function(e) {
            function t() {
                return e.apply(this, arguments);
            }
            return t.toString = function() {
                return e.toString();
            }, t;
        }(function() {
            for (var e = [], t = getCallStack; t = t.caller; ) e.push(t);
            return e;
        })
    }, {
        key: "cacheFile",
        value: function(e, t, n) {
            var r = this;
            try {
                e || this.invokeCallback(n), t || this.invokeCallback(n);
                var a = this.getStorageSync(e + "Url"), o = this.getStorageSync(e + "FilePath");
                o ? a != t ? this.removeSavedFile(o, function() {
                    r._downloadCache(e, t, n);
                }) : this.getSavedFileInfo(o, function(a, i) {
                    a || !i || 0 == i.size ? r._downloadCache(e, t, n) : r.invokeCallback(n, o);
                }) : this._downloadCache(e, t, n);
            } catch (e) {
                util.reportAnalytics_Try(e), this.invokeCallback(n);
            }
        }
    }, {
        key: "_downloadCache",
        value: function(e, t, n) {
            var r = this;
            this.downloadFile(t, function(a, o) {
                a || !o || 200 != o.statusCode ? (r.setStorageSync(e + "Url", ""), r.setStorageSync(e + "FilePath", ""), 
                r.invokeCallback(n)) : r.saveFile(o.tempFilePath, function(a, o) {
                    a ? r.invokeCallback(n) : (r.setStorageSync(e + "Url", t), r.setStorageSync(e + "FilePath", o.savedFilePath), 
                    r.invokeCallback(n, o.savedFilePath));
                });
            });
        }
    }, {
        key: "removeAllCache",
        value: function() {
            var e = this;
            this.getSavedFileList(function(t, n) {
                if (!t) {
                    var r = !0, a = !1, o = void 0;
                    try {
                        for (var i, u = n.fileList[Symbol.iterator](); !(r = (i = u.next()).done); r = !0) {
                            var l = i.value;
                            console.log("removeFile ", l.filePath), e.removeSavedFile(l.filePath, function() {});
                        }
                    } catch (t) {
                        a = !0, o = t;
                    } finally {
                        try {
                            !r && u.return && u.return();
                        } finally {
                            if (a) throw o;
                        }
                    }
                }
            });
        }
    }, {
        key: "randomPassword",
        value: function(e) {
            for (var t = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "p", "Q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"), n = t.length, r = "", a = 0; a < e; a++) r += t[Math.floor(Math.random() * n)];
            return r;
        }
    }, {
        key: "compareVersion",
        value: function(e, t) {
            if (!e || !t) return -1;
            e = e.split("."), t = t.split(".");
            for (var n = Math.max(e.length, t.length); e.length < n; ) e.push("0");
            for (;t.length < n; ) t.push("0");
            for (var r = 0; r < n; r++) {
                var a = parseInt(e[r]), o = parseInt(t[r]);
                if (a > o) return 1;
                if (a < o) return -1;
            }
            return 0;
        }
    }, {
        key: "setStorageSync",
        value: function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : -1;
            try {
                var r = 0;
                n > 0 && (r = new Date(this.getServerTime()).getTime() + n), wx.setStorageSync(a.RunMode + "_" + e, {
                    value: t,
                    timeout: r
                });
            } catch (n) {
                console.error("setStorageSync err", n, e, t);
            }
        }
    }, {
        key: "setStorageSyncByDay",
        value: function(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
            try {
                var r = 0;
                if (n > 0) {
                    r = new Date(new Date(this.getServerTime()).toLocaleDateString()).getTime() + 864e5 * n;
                }
                wx.setStorageSync(a.RunMode + "_" + e, {
                    value: t,
                    timeout: r
                });
            } catch (n) {
                console.error("setStorageSync err", n, e, t);
            }
        }
    }, {
        key: "getStorageSync",
        value: function(e) {
            try {
                var t = void 0, n = wx.getStorageSync(a.RunMode + "_" + e);
                return n && n.value && (!n.timeout || this.getServerTime() < n.timeout) && (t = n.value), 
                t;
            } catch (t) {
                return void console.error("getStorageSync err", t, e);
            }
        }
    }, {
        key: "removeStorageSync",
        value: function(e) {
            try {
                var t = a.RunMode + "_" + e;
                wx.removeStorageSync(t), console.log("removeStorage [" + t + "] success");
            } catch (e) {
                console.error("removeStorage [" + realKey + "] failed");
            }
        }
    }, {
        key: "clearStorageSync",
        value: function() {
            try {
                wx.clearStorageSync(), console.log("clearStorageSync success");
            } catch (e) {
                console.error("removeStorage failed");
            }
        }
    }, {
        key: "rpx2px",
        value: function(e) {
            return e / u.mainData.dpr;
        }
    }, {
        key: "setNavigationBarTitle",
        value: function(e) {
            wx.setNavigationBarTitle && wx.setNavigationBarTitle({
                title: e
            });
        }
    }, {
        key: "setPageData",
        value: function(e, t) {
            e.$util_pageData = e.$util_pageData || {}, e.$util_pageData = this.assign(e.$util_pageData, t), 
            e.$util_pageDataChanged = !0, e.$util_setPageDataTimer || (e.$util_setPageDataTimer = setTimeout(function() {
                e.$util_pageDataChanged && (e.$util_pageDataChanged = !1, e.setData(e.$util_pageData), 
                e.$util_pageData = {}), e.$util_setPageDataTimer = void 0;
            }, 1));
        }
    }, {
        key: "getServerTimezone",
        value: function() {
            return 8;
        }
    }, {
        key: "getShopClosedDesc",
        value: function() {
            var e = u.mainData.role.level >= 3 && 0 != u.uid;
            switch (~~u.getGameConf(r.gameConf.pay)) {
              case 0:
                return e ? [] : [ "等级不足" ];

              case 1:
                return [ "暂未开放", "更多精彩 敬请期待" ];

              case 2:
                return u.mainData.isIOS ? [ "暂未开放", "更多精彩 敬请期待" ] : e ? [] : [ "等级不足" ];
            }
            return [ "商店维护中", "敬请期待" ];
        }
    } ]), s;
}();

module.exports = new s();