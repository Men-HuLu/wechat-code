function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function e(e, a) {
        for (var n = 0; n < a.length; n++) {
            var t = a[n];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(a, n, t) {
        return n && e(a.prototype, n), t && e(a, t), a;
    };
}(), n = require("./../../../util/util.js"), t = require("./../../../const/consts.js"), i = require("./../../../data/SpecialData.js"), r = require("./../../../net/specialNet.js"), o = getApp(), s = function() {
    function s(a) {
        var n = this;
        e(this, s), this.controller = a, this.page = this.controller.page;
        var i = {};
        i.banner = {}, i["banner.type"] = t.coverBannerType.special, i["banner.special.subType"] = o.mainData.role.bannerInfo.base.subType, 
        i["banner.special.fontColor"] = o.mainData.role.bannerInfo.base.fontColor, this.page.setData(i), 
        this.page.bannerSpecial_onTapBanner = function() {
            n.changePage();
        }, this.addSpecialFunction();
    }
    return a(s, [ {
        key: "addSpecialFunction",
        value: function() {
            var e = this;
            this.page.ctrl_gotoSpecial = function(a) {
                if (a && a.request_ticket && a.friendCode && a.friendCode != o.mainData.role.shareCode && o.mainData.role.bannerInfo && o.mainData.role.bannerInfo.base.aid == a.shareAid) {
                    var t = n.getServerTimeBaseSecond(), i = o.mainData.role.bannerInfo.base.beginAt, r = o.mainData.role.bannerInfo.base.endAt;
                    t < i || t > r || e.sbReceived(a.friendCode) || e.request_giveTicket(a);
                }
            }, this.page.ctrl_gotoOfflineSpecial = function(a) {
                a && a.request_ticket && a.friendCode && a.friendCode != o.mainData.role.shareCode && (e.sbReceived(a.friendCode) || e.request_giveTicket(a));
            }, this.page.gotoSpecial = function() {
                e.gotoSpecial();
            };
        }
    }, {
        key: "request_giveTicket",
        value: function(e) {
            var a = this;
            r.giveTicket(e.friendCode, e.shareAid, function(n, t) {
                n ? (i.ticket.giveEnergyErrMsg = n.errMsg, a.gotoSpecial()) : (i.ticket.receiver.push({
                    friendCode: e.friendCode,
                    aid: e.shareAid
                }), i.friendInfo_requestTicket = {
                    uid: t.friendInfo.uid,
                    nickName: t.friendInfo.nickName,
                    avatarUrl: t.friendInfo.avatarUrl
                }, a.gotoSpecial());
            });
        }
    }, {
        key: "sbReceived",
        value: function(e) {
            if (!i.ticket.receiver || 0 == i.ticket.receiver.length) return !1;
            for (var a = 0; a < i.ticket.receiver.length; a++) {
                var n = i.ticket.receiver[a];
                if (n.friendCode == e && n.aid == i.data.base.aid) return !0;
            }
            return !1;
        }
    }, {
        key: "gotoSpecial",
        value: function() {
            var e = this;
            this.page.btnLock || (this.page.btnLock = !0, r.enterActivity(i.data.base.aid, function(a, t) {
                a ? (!!a.errMsg && n.ShowToast(a.errMsg), e.page.btnUnlock()) : (i.data = t, o.mainData.role.bannerInfo.player = t.player, 
                o.mainData.role.bannerInfo.base = t.base, e.refreshBanner(), e.changePage());
            }));
        }
    }, {
        key: "changePage",
        value: function() {
            var e = this;
            i.data.base.aid = o.mainData.role.bannerInfo.base.aid;
            var a = n.getServerTimeBaseSecond(), t = o.mainData.role.bannerInfo.base.calEndAt, r = o.mainData.role.bannerInfo.base.awardEndAt;
            if (a <= t) {
                wx.navigateTo({
                    url: "/page/special/special",
                    complete: function() {
                        e.page.btnUnlock();
                    }
                });
            } else if (a <= r) {
                wx.navigateTo({
                    url: "/page/special/rank_list/rank_list",
                    complete: function() {
                        e.page.btnUnlock();
                    }
                });
            } else a > r && (n.ShowToast("活动已结束"), this.page.btnUnlock());
        }
    }, {
        key: "onShow",
        value: function() {
            this.refreshBanner();
        }
    }, {
        key: "refreshBanner",
        value: function() {
            var e = this;
            if (o.mainData.role.gameConf.stopSpecialMatch) return this.controller.killBanner(), 
            void n.log("special.refreshBanner：stopSpecialMatch专题赛开关 killBanner");
            this.faildTimes = 0, this.requesting = !1;
            var a = n.getServerTimeBaseSecond(), t = (o.mainData.role.bannerInfo.base.beginAt, 
            o.mainData.role.bannerInfo.base.endAt), i = o.mainData.role.bannerInfo.base.calEndAt, r = o.mainData.role.bannerInfo.base.awardEndAt;
            if (a > r) return this.controller.killBanner(), void n.log("special.refreshBanner：不在活动期 killBanner");
            a <= t ? this.nextState = "playing" : a <= i ? this.nextState = "calc" : a <= r && (this.nextState = "award"), 
            this.clearTimeInterval_countDown(), this.updateCountdown(), this.timeFlag_countDown = setInterval(function() {
                e.updateCountdown();
            }, 1e3);
        }
    }, {
        key: "getTextCountdown",
        value: function(e) {
            return e < 86400 ? n.formatTime(e) : n.formatTime_ddhhmm(e);
        }
    }, {
        key: "updateCountdown",
        value: function() {
            var e = this;
            if (o.mainData.role.bannerInfo && o.mainData.role.bannerInfo.base) {
                var a = o.mainData.role.bannerInfo.base.endAt, t = o.mainData.role.bannerInfo.base.calEndAt, s = o.mainData.role.bannerInfo.base.awardEndAt, l = n.getServerTimeBaseSecond();
                do {
                    if (null != this.nextState) switch (this.curState = this.nextState, this.nextState = null, 
                    this.timer = 0, this.curState) {
                      case "playing":
                        if (o.mainData.role && o.mainData.role.bannerInfo && o.mainData.role.bannerInfo.player) {
                            var c = {};
                            c["banner.special.ticket"] = o.mainData.role.bannerInfo.player.ticket, this.setBannerStatus("bannerSpecial_normal", c);
                        }
                        break;

                      case "calc":
                        this.setBannerStatus("bannerSpecial_calc", {});
                        var u = {};
                        u["banner.special.textCountdown"] = "结算中...", this.page.setData(u);
                        break;

                      case "award":
                        o.mainData.role.bannerInfo.player && o.mainData.role.bannerInfo.player.isHaveAward && !o.mainData.role.bannerInfo.player.isTakeAward ? this.setBannerStatus("bannerSpecial_award", {}) : this.setBannerStatus("bannerSpecial_over", {});
                    }
                    switch (this.curState) {
                      case "playing":
                        var f = Math.max(0, a - l), d = this.getTextCountdown(f), b = {};
                        b["banner.special.textCountdown"] = "比赛剩余时间：" + d, this.page.setData(b), l > a && (this.nextState = "calc");
                        break;

                      case "calc":
                        if (l > t + 2) {
                            if (this.requesting) {
                                n.log("banner.update calc：正在请求，break;");
                                break;
                            }
                            this.requesting = !0, r.enterActivity(o.mainData.role.bannerInfo.base.aid, function(a, t) {
                                e.requesting = !1, a ? ++e.faildTimes >= 3 && (n.ShowToast("更新失败，稍后重试"), e.nextState = "waiting") : (i.data = t, 
                                o.mainData.role.bannerInfo.player = t.player || {}, o.mainData.role.bannerInfo.base = t.base || {}, 
                                e.nextState = "award");
                            });
                        }
                        break;

                      case "award":
                        var h = Math.max(0, s - l), p = this.getTextCountdown(h), g = {};
                        g["banner.special.textCountdown"] = "领奖剩余时间：" + p, this.page.setData(g), l > s && (this.controller.killBanner(), 
                        n.log("special.update：不在活动期 killBanner"));
                        break;

                      case "waiting":
                        this.timer >= 5 && this.refreshBanner();
                    }
                } while (null != this.nextState);
                this.timer++;
            }
        }
    }, {
        key: "clearTimeInterval_countDown",
        value: function() {
            this.timeFlag_countDown && (clearInterval(this.timeFlag_countDown), this.timeFlag_countDown = void 0);
        }
    }, {
        key: "setBannerStatus",
        value: function(e, a) {
            a["banner.visible"] = !0, a["banner.special.status"] = e, this.page.setData(a);
        }
    }, {
        key: "onHide",
        value: function() {
            this.clearTimeInterval_countDown();
        }
    }, {
        key: "onUnload",
        value: function() {
            this.clearTimeInterval_countDown();
        }
    } ]), s;
}();

module.exports = s;