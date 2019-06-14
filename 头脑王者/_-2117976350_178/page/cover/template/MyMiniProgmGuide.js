function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function e(e, a) {
        for (var t = 0; t < a.length; t++) {
            var i = a[t];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(a, t, i) {
        return t && e(a.prototype, t), i && e(a, i), a;
    };
}(), t = require("./../../../util/util.js"), i = require("./../../../net/rewardNet"), o = require("./../../../const/modeConsts.js"), r = require("./../../../data/ItemsManager.js"), n = require("./../../../util/Tween.js"), d = getApp(), s = o.RunMode == o.RunModeType.Prod ? "6.7.1" : "6.0.0", c = "showedMiniProgmArrow.008", x = "intoByXcxbarToday.014", u = "每天快速启动可获得登录奖励", l = "明天快速启动可获得更多奖励", g = function() {
    function o(a) {
        var i = this;
        e(this, o), this.page = a, "myMiniProgm" == d.mainData.loginArgs.from && void 0 == t.getStorageSync(x) && t.setStorageSyncByDay(x, !0, 1), 
        this.page.MyMiniProgmArrow_CoverBtn_Onclicked = function() {
            if ("myMiniProgm" == d.mainData.loginArgs.from) i.showReward(); else {
                var e = ~~d.mainData.role.xcxReward, a = t.getStorageSync(c);
                e > 0 || a ? i.showReward() : i.showArrow();
            }
        }, this.page.gotoXcxGuide_onTapClose = function(e) {
            i.hideArrow();
        }, this.page.gotoXcxGuide_btnGo_onclicked = function() {
            i.hideArrow(), i.showGuide();
        }, this.page.XcxGuide_onTapClose = function(e) {
            i.hideGuide();
        }, this.page.XcxGuide_btnNext_onclicked = function() {
            var e = i.page.data.xcxGuideData.step + 1;
            if (e > 2) i.hideGuide(); else {
                var a = {};
                a["xcxGuideData.step"] = e, i.page.setData(a);
            }
        }, this.page.xcxGuideReward_gold_onTapClose = function() {
            i.hideReward();
        }, this.page.xcxGuideReward_bigbox_onTapClose = function() {
            i.hideReward();
        }, this.page.xcxGuideReward_bigbox_btnGet_onclicked = function() {
            i.request_getReward(function(e) {
                d.mainData.role.lastXcxRewardAt = t.getServerTimeBaseSecond(), d.mainData.role.xcxReward = 1, 
                t.ShowToast("领取成功");
                var a = {};
                a["xcxGuideReward_bigboxData.hasGot"] = !0, a.guideBtnBadgeVisible = !1, i.page.setData(a);
            });
        }, this.page.xcxGuideReward_gold_btnGet_onclicked = function() {
            i.request_getReward(function(e) {
                d.mainData.role.xcxGoldAt = t.getServerTimeBaseSecond(), d.mainData.role.xcxGoldNum = e.itemNum, 
                d.mainData.role.xcxGoldDay += 1, t.ShowToast("领取成功");
                var a = d.mainData.role.allSeeds.baseConf.xcxMaxGoldDay, o = d.mainData.role.xcxGoldDay, r = {};
                r["xcxGuideReward_goldData.xcxGoldNum"] = d.mainData.role.xcxGoldNum, r["xcxGuideReward_goldData.hasGot"] = !0, 
                r["xcxGuideReward_goldData.desc"] = o < a ? l : u, r.guideBtnBadgeVisible = !1, 
                i.page.setData(r), i.playOpenBox();
            });
        };
    }
    return a(o, [ {
        key: "playOpenBox",
        value: function() {
            var e = this, a = n.fastGet("openGoldBox");
            a.wait(200), a.call(function() {
                var a = wx.createAnimation();
                a.opacity(0).step({
                    duration: 500,
                    timingFunction: "ease-out"
                });
                var t = {};
                t["xcxGuideReward_goldData.ani_box2"] = a.export(), e.page.setData(t);
            }), a.wait(100), a.call(function() {
                var a = wx.createAnimation();
                a.opacity(1).scale(1.3).step({
                    duration: 250,
                    timingFunction: "ease-out"
                }), a.opacity(1).scale(1).step({
                    duration: 250,
                    timingFunction: "ease-out"
                });
                var t = {};
                t["xcxGuideReward_goldData.ani_gold"] = a.export(), e.page.setData(t);
            });
        }
    }, {
        key: "initOpenBox",
        value: function() {
            var e = wx.createAnimation();
            e.opacity(0).step({
                duration: 50,
                timingFunction: "step-start"
            });
            var a = wx.createAnimation();
            a.opacity(1).scale(1).step({
                duration: 50,
                timingFunction: "step-start"
            });
            var t = {};
            t["xcxGuideReward_goldData.ani_box2"] = e.export(), t["xcxGuideReward_goldData.ani_gold"] = a.export(), 
            this.page.setData(t);
        }
    }, {
        key: "request_getReward",
        value: function(e) {
            var a = this;
            this.page.btnLock || (!!t.getStorageSync(x) ? (this.page.btnLock = !0, i.gainXcxReward(function(i, o) {
                i ? t.ShowConfirm("", i.errMsg, function() {}) : o && (r.addItem(o.itemId, o.itemNum), 
                e && e(o)), setTimeout(function() {
                    a.page.btnLock = !1;
                }, 500);
            })) : t.ShowToast("从『我的小程序』进入游戏可领奖"));
        }
    }, {
        key: "showGuideBtn",
        value: function() {
            if (this.hideGuideBtn(), d.mainData.isIOS && d.systemInfo && -1 != t.compareVersion(d.systemInfo.version, s)) {
                var e = {};
                e.guideBtnVisible = !0, e.guideBtnBadgeVisible = this.showRewardBadge(), this.page.setData(e);
            }
        }
    }, {
        key: "hideGuideBtn",
        value: function() {
            var e = {};
            e.guideBtnVisible = !1, this.page.setData(e);
        }
    }, {
        key: "showArrow",
        value: function() {
            var e = {};
            e["gotoXcxGuideData.visible"] = !0, this.page.setData(e);
        }
    }, {
        key: "hideArrow",
        value: function() {
            var e = {};
            e["gotoXcxGuideData.visible"] = !1, this.page.setData(e);
        }
    }, {
        key: "showGuide",
        value: function() {
            var e = {};
            e["xcxGuideData.visible"] = !0, e["xcxGuideData.step"] = 1, this.page.setData(e);
        }
    }, {
        key: "hideGuide",
        value: function() {
            var e = {};
            e["xcxGuideData.visible"] = !1, this.page.setData(e);
        }
    }, {
        key: "showGuideActive",
        value: function() {
            d.mainData.isIOS && d.systemInfo && -1 != t.compareVersion(d.systemInfo.version, s) && "myMiniProgm" != d.mainData.loginArgs.from && 1 != d.mainData.role.xcxReward && (d.isBeginnerTestUser() || this.page.data.getTicketViewData && this.page.data.getTicketViewData.visible || t.getStorageSync("showedXcxBigboxActive.008") || (this.showArrow(), 
            t.setStorageSync("showedXcxBigboxActive.008", !0)));
        }
    }, {
        key: "showRewardActive",
        value: function() {
            d.mainData.isIOS && d.systemInfo && -1 != t.compareVersion(d.systemInfo.version, s) && "myMiniProgm" == d.mainData.loginArgs.from && 1 != d.mainData.role.xcxReward && (this.page.data.getTicketViewData && this.page.data.getTicketViewData.visible || t.getStorageSync("showedXcxGuideActive.008") || (this.showReward(), 
            t.setStorageSync("showedXcxGuideActive.008", !0)));
        }
    }, {
        key: "showReward",
        value: function() {
            var e = ~~d.mainData.role.xcxReward, a = ~~d.mainData.role.lastXcxRewardAt, i = 86400 * Math.floor(a / 86400) - 3600 * t.getServerTimezone(), o = t.getServerTimeBaseSecond(), r = o - i, n = i > 0 && r < 86400, s = !!t.getStorageSync(x);
            if (0 == e || n) {
                var g = e > 0, D = {};
                D["xcxGuideReward_bigboxData.visible"] = !0, D["xcxGuideReward_bigboxData.hasGot"] = g, 
                D["xcxGuideReward_bigboxData.intoFromA"] = s, D["xcxGuideReward_bigboxData.desc"] = g ? l : s ? u : "从『我的小程序』进入游戏可领奖", 
                this.page.setData(D), t.setStorageSyncByDay(c, !0);
            } else {
                var w = d.mainData.role.allSeeds.baseConf.xcxMaxGoldDay, m = d.mainData.role.xcxGoldDay, G = d.mainData.role.xcxGoldAt;
                if (i = 86400 * Math.floor(G / 86400) - 3600 * t.getServerTimezone(), (r = o - i) < 86400) {
                    var h = {};
                    h["xcxGuideReward_goldData.visible"] = !0, h["xcxGuideReward_goldData.hasGot"] = !0, 
                    h["xcxGuideReward_goldData.maxDayNum"] = w, h["xcxGuideReward_goldData.xcxGoldDay"] = m, 
                    h["xcxGuideReward_goldData.xcxGoldNum"] = d.mainData.role.xcxGoldNum, h["xcxGuideReward_goldData.intoFromA"] = s, 
                    h["xcxGuideReward_goldData.desc"] = m < w ? l : u, this.page.setData(h), this.initOpenBox();
                } else if (r < 172800) {
                    var v = d.mainData.role.allSeeds.baseConf.xcxMaxGoldDay;
                    m + 1 > v && (m = 0, d.mainData.role.xcxGoldDay = 0);
                    var p = {};
                    p["xcxGuideReward_goldData.visible"] = !0, p["xcxGuideReward_goldData.hasGot"] = !1, 
                    p["xcxGuideReward_goldData.maxDayNum"] = v, p["xcxGuideReward_goldData.xcxGoldDay"] = m + 1, 
                    p["xcxGuideReward_goldData.intoFromA"] = s, p["xcxGuideReward_goldData.desc"] = s ? u : "从『我的小程序』进入游戏可领奖", 
                    this.page.setData(p);
                } else {
                    m = 0, d.mainData.role.xcxGoldDay = 0;
                    var f = {};
                    f["xcxGuideReward_goldData.visible"] = !0, f["xcxGuideReward_goldData.hasGot"] = !1, 
                    f["xcxGuideReward_goldData.maxDayNum"] = w, f["xcxGuideReward_goldData.xcxGoldDay"] = m + 1, 
                    f["xcxGuideReward_goldData.intoFromA"] = s, f["xcxGuideReward_goldData.desc"] = s ? u : "从『我的小程序』进入游戏可领奖", 
                    this.page.setData(f);
                }
            }
        }
    }, {
        key: "hideReward",
        value: function() {
            var e = {};
            e["xcxGuideReward_bigboxData.visible"] = !1, e["xcxGuideReward_goldData.visible"] = !1, 
            this.page.setData(e);
        }
    }, {
        key: "showRewardBadge",
        value: function() {
            if (!!!t.getStorageSync(x)) return !1;
            var e = ~~d.mainData.role.xcxReward, a = ~~d.mainData.role.lastXcxRewardAt, i = 86400 * Math.floor(a / 86400) - 3600 * t.getServerTimezone(), o = t.getServerTimeBaseSecond(), r = o - i, n = i > 0 && r < 86400;
            if (0 == e || n) return e <= 0;
            d.mainData.role.xcxGoldDay;
            var s = d.mainData.role.xcxGoldAt;
            return i = 86400 * Math.floor(s / 86400) - 3600 * t.getServerTimezone(), !((r = o - i) < 86400);
        }
    } ]), o;
}();

module.exports = g;