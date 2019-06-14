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
}(), a = require("./../../../net/fightNet.js"), i = (require("./../../../net/connectNotify.js"), 
require("./../../../const/notifyConsts.js"), require("./../../../util/Tween.js")), n = require("./../../../util/util.js"), r = require("./../../../const/consts.js"), s = require("./../../../util/ChallengeRoomDataManager.js"), o = require("./../../../data/ItemsManager.js"), u = require("./../../../util/PVERoomDataManager.js"), l = require("./../../../data/SpecialData.js"), c = getApp(), p = function() {
    function p(e) {
        t(this, p), this.page = e, this.name = "StateResult";
    }
    return e(p, [ {
        key: "init",
        value: function() {
            var t = this;
            this.page.outFightSending || (this.roomId = this.page.roomId, this.playInit(), this.page.resultOK = !0, 
            a.fightResult(this.roomId, 0, this.page.line2, this.page.line3, function(e, a) {
                if (!t.isEnd) if (e && e.errCode == r.ExitCode.RequestErr || (c.mainData.role.roomID = 0), 
                e) switch (e.errCode) {
                  case 70017:
                    n.ShowConfirm("提示", "本局比赛已结束", function() {
                        wx.navigateBack({
                            delta: -1
                        });
                    });
                    break;

                  default:
                    c.exitGame(e.errCode, e.errMsg);
                } else switch (t.page.type) {
                  case "ob":
                    t.playAni(a);
                    break;

                  case "live":
                    var i = c.mainData.role.level;
                    c.updateFightData(a), t.isLevelUp = i != c.mainData.role.level, t.playAni(a);
                    break;

                  case "challenge":
                  case "obChallenge":
                    t.page.audienceViewController.hide();
                    var u = s.getWinnerInfo();
                    s.iAmWinner() && u && (u.successCount = a.rowWinNum);
                    s.getData();
                    var l = {};
                    l["liveData.aSuccessCount"] = a.rowWinNum, l["liveData.bSuccessCount"] = a.rivalRowWinNum, 
                    s.request_challengeRank(s.curRoom.id, !0, function(e, i) {
                        if (e) n.ShowConfirm("提示", e.errMsg, function() {}); else {
                            var r = n.getServerTimeBaseSecond(), o = 2 == s.curRoom.status ? s.curRoom.statusExpireAt : r, u = i.list, c = o + s.getChallengeResultWaitDur(), p = c - r, w = t.getOverText(a.isWin, p);
                            l["resultViewData.liveRank"] = u, l["resultViewData.liveMyWinNum"] = t.getMyChallengeRankText(u), 
                            l["resultViewData.liveCountDown2back"] = w, t.page.setData(l), t.playAni(a), t.timeInterval_countdownToBack || (t.timeInterval_countdownToBack = setInterval(function() {
                                var e = n.getServerTimeBaseSecond(), i = {}, r = p = c - e;
                                w = t.getOverText(a.isWin, p), i["resultViewData.liveCountDown2back"] = w, t.page.setData(i), 
                                r <= 0 && (clearInterval(t.timeInterval_countdownToBack), t.timeInterval_countdownToBack = void 0, 
                                t.page.liveCountDownOver = !0, s.curRoom.status = 2, s.curRoom.curChallenger = 0, 
                                wx.redirectTo({
                                    url: "/page/challenge/challenge_room/challenge_room",
                                    success: function() {},
                                    fail: function() {}
                                }));
                            }, 1e3));
                        }
                    });
                    break;

                  case "special":
                  case "pvr":
                  case "pve":
                    try {
                        c.mainData.role.rowWinNum = a.rowWinNum;
                    } catch (t) {
                        n.reportAnalytics_Try(t);
                    }
                    var p = c.mainData.role.level;
                    c.updateFightData(a), t.isLevelUp = p != c.mainData.role.level, o.refreshChangciBuffVal(a.myBuff), 
                    t.saveShareImg(a), t.playAni(a);
                    break;

                  case "beginnerTest":
                    var w = c.mainData.role.level;
                    c.updateFightData(a), t.isLevelUp = w != c.mainData.role.level, wx.navigateTo({
                        url: "/page/qrCode/qrCode"
                    });
                }
            }));
        }
    }, {
        key: "getOverText",
        value: function(t, e) {
            var a = "";
            return s.iAmAudience() ? a = 0 == t ? "竟然不相上下，" + e + "秒后准备抢位挑战！" : "我上我也行，" + e + "秒后准备抢位挑战！" : 0 == t ? a = s.iAmWinner() ? "竟然不相上下，" + e + "秒后继续迎接挑战！" : "竟然不相上下，" + e + "秒后准备抢位挑战！" : 1 == t ? a = "轻松获胜，" + e + "秒后准备迎接下一位挑战者！" : 2 == t && (a = "一定是题目有问题，" + e + "秒后准备抢位挑战！"), 
            a;
        }
    }, {
        key: "getChalleneRank",
        value: function(t) {
            var e = [];
            if (t.list) for (var a = 0; a < t.list.length; a++) {
                var i = t.list[a];
                i.score > 0 && e.push(i);
            }
            if (e.sort(function(t, e) {
                return t.rank - e.rank;
            }), e.length > 0) {
                for (var n = [], r = 0; r < e.length; r++) n.length < 3 && n.push(e[r]);
                return n;
            }
            return [];
        }
    }, {
        key: "getMyChallengeRankText",
        value: function(t) {
            var e = s.getMyInfo();
            n.log("~~~~~~~~myInfo:", e);
            for (var a = 0; a < t.length; a++) if (t[a].uid == e.uid) return "";
            return "我的成绩：" + e.successCount + "胜";
        }
    }, {
        key: "saveShareImg",
        value: function(t) {
            var e = this;
            if ("pvr" == this.page.type) {
                if (this.page.rivalAvatarPath && this.page.userAvatarPath) {
                    var a = wx.createCanvasContext("pvrShareCanvas");
                    a.drawImage(this.page.userAvatarPath, 37, 90, 107, 107), a.drawImage(this.page.rivalAvatarPath, 265, 90, 107, 107), 
                    a.drawImage("/image/pvr/img_ad_challenge_4.png", 0, 0, 400, 320), 1 == t.isWin && a.drawImage("/image/pvr/img_ad_challenge_4_banner.png", 76, 6, 248, 81), 
                    a.setFillStyle("#ffffff"), a.setTextAlign && a.setTextAlign("center"), a.setFontSize(60), 
                    a.fillText(t.score, 199.5, 255), a.draw(!0, function(t) {
                        console.log(t), wx.canvasToTempFilePath({
                            x: 0,
                            y: 0,
                            width: 400,
                            height: 320,
                            destWidth: 400,
                            destHeight: 320,
                            canvasId: "pvrShareCanvas",
                            success: function(t) {
                                t.tempFilePath && (c.pvrShareImg2 = t.tempFilePath);
                            }
                        }, e);
                    });
                }
            } else if (this.page.userAvatarPath) {
                var i = wx.createCanvasContext("pvrShareCanvas");
                i.drawImage(this.page.userAvatarPath, 142, 43, 112, 112), i.drawImage("/image/pvr/img_ad_new20.png", 0, 0, 400, 320), 
                i.setFillStyle("#fff336"), i.setTextAlign && i.setTextAlign("center"), i.setFontSize(40), 
                i.fillText(t.score, 199.5, 190), i.draw(!0, function(t) {
                    console.log(t), wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        width: 400,
                        height: 320,
                        destWidth: 400,
                        destHeight: 320,
                        canvasId: "pvrShareCanvas",
                        success: function(t) {
                            t.tempFilePath && (c.pvrShareImg = t.tempFilePath);
                        }
                    }, e);
                });
            }
        }
    }, {
        key: "playAni",
        value: function(t) {
            var e = this, a = {};
            switch (this.page.type) {
              case "ob":
                a["resultViewData.shareBtnVisible"] = !1, a["resultViewData.funcBtnLabel"] = "自己开一局", 
                a.testResultBtnVisible = !1;
                break;

              case "live":
                a["resultViewData.shareBtnVisible"] = !0, a["resultViewData.funcBtnLabel"] = "再来一局", 
                a.testResultBtnVisible = !1, t.itemInfo && t.itemInfo.itemId > 0 && t.itemInfo.itemNum > 0 && (a["resultViewData.rewardItem.id"] = t.itemInfo.itemId, 
                a["resultViewData.rewardItem.num"] = t.itemInfo.itemNum, a["resultViewData.rewardItem.visible"] = !0);
                break;

              case "challenge":
              case "obChallenge":
                a["resultViewData.shareBtnVisible"] = !1, a["resultViewData.hideFuncBtn"] = !0, 
                a["resultViewData.hideReward"] = !0, a["resultViewData.rewardItem.visible"] = !1;
                break;

              case "pve":
                a["resultViewData.showReviewBtn"] = !0, a["resultViewData.funcBtnLabel"] = "继续挑战", 
                a["resultViewData.shareBtnVisible"] = !0, a.testResultBtnVisible = !1, t.itemInfo && t.itemInfo.itemId > 0 && t.itemInfo.itemNum > 0 && (a["resultViewData.rewardItem.id"] = t.itemInfo.itemId, 
                a["resultViewData.rewardItem.num"] = t.itemInfo.itemNum, a["resultViewData.rewardItem.visible"] = !0), 
                t.activityAddTicket && (a["resultViewData.ticketVisible"] = !0);
                break;

              case "pvr":
                a["resultViewData.showReviewBtn"] = !0, a["resultViewData.funcBtnLabel"] = "返回排行榜", 
                a["resultViewData.shareBtnVisible"] = !0, a.testResultBtnVisible = !1, t.itemInfo && t.itemInfo.itemId > 0 && t.itemInfo.itemNum > 0 && (a["resultViewData.rewardItem.id"] = t.itemInfo.itemId, 
                a["resultViewData.rewardItem.num"] = t.itemInfo.itemNum, a["resultViewData.rewardItem.visible"] = !0);
                break;

              case "beginnerTest":
                a["resultViewData.funcBtnLabel"] = "回首页", a["resultViewData.shareBtnVisible"] = !1, 
                a.testResultBtnVisible = !0;
                break;

              case "special":
                a["resultViewData.funcBtnLabel"] = "继续挑战", a["resultViewData.shareBtnVisible"] = !0, 
                a["resultViewData.showReviewBtn"] = !1, a["resultViewData.isSpecial"] = !0, a["resultViewData.hideReward"] = !0, 
                a["resultViewData.rewardItem.visible"] = !1, a["resultViewData.cupNum"] = l.data.player.cup, 
                a.testResultBtnVisible = !1;
            }
            var n = t.baseGold;
            t.extraGold && (n += ~~t.extraGold[3], n += ~~t.extraGold[4], a["resultViewData.buff3Visible"] = t.extraGold.hasOwnProperty("3"), 
            a["resultViewData.buff4Visible"] = t.extraGold.hasOwnProperty("4"), n >= 0 && (n = "+" + n));
            var r = t.baseExp;
            t.extraExp && (r += ~~t.extraExp[1], r += ~~t.extraExp[2], a["resultViewData.buff1Visible"] = t.extraExp.hasOwnProperty("1"), 
            a["resultViewData.buff2Visible"] = t.extraExp.hasOwnProperty("2"), r >= 0 && (r = "+" + r)), 
            a["resultViewData.gold"] = n, a["resultViewData.exp"] = r, a["resultViewData.showKnowBtn"] = "pve" == this.page.type && 1 != t.isWin && c.mainData.role.level > 2, 
            a["resultViewData.isWin"] = t.isWin, a["resultViewData.shareText"] = c.getShareRewardText(), 
            a["resultViewData.hasShareReward"] = "live" != this.page.type && "ob" != this.page.type && "challenge" != this.page.type && "obChallenge" != this.page.type && !!c.getShareRewardText(), 
            a["resultViewData.criticalVisible"] = t.winBack, a["resultViewData.visible"] = !0, 
            a["resultViewData.comboLeft"] = t.rowNum, a["resultViewData.comboRight"] = t.rivalRowNum, 
            a["resultViewData.rowWinNumLeft"] = c.mainData.role.rowWinNum, 2 == t.isWin && (a["resultViewData.rowWinNumRight"] = this.page.data.b.userInfo.rowWinNum + 1), 
            this.page.setData(a);
            var s = i.fastGet("stateResult"), o = 0;
            o = "challenge" == this.page.type || "obChallenge" == this.page.type ? this.playMainOutFast(s, t) : this.playMainOut(s, t), 
            s.wait(o), o = this.playScoreIn(s, t), s.wait(o + 200), o = this.playTitleIn(s, t), 
            "challenge" == this.page.type || "obChallenge" == this.page.type ? (s.wait(o), o = this.playLiveIn(s, t)) : "special" == this.page.type ? (s.wait(o), 
            o = this.playSpecial(s, t), s.wait(o), o = this.playBtnIn(s, t)) : (s.wait(o), o = this.playAddIn(s, t), 
            "pve" != this.page.type && "pvr" != this.page.type || (s.wait(o), u.setReviewPlayer(this.page.data.a.userInfo, this.page.data.b.userInfo), 
            o = this.playReviewBannerIn(s, t)), s.wait(o), o = this.playBtnIn(s, t), s.wait(o), 
            this.isLevelUp && s.call(function() {
                e.showLevelUpView();
            }));
        }
    }, {
        key: "playInit",
        value: function() {
            var t = wx.createAnimation();
            t.width("0px").step({
                timingFunction: "step-start",
                duration: 0
            });
            var e = wx.createAnimation();
            e.width("0px").step({
                timingFunction: "step-start",
                duration: 0
            });
            var a = wx.createAnimation();
            a.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var i = wx.createAnimation();
            i.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var n = wx.createAnimation();
            n.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var r = wx.createAnimation();
            r.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var s = wx.createAnimation();
            s.left("-200rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var o = wx.createAnimation();
            o.right("-200rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var u = wx.createAnimation();
            u.left("-300rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var l = wx.createAnimation();
            l.right("-300rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var c = wx.createAnimation();
            c.left("-750rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var p = wx.createAnimation();
            p.left("-750rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var w = wx.createAnimation();
            w.left("-750rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var m = wx.createAnimation();
            m.left("-750rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var d = wx.createAnimation();
            d.scaleX(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var g = wx.createAnimation();
            g.scaleX(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var x = wx.createAnimation();
            x.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var v = wx.createAnimation();
            v.scale(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var h = wx.createAnimation();
            h.opacity(0).scale(5).step({
                timingFunction: "step-start",
                duration: 0
            });
            var f = wx.createAnimation();
            f.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var D = wx.createAnimation();
            D.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var V = wx.createAnimation();
            V.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var A = wx.createAnimation();
            A.scale(0).opacity(0).step({
                timingFunction: "step-start",
                duration: 0
            });
            var y = wx.createAnimation();
            y.bottom("-300rpx").step({
                timingFunction: "step-start",
                duration: 0
            });
            var b = {};
            b["resultViewData.scoreViewLeftAni"] = t.export(), b["resultViewData.scoreViewRightAni"] = e.export(), 
            b["resultViewData.scoreTextViewLeftAni"] = a.export(), b["resultViewData.scoreTextViewRightAni"] = i.export(), 
            b["resultViewData.titleAni"] = n.export(), b["resultViewData.criticalAni"] = r.export(), 
            b["resultViewData.comboLeftAni"] = s.export(), b["resultViewData.comboRightAni"] = o.export(), 
            b["resultViewData.wwLeftAni"] = u.export(), b["resultViewData.wwRightAni"] = l.export(), 
            b["resultViewData.goldViewAni"] = c.export(), b["resultViewData.expViewAni"] = p.export(), 
            b["resultViewData.rewardViewAni"] = w.export(), b["resultViewData.ticketViewAni"] = m.export(), 
            b["resultViewData.goldLineAni"] = d.export(), b["resultViewData.expLineAni"] = g.export(), 
            b["resultViewData.funcBntAni"] = x.export(), b["resultViewData.shareBtnAni"] = v.export(), 
            b["resultViewData.shareDescAni"] = h.export(), b["resultViewData.buff1Ani"] = f.export(), 
            b["resultViewData.buff2Ani"] = D.export(), b["resultViewData.buff3Ani"] = V.export(), 
            b["resultViewData.buff4Ani"] = A.export(), b["resultViewData.reportImgAni"] = y.export(), 
            this.page.setData(b);
        }
    }, {
        key: "playMainOut",
        value: function(t, e) {
            var a = this;
            return t.call(function() {
                var t = {}, e = wx.createAnimation();
                e.left("-200rpx").step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var i = wx.createAnimation();
                i.right("-200rpx").step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                for (var n = 0; n < 4; n++) {
                    var r = wx.createAnimation();
                    r.scale(0).step({
                        timingFunction: "step-start",
                        duration: 0
                    }), t["battleViewData.answer[" + n + "].ani"] = r.export();
                }
                var s = wx.createAnimation();
                s.opacity(0).step({
                    timingFunction: "step-start",
                    duration: 0
                }), t["battleViewData.questionViewAni"] = s.export(), t["battleViewData.leftScoreViewAni"] = e.export(), 
                t["battleViewData.rightScoreViewAni"] = i.export(), a.page.setData(t);
            }), 200;
        }
    }, {
        key: "playMainOutFast",
        value: function(t, e) {
            var a = this;
            return t.call(function() {
                var t = {}, e = wx.createAnimation();
                e.left("-200rpx").step({
                    timingFunction: "step-start",
                    duration: 100
                });
                var i = wx.createAnimation();
                i.right("-200rpx").step({
                    timingFunction: "step-start",
                    duration: 100
                });
                for (var n = 0; n < 4; n++) {
                    var r = wx.createAnimation();
                    r.scale(0).step({
                        timingFunction: "step-start",
                        duration: 100
                    }), t["battleViewData.answer[" + n + "].ani"] = r.export();
                }
                var s = wx.createAnimation();
                s.opacity(0).step({
                    timingFunction: "step-start",
                    duration: 100
                }), t["battleViewData.questionViewAni"] = s.export(), t["battleViewData.leftScoreViewAni"] = e.export(), 
                t["battleViewData.rightScoreViewAni"] = i.export(), a.page.setData(t);
            }), 100;
        }
    }, {
        key: "playLiveIn",
        value: function(t, e) {
            var a = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.scale(1, 1).step({
                    timingFunction: "ease-in",
                    duration: 250
                });
                var e = wx.createAnimation();
                e.top("0px").step({
                    delay: 250,
                    timingFunction: "ease-in",
                    duration: 200
                });
                var i = wx.createAnimation();
                i.top("0px").step({
                    delay: 250,
                    timingFunction: "ease-in",
                    duration: 200
                });
                var n = wx.createAnimation();
                n.scale(1, 1).step({
                    delay: 250,
                    timingFunction: "ease-in",
                    duration: 200
                });
                var r = wx.createAnimation();
                r.scale(1).step({
                    delay: 450,
                    timingFunction: "ease-in",
                    duration: 200
                });
                var s = {};
                s["resultViewData.ani_condition"] = t.export(), s["resultViewData.ani_title"] = e.export(), 
                s["resultViewData.ani_rank"] = i.export(), s["resultViewData.ani_myNum"] = n.export(), 
                s["resultViewData.ani_countDown2back"] = r.export(), a.page.setData(s);
            }), 650;
        }
    }, {
        key: "playScoreIn",
        value: function(t, e) {
            var a = this;
            t.call(function() {
                var t = {};
                a.page.countDownView.setVisible(!1);
                var n = wx.createAnimation(), r = wx.createAnimation();
                switch (n.width("50%").step({
                    timingFunction: "ease-in",
                    duration: 100
                }), r.width("50%").step({
                    timingFunction: "ease-in",
                    duration: 100
                }), e.isWin) {
                  case 0:
                    n.width("40%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    }), r.width("40%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    });
                    break;

                  case 1:
                    n.width("60%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    }), r.width("40%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    });
                    break;

                  case 2:
                    n.width("40%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    }), r.width("60%").step({
                        timingFunction: "ease-in",
                        duration: 250,
                        delay: 200
                    });
                }
                var s = wx.createAnimation();
                s.width("340rpx").left("-224rpx").step({
                    timingFunction: "ease-in",
                    duration: 200
                }), t["a.avatarBgAni"] = s.export();
                var o = wx.createAnimation();
                o.width("340rpx").right("-224rpx").step({
                    timingFunction: "ease-in",
                    duration: 200
                }), t["b.avatarBgAni"] = o.export();
                var u = wx.createAnimation();
                u.scale(0).step({
                    timingFunction: "cubic-bezier(.91,.11,.56,1.28)",
                    duration: 300
                }), t["a.scoreAni"] = u.export();
                var l = wx.createAnimation();
                l.scale(0).step({
                    timingFunction: "cubic-bezier(.91,.11,.56,1.28)",
                    duration: 300
                }), t["b.scoreAni"] = l.export();
                var c = wx.createAnimation();
                c.scale(1.2).step({
                    timingFunction: "ease-in",
                    duration: 150
                }), c.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 50
                });
                var p = wx.createAnimation();
                p.scale(1.2).step({
                    timingFunction: "ease-in",
                    duration: 150
                }), p.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 50
                });
                var w = wx.createAnimation();
                w.left("-2rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 500
                }), w.left("-10rpx").step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var m = wx.createAnimation();
                m.right("-2rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 500
                }), m.right("-10rpx").step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var d = wx.createAnimation();
                d.left("-2rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 650
                }), d.left("-10rpx").step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var g = wx.createAnimation();
                g.right("-2rpx").step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 650
                }), g.right("-10rpx").step({
                    timingFunction: "ease-out",
                    duration: 100
                }), t["resultViewData.scoreViewLeftAni"] = n.export(), t["resultViewData.scoreViewRightAni"] = r.export(), 
                t["resultViewData.scoreTextViewLeftAni"] = c.export(), t["resultViewData.scoreTextViewRightAni"] = p.export(), 
                t["resultViewData.comboLeftAni"] = w.export(), t["resultViewData.comboRightAni"] = m.export(), 
                t["resultViewData.wwLeftAni"] = d.export(), t["resultViewData.wwRightAni"] = g.export(), 
                t["battleViewData.timeVisible"] = !1, a.page.setData(t);
                var x = e.score, v = e.rivalScore, h = i.fastGet("scoreText", !0);
                h.wait(110), h.update(function(t) {
                    var e = {};
                    e["resultViewData.scoreLeft"] = Math.ceil(x * t), e["resultViewData.scoreRight"] = Math.ceil(v * t), 
                    a.page.setData(e);
                }, 550);
            });
            var n = 300;
            return (e.rowNum > 0 || e.rivalRowNum > 0) && (n += 200), (this.page.data.a.userInfo.rowWinNum > 0 || this.page.data.b.userInfo.rowWinNum > 0) && (n += 200), 
            n;
        }
    }, {
        key: "playTitleIn",
        value: function(t, e) {
            var a = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.scale(1.5).step({
                    timingFunction: "ease-in",
                    duration: 250
                }), t.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 50
                });
                var e = wx.createAnimation();
                e.scale(5).opacity(0).step({
                    timingFunction: "step-start",
                    duration: 500
                }), e.scale(.8).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                }), e.scale(1).opacity(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var i = {};
                i["resultViewData.titleAni"] = t.export(), i["resultViewData.criticalAni"] = e.export(), 
                a.page.setData(i);
            }), 650;
        }
    }, {
        key: "playSpecial",
        value: function(t, e) {
            var a = this;
            return e.activityAddCup ? (t.call(function() {
                var t = {}, e = wx.createAnimation();
                e.scale(1, 1).step({
                    timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                    duration: 300
                }), t["resultViewData.specailLineAni"] = e.export();
                var i = wx.createAnimation();
                i.scale(1, 1).step({
                    timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                    duration: 300
                }), t["resultViewData.specailLine2Ani"] = i.export();
                var n = wx.createAnimation();
                n.scale(1, 1).step({
                    timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                    duration: 300,
                    delay: 200
                }), t["resultViewData.specialIconAni"] = n.export();
                var r = wx.createAnimation();
                r.scale(1, 1).step({
                    timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                    duration: 300,
                    delay: 200
                }), t["resultViewData.specialLabelAni"] = r.export(), a.page.setData(t);
            }), t.wait(500), t.call(function() {
                for (var t = {}, i = e.activityAddCup, n = i; n--; ) {
                    var r = wx.createAnimation();
                    r.scale(1).step({
                        timingFunction: "ease-in",
                        duration: 100,
                        delay: 600 * n
                    }), r.left("309rpx").top("560rpx").step({
                        timingFunction: "ease-in",
                        duration: 400
                    }), r.scale(0).step({
                        timingFunction: "step-start",
                        duration: 0
                    }), t["resultViewData.specialStartView" + n + "Ani"] = r.export();
                    var s = wx.createAnimation();
                    s.opacity(.8).scale(2).step({
                        duration: 200,
                        delay: 500 + 600 * n
                    }), s.opacity(0).scale(3).step({
                        duration: 200
                    }), t["resultViewData.specialLightEff" + n + "Ani"] = s.export(), setTimeout(function() {
                        var t = {};
                        t["resultViewData.cupNum"] = a.page.data.resultViewData.cupNum + 1, a.page.setData(t);
                    }, 500 + 600 * n);
                }
                for (var o = wx.createAnimation(), u = 0; u < i; u++) o.scale(1.2).step({
                    duration: 50,
                    delay: 0 == u ? 500 : 450
                }), o.scale(1).step({
                    duration: 100,
                    delay: 0
                });
                t["resultViewData.specialIconAni"] = o.export(), a.page.setData(t);
            }), 500) : (t.call(function() {
                var t = {}, e = wx.createAnimation();
                e.scale(1, 1).step({
                    timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                    duration: 300
                }), t["resultViewData.specailLineAni"] = e.export();
                var i = wx.createAnimation();
                i.scale(1, 1).step({
                    timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                    duration: 300
                }), t["resultViewData.specailLine2Ani"] = i.export();
                var n = wx.createAnimation();
                n.scale(1, 1).step({
                    timingFunction: "cubic-bezier(.17,.67,.68,1.29)",
                    duration: 300,
                    delay: 200
                }), t["resultViewData.specialLoseLabelAni"] = n.export(), a.page.setData(t);
            }), 0);
        }
    }, {
        key: "playAddIn",
        value: function(t, e) {
            var a = this, i = ~~e.baseGold, n = ~~e.baseExp, r = 0, s = 0, o = 0, u = 0;
            return this.page.data.resultViewData.hideReward || (t.call(function() {
                var t = wx.createAnimation();
                t.scale(0, 1).step({
                    timingFunction: "step-start",
                    duration: 20
                }), t.scale(.2, 1).step({
                    timingFunction: "linear",
                    duration: 50
                }), t.scale(1.5, 1).step({
                    timingFunction: "ease-in",
                    duration: 100,
                    delay: 20
                }), t.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var e = wx.createAnimation();
                e.scale(0, 1).step({
                    timingFunction: "step-start",
                    duration: 20
                }), e.scale(.2, 1).step({
                    timingFunction: "linear",
                    duration: 50
                }), e.scale(1.5, 1).step({
                    timingFunction: "ease-in",
                    duration: 100,
                    delay: 20
                }), e.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var i = {};
                i["resultViewData.goldLineAni"] = t.export(), i["resultViewData.expLineAni"] = e.export(), 
                a.page.setData(i);
            }), t.wait(200), t.call(function() {
                var t = wx.createAnimation();
                t.left("250rpx").step({
                    timingFunction: "ease-in-out",
                    duration: 200
                });
                var e = wx.createAnimation();
                e.left("250rpx").step({
                    timingFunction: "ease-in-out",
                    duration: 200,
                    delay: 100
                });
                var i = {};
                i["resultViewData.goldViewAni"] = t.export(), i["resultViewData.expViewAni"] = e.export(), 
                a.page.setData(i);
            }), t.wait(200), t.update(function(t) {
                var e = {};
                e["resultViewData.addGold"] = (i >= 0 ? "+" : "") + Math.ceil(i * t), a.page.setData(e);
            }, 200), t.update(function(t) {
                var e = {};
                e["resultViewData.addExp"] = (n >= 0 ? "+" : "") + Math.ceil(n * t), a.page.setData(e);
            }, 200)), "pve" == this.page.type && e.extraGold && (e.extraGold.hasOwnProperty("3") && (o = ~~e.extraGold[3], 
            t.call(function() {
                var t = wx.createAnimation();
                t.scale(5).opacity(1).step({
                    timingFunction: "step-start",
                    duration: 100
                }), t.scale(1).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var e = {};
                e["resultViewData.buff3Ani"] = t.export(), a.page.setData(e);
            }), t.wait(300), this.playMainViewAni(t), o > 0 && t.update(function(t) {
                var e = {};
                e["resultViewData.addGold"] = (i >= 0 ? "+" : "") + (i + Math.ceil(o * t)), a.page.setData(e);
            }, 500)), e.extraGold.hasOwnProperty("4") && (u = ~~e.extraGold[4], t.call(function() {
                var t = wx.createAnimation();
                t.scale(5).opacity(1).step({
                    timingFunction: "step-start",
                    duration: 100
                }), t.scale(1).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var e = {};
                e["resultViewData.buff4Ani"] = t.export(), a.page.setData(e);
            }), t.wait(300), this.playMainViewAni(t), u > 0 && t.update(function(t) {
                var e = {};
                e["resultViewData.addGold"] = (i >= 0 ? "+" : "") + (i + o + Math.ceil(u * t)), 
                a.page.setData(e);
            }, 500))), "pve" == this.page.type && e.extraExp && (e.extraExp.hasOwnProperty("1") && (r = ~~e.extraExp[1], 
            t.call(function() {
                var t = wx.createAnimation();
                t.scale(5).opacity(1).step({
                    timingFunction: "step-start",
                    duration: 100
                }), t.scale(1).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var e = {};
                e["resultViewData.buff1Ani"] = t.export(), a.page.setData(e);
            }), t.wait(300), this.playMainViewAni(t), r > 0 && t.update(function(t) {
                var e = {};
                e["resultViewData.addExp"] = (n >= 0 ? "+" : "") + (n + Math.ceil(r * t)), a.page.setData(e);
            }, 500)), e.extraExp.hasOwnProperty("2") && (s = ~~e.extraExp[2], t.call(function() {
                var t = wx.createAnimation();
                t.scale(5).opacity(1).step({
                    timingFunction: "step-start",
                    duration: 100
                }), t.scale(1).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var e = {};
                e["resultViewData.buff2Ani"] = t.export(), a.page.setData(e);
            }), t.wait(300), this.playMainViewAni(t), s > 0 && t.update(function(t) {
                var e = {};
                e["resultViewData.addExp"] = (n >= 0 ? "+" : "") + (n + r + Math.ceil(s * t)), a.page.setData(e);
            }, 500))), t.wait(100), e.itemInfo && e.itemInfo.itemId > 0 && e.itemInfo.itemNum > 0 ? (t.call(function() {
                var t = wx.createAnimation();
                t.left("0px").step({
                    timingFunction: "ease-in-out",
                    duration: 200
                });
                var e = wx.createAnimation();
                e.scale(1.5).step({
                    timingFunction: "ease-in",
                    duration: 150,
                    delay: 200
                }), e.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var i = {};
                i["resultViewData.rewardViewAni"] = t.export(), i["resultViewData.rewardItemAni"] = e.export(), 
                a.page.setData(i);
            }), t.wait(450)) : e.activityAddTicket && (t.call(function() {
                var t = wx.createAnimation();
                t.left("0px").step({
                    timingFunction: "ease-in-out",
                    duration: 200
                });
                var e = wx.createAnimation();
                e.scale(1.5).step({
                    timingFunction: "ease-in",
                    duration: 150,
                    delay: 200
                }), e.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var i = {};
                i["resultViewData.ticketViewAni"] = t.export(), i["resultViewData.ticketItemAni"] = e.export(), 
                a.page.setData(i);
            }), t.wait(450)), 100;
        }
    }, {
        key: "playBtnIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.scale(1.2).step({
                    timingFunction: "ease-in",
                    duration: 200
                }), t.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var a = wx.createAnimation();
                a.scale(1.2).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 200
                }), a.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var i = wx.createAnimation();
                i.opacity(1).scale(.8).step({
                    timingFunction: "ease-in",
                    duration: 200,
                    delay: 400
                }), i.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 100
                });
                var n = wx.createAnimation();
                n.bottom("10px").step({
                    timingFunction: "ease-in",
                    duration: 300,
                    delay: 600
                });
                var r = {};
                r["resultViewData.funcBntAni"] = t.export(), r["resultViewData.shareBtnAni"] = a.export(), 
                r["resultViewData.shareDescAni"] = i.export(), "pve" == e.page.type && (r["resultViewData.reportImgAni"] = n.export()), 
                e.page.setData(r);
            }), 1e3;
        }
    }, {
        key: "playReviewBannerIn",
        value: function(t) {
            var e = this;
            return t.call(function() {
                var t = wx.createAnimation();
                t.right("0px").step({
                    timingFunction: "ease-in",
                    duration: 200
                });
                var a = {};
                a["resultViewData.reviewBannerAni"] = t.export(), e.page.setData(a);
            }), 200;
        }
    }, {
        key: "playMainViewAni",
        value: function(t) {
            var e = this;
            t.call(function() {
                var t = {}, a = wx.createAnimation();
                a.left("5rpx").top("-5rpx").step({
                    timingFunction: "linear",
                    duration: 50
                }), t["resultViewData.mainViewAni"] = a.export(), e.page.setData(t);
            }), t.wait(50), t.call(function() {
                var t = {}, a = wx.createAnimation();
                a.left("-5rpx").top("5rpx").step({
                    timingFunction: "linear",
                    duration: 50
                }), t["resultViewData.mainViewAni"] = a.export(), e.page.setData(t);
            }), t.wait(50), t.call(function() {
                var t = {}, a = wx.createAnimation();
                a.left("5rpx").top("-5rpx").step({
                    timingFunction: "linear",
                    duration: 50
                }), t["resultViewData.mainViewAni"] = a.export(), e.page.setData(t);
            }), t.wait(50), t.call(function() {
                var t = {}, a = wx.createAnimation();
                a.left("-5rpx").top("5rpx").step({
                    timingFunction: "linear",
                    duration: 50
                }), t["resultViewData.mainViewAni"] = a.export(), e.page.setData(t);
            }), t.wait(50), t.call(function() {
                var t = {}, a = wx.createAnimation();
                a.left("0px").top("0px").step({
                    timingFunction: "linear",
                    duration: 50
                }), t["resultViewData.mainViewAni"] = a.export(), e.page.setData(t);
            });
        }
    }, {
        key: "showLevelUpView",
        value: function() {
            var t = [], e = c.mainData.role.level;
            switch (e) {
              case 2:
                t = [ {
                    index: 0,
                    label: "银行"
                } ];
                break;

              case 3:
                t = [ {
                    index: 0,
                    label: "知识升级"
                }, {
                    index: 0,
                    label: "商店"
                } ];
                break;

              case 4:
                t = [ {
                    index: 0,
                    label: "每日挑战"
                } ];
                break;

              case 5:
                t = [ {
                    index: 0,
                    label: "排行榜"
                } ];
                break;

              case 6:
                t = [ {
                    index: 0,
                    label: "好友对战"
                } ];
                break;

              case 7:
                t = [ {
                    index: 0,
                    label: "群比赛"
                } ];
            }
            var a = {};
            a["levelUpViewData.visible"] = !0, a["levelUpViewData.level"] = e, a["levelUpViewData.unlockSource"] = t, 
            this.page.setData(a);
        }
    }, {
        key: "update",
        value: function(t) {}
    }, {
        key: "end",
        value: function(t) {
            this.isEnd = !0, clearInterval(this.timeInterval_countdownToBack), this.timeInterval_countdownToBack = void 0, 
            i.removeTweens("ressultAni"), i.removeTweens("live2rank");
        }
    } ]), p;
}();

module.exports = p;