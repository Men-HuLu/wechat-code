function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var a = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var a = t[n];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, n, a) {
        return n && e(t.prototype, n), a && e(t, a), t;
    };
}(), i = function e(t, n, a) {
    null === t && (t = Function.prototype);
    var i = Object.getOwnPropertyDescriptor(t, n);
    if (void 0 === i) {
        var l = Object.getPrototypeOf(t);
        return null === l ? void 0 : e(l, n, a);
    }
    if ("value" in i) return i.value;
    var r = i.get;
    if (void 0 !== r) return r.call(a);
}, l = require("stateNone.js"), r = require("../../../../util/util.js"), o = (require("../../../../const/consts.js"), 
require("../../../../const/notifyConsts.js")), s = require("../../../../util/Tween.js"), u = require("../../../../util/ChallengeRoomDataManager.js"), g = require("../../../../net/connectNotify.js"), h = require("../../template/liveConsts.js"), c = require("../../template/audienceViewController.js"), d = require("../../../../net/wsconnect.js"), p = getApp(), f = function(f) {
    function m(n) {
        e(this, m);
        var a = t(this, (m.__proto__ || Object.getPrototypeOf(m)).call(this));
        return a.page = n, a.name = "ChallengeStatusReady", a;
    }
    return n(m, l), a(m, [ {
        key: "init",
        value: function() {
            this.offsetb = 698 / p.mainData.dpr, this.offsetb_init = 714 / p.mainData.dpr, this.xOfChallenge = "0px", 
            this.lastStatus = u.curRoom.status, this.registerConnectNotify(), this.flush(), 
            this.audienceViewController = new c(this.page, "audienceView"), this.audienceViewController.setMemberList(u.curRoom.members);
        }
    }, {
        key: "flush",
        value: function() {
            var e = this, t = {
                ChallengeStatusReady: {
                    winnerInfo: u.getWinnerInfo(),
                    challengerInfo: u.getChallengerInfo(),
                    curRoom: u.curRoom,
                    btnStatus: 0,
                    countdownToPlundering: {
                        visible: !1,
                        num: 3,
                        text: "3"
                    },
                    countdownToFight: {
                        visible: !1,
                        num: 3,
                        text: "3"
                    },
                    countDownToExpire: ""
                }
            };
            if (this.page.setData(t), this.page.onTapBtnPlundering = function() {
                e.onTapBtnPlundering();
            }, this.isChallengeStatusChallenge()) {
                var n = r.getServerTimeBaseSecond(), a = u.curRoom.statusExpireAt - n - 2;
                a <= 0 && u.curRoom.roomID > 0 ? (r.log("迟到了，瞬间进入战斗 delta = ", a), this.go2fighting()) : this.fastgoinghole();
            } else this.isChallengeStatusRunning() ? this.go2fighting() : this.initAni();
            this.refreshCenterView();
        }
    }, {
        key: "registerConnectNotify",
        value: function() {
            g.register(o.ActionChallengeInfoBase, this.onActionChallengeInfoBase, this), g.register(o.socketClose, this.onSocketClose, this), 
            g.register(o.socketOpen, this.onSocketOpen, this);
        }
    }, {
        key: "removeConnectNotify",
        value: function() {
            g.remove(o.ActionChallengeInfoBase, this.onActionChallengeInfoBase), g.remove(o.socketClose, this.onSocketClose), 
            g.remove(o.socketOpen, this.onSocketOpen);
        }
    }, {
        key: "onSocketClose",
        value: function(e) {
            r.log("擂台长连接断开"), this.startBreakingTimeout();
        }
    }, {
        key: "onSocketOpen",
        value: function(e) {
            var t = this;
            r.log("擂台长连接重连"), this.clearBreakingTimeout();
            var n = {};
            n["ChallengeStatusReady.wsconnectBreaking"] = !d.socketOpen, this.page.setData(n), 
            u.request_flushChallenge(u.curRoom.id, function(e, n) {
                e ? r.ShowConfirm("提示", e.errMsg, function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }) : t.flush();
            });
        }
    }, {
        key: "startBreakingTimeout",
        value: function() {
            var e = this;
            this.clearBreakingTimeout(), this.breakingTimeout = setTimeout(function() {
                var t = {};
                t["ChallengeStatusReady.wsconnectBreaking"] = !d.socketOpen, e.page.setData(t);
            }, 3e3);
        }
    }, {
        key: "clearBreakingTimeout",
        value: function() {
            this.breakingTimeout && (clearTimeout(this.breakingTimeout), this.breakingTimeout = void 0);
        }
    }, {
        key: "winnerChanged",
        value: function(e) {
            var t = this, n = 0;
            switch (!this.page.data.ChallengeStatusReady.winnerInfo.uid && e.uid ? n = 1 : this.page.data.ChallengeStatusReady.winnerInfo.uid && !e.uid ? n = 2 : this.page.data.ChallengeStatusReady.winnerInfo.uid != e.uid && (n = 3), 
            r.log("擂主变化 type:", n, this.page.data.ChallengeStatusReady.winnerInfo.uid, e.uid), 
            n) {
              case 1:
                var a = {};
                a["ChallengeStatusReady.winnerInfo.uid"] = e.uid, a["ChallengeStatusReady.winnerInfo.avatarUrl"] = e.avatarUrl, 
                a["ChallengeStatusReady.winnerInfo.name"] = e.name, a["ChallengeStatusReady.winnerInfo.successCount"] = e.successCount, 
                a.sharePromptViewVisible = !1, this.page.setData(a), this.setWinnerAvatar({}, function() {
                    t.trygoinghole();
                });
                break;

              case 2:
                this.setWinnerAvatar(null, function() {
                    var e = {};
                    e["ChallengeStatusReady.winnerInfo"] = {}, t.page.setData(e), t.tryback(), t.page.checkCountDown();
                });
                break;

              case 3:
                var i = {};
                i["ChallengeStatusReady.winnerInfo.uid"] = e.uid, i["ChallengeStatusReady.winnerInfo.avatarUrl"] = e.avatarUrl, 
                i["ChallengeStatusReady.winnerInfo.name"] = e.name, i["ChallengeStatusReady.winnerInfo.successCount"] = e.successCount, 
                this.page.setData(i), this.refreshCenterView();
                break;

              default:
                r.log("winnerChanged:围观者进出 ", n, this.page.data.ChallengeStatusReady.winnerInfo.uid, e.uid);
            }
        }
    }, {
        key: "challengerChanged",
        value: function(e) {
            var t = this, n = 0;
            switch (!this.page.data.ChallengeStatusReady.challengerInfo.uid && e.uid ? n = 1 : this.page.data.ChallengeStatusReady.challengerInfo.uid && !e.uid ? n = 2 : this.page.data.ChallengeStatusReady.challengerInfo.uid != e.uid && (n = 3), 
            r.log("挑战者变化 type:", n, this.page.data.ChallengeStatusReady.challengerInfo.uid, e.uid), 
            n) {
              case 1:
                var a = {};
                a["ChallengeStatusReady.challengerInfo.uid"] = e.uid, a["ChallengeStatusReady.challengerInfo.avatarUrl"] = e.avatarUrl, 
                a["ChallengeStatusReady.challengerInfo.name"] = e.name, a["ChallengeStatusReady.challengerInfo.successCount"] = e.successCount, 
                a.sharePromptViewVisible = !1, this.page.setData(a), this.setChallengerAvatar({}, function() {
                    t.trygoinghole();
                });
                break;

              case 2:
                var i = {};
                i["ChallengeStatusReady.challengerInfo"] = {}, this.page.setData(i), this.setChallengerAvatar(null, function() {
                    t.tryback();
                }), this.page.checkCountDown();
                break;

              case 3:
                var l = {};
                l["ChallengeStatusReady.challengerInfo.uid"] = e.uid, l["ChallengeStatusReady.challengerInfo.avatarUrl"] = e.avatarUrl, 
                l["ChallengeStatusReady.challengerInfo.name"] = e.name, l["ChallengeStatusReady.challengerInfo.successCount"] = e.successCount, 
                this.page.setData(l), this.refreshCenterView();
                break;

              default:
                r.log("围观者进出 ", n, this.page.data.ChallengeStatusReady.challengerInfo.uid, e.uid);
            }
        }
    }, {
        key: "onTapBtnPlundering",
        value: function() {
            var e = this;
            this.btnLock || (this.btnLock = !0, u.request_challenge(u.curRoom.id, function(t, n) {
                if (setTimeout(function() {
                    e.btnLock = !1;
                }, 1e3), t) ; else if (0 == n.code) if (e.isChallengeStatusChallenge()) {
                    var a = u.getMemberInfo(u.curRoom.curChallenger), i = {};
                    i["ChallengeStatusReady.challengerInfo.uid"] = a.uid, i["ChallengeStatusReady.challengerInfo.avatarUrl"] = a.avatarUrl, 
                    i["ChallengeStatusReady.challengerInfo.name"] = a.name, i["ChallengeStatusReady.challengerInfo.successCount"] = a.successCount, 
                    e.page.setData(i), e.setChallengerAvatar({}, function() {
                        e.trygoinghole();
                    });
                } else e.refreshCenterView(); else e.flush();
            }));
        }
    }, {
        key: "go2fighting",
        value: function() {
            var e = this;
            u.setRoomId(u.curRoom.roomID);
            var t = u.getData();
            t.type = u.iAmAudience() ? "obChallenge" : "challenge", this.page.dontLeave = !0, 
            wx.redirectTo({
                url: "/page/fight/fight?fightType=" + t.type,
                complete: function() {
                    setTimeout(function() {
                        e.btnLock = !1;
                    }, 100);
                }
            });
        }
    }, {
        key: "onActionChallengeInfoBase",
        value: function(e, t) {
            if (this.lastPushData = t, t.membersChangeInfo) {
                for (var n = 0; n < t.membersChangeInfo.length; n++) {
                    var a = t.membersChangeInfo[n];
                    1 == a.type ? this.audienceViewController.addMember(a) : 2 == a.type ? this.audienceViewController.removeMember(a) : 3 == a.type && this.audienceViewController.upDateMemberData(a);
                }
                this.audienceViewController && this.audienceViewController.setMemberList(u.curRoom.members);
            }
        }
    }, {
        key: "processMembersChange",
        value: function() {
            if (u.curRoom.curWinner != this.page.data.ChallengeStatusReady.winnerInfo.uid) {
                var e = u.getWinnerInfo();
                this.winnerChanged(e);
            }
            if (u.curRoom.curChallenger != this.page.data.ChallengeStatusReady.challengerInfo.uid) {
                var t = u.getChallengerInfo();
                this.challengerChanged(t);
            }
        }
    }, {
        key: "test_countdownToPlundering",
        value: function() {
            var e = this, t = u.getChallengeResultWaitDur() + u.getrChallengeWaitDur(), n = u.curRoom.statusExpireAt + t, a = r.getServerTimeBaseSecond(), i = Math.max(n - a, 0);
            if (i <= 0) {
                var l = {};
                l["ChallengeStatusReady.countdownToPlundering.visible"] = !1, l["ChallengeStatusReady.btnStatus"] = 2, 
                this.page.setData(l);
            } else if (!this.timeInterval_countdownToPlundering) {
                var o = {};
                o["ChallengeStatusReady.countdownToPlundering.visible"] = !0, o["ChallengeStatusReady.countdownToPlundering.num"] = i, 
                o["ChallengeStatusReady.countdownToPlundering.text"] = "" + i, this.timeInterval_countdownToPlundering = setInterval(function() {
                    var t = r.getServerTimeBaseSecond(), a = {}, i = n - t, l = "" + i;
                    i <= 0 && (clearInterval(e.timeInterval_countdownToPlundering), e.timeInterval_countdownToPlundering = void 0, 
                    l = null, a["ChallengeStatusReady.countdownToPlundering.visible"] = !1, a["ChallengeStatusReady.btnStatus"] = 2), 
                    a["ChallengeStatusReady.countdownToPlundering.num"] = i, a["ChallengeStatusReady.countdownToPlundering.text"] = l, 
                    e.page.setData(a);
                }, 1e3);
            }
        }
    }, {
        key: "test_countdownForFight",
        value: function() {
            var e = this, t = r.getServerTimeBaseSecond(), n = u.curRoom.statusExpireAt - t - 2;
            if (r.log("curTime:", r.formatTime(t), "/statusExpireAt:", r.formatTime(u.curRoom.statusExpireAt), "/delta:", n), 
            n < 0) {
                var a = {};
                return a["ChallengeStatusReady.countdownToFight.text"] = "开始战斗", this.page.setData(a), 
                void this.go2fighting();
            }
            var i = {};
            i["ChallengeStatusReady.countdownToFight.visible"] = !0, i["ChallengeStatusReady.countdownToFight.num"] = n, 
            i["ChallengeStatusReady.countdownToFight.text"] = n > 0 ? "" + n : "开始战斗", this.page.setData(i), 
            this.timeInterval_countdownForFight || (this.timeInterval_countdownForFight = setInterval(function() {
                var t = r.getServerTimeBaseSecond(), n = u.curRoom.statusExpireAt - t - 2;
                r.log("curTime:", r.formatTime(t), "/statusExpireAt:", r.formatTime(u.curRoom.statusExpireAt), "/delta:", n);
                var a = {};
                a["ChallengeStatusReady.countdownToFight.num"] = n;
                var i = "" + n;
                if (n < 0) i = null, u.curRoom.roomID > 0 ? (a["ChallengeStatusReady.countdownToFight.visible"] = !1, 
                clearInterval(e.timeInterval_countdownForFight), e.timeInterval_countdownForFight = void 0, 
                e.go2fighting()) : e.isChallengeStatusChallenge() || (a["ChallengeStatusReady.countdownToFight.visible"] = !1, 
                clearInterval(e.timeInterval_countdownForFight), e.timeInterval_countdownForFight = void 0); else if (0 == n) i = "开始战斗"; else if (1 == n) {
                    var l = 600 / p.mainData.dpr, o = {}, s = wx.createAnimation(), g = e.xOfWinner;
                    "-110px" == e.xOfWinner ? g = "-" + l + "px" : "110px" == e.xOfWinner && (g = l + "px"), 
                    e.xOfWinner = g, s.translate3d(g, "0px", "0px").step({
                        delay: 300,
                        duration: 400,
                        timingFunction: "ease-in-out"
                    }), o["ChallengeStatusReady.ani_hole_winner"] = s.export();
                    var h = wx.createAnimation(), c = e.xOfChallenge;
                    "-110px" == e.xOfChallenge ? c = "-" + l + "px" : "110px" == e.xOfChallenge && (c = l + "px"), 
                    e.xOfChallenge = c, h.translate3d(c, "-" + e.offsetb + "px", "0px").step({
                        delay: 300,
                        duration: 400,
                        timingFunction: "ease-in-out"
                    }), o["ChallengeStatusReady.ani_hole_challenge"] = h.export(), e.page.setData(o);
                }
                a["ChallengeStatusReady.countdownToFight.num"] = n, a["ChallengeStatusReady.countdownToFight.text"] = i, 
                e.page.setData(a);
            }, 1e3));
        }
    }, {
        key: "trygoinghole",
        value: function() {
            var e = this;
            if (this.isChallengeStatusChallenge()) {
                this.tryGoingholePlaying = !0, setTimeout(function() {
                    r.log("trygoinghole()->test_countdownForFight()"), e.tryGoingholePlaying = !1, e.test_countdownForFight();
                }, 1e3), r.log("擂台赛匹配成功~");
                var t = {}, n = wx.createAnimation();
                n.scale(0).step({
                    duration: 250,
                    timingFunction: "ease-in"
                }), t["ChallengeStatusReady.ani_centerview"] = n.export();
                var a = "0px";
                a = u.iAmWinner() ? "-110px" : u.iAmChallenger() ? "110px" : "-110px";
                var i = wx.createAnimation();
                i.translate3d(a, "0px", "0px").step({
                    delay: 300,
                    duration: 400,
                    timingFunction: "ease-in-out"
                }), t["ChallengeStatusReady.ani_hole_winner"] = i.export(), this.xOfWinner = a;
                var l = this.getXOfChallenge();
                if (r.log("挑战者动画 xOfChallenge:", l, "/this.xOfChallenge:", l), this.xOfChallenge != l) {
                    var o = wx.createAnimation();
                    o.translate3d("0px", "-" + this.offsetb + "px", "0px").step({
                        delay: 300,
                        duration: 200,
                        timingFunction: "ease-in-out"
                    }), o.translate3d(l, "-" + this.offsetb + "px", "0px").step({
                        duration: 200,
                        timingFunction: "ease-in-out"
                    }), t["ChallengeStatusReady.ani_hole_challenge"] = o.export();
                }
                this.xOfChallenge = l, this.page.setData(t);
            }
        }
    }, {
        key: "fastgoinghole",
        value: function() {
            var e = this;
            if (this.isChallengeStatusChallenge()) {
                this.fastgoingholePlaying = !0, r.log("擂台赛匹配成功~");
                var t = {};
                this.initWinnerAvatar(t), this.initChallengeAvartar(t);
                var n = wx.createAnimation();
                n.scale(0).step({
                    duration: 800,
                    timingFunction: "step-start"
                }), t["ChallengeStatusReady.ani_centerview"] = n.export();
                var a = "0px";
                a = u.iAmWinner() ? "-110px" : u.iAmChallenger() ? "110px" : "-110px";
                var i = wx.createAnimation();
                i.translate3d(a, "0px", "0px").step({
                    duration: 800,
                    timingFunction: "step-start"
                }), t["ChallengeStatusReady.ani_hole_winner"] = i.export(), this.xOfWinner = a;
                var l = this.getXOfChallenge(), o = wx.createAnimation();
                o.translate3d(l, "-" + this.offsetb + "px", "0px").step({
                    duration: 800,
                    timingFunction: "step-start"
                }), t["ChallengeStatusReady.ani_hole_challenge"] = o.export(), this.xOfChallenge = l, 
                this.page.setData(t), setTimeout(function() {
                    e.fastgoingholePlaying = !1, r.log("fastgoinghole->test_countdownForFight()"), e.test_countdownForFight();
                }, 800);
            }
        }
    }, {
        key: "getXOfChallenge",
        value: function() {
            return u.iAmWinner() ? "110px" : u.iAmChallenger() ? "-110px" : "110px";
        }
    }, {
        key: "hideCountdown2Fight",
        value: function(e) {
            e["ChallengeStatusReady.countdownToFight.visible"] = !1, this.timeInterval_countdownForFight && (clearInterval(this.timeInterval_countdownForFight), 
            this.timeInterval_countdownForFight = void 0);
        }
    }, {
        key: "initWinnerAvatar",
        value: function(e) {
            if (u.getWinnerInfo().uid) {
                var t = wx.createAnimation();
                t.scale(1).step({
                    duration: 100,
                    timingFunction: "step-start",
                    transformOrigin: "50% 60rpx 0"
                });
                var n = wx.createAnimation();
                n.scale(0).step({
                    duration: 100,
                    timingFunction: "step-start"
                }), e["ChallengeStatusReady.ani_winner_full"] = t.export(), e["ChallengeStatusReady.ani_winner_null"] = n.export();
            } else {
                var a = wx.createAnimation();
                a.scale(0).step({
                    duration: 100,
                    timingFunction: "step-start",
                    transformOrigin: "50% 60rpx 0"
                });
                var i = wx.createAnimation();
                i.scale(1).step({
                    duration: 100,
                    timingFunction: "step-start"
                }), e["ChallengeStatusReady.ani_winner_full"] = a.export(), e["ChallengeStatusReady.ani_winner_null"] = i.export();
            }
        }
    }, {
        key: "initChallengeAvartar",
        value: function(e) {
            if (u.getChallengerInfo().uid) {
                var t = wx.createAnimation();
                t.scale(1).step({
                    duration: 100,
                    timingFunction: "step-start",
                    transformOrigin: "50% 60rpx 0"
                });
                var n = wx.createAnimation();
                n.scale(0).step({
                    duration: 100,
                    timingFunction: "step-start"
                }), e["ChallengeStatusReady.ani_challenge_full"] = t.export(), e["ChallengeStatusReady.ani_challenge_null"] = n.export();
            } else {
                var a = wx.createAnimation();
                a.scale(0).step({
                    duration: 100,
                    timingFunction: "step-start",
                    transformOrigin: "50% 60rpx 0"
                });
                var i = wx.createAnimation();
                i.scale(1).step({
                    duration: 100,
                    timingFunction: "step-start"
                }), e["ChallengeStatusReady.ani_challenge_full"] = a.export(), e["ChallengeStatusReady.ani_challenge_null"] = i.export();
            }
        }
    }, {
        key: "initAni",
        value: function() {
            if (this.isChallengeStatusReady()) {
                r.log("初始化种坑位及中间信息~");
                var e = {};
                this.initWinnerAvatar(e);
                var t = wx.createAnimation();
                t.translate3d("0px", "0px", "0px").step({
                    duration: 0,
                    timingFunction: "step-start"
                }), e["ChallengeStatusReady.ani_hole_winner"] = t.export(), this.xOfWinner = "0px", 
                this.initChallengeAvartar(e);
                var n = wx.createAnimation();
                n.translate3d("0px", "0px", "0px").step({
                    duration: 0,
                    timingFunction: "step-start"
                }), e["ChallengeStatusReady.ani_hole_challenge"] = n.export();
                var a = wx.createAnimation();
                a.scale(1).step({
                    duration: 0,
                    timingFunction: "step-start"
                }), e["ChallengeStatusReady.ani_centerview"] = a.export(), this.page.setData(e);
            }
        }
    }, {
        key: "tryback",
        value: function() {
            var e = this;
            if (this.isChallengeStatusReady()) {
                this.backPlaying = !0, r.log("有人怂了~");
                var t = {}, n = "0px";
                n = u.iAmWinner() ? "-110px" : u.iAmChallenger() ? "110px" : "-110px";
                var a = wx.createAnimation();
                a.translate3d(n, "0px", "0px").step({
                    duration: 400,
                    timingFunction: "ease-in-out"
                }), t["ChallengeStatusReady.ani_hole_winner"] = a.export(), this.xOfWinner = n;
                var i = this.getXOfChallenge(), l = wx.createAnimation();
                l.translate3d(i, "-" + this.offsetb + "px", "0px").step({
                    duration: 400,
                    timingFunction: "ease-in-out"
                }), t["ChallengeStatusReady.ani_hole_challenge"] = l.export(), this.xOfChallenge = i;
                var o = wx.createAnimation();
                o.scale(1).step({
                    duration: 250,
                    timingFunction: "ease-in"
                }), t["ChallengeStatusReady.ani_centerview"] = o.export(), this.page.setData(t);
            }
            setTimeout(function() {
                e.backPlaying = !1;
            }, 450);
        }
    }, {
        key: "refreshCenterView",
        value: function() {
            var e = 0;
            u.iAmAudience() && (e = 1);
            var t = {};
            t["ChallengeStatusReady.btnStatus"] = e, this.page.setData(t), 1 == e && this.test_countdownToPlundering();
        }
    }, {
        key: "setWinnerAvatar",
        value: function(e, t) {
            var n = this;
            this.setWinnerAvatarPlaying = !0, setTimeout(function() {
                n.setWinnerAvatarPlaying = !1, t && t();
            }, 600);
            if (e) {
                var a = s.fastGet(this.name + "wh_full", !0);
                a.call(function() {
                    var e = {}, t = wx.createAnimation();
                    t.scale(0).step({
                        duration: 100,
                        timingFunction: "step-start",
                        transformOrigin: "50% 60rpx 0"
                    });
                    var a = wx.createAnimation();
                    a.scale(1).step({
                        duration: 100,
                        timingFunction: "step-start"
                    }), e["ChallengeStatusReady.ani_winner_full"] = t.export(), e["ChallengeStatusReady.ani_winner_null"] = a.export(), 
                    n.page.setData(e);
                }), a.wait(100), a.call(function() {
                    var e = {}, t = wx.createAnimation();
                    t.scale(1.1).step({
                        duration: 150,
                        timingFunction: "ease-in"
                    }), t.scale(0).step({
                        duration: 150,
                        timingFunction: "ease-in"
                    }), e["ChallengeStatusReady.ani_winner_null"] = t.export();
                    var a = wx.createAnimation();
                    a.scale(1.1).step({
                        delay: 100,
                        duration: 250,
                        timingFunction: "ease-in",
                        transformOrigin: "50% 60rpx 0"
                    }), a.scale(1).step({
                        duration: 150,
                        timingFunction: "ease-in",
                        transformOrigin: "50% 60rpx 0"
                    }), e["ChallengeStatusReady.ani_winner_full"] = a.export(), n.page.setData(e);
                });
            } else {
                var i = s.fastGet(this.name + "wh_full", !0);
                i.call(function() {
                    var e = {}, t = wx.createAnimation();
                    t.scale(1).step({
                        duration: 100,
                        timingFunction: "step-start",
                        transformOrigin: "50% 60rpx 0"
                    });
                    var a = wx.createAnimation();
                    a.scale(0).step({
                        duration: 100,
                        timingFunction: "step-start"
                    }), e["ChallengeStatusReady.ani_winner_full"] = t.export(), e["ChallengeStatusReady.ani_winner_null"] = a.export(), 
                    n.page.setData(e);
                }), i.wait(100), i.call(function() {
                    var e = {}, t = wx.createAnimation();
                    t.scale(1.1).step({
                        duration: 100,
                        timingFunction: "ease-in",
                        transformOrigin: "50% 60rpx 0"
                    }), t.scale(0).step({
                        duration: 150,
                        timingFunction: "ease-in",
                        transformOrigin: "50% 60rpx 0"
                    }), e["ChallengeStatusReady.ani_winner_full"] = t.export();
                    var a = wx.createAnimation();
                    a.scale(1.1).step({
                        delay: 200,
                        duration: 150,
                        timingFunction: "ease-in"
                    }), a.scale(1).step({
                        duration: 100,
                        timingFunction: "ease-in"
                    }), e["ChallengeStatusReady.ani_winner_null"] = a.export(), n.hideCountdown2Fight(e), 
                    n.page.setData(e);
                });
            }
        }
    }, {
        key: "setChallengerAvatar",
        value: function(e, t) {
            var n = this;
            r.log("设置挑战者头像>>>>"), this.setChallengerAvatarPlaying = !0, setTimeout(function() {
                r.log("完成挑战者头像设置<<<<"), n.setChallengerAvatarPlaying = !1, t && t();
            }, 600);
            if (e) {
                var a = s.fastGet(this.name + "wh_null", !0);
                a.call(function() {
                    var e = {}, t = wx.createAnimation();
                    t.scale(0).step({
                        duration: 100,
                        timingFunction: "step-start",
                        transformOrigin: "50% 60rpx 0"
                    });
                    var a = wx.createAnimation();
                    a.scale(1).step({
                        duration: 100,
                        timingFunction: "step-start"
                    }), e["ChallengeStatusReady.ani_challenge_full"] = t.export(), e["ChallengeStatusReady.ani_challenge_null"] = a.export(), 
                    n.page.setData(e);
                }), a.wait(100), a.call(function() {
                    var e = {}, t = wx.createAnimation();
                    t.scale(1.1).step({
                        duration: 150,
                        timingFunction: "ease-in"
                    }), t.scale(0).step({
                        duration: 150,
                        timingFunction: "ease-in"
                    }), e["ChallengeStatusReady.ani_challenge_null"] = t.export();
                    var a = wx.createAnimation();
                    a.scale(1.1).step({
                        delay: 100,
                        duration: 250,
                        timingFunction: "ease-in",
                        transformOrigin: "50% 60rpx 0"
                    }), a.scale(1).step({
                        duration: 150,
                        timingFunction: "ease-in",
                        transformOrigin: "50% 60rpx 0"
                    }), e["ChallengeStatusReady.ani_challenge_full"] = a.export(), n.page.setData(e);
                });
            } else {
                var i = s.fastGet(this.name + "wh_null", !0);
                i.call(function() {
                    var e = {}, t = wx.createAnimation();
                    t.scale(1).step({
                        duration: 100,
                        timingFunction: "step-start",
                        transformOrigin: "50% 60rpx 0"
                    });
                    var a = wx.createAnimation();
                    a.scale(0).step({
                        duration: 100,
                        timingFunction: "step-start"
                    }), e["ChallengeStatusReady.ani_challenge_full"] = t.export(), e["ChallengeStatusReady.ani_challenge_null"] = a.export(), 
                    n.page.setData(e);
                }), i.wait(100), i.call(function() {
                    var e = {}, t = wx.createAnimation();
                    t.scale(1.1).step({
                        duration: 100,
                        timingFunction: "ease-in",
                        transformOrigin: "50% 60rpx 0"
                    }), t.scale(0).step({
                        duration: 150,
                        timingFunction: "ease-in",
                        transformOrigin: "50% 60rpx 0"
                    }), e["ChallengeStatusReady.ani_challenge_full"] = t.export();
                    var a = wx.createAnimation();
                    a.scale(1.1).step({
                        delay: 200,
                        duration: 150,
                        timingFunction: "ease-in"
                    }), a.scale(1).step({
                        duration: 100,
                        timingFunction: "ease-in"
                    }), e["ChallengeStatusReady.ani_challenge_null"] = a.export(), n.hideCountdown2Fight(e), 
                    r.log("挑战者出场", e), n.page.setData(e);
                });
            }
        }
    }, {
        key: "isChallengeStatusReady",
        value: function() {
            return u.curRoom.status == h.ChallengeStatus.ChallengeStatusReady;
        }
    }, {
        key: "isChallengeStatusChallenge",
        value: function() {
            return u.curRoom.status == h.ChallengeStatus.ChallengeStatusChallenge;
        }
    }, {
        key: "isChallengeStatusRunning",
        value: function() {
            return u.curRoom.status >= h.ChallengeStatus.ChallengeStatusRun;
        }
    }, {
        key: "update",
        value: function(e) {
            var t = this;
            i(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "update", this).call(this, e), 
            this.timeInterval || (this.timeInterval = setInterval(function() {
                var e = t.fastgoingholePlaying || t.setWinnerAvatarPlaying || t.setChallengerAvatarPlaying || t.tryGoingholePlaying || t.backPlaying;
                t.lastPushData && !e && (t.lastPushData.challengeInfolist && (u.curRoom.curWinner = t.lastPushData.challengeInfolist.curWinner, 
                u.curRoom.curChallenger = t.lastPushData.challengeInfolist.curChallenger, u.curRoom.expireAt = t.lastPushData.challengeInfolist.expireAt, 
                u.curRoom.roomID = t.lastPushData.challengeInfolist.roomID, u.curRoom.status = t.lastPushData.challengeInfolist.status, 
                u.curRoom.statusExpireAt = t.lastPushData.challengeInfolist.statusExpireAt), console.log("update:" + r.formatTime(t.lastPushData.challengeInfolist.statusExpireAt), t.lastPushData), 
                t.processMembersChange(), t.lastPushData = null);
            }, 1e3 / 24));
        }
    }, {
        key: "clearData",
        value: function() {
            this.page.setData({
                ChallengeStatusReady: null
            });
        }
    }, {
        key: "end",
        value: function(e) {
            this.timeInterval_countdownForFight && (clearInterval(this.timeInterval_countdownForFight), 
            this.timeInterval_countdownForFight = void 0), this.timeInterval_countdownToPlundering && (clearInterval(this.timeInterval_countdownToPlundering), 
            this.timeInterval_countdownToPlundering = void 0), this.timeInterval && (clearInterval(this.timeInterval), 
            this.timeInterval = void 0), this.removeConnectNotify(), i(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "end", this).call(this, e), 
            s.removeTweens(this.name), s.removeTweens(this.name + "w_null"), s.removeTweens(this.name + "w_full"), 
            s.removeTweens(this.name + "c_null"), s.removeTweens(this.name + "c_full"), s.removeTweens(this.name + "wh_null"), 
            s.removeTweens(this.name + "wh_full"), s.removeTweens(this.name + "ch_null"), s.removeTweens(this.name + "ch_full");
        }
    } ]), m;
}();

module.exports = f;