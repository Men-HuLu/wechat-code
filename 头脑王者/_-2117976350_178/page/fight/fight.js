var e = require("./../../util/util.js"), t = require("./../../net/fightNet.js"), i = require("./../../net/messageNet.js"), a = require("./../../net/connectNotify.js"), o = require("./../../const/notifyConsts.js"), s = require("./../../const/consts.js"), n = (require("./../../const/modeConsts.js"), 
require("./../../util/RoomDataManager.js")), r = require("./../../util/PVERoomDataManager.js"), l = require("./../../util/ChallengeRoomDataManager.js"), h = require("./../../util/EmojiSelectController.js"), u = require("./../../util/EmojiController.js"), c = require("./../../data/ItemsManager.js"), d = require("./../../net/wsconnect.js"), g = require("../pvr/template/PvrController.js"), m = require("/../challenge/template/audienceViewController.js"), w = require("./template/CountDownView.js"), f = require("./../../util/daliyTask/DailyTaskNotifiyView.js"), p = require("./../../data/SpecialData.js"), b = getApp(), v = {
    StateNone: require("./../../page/fight/state/stateNone.js"),
    StateBegin: require("./../../page/fight/state/stateBegin.js"),
    StateChoose: require("./../../page/fight/state/stateChoose.js"),
    StateChooseEnd: require("./../../page/fight/state/stateChooseEnd.js"),
    StateResult: require("./../../page/fight/state/stateResult.js"),
    StateMatch: require("./../../page/fight/state/stateMatch.js"),
    StateTest: require("./../../page/fight/state/stateTest.js")
}, C = {
    curState: null,
    answerBtnLock: !0,
    round: 0,
    selectIndex: {
        1: {
            a: -1,
            b: -1
        },
        2: {
            a: -1,
            b: -1
        },
        3: {
            a: -1,
            b: -1
        },
        4: {
            a: -1,
            b: -1
        },
        5: {
            a: -1,
            b: -1
        },
        6: {
            a: -1,
            b: -1
        }
    },
    trueAnswerIndex: {
        1: -1,
        2: -1,
        3: -1,
        4: -1,
        5: -1,
        6: -1
    },
    playerLogout: !1,
    type: "",
    roomId: 0,
    answerList: [],
    matchOK: !1,
    matchErr: !1,
    resultOK: !1,
    npcId: 0,
    matchId: 0,
    hasDouble: !0,
    isOut: !1,
    rivalIsOut: !1,
    data: {
        lattice: [],
        a: {
            userInfo: {},
            nickName: "",
            avatarUrl: "",
            score: 0,
            scoreStr: 0,
            combo: 0,
            mult: 0,
            scoreAni: null,
            avatarAni: null,
            fee: 0,
            uid: 0,
            scoreProgressAni: null,
            scoreProgressViewAni: null
        },
        b: {
            userInfo: {},
            nickName: "",
            avatarUrl: "",
            score: 0,
            scoreStr: 0,
            combo: 0,
            mult: 0,
            scoreAni: null,
            avatarAni: null,
            fee: 0,
            uid: 0,
            scoreProgressAni: null,
            scoreProgressViewAni: null
        },
        matchViewData: {
            visible: !1,
            matchViewVisible: !0,
            vsViewVisible: !1,
            aViewVisible: !1,
            bViewVisible: !1,
            aViewAni: null,
            bViewAni: null,
            decorationAImgAni: null,
            decorationBImgAni: null,
            vsLogoAni: null,
            matchViewAni: null,
            rowWinNumLeft: 2,
            rowWinNumRight: 3
        },
        battleViewData: {
            winwinVisible: !1,
            isFirstShow: !0,
            countDown: 10,
            question: "",
            visible: !1,
            doubleAni: null,
            countDownStr: 10,
            roundText: "",
            titleViewAni: null,
            leftComboViewAni: null,
            rightComboViewAni: null,
            questionViewAni: null,
            leftScoreViewAni: null,
            rightScoreViewAni: null,
            mainViewAni: null,
            fullShadeVisible: !1,
            fullShadeAni: null,
            answer: [ {
                index: 0,
                lImg: 0,
                rImg: 0,
                answer: "最多八个字的答案",
                className: "",
                ani: null
            }, {
                index: 1,
                lImg: 0,
                rImg: 0,
                answer: "最多八个字的答案",
                className: "",
                ani: null
            }, {
                index: 2,
                lImg: 0,
                rImg: 0,
                answer: "最多八个字的答案",
                className: "",
                ani: null
            }, {
                index: 3,
                lImg: 0,
                rImg: 0,
                answer: "最多八个字的答案",
                className: "",
                ani: null
            } ],
            timeViewStyle: "",
            timeOvalViewLeftStyle: "",
            timeOvalViewRightStyle: "",
            baseTimeViewScale: 0
        },
        resultViewData: {
            reportVisible: !1,
            reportEnabled: !0,
            visible: !1,
            scoreViewLeftAni: null,
            scoreViewRightAni: null,
            scoreTextViewLeftAni: null,
            scoreTextViewRightAni: null,
            titleAni: null,
            criticalAni: null,
            comboLeftAni: null,
            comboRightAni: null,
            wwLeftAni: null,
            wwRightAni: null,
            goldViewAni: null,
            expViewAni: null,
            rewardViewAni: null,
            rewardItemAni: null,
            goldLineAni: null,
            expLineAni: null,
            funcBntAni: null,
            shareBtnAni: null,
            shareDescAni: null,
            funcBtnLabel: "",
            isWin: 1,
            scoreLeft: 0,
            scoreRight: 0,
            addGold: "",
            addExp: "",
            hasShareReward: !0,
            criticalVisible: !1,
            shareGold: 0,
            rewardItem: {
                visible: !1,
                id: 0,
                num: 0,
                ani: null
            }
        },
        testResultBtnVisible: !1,
        wsconnectBreaking: !1,
        levelUpViewData: {
            visible: !1,
            level: 1
        }
    },
    onLoad: function(t) {
        this.dailyTaskNotifiyView = new f(this), e.addSound(this, "win", "https://question-resource-wscdn.hortorgames.com/image/media/dailyChallenge/win.wav", !1), 
        e.addSound(this, "lose", "https://question-resource-wscdn.hortorgames.com/image/media/dailyChallenge/lose.mp3", !1), 
        e.showShareMenu(), b.eventDispatcher.addEventListener("shareTextUpdate", this.onShareTextUpdate, this), 
        b.eventDispatcher.addEventListener("onRoomMasterLogout", this.onRoomMasterLogout, this), 
        this.init(t.fightType);
    },
    onReady: function() {
        this.createCross();
    },
    onShow: function() {
        this.dailyTaskNotifiyView.onShow(), this.ad && this.ad.start && this.ad.start();
    },
    onHide: function() {
        this.dailyTaskNotifiyView.onHide(), this.checkReportChanged() && this.finlSubmit(), 
        this.ad && this.ad.stop && this.ad.stop();
    },
    registerConnectNotify: function() {
        "challenge" != this.type && "obChallenge" != this.type || (e.log("====fight.注册群比赛广播事件===="), 
        a.register(o.ActionChallengeInfoBase, this.onActionChallengeInfoBase, this), a.register(o.ActionChallengeInfoMembers, this.onActionChallengeInfoMembers, this));
    },
    removeConnectNotify: function() {
        "challenge" != this.type && "obChallenge" != this.type || (e.log("====fight.注册群比赛广播事件===="), 
        a.remove(o.ActionChallengeInfoBase, this.onActionChallengeInfoBase), a.remove(o.ActionChallengeInfoMembers, this.onActionChallengeInfoMembers));
    },
    onUnload: function() {
        var i = this;
        this.ad && this.ad.stop && this.ad.stop(), this.dailyTaskNotifiyView.onUnload(), 
        e.destoryAudio(this), this.isUnload = !0, this.removeConnectNotify(), this.countDownView.destroy(), 
        this.clearBreakingTimeout(), a.remove(o.ActionPlayerLogout, this.onPlayerLogout), 
        a.remove(o.ActionFightAnswer, this.onFightAnswer), a.remove(o.ActionFightOut, this.onFightOut), 
        a.remove(o.ActionFightInviteAgain, this.onFightInviteAgain), a.remove(o.socketClose, this.onSocketClose), 
        a.remove(o.socketOpen, this.onSocketOpen), a.remove(o.ActionFightSendEmot, this.onActionFightSendEmot), 
        b.eventDispatcher.removeEventListener("shareTextUpdate", this.onShareTextUpdate, this), 
        b.eventDispatcher.removeEventListener("onLogin", this.onLogin, this), b.eventDispatcher.removeEventListener("onRoomMasterLogout", this.onRoomMasterLogout, this), 
        this.audioFalseCtx && this.audioFalseCtx.destroy(), this.audioTrueCtx && this.audioTrueCtx.destroy(), 
        this.audioTapCtx && this.audioTapCtx.destroy();
        for (var s = getCurrentPages(), r = s.length - 1; r >= 0; r--) {
            var h = s[r];
            h && "page/pve/pve" == h.route && (h.btnLock = !1);
        }
        if (this.curState && (this.curState.end(), this.curState = null), !this.reLogin) {
            switch (this.type) {
              case "live":
                this.resultOK || this.sendOutFight(), n.againFight(b.uid);
                break;

              case "ob":
                break;

              case "pve":
                this.matchErr || (this.matchOK ? this.resultOK || this.sendOutFight() : t.cancelMatch(1, function(e, t) {
                    t || (console.log("取消匹配:OK", t), i.sendOutFight(1));
                }));
                break;

              case "special":
                this.matchErr || (this.matchOK ? this.resultOK || this.sendOutFight() : t.cancelMatch(6, function(e, t) {
                    t || (console.log("取消匹配:OK", t), i.sendOutFight(1));
                }));
                break;

              case "pvr":
              case "beginnerTest":
                this.resultOK || this.sendOutFight();
                break;

              case "challenge":
                this.resultOK ? this.liveCountDownOver || l.request_challengeLeave(l.curRoom.id, function(e, t) {
                    e || l.leaveRoom();
                }) : this.sendOutFight();
                break;

              case "obChallenge":
                this.liveCountDownOver || l.request_challengeLeave(l.curRoom.id, function(e, t) {
                    e || l.leaveRoom();
                });
            }
            "challenge" != this.type && "obChallenge" != this.type || this.audienceViewController && this.audienceViewController.dispose();
        }
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onTapChooseBtn: function(e) {
        if (!this.answerBtnLock && this.curState && "StateChoose" == this.curState.name && "ob" != this.type) {
            this.data.battleViewData.imageId || (this.pushLine2(e.currentTarget.dataset.index, {
                x: e.detail.x,
                y: e.detail.y
            }), this.pushLine3({
                x: e.detail.x,
                y: e.detail.y
            })), this.audioTapCtx && this.audioTapCtx.play();
            var t = "obChallenge" == this.type;
            this.curState.mySelect(e.currentTarget.dataset.index, t);
        }
    },
    onTapFuncBtn: function(e) {
        var t = this;
        if (!this.btnLock) switch (this.btnLock = !0, this.type) {
          case "beginnerTest":
            i.markStats(s.event_point.click_to_cover), wx.navigateBack({
                delta: 1,
                complete: function() {
                    setTimeout(function() {
                        t.btnLock = !1;
                    }, 500);
                }
            });
            break;

          case "ob":
            n.leaveRoom(function() {
                n.initRoom(-1, function() {
                    wx.navigateBack({
                        delta: 1,
                        complete: function() {
                            t.btnLock = !1;
                        }
                    });
                });
            });
            break;

          case "live":
            wx.navigateBack({
                delta: 1,
                complete: function() {
                    setTimeout(function() {
                        t.btnLock = !1;
                    }, 500);
                }
            });
            break;

          case "pve":
          case "pvr":
          case "special":
            wx.navigateBack({
                delta: 1
            });
        }
    },
    init: function(t) {
        this.type = t, this.registerConnectNotify(), a.register(o.ActionPlayerLogout, this.onPlayerLogout, this), 
        a.register(o.ActionFightAnswer, this.onFightAnswer, this), a.register(o.ActionFightOut, this.onFightOut, this), 
        a.register(o.ActionFightInviteAgain, this.onFightInviteAgain, this), a.register(o.socketClose, this.onSocketClose, this), 
        a.register(o.socketOpen, this.onSocketOpen, this), a.register(o.ActionFightSendEmot, this.onActionFightSendEmot, this), 
        b.eventDispatcher.addEventListener("onLogin", this.onLogin, this), this.countDownView = new w("timeCanvas", 10), 
        this.userEmojiController = new u(this, "userEmoji", !0), this.rivalEmojiController = new u(this, "rivalEmoji", !1), 
        this.emojiSelectController = new h(this, this.userEmojiController), this.emojiSelectController.setVisible(!1);
        var i = b.mainData.role.settingsInfo || {};
        i.soundOff || (wx.createInnerAudioContext && !this.audioFalseCtx && (this.audioFalseCtx = wx.createInnerAudioContext(), 
        this.audioFalseCtx.autoplay = !1, this.audioFalseCtx.src = "https://question-resource-wscdn.hortorgames.com/image/soundEffect/answer_wrong.wav"), 
        wx.createInnerAudioContext && !this.audioTrueCtx && (this.audioTrueCtx = wx.createInnerAudioContext(), 
        this.audioTrueCtx.autoplay = !1, this.audioTrueCtx.src = "https://question-resource-wscdn.hortorgames.com/image/soundEffect/answer_correct.wav"), 
        wx.createInnerAudioContext && !this.audioTapCtx && (this.audioTapCtx = wx.createInnerAudioContext(), 
        this.audioTapCtx.autoplay = !1, this.audioTapCtx.src = "https://question-resource-wscdn.hortorgames.com/image/soundEffect/button_click.wav")), 
        "challenge" != this.type && "obChallenge" != this.type || e.setNavigationBarTitle(l.curRoom.name || "群比赛"), 
        this.roundMax = "beginnerTest" != this.type ? 5 : 6, this.hasDouble = "beginnerTest" != this.type;
        var s = {};
        if (s.soundOff = i.soundOff, s = this.setTimeView(s), this.setData(s), this.stateChange("StateMatch"), 
        d.socketOpen || this.startBreakingTimeout(), "challenge" == this.type || "obChallenge" == this.type) {
            this.audienceViewController = new m(this, "audienceView"), this.audienceViewController.setMemberList(l.curRoom.members);
            l.getWinnerInfo(), l.getChallengerInfo();
        }
    },
    startBreakingTimeout: function() {
        var e = this;
        this.clearBreakingTimeout(), this.breakingTimeout = setTimeout(function() {
            e.setData({
                wsconnectBreaking: !d.socketOpen
            });
        }, 3e3);
    },
    clearBreakingTimeout: function() {
        this.breakingTimeout && (clearTimeout(this.breakingTimeout), this.breakingTimeout = void 0);
    },
    setTimeView: function(e) {
        return this.data.battleViewData.baseTimeViewScale = b.systemInfo.windowWidth / 750, 
        e;
    },
    setRoomId: function(e) {
        this.roomId = e, this.emojiSelectController.setRoomId(e);
    },
    stateChange: function(e) {
        if (!this.isUnload && (null == this.curState || this.curState.name != e)) {
            var t = new v[e](this);
            this.curState && this.curState.end(t), this.curState = t, this.curState.init();
        }
    },
    getTrueIndex: function(e) {
        return this.trueAnswerIndex[e];
    },
    setTrueIndex: function(e, t) {
        this.trueAnswerIndex[e] = t;
    },
    onFightAnswer: function(t, i) {
        if (i && (e.log("onFightAnswer：", this.roomId, i), !i.roomId || i.roomId == this.roomId)) {
            var a = void 0;
            if (i.uid == this.data.a.uid) a = "a"; else if (i.uid == this.data.b.uid) a = "b"; else if (0 == i.uid) a = "b"; else {
                if (this.audienceViewController) {
                    var o = "无名氏", s = l.getMemberInfo(i.uid);
                    s && (o = s.name), 0 != i.option && o && this.audienceViewController.remindAnswer(o, this.data.battleViewData.answer[i.option - 1].answer);
                }
                e.log("收到围观群众选择的答案：", i);
            }
            if (a) {
                var n = {};
                this.setData(n), "StateChoose" == this.curState.name && this.curState.round == i.num ? this.curState.onFightAnswer(t, i) : this.answerList.push(i);
            }
        }
    },
    onFightOut: function(t, i) {
        switch (this.type) {
          case "live":
          case "ob":
            i == this.data.a.uid && (this.playerLogout = !0, "live" != this.type && e.ShowToast(this.data.a.nickName + "放弃了对战")), 
            i == this.data.b.uid && (this.playerLogout = !0, e.ShowToast(this.data.b.nickName + "放弃了对战")), 
            this.playerLogout && this.curState && "StateChoose" == this.curState.name && this.curState.onPlayerLogout(t, i);
            break;

          case "pve":
            i == this.data.b.uid && (this.playerLogout = !0, e.ShowToast(this.data.b.nickName + "放弃了对战")), 
            this.playerLogout && this.curState && "StateChoose" == this.curState.name && this.curState.onPlayerLogout(t, i);
        }
    },
    onRoomMasterLogout: function(t) {
        switch (this.type) {
          case "live":
          case "ob":
            e.ShowConfirm("", t.data + "放弃了对战。", function() {
                b.gotoCover();
            });
        }
    },
    onPlayerLogout: function(t, i) {
        try {
            switch (this.type) {
              case "live":
              case "ob":
                i == this.data.a.uid && (this.playerLogout = !0, e.ShowToast(this.data.a.nickName + "离开了对战")), 
                i == this.data.b.uid && (this.playerLogout = !0, e.ShowToast(this.data.b.nickName + "离开了对战"));
                break;

              case "pve":
                i == this.data.b.uid && (this.playerLogout = !0, e.ShowToast("对手投降")), this.playerLogout && this.curState && "StateChoose" == this.curState.name && this.curState.onPlayerLogout(t, i);
            }
        } catch (t) {
            e.reportAnalytics_Try(t);
        }
    },
    sendOutFight: function() {
        var e = this, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        this.outFightSending = !0, t.outFight(i, this.roomId, function(t, a) {
            if (t && t.errCode == s.ExitCode.RequestErr || (b.mainData.role.roomID = 0), !t && a) {
                if (0 != i) return;
                var o = "";
                a.addGold < 0 && (o = "损失" + Math.abs(a.addGold) + "王者币"), "ob" != e.type && "obChallenge" != e.type && wx.showModal({
                    title: "你放弃了战斗。",
                    content: o,
                    showCancel: !1,
                    confirmText: "确定",
                    success: function() {}
                }), "pve" == e.type && c.refreshChangciBuffVal(a.myBuff), b.updateFightData(a), 
                "challenge" == e.type || "obChallenge" == e.type ? e.liveCountDownOver || l.request_challengeLeave(l.curRoom.id, function(e, t) {
                    e || l.leaveRoom();
                }) : "special" == e.type && b.eventDispatcher.dispatchEventWith("specialFightOut");
            }
        });
    },
    onFightInviteAgain: function(e, t) {
        !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
        console.log("[fight]: onFightInviteAgain"), wx.navigateBack({
            delta: 1
        });
    },
    onSocketClose: function(e) {
        this.startBreakingTimeout();
    },
    onSocketOpen: function(e) {
        this.clearBreakingTimeout(), this.setData({
            wsconnectBreaking: !d.socketOpen
        });
    },
    onActionFightSendEmot: function(e, t) {
        t && (this.data.a.uid == t.uid ? this.userEmojiController.showFace(t.emotID) : this.data.b.uid == t.uid && this.rivalEmojiController.showFace(t.emotID));
    },
    onActionChallengeInfoBase: function(t, i) {
        console.log(e.formatTime(e.getServerTimeBaseSecond()) + "_onActionChallengeInfoBase:", i), 
        l.curRoom.curWinner = i.challengeInfolist.curWinner, l.curRoom.curChallenger = i.challengeInfolist.curChallenger, 
        l.curRoom.expireAt = i.challengeInfolist.expireAt, l.curRoom.roomID = i.challengeInfolist.roomID, 
        l.curRoom.status = i.challengeInfolist.status, l.curRoom.statusExpireAt = i.challengeInfolist.statusExpireAt, 
        this.processMembersChange(i.membersChangeInfo);
    },
    onActionChallengeInfoMembers: function(e, t) {
        console.log("onActionChallengeInfoMembers:", t), this.processMembersChange(t);
    },
    processMembersChange: function(t) {
        if (t) {
            for (var i = 0; i < t.length; i++) {
                var a = t[i];
                1 == a.type ? this.audienceViewController.addMember(a) : 2 == a.type ? (this.audienceViewController.removeMember(a), 
                a.uid != this.data.a.userInfo.uid && a.uid != this.data.b.userInfo.uid || (e.ShowToast("参赛者逃跑了！"), 
                this.stateChange("StateResult"))) : 3 == a.type && this.audienceViewController.upDateMemberData(a);
            }
            this.audienceViewController && this.audienceViewController.setMemberList(l.curRoom.members);
        }
    },
    onShareAppMessage: function(e) {
        switch (console.log("onShareAppMessage type", this.type), this.shared = !0, this.type) {
          case "ob":
          case "live":
            var i = n.getData(), a = n.getViewType(), o = 1 == a ? b.mainData.role.shareCode : i.creatorCode;
            if (p.isZjwMath()) {
                var s = b.shareManager.getSpecialLiveShareData({
                    shareCode: o,
                    isWinnerInLive: 1 == a
                });
                return b.shareConf(s);
            }
            var r = b.shareManager.getPvPShareData({
                shareCode: o
            });
            return b.shareConf(r);

          case "challenge":
          case "obChallenge":
            var l = b.shareManager.getChallengeShareData(b.mainData.role.shareCode);
            return b.shareConf(l, !0);

          case "pvr":
            t.shareResult(this.roomId, function(e, t) {
                e && console.log("shareResult err", e);
            });
            var h = b.shareManager.getPvrShareData({
                isWin: 1 == this.data.resultViewData.isWin,
                nickName: this.data.b.nickName,
                score: this.data.resultViewData.scoreLeft,
                friendCode: g.friendCode,
                roomID: g.roomIdPvr,
                shareImage: b.pvrShareImg2
            });
            return b.shareConf(h);

          case "pve":
            t.shareResult(this.roomId, function(e, t) {
                e && console.log("shareResult err", e);
            });
            var u = b.shareManager.getPvEShareData(this.roomId);
            return b.shareConf(u);

          case "special":
            var c = p.isZjwMath(), d = (n.getData(), b.shareManager.getSpecialShareData(c));
            return b.shareConf(d);

          default:
            var m = b.shareManager.getFightNormalShareData({
                score: this.data.resultViewData.scoreLeft,
                shareCode: b.mainData.role.shareCode,
                roomId: this.roomId
            });
            return b.shareConf(m);
        }
    },
    levelUpView_onTapClosedBtn: function(e) {
        var t = {};
        t["levelUpViewData.visible"] = !1, this.setData(t);
    },
    levelUpView_onTapBtn: function(e) {
        2 == b.mainData.role.level && i.markStats(s.event_point.uplevel1);
        var t = {};
        t["levelUpViewData.visible"] = !1, this.setData(t);
    },
    onShareTextUpdate: function() {
        this.setData({
            "resultViewData.hasShareReward": !this.shared && !!b.getShareRewardText()
        });
    },
    onLogin: function() {
        this.reLogin = !0;
    },
    avatar_onTapAvatar: function() {
        "ob" != this.type && "obChallenge" != this.type && this.emojiSelectController.setVisible(!0);
    },
    onTapRestultEmojiBtn: function() {
        "ob" != this.type && "obChallenge" != this.type && this.emojiSelectController.setVisible(!0);
    },
    onTapWifiBtn: function() {
        var e = this;
        this.wifiBtnLock || (this.wifiBtnLock = !0, setTimeout(function() {
            e.wifiBtnLock = !1;
        }, 5e3));
    },
    onTapReportBtn: function(e) {
        var t = {};
        t["resultViewData.reportVisible"] = !0, t["resultViewData.btnGray"] = this.data.resultViewData.blackRole_submit && this.data.resultViewData.blackSubRole_submit, 
        this.setData(t);
    },
    onTapKnowBtn: function(e) {
        b.gotoKnow();
    },
    onTapReportClose: function(e) {
        var t = {};
        t["resultViewData.reportVisible"] = !1, this.data.resultViewData.blackRole_submit || (t["resultViewData.blackRole"] = !1), 
        this.data.resultViewData.blackSubRole_submit || (t["resultViewData.blackSubRole"] = !1), 
        this.setData(t);
    },
    onTapBlackRole: function(e) {
        var t = {};
        t["resultViewData.blackRole"] = !this.data.resultViewData.blackRole, this.setData(t);
    },
    onTapBlackSubRole: function(e) {
        var t = {};
        t["resultViewData.blackSubRole"] = !this.data.resultViewData.blackSubRole, this.setData(t);
    },
    onTapReportOK: function(t) {
        this.data.resultViewData.blackRole_submit == this.data.resultViewData.blackRole && this.data.resultViewData.blackSubRole_submit == this.data.resultViewData.blackSubRole || e.ShowToast("举报成功");
        var i = {};
        i["resultViewData.reportVisible"] = !1, i["resultViewData.reportEnabled"] = !1, 
        i["resultViewData.blackRole_submit"] = this.data.resultViewData.blackRole, i["resultViewData.blackSubRole_submit"] = this.data.resultViewData.blackSubRole, 
        this.setData(i);
    },
    checkReportChanged: function() {
        var e = r.getReport(), t = this.data.resultViewData;
        return !(!t.blackRole_submit || e.blackRole_submit == t.blackRole_submit) || !(!t.blackSubRole_submit || e.blackSubRole_submit == t.blackSubRole_submit);
    },
    finlSubmit: function() {
        var e = r.getData(), i = this.data.resultViewData.blackRole_submit || this.data.resultViewData.blackSubRole_submit ? e.rivalUser.uid : 0, a = [];
        this.data.resultViewData.blackRole_submit && a.push("2001"), this.data.resultViewData.blackSubRole_submit && a.push("9001");
        var o = a.join(","), s = e.roomId;
        t.playerReport(s, i, o, null, function(e, t) {});
    },
    onTapReviewBtn: function(e) {
        console.log("<review>:", r.getReviewData()), wx.navigateTo({
            url: "/page/review/review"
        });
    },
    pushLine2: function(e, t) {
        b.choosePosList2 || (b.choosePosList2 = [ [], [], [], [] ]), e >= 0 && e < 4 && b.choosePosList2[e].push(t);
    },
    isLine2: function() {
        if (!b.choosePosList2) return !1;
        for (var e = 0; e < b.choosePosList2.length; e++) {
            var t = b.choosePosList2[e], i = t.length;
            if (i < 5) return !1;
            for (var a = t[0]; i--; ) {
                var o = t[i];
                if (Math.abs(Math.sqrt(Math.pow(o.x - a.x, 2) + Math.pow(o.y - a.y, 2))) > 3) return b.choosePosList2[e] = [], 
                !1;
            }
        }
        return b.choosePosList2 = [ [], [], [], [] ], !0;
    },
    pushLine3: function(e) {
        b.choosePosList3 || (b.choosePosList3 = []), b.choosePosList3.push(e);
    },
    isLine3: function() {
        if (!b.choosePosList3) return -1;
        if (b.choosePosList3.length < 5) return -1;
        var e = -1, t = b.choosePosList3[0], i = !0, a = !1, o = void 0;
        try {
            for (var s, n = b.choosePosList3[Symbol.iterator](); !(i = (s = n.next()).done); i = !0) {
                var r = s.value, l = Math.abs(r.x - t.x);
                l > e && (e = l);
            }
        } catch (e) {
            a = !0, o = e;
        } finally {
            try {
                !i && n.return && n.return();
            } finally {
                if (a) throw o;
            }
        }
        return b.choosePosList3 = [], ~~e;
    },
    createCross: function() {
        var t = this;
        if ("pve" == this.type) {
            var i = b.systemInfo.SDKVersion;
            this.canShowAd = e.compareVersion(i, "2.0.7") < 0, this.ad = b.crossSDK.createAd({
                adsId: "m3Wkxr7xqr",
                gameId: "tnwz",
                success: this.refreshAD.bind(this),
                fail: function(i) {
                    console.log(i), e.setPageData(t, {
                        linkImg: ""
                    });
                }
            }), this.ad.onChange(this.refreshAD.bind(this));
        }
    },
    refreshAD: function(t) {
        try {
            var i = this.ad.getGoGameParams(), a = {};
            a.linkImg = t.gif_info.gif_url, a.linkAppId = i.appId, a.linkPath = i.path, i.extraData && (a.linkExtraData = i.extraData), 
            e.setPageData(this, a);
        } catch (t) {
            e.setPageData(this, {
                linkImg: ""
            });
        }
    },
    onTapLinkBtn: function() {
        this.canShowAd ? this.ad.show() : (this.ad.manualClick(), this.ad.reset());
    }
};

Page(C);