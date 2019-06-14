function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var a = 0; a < e.length; a++) {
            var i = e[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, a, i) {
        return a && t(e.prototype, a), i && t(e, i), e;
    };
}(), a = require("./../../../net/connectNotify.js"), i = require("./../../../net/wsconnect.js"), n = require("./../../../const/consts.js"), r = require("./../../../util/util.js"), o = require("./../../../data/SpecialData.js"), s = require("./../../../util/RoomDataManager.js"), c = require("./../../../util/PVERoomDataManager.js"), h = require("./../../../util/ChallengeRoomDataManager.js"), u = require("./../../../net/fightNet.js"), l = require("./../../../const/notifyConsts.js"), m = require("./../../../util/Tween.js"), p = getApp(), g = function() {
    function g(e) {
        t(this, g), this.page = e, this.name = "StateMatch";
    }
    return e(g, [ {
        key: "init",
        value: function() {
            switch (this.page.type) {
              case "live":
                this.liveInit();
                break;

              case "challenge":
                this.challengeInit();
                break;

              case "ob":
                this.obInit();
                break;

              case "obChallenge":
                this.obChallengeInit();
                break;

              case "beginnerTest":
                this.beginnerTestInit();
                break;

              case "pvr":
                this.pvrInit();
                break;

              case "pve":
                this.pveInit();
                break;

              case "special":
                this.specialInit();
            }
        }
    }, {
        key: "beginnerTestInit",
        value: function() {
            var t = this, e = c.getData(), a = {};
            a["matchViewData.visible"] = !0, this.page.setData(a), this.setPageData(e.userInfo, null, e), 
            u.matchTest(p.mainData.loginArgs.friendCode, function(e, a) {
                if (!e) {
                    var i = c.setData(a);
                    c.fixPVEAvatarUrl(), t.setPageData(i.userInfo, i.rivalUser, i), t.playAni(), p.mainData.role.roomID = i.roomId;
                }
            });
        }
    }, {
        key: "pvrInit",
        value: function() {
            var t = this;
            p.pvrShareImg = void 0, p.pvrShareImg2 = void 0;
            var e = {};
            e["matchViewData.visible"] = !0, this.page.setData(e);
            var a = c.getData();
            r.cacheFile("rivalAvatar", a.rivalUser.avatarUrl, function(e) {
                t.page.rivalAvatarPath = e;
            }), r.cacheFile("Avatar", a.userInfo.avatarUrl, function(e) {
                t.page.userAvatarPath = e;
            }), this.setPageData(a.userInfo, a.rivalUser, a), this.playAni(), this.page.matchOK = !0, 
            p.mainData.role.roomID = a.roomId;
        }
    }, {
        key: "specialInit",
        value: function() {
            var t = this, e = c.getData(), i = {};
            i["matchViewData.visible"] = !0, i["battleViewData.winwinVisible"] = !1, this.page.setData(i), 
            this.setPageData(e.userInfo, null, e), a.register(l.ActionFightNotify, this.onFightNotify, this), 
            this.matchTimeoutTimer = setTimeout(function() {
                t.matchTimeoutTimer = void 0, t.showNormalToast();
            }, 2e4), u.subjectMatch(o.data.base.aid, function(e) {
                e ? t.matchErr(e) : (console.log("匹配中..."), p.matchTimeoutCount = 0, t.page.matchErr = !1);
            });
        }
    }, {
        key: "pveInit",
        value: function() {
            var t = this, e = c.getData(), i = {};
            i["matchViewData.visible"] = !0, i["battleViewData.winwinVisible"] = !0, i["matchViewData.rowWinNumLeft"] = p.mainData.role ? ~~p.mainData.role.rowWinNum : 0, 
            this.page.setData(i);
            var n = e.matchId, o = e.npcId;
            r.cacheFile("Avatar", e.userInfo.avatarUrl, function(e) {
                t.page.userAvatarPath = e;
            }), this.matchTimeoutTimer = setTimeout(function() {
                t.matchTimeoutTimer = void 0, t.showNormalToast();
            }, 2e4), this.setPageData(e.userInfo, null, e), a.register(l.ActionFightNotify, this.onFightNotify, this), 
            u.fightMatch(n, o, function(e) {
                e ? t.matchErr(e) : (console.log("匹配中..."), p.matchTimeoutCount = 0, t.page.matchErr = !1);
            });
        }
    }, {
        key: "showNormalToast",
        value: function(t) {
            r.ShowToast(t || "匹配不到对手，请稍后重试。"), this.timeoutShowNormalToast = setTimeout(function() {
                wx.navigateBack();
            }, 2e3);
        }
    }, {
        key: "matchErr",
        value: function(t) {
            var e = this;
            if (clearTimeout(this.matchTimeoutTimer), this.page.matchErr = !0, t.errCode && t.errCode != n.ExitCode.RequestErr) switch (t.errCode) {
              case 70027:
                p.matchTimeoutCount += 1, p.matchTimeoutCount >= 2 && (p.matchTimeoutCount = 0, 
                p.uid > 0 && i.reconnectServer()), clearTimeout(this.matchTimeoutTimer), this.matchTimeoutTimer = setTimeout(function() {
                    e.showNormalToast();
                }, 5e3);
                break;

              case 70019:
                this.showNormalToast(t.errMsg);
                break;

              case 90002:
                r.ShowConfirm("提示", t.errMsg, function() {
                    p.reLogin();
                });
                break;

              case 401:
                break;

              case 70020:
              case 70023:
                this.showNormalToast(t.errMsg);
                break;

              case 70024:
                p.exitGame(t.errCode, t.errMsg);
                break;

              default:
                this.showNormalToast(t.errMsg);
            } else p.exitGame(n.ExitCode.RequestErr);
        }
    }, {
        key: "liveInit",
        value: function() {
            var t = s.getData(), e = {};
            e["matchViewData.visible"] = !0, this.page.setData(e), t.userInfo.uid == p.mainData.role.uid ? this.setPageData(t.userInfo, t.rivalUser, t) : this.setPageData(t.rivalUser, t.userInfo, t), 
            p.mainData.role.roomID = t.roomId, this.matchOK();
        }
    }, {
        key: "challengeInit",
        value: function() {
            var t = h.getData();
            this.page.roomId = t.roomId;
            var e = h.getWinnerInfo(), a = h.getChallengerInfo();
            t.userInfo = e, t.rivalUser = a, t.userInfo.uid == p.mainData.role.uid ? this.setPageData(t.userInfo, t.rivalUser, t) : t.rivalUser.uid == p.mainData.role.uid ? this.setPageData(t.rivalUser, t.userInfo, t) : this.setPageData(t.userInfo, t.rivalUser, t), 
            p.mainData.role.roomID = t.roomId, this.matchOK();
        }
    }, {
        key: "obInit",
        value: function() {
            var t = s.getData(), e = {};
            e["matchViewData.visible"] = !0, this.page.setData(e), this.setPageData(t.userInfo, t.rivalUser, t), 
            this.matchOK();
        }
    }, {
        key: "obChallengeInit",
        value: function() {
            var t = h.getData();
            this.page.roomId = t.roomId;
            var e = h.getWinnerInfo(), a = h.getChallengerInfo();
            t.userInfo = e, t.rivalUser = a, this.setPageData(t.userInfo, t.rivalUser, t), this.matchOK();
        }
    }, {
        key: "setPageData",
        value: function(t, e, a) {
            var i = {};
            this.page.setRoomId(a.roomId), this.page.matchId = a.matchId, this.page.npcId = a.npcId, 
            t && (i["a.userInfo"] = t, i["a.fee"] = a.fee || 0, i["a.feeLabel"] = a.fee || "", 
            i["a.nickName"] = t.nickName, i["a.avatarUrl"] = r.getWechatUrlBySize(t.avatarUrl), 
            i["a.uid"] = t.uid, i["a.headId"] = t.headId, i["a.cupId"] = ~~r.getFirstCupId(t.cups)), 
            e && (i["b.userInfo"] = e, i["b.fee"] = a.fee || 0, i["b.feeLabel"] = a.fee || "", 
            i["b.nickName"] = e.nickName, i["b.avatarUrl"] = r.getWechatUrlBySize(e.avatarUrl), 
            i["b.uid"] = e.uid, i["b.headId"] = e.headId, i["b.cupId"] = ~~r.getFirstCupId(e.cups)), 
            this.page.setData(i);
        }
    }, {
        key: "update",
        value: function(t) {}
    }, {
        key: "end",
        value: function(t) {
            this.isEnd = !0, clearTimeout(this.matchTimeoutTimer), clearTimeout(this.timeoutShowNormalToast), 
            a.remove(l.ActionFightNotify, this.onFightNotify), m.removeTweens("matchView");
        }
    }, {
        key: "onFightNotify",
        value: function(t, e) {
            clearTimeout(this.matchTimeoutTimer);
            try {
                var a = c.setData(e);
                c.fixPVEAvatarUrl(), a.userInfo.rowWinNum = e.rowWinNum;
                var i = e.rivalUser ? ~~e.rivalUser.rowWinNum : 0;
                this.page.setData({
                    "matchViewData.rowWinNumLeft": e.rowWinNum,
                    "matchViewData.rowWinNumRight": i
                }), this.roomId = a.roomId, this.setPageData(a.userInfo, a.rivalUser, a), e.noConfirm ? this.matchOK() : this.matchConfirm();
            } catch (t) {
                r.reportAnalytics_Try(t);
            }
        }
    }, {
        key: "matchConfirm",
        value: function() {
            var t = this;
            this.isEnd || u.matchConfirm(this.roomId, function(e, a) {
                if (e) t.showNormalToast(e.errMsg); else if (a.reqDur > 0) setTimeout(function() {
                    t.matchConfirm();
                }, a.reqDur); else if (-1 == a.reqDur) {
                    if (t.isEnd) return;
                    t.showNormalToast();
                } else {
                    var i = a.findTime - r.getServerTime();
                    i > 0 ? setTimeout(function() {
                        t.matchOK();
                    }, i) : t.matchOK();
                }
            });
        }
    }, {
        key: "matchOK",
        value: function() {
            this.isEnd || (this.page.matchOK = !0, "challenge" == this.page.type || "obChallenge" == this.page.type ? this.playChallengeAni() : this.playAni(), 
            p.mainData.role.roomID = this.roomId);
        }
    }, {
        key: "playChallengeAni",
        value: function() {
            var t = this, e = r.getServerTimeBaseSecond(), a = h.curRoom.statusExpireAt - e;
            a <= 0 ? (this.page.stateChange("StateBegin"), this.page.setData({
                "matchViewData.visible": !1
            })) : setTimeout(function() {
                t.page.stateChange("StateBegin"), t.page.setData({
                    "matchViewData.visible": !1
                });
            }, a);
        }
    }, {
        key: "playAni",
        value: function() {
            var t = this, e = m.fastGet("vsView");
            e.call(function() {
                var e = {};
                e["matchViewData.visible"] = !0, e["matchViewData.vsViewVisible"] = !0, e["matchViewData.aViewVisible"] = !0, 
                e["matchViewData.bViewVisible"] = !0, t.page.setData(e);
            }), e.wait(100), this.page.data.a.fee && (e.call(function() {
                var e = {}, a = wx.createAnimation();
                a.scale(3).step({
                    timingFunction: "ease-in",
                    duration: 300
                }), a.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 200
                }), e["matchViewData.feeAniLeft"] = a.export(), t.page.setData(e);
            }), e.wait(800), e.update(function(e) {
                var a = {};
                a["a.feeLabel"] = Math.ceil(t.page.data.a.fee * (1 - e)), t.page.setData(a);
            }, 1e3), e.wait(500)), e.call(function() {
                var e = {}, a = wx.createAnimation();
                a.top("-100%").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4)
                }), e["matchViewData.matchViewAni"] = a.export(), t.page.setData(e);
            }), e.wait(Math.ceil(1e3 / 24 * 5)), e.call(function() {
                var e = {}, a = wx.createAnimation();
                a.left("100rpx").top("33rpx").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4)
                }), a.left("0rpx").top("0rpx").step({
                    timingFunction: "ease-out",
                    duration: Math.ceil(1e3 / 24 * 2)
                }), e["matchViewData.aViewAni"] = a.export();
                var i = wx.createAnimation();
                i.left("-100rpx").top("-33rpx").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4),
                    delay: Math.floor(250)
                }), i.left("0rpx").top("0rpx").step({
                    timingFunction: "ease-out",
                    duration: Math.ceil(1e3 / 24 * 2)
                }), e["matchViewData.bViewAni"] = i.export();
                var n = wx.createAnimation();
                n.right("0rpx").step({
                    timingFunction: "ease-in",
                    duration: 500,
                    delay: Math.floor(1e3 / 24 * 7)
                }), e["matchViewData.winwinAniLeft"] = n.export();
                var r = wx.createAnimation();
                r.left("0rpx").step({
                    timingFunction: "ease-in",
                    duration: 500,
                    delay: Math.floor(1e3 / 24 * 7)
                }), e["matchViewData.winwinAniRight"] = r.export();
                var o = wx.createAnimation();
                o.right("0rpx").step({
                    timingFunction: "ease-in",
                    duration: 500,
                    delay: Math.floor(375)
                }), e["matchViewData.cupAniLeft"] = o.export();
                var s = wx.createAnimation();
                s.left("0rpx").step({
                    timingFunction: "ease-in",
                    duration: 500,
                    delay: Math.floor(375)
                }), e["matchViewData.cupAniRight"] = s.export();
                var c = wx.createAnimation();
                c.left("75rpx").top("calc(50% - 443rpx)").step({
                    timingFunction: "ease-in-out",
                    duration: Math.ceil(250),
                    delay: Math.floor(1e3 / 24 * 2)
                }), e["matchViewData.decorationAImgAni"] = c.export();
                var h = wx.createAnimation();
                h.left("220rpx").top("calc(50% - 163rpx)").step({
                    timingFunction: "ease-in-out",
                    duration: Math.ceil(250),
                    delay: Math.floor(1e3 / 24 * 8)
                }), e["matchViewData.decorationBImgAni"] = h.export(), t.page.setData(e);
            }), e.wait(1e3), e.call(function() {
                var e = {}, a = wx.createAnimation();
                a.opacity(1).scale(10).step({
                    timingFunction: "step-start",
                    duration: 0
                }), e["matchViewData.vsLogoAni"] = a.export(), t.page.setData(e);
            }), e.wait(50), e.call(function() {
                var e = {}, a = wx.createAnimation();
                a.opacity(1).scale(1).step({
                    timingFunction: "cubic-bezier(.91,.11,.56,1.28)",
                    duration: 500
                }), e["matchViewData.vsLogoAni"] = a.export(), t.page.setData(e);
            }), e.wait(1e3), e.call(function() {
                var e = {}, a = wx.createAnimation();
                a.opacity(0).scale(4).step({
                    timingFunction: "ease-in",
                    duration: 300
                }), e["matchViewData.vsLogoAni"] = a.export(), t.page.setData(e);
            }), e.wait(300), e.call(function() {
                var e = {}, a = wx.createAnimation();
                a.left("-500rpx").top("-160rpx").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4)
                }), e["matchViewData.aViewAni"] = a.export();
                var i = wx.createAnimation();
                i.left("500rpx").top("160rpx").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4)
                }), e["matchViewData.bViewAni"] = i.export();
                var n = wx.createAnimation();
                n.left("-400rpx").top("calc(50% - 443rpx - 108rpx)").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4)
                }), e["matchViewData.decorationAImgAni"] = n.export();
                var r = wx.createAnimation();
                r.left("750rpx").top("calc(50% - 163rpx + 176rpx)").step({
                    timingFunction: "ease-in",
                    duration: Math.ceil(1e3 / 24 * 4)
                }), e["matchViewData.decorationBImgAni"] = r.export(), t.page.setData(e), t.page.stateChange("StateBegin");
            }), e.wait(100), e.call(function() {
                t.page.setData({
                    "matchViewData.visible": !1
                });
            });
        }
    } ]), g;
}();

module.exports = g;