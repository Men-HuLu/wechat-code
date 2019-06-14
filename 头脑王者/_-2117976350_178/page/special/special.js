var t = require("./template/SpecialPopupController.js"), e = require("./../../util/util.js"), a = require("./../../net/specialNet.js"), i = require("./../../util/PVERoomDataManager.js"), n = require("./../../util/RoomDataManager.js"), o = require("./../../data/SpecialData.js"), r = require("./../../util/Tween.js"), s = require("./../../net/messageNet.js"), c = require("./../../const/consts.js"), l = require("./../../const/notifyConsts.js"), u = require("./../../net/connectNotify.js"), p = require("./template/getTicketView.js"), d = getApp();

Page({
    data: {
        ani_banner: null,
        ani_body: null,
        ani_btnEntry: null,
        ani_bottom: null,
        tipsAni: null,
        tipsAni2: null,
        showTicket: !1
    },
    onLoad: function(a) {
        this.skip = a.skip, e.showShareMenu(), this.specialPopupController = new t(this), 
        u.register(l.ActionActivityUpdate, this.onActionActivityUpdate, this), d.eventDispatcher.addEventListener("specialFightOut", this.onSpecialFightOut, this);
    },
    onSpecialFightOut: function() {
        e.log("收到outfight抛出的事件specialFightOut"), this.request_enter();
    },
    onActionActivityUpdate: function(t, a) {
        if (a) {
            var i = d.mainData.role.activities;
            i || (d.mainData.role.activities = []);
            for (var n = !1, o = 0; o < i.length; o++) {
                var r = i[o];
                if (r.aid == a.aid) {
                    e.assign(r, a), n = !0;
                    break;
                }
            }
            n || i.push(a);
        }
    },
    onShow: function() {
        var t = this;
        this.skip || (this.skip = !1, this.getTicketView || (this.getTicketView = new p(this)), 
        this.request_enter(function() {
            t.getTicketView.onShow() || t.giveTicketToFriend();
            var e = {};
            e.showTicket = !0, t.setData(e), t.specialPopupController.showUnlockRoleView(), 
            t.getTicketFromFriend();
        }));
    },
    request_enter: function(t) {
        var i = this;
        a.enterActivity(o.data.base.aid, function(a, n) {
            if (a) e.ShowToast(a.errMsg), wx.navigateBack({
                delta: 1
            }); else {
                o.data = n;
                for (var r = [], s = 0; s < o.data.rankList.length && !(r.length >= 10); s++) {
                    var c = o.data.rankList[s];
                    c.scoreScale = e.getTextScale("" + c.score, 36, 80), r.push(c);
                }
                var l = {};
                l["player.ticket"] = o.data.player.ticket, l["player.cup"] = o.data.player.cup, 
                l["player.nickName"] = d.mainData.role.userInfo.nickName, l["player.avatarUrl"] = d.mainData.role.userInfo.avatarUrl, 
                l["player.rank"] = o.data.player.rank, l.subName = o.data.base.name, l.subType = o.data.base.subType, 
                l.bannerName = 1 == o.data.openDayQuiz ? "banner1_" + o.data.dayFlag + ".png" : "banner1.png", 
                l.fontColor = o.data.base.fontColor, l["player.earn"] = o.data.player.earn, l.rankList = r, 
                l.hasMoreBtn = !0, l.costTicket = o.data.costTicket, l.maxTicketPerDay = o.data.maxTicketPerDay, 
                i.setData(l), i.startTipsTimer(), o.isOfflineMatch() || i.refreshCountDown(), i.played ? t && t() : i.playerAni(function() {
                    t && t();
                });
            }
        });
    },
    playerAni: function(t) {
        var e = this;
        if (!this.played) {
            this.played = !0, setTimeout(function() {
                t && t();
            }, 2500);
            var a = r.fastGet("special", !0);
            a.wait(1e3), a.call(function() {
                var t = wx.createAnimation();
                t.scale(1.1).step({
                    duration: 300,
                    timingFunction: "ease-in"
                }), t.scale(1).step({
                    duration: 100,
                    timingFunction: "ease-out"
                });
                var a = {};
                a.ani_banner = t.export(), e.setData(a);
            }), a.wait(400), a.call(function() {
                var t = wx.createAnimation();
                t.scale(1.05).step({
                    transformOrigin: "50% 330rpx",
                    duration: 300,
                    timingFunction: "ease-in"
                }), t.scale(1).step({
                    transformOrigin: "50% 330rpx",
                    duration: 100,
                    timingFunction: "ease-out"
                });
                var a = {};
                a.ani_body = t.export(), e.setData(a);
            }), a.wait(400), a.call(function() {
                var t = wx.createAnimation();
                t.bottom("2px").step({
                    duration: 100,
                    timingFunction: "ease-in"
                }), t.bottom("0px").step({
                    duration: 100,
                    timingFunction: "ease-out"
                });
                var a = {};
                a.ani_bottom = t.export(), e.setData(a);
            }), a.wait(200), a.call(function() {
                var t = wx.createAnimation();
                t.scale(1.2).step({
                    duration: 300,
                    timingFunction: "ease-in"
                }), t.scale(1).step({
                    duration: 100,
                    timingFunction: "ease-out"
                });
                var a = {};
                a.ani_btnEntry = t.export(), e.setData(a);
            });
        }
    },
    refreshCountDown: function() {
        var t = this;
        if (e.getServerTimeBaseSecond() <= o.data.base.awardEndAt) return this.clearTimeInterval_countDown(), 
        this.updateCountdown(function() {
            t.gotoRank();
        }), void (this.timeFlag_countDown = setInterval(function() {
            t.updateCountdown(function() {
                t.gotoRank();
            });
        }, 1e3));
    },
    gotoRank: function() {
        console.log(" special.gotoRank.specialNet.enterActivity========="), a.enterActivity(o.data.base.aid, function(t, e) {
            t || (o.data = e, o.ticket.ticketFromFriend = []), wx.redirectTo({
                url: "/page/special/rank_list/rank_list"
            });
        });
    },
    getTextCountdown: function(t) {
        return t < 86400 ? e.formatTime(t) : e.formatTime_ddhhmm(t);
    },
    updateCountdown: function(t) {
        var a = o.data.base.endAt, i = o.data.base.calEndAt, n = o.data.base.awardEndAt, r = e.getServerTimeBaseSecond(), s = 0;
        if (r <= a) {
            s = Math.max(0, a - r);
            var c = this.getTextCountdown(s), l = {};
            l.textCountdown = "比赛剩余时间：" + c, this.setData(l);
        } else if (r <= i) {
            var u = {};
            u.textCountdown = "结算中...", this.setData(u);
        } else if (r <= n) {
            s = Math.max(0, n - r);
            var p = this.getTextCountdown(s), d = {};
            d.textCountdown = "领奖剩余时间：" + p, this.setData(d);
        }
        r > i && !this.gone2rank && (t && t(), this.gone2rank = !0);
    },
    clearTimeInterval_countDown: function() {
        this.timeFlag_countDown && (clearInterval(this.timeFlag_countDown), this.timeFlag_countDown = void 0);
    },
    setRoomData: function() {
        i.setData({
            type: "special",
            userInfo: {
                uid: d.mainData.role.uid,
                nickName: d.mainData.role.userInfo.nickName,
                avatarUrl: d.mainData.role.userInfo.avatarUrl,
                level: d.mainData.role.level,
                city: e.getCity(d.mainData.role.userInfo.province, d.mainData.role.userInfo.city),
                headId: d.mainData.role.headId,
                cups: d.mainData.role.cups
            }
        }, !0);
    },
    onHelp: function() {
        var t = this;
        this.btnLock || (this.btnLock = !0, wx.navigateTo({
            url: "/page/special/detail/detail",
            complete: function() {
                setTimeout(function() {
                    t.btnLock = !1;
                }, 500);
            }
        }));
    },
    onTapMoreRank: function() {
        var t = this;
        this.btnLock || (this.btnLock = !0, wx.navigateTo({
            url: "/page/special/rank_list/rank_list",
            complete: function() {
                setTimeout(function() {
                    t.btnLock = !1;
                }, 500);
            }
        }));
    },
    onTapGoto: function() {
        console.log("linkConf", o.data.linkConf, o.data.linkConf.appId, o.data.linkConf.path), 
        wx.navigateToMiniProgram && o.data.linkConf.appId && wx.navigateToMiniProgram({
            appId: o.data.linkConf.appId,
            path: o.data.linkConf.path,
            success: function(t) {
                s.markStatsEx({
                    event: c.event_point.click_link,
                    keyword1: o.data.linkConf.appName
                }), e.reportAnalytics_debug_log("" + o.data.linkConf.appName);
            },
            fail: function(t) {}
        });
    },
    onTapGo: function() {
        var t = this;
        if (!this.btnLock) if (o.isOfflineMatch()) this.go(); else if (d.mainData.role.gameConf.stopSpecialMatch) e.ShowToast("专题比赛临时关闭，请稍候。"); else {
            var a = e.getServerTimeBaseSecond(), i = o.data.base.beginAt, n = o.data.base.endAt, r = o.data.base.calEndAt, s = o.data.base.awardEndAt;
            a <= i || (a <= n ? this.go() : a <= r ? this.specialPopupController.showCountdown(function() {
                t.SpecialPopupCountdown_onClosed();
            }) : a <= s && e.ShowToast("活动已结束"));
        }
    },
    go: function() {
        this.btnLock = !0, o.data.player.ticket >= o.data.costTicket ? (this.setRoomData(), 
        wx.navigateTo({
            url: "/page/fight/fight?fightType=special",
            complete: function() {}
        }), this.btnLock = !1, o.data.player.ticket -= o.data.costTicket, o.data.tncjNeedCup.length > 0 && (o.myDreamCup = o.data.tncjNeedCup[0])) : o.friends.length >= o.data.maxFriendGive ? (this.specialPopupController.showNoTicket(), 
        this.btnLock = !1) : (this.specialPopupController.showNeedTicket(), this.btnLock = !1);
    },
    onHide: function() {
        this.clearTimeInterval_countDown(), this.specialPopupController.onHide(), clearTimeout(this.tipsTimer), 
        clearTimeout(this.calEndTimer), clearInterval(this.interval_getTicket), this.interval_getTicket = void 0;
    },
    onUnload: function() {
        u.remove(l.ActionActivityUpdate, this.onActionActivityUpdate), d.eventDispatcher.removeEventListener("specialFightOut", this.onSpecialFightOut, this), 
        this.clearTimeInterval_countDown(), clearTimeout(this.tipsTimer), clearTimeout(this.calEndTimer), 
        clearInterval(this.interval_getTicket), this.interval_getTicket = void 0;
    },
    startTipsTimer: function() {
        var t = this;
        if (o.data && o.data.tips) {
            var e = o.data.tips.length, a = r.fastGet("tipsAni", !0);
            a.call(function() {
                var a = {}, i = wx.createAnimation();
                i.left("-100%").step({
                    timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                    duration: 800
                }), a.tipsAni = i.export();
                var n = wx.createAnimation();
                n.left("0px").step({
                    timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                    duration: 800
                }), a.tipsAni2 = n.export(), t.tipsIndex = ~~t.tipsIndex, a.tipsText = o.data.tips[t.tipsIndex % e], 
                a.tipsText2 = o.data.tips[(t.tipsIndex + 1) % e], t.setData(a);
            }), a.wait(1e3), a.call(function() {
                var a = {}, i = wx.createAnimation();
                i.left("0px").step({
                    timingFunction: "step-start",
                    duration: 0
                }), a.tipsAni = i.export();
                var n = wx.createAnimation();
                n.left("100%").step({
                    timingFunction: "step-start",
                    duration: 0
                }), a.tipsAni2 = n.export(), a.tipsText = o.data.tips[(t.tipsIndex + 1) % e], a.tipsText2 = o.data.tips[(t.tipsIndex + 2) % e], 
                t.setData(a), t.tipsIndex++;
            }), this.tipsTimer = setTimeout(this.startTipsTimer.bind(this), 1e4);
        }
    },
    onShareAppMessage: function(t) {
        var a = this, i = null;
        if (t && t.target) {
            if ("liveFight" == t.target.id) {
                var r = d.shareManager.getSpecialLiveShareData({
                    shareCode: d.mainData.role.shareCode
                });
                return d.shareConf(r, !0, function() {
                    n.shareToSpecialLive(function(t) {
                        a.btnLock = !1, t && e.ShowConfirm(t.errCode, t.errMsg, function() {});
                    });
                });
            }
            "request_ticket" == t.target.id && (i = d.shareManager.getSpecial_request_ticket_ShareData(o.data.base.aid, o.isZjwMath()));
        }
        return i || (i = d.shareManager.getSpecialShareData(o.isZjwMath())), d.shareConf(i);
    },
    onTapHezuoBtn: function() {
        this.setData({
            hezuoViewVisible: !0
        });
    },
    hezuoView_onClosed: function() {
        this.setData({
            hezuoViewVisible: !1
        });
    },
    onTapSpacialLive: function() {
        var t = this;
        this.btnLock || (this.btnLock = !0, n.spacialToLive(function(e) {
            e && n.clearRoomData(), t.btnLock = !1;
        }));
    }
});