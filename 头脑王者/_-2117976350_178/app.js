var e = require("./net/wsconnect.js"), t = require("./net/network.js"), a = require("./net/cash/cashNetwork.js"), i = require("./util/util.js"), n = require("./util/ShareManager.js"), r = require("./util/LoginManager.js"), o = require("./util/daliyTask/DailyTaskNotifiy.js"), s = require("./const/consts.js"), c = require("./const/modeConsts.js"), h = require("./util/EventDispatcher.js"), l = require("./util/RoomDataManager.js"), u = require("./util/PVERoomDataManager.js"), m = require("./util/ChallengeRoomDataManager.js"), f = require("./util/DailyChallengeManager.js"), g = require("./data/ItemsManager.js"), d = require("./data/MyQuestionsManager.js"), v = require("./net/roleNet.js"), p = require("./net/bankNet.js"), D = require("./net/specialNet.js"), y = require("./data/SpecialData.js"), w = require("./libs/cryptojs/cryptojs.js").Crypto, S = require("./util/ActivityManager.js");

require("./libs/hortor/sdk.js"), require("./libs/wall-sdk.min.js"), require("./libs/hortor/sdk/sdk.min.js");

var C = {
    mainData: {
        roomData: {
            userInfo: {},
            rivalUser: {},
            viewNum: 0
        },
        roomData_pve: {
            userInfo: {},
            rivalUser: {},
            viewNum: 0
        },
        role: {
            signIn: {
                lastSignTime: 0
            },
            allSeeds: {},
            userInfo: {},
            gameConf: {},
            dailyChallenge: {}
        },
        loginArgs: {},
        enterChallengeID: 0,
        user_to_detail: {},
        touchedShareCode: {},
        dpr: 2,
        myQuestions: {
            backupSelectedItem: null,
            selectedItem: null,
            myQuestions: [ [], [], [] ]
        },
        bankShining: !1
    },
    cashLoginParam: {
        extraInfo: "",
        info: "",
        uid: ""
    },
    token: "",
    uid: 0,
    checkLoginOnShow: !1,
    eventDispatcher: new h(),
    isExitGame: !1,
    systemInfo: {},
    matchTimeoutCount: 0,
    reloginNum: 0,
    onLaunch: function(h) {
        var v = this;
        console.log("[app] onLaunch : ", h), i.init(this), l.init(this), u.init(this), m.init(this), 
        f.init(this), g.init(this), t.init(this), a.init(this), d.init(this), e.init(this), 
        r.init(this), o.init(this), this.shareManager = new n(), this.shareManager.init(this), 
        this.initAESKey(), this.initWall();
        try {
            var p = i.getStorageSync(s.StorageKey.ResVer), D = i.getStorageSync(s.StorageKey.RunMode);
            p == c.ResVer && D == c.RunMode || (i.removeAllCache(), i.clearStorageSync(), i.setStorageSync(s.StorageKey.ResVer, c.ResVer), 
            i.setStorageSync(s.StorageKey.RunMode, c.RunMode)), this.systemInfo = wx.getSystemInfoSync(), 
            console.log("systemInfo", this.systemInfo), 0 != this.systemInfo.windowWidth && 0 != this.systemInfo.windowHeight ? (this.mainData.dpr = 750 / this.systemInfo.windowWidth, 
            this.mainData.windowHeight = this.mainData.dpr * this.systemInfo.windowHeight) : console.error("screenWidth or windowHeight is zero!"), 
            this.mainData.isIOS = !1, this.systemInfo.system && (this.mainData.isIOS = i.startsWith(this.systemInfo.system, "iOS")), 
            wx.getUpdateManager && wx.getUpdateManager().onUpdateReady(function() {
                v.hasNewVer = !0;
            });
        } catch (e) {
            this.systemInfo = {};
        }
        wx.createInnerAudioContext && !this.audioFalseCtx && (this.audioFalseCtx = wx.createInnerAudioContext(), 
        this.audioFalseCtx.autoplay = !1, this.audioFalseCtx.src = "https://question-resource-wscdn.hortorgames.com/image/soundEffect/answer_wrong.wav"), 
        wx.createInnerAudioContext && !this.audioTrueCtx && (this.audioTrueCtx = wx.createInnerAudioContext(), 
        this.audioTrueCtx.autoplay = !1, this.audioTrueCtx.src = "https://question-resource-wscdn.hortorgames.com/image/soundEffect/answer_correct.wav"), 
        wx.createInnerAudioContext && !this.audioTapCtx && (this.audioTapCtx = wx.createInnerAudioContext(), 
        this.audioTapCtx.autoplay = !1, this.audioTapCtx.src = "https://question-resource-wscdn.hortorgames.com/image/soundEffect/button_click.wav");
    },
    initWall: function() {
        var e = {};
        e.gameId = "tnwz", e.key = "jMLcqun9Snl77rw6", e.gameVersion = c.ClientVer, e.env = c.RunMode == c.RunModeType.Prod ? "Prod" : "Test", 
        this.wallSDK.init(e);
    },
    getEnterType: function(e) {
        if (e) switch (e.scene) {
          case 1047:
          case 1048:
          case 1049:
          case 1011:
          case 1012:
          case 1013:
            return "qrCode";

          case 1104:
            return "myMiniProgm";
        }
        return e && e.query && e.query.from ? e.query.from : "normal";
    },
    getFriendFrom: function(e) {
        if (e && e.friendCode) switch (e.scene) {
          case 1047:
          case 1048:
          case 1049:
          case 1011:
          case 1012:
          case 1013:
            return "image";

          default:
            return "friend";
        }
    },
    makeEnterType: function(e) {
        return e || "normal";
    },
    onShow: function(t) {
        var a = this;
        console.log("[app] onShow : ", t), this.isShow = !0, this.mainData.loginArgs = {}, 
        t && (this.mainData.loginArgs.scene = t.scene, this.mainData.loginArgs.shareTicket = t.shareTicket, 
        this.mainData.loginArgs.from = this.getEnterType(t), this.mainData.loginArgs.fromNum = t.query.fromNum, 
        this.mainData.loginArgs.friendCode = t.query.friendCode, t.query && t.query.channel && (this.channel = t.query.channel, 
        this.mainData.loginArgs.mp = t.query.channel, this.checkPivilege = !0)), !this.isExitGame && this.checkLoginOnShow && (this.uid ? !this.preShowLoginTime || this.preShowLoginTime + 6e4 < i.getServerTime() ? wx.checkSession({
            success: function() {
                a.showLogin(), a.preShowLoginTime = i.getServerTime();
            },
            fail: function() {
                a.exitGame(s.ExitCode.Unauthorized, void 0, !0);
            }
        }) : this.showLogin() : this.login()), this.uid > 0 && (e.connectServer(), this.shareSuccess && setTimeout(function() {
            console.warn("onshow shareSuccess:", i.getServerTime()), i.invokeCallback(a.shareSuccess);
        }, 500));
    },
    showLogin: function() {
        var e = this;
        v.ShowLogin(this.mainData.loginArgs, function(t, a) {
            if (t) e.exitGame(t.errCode, t.errMsg); else {
                if (a.version != e.mainData.role.version) return console.warn("版本不一致, ", a.version, e.mainData.role.version), 
                r.clearLoginData(), void e.exitGame(s.ExitCode.NewVersion);
                a.seasonInfo && (e.mainData.role.seasonInfo = i.assign({}, a.seasonInfo)), a.mails && e.addMailList(a.mails), 
                e.mainData.role.hadPlatOrder = a.hadPlatOrder, a.gameConf && (e.mainData.role.gameConf = a.gameConf), 
                S.processActivities(a), S.refresBannerData(), e.mainData.role.nameIllegal = a.nameIllegal, 
                e.eventDispatcher.dispatchEventWith("onShowLogin");
            }
        });
    },
    login: function(e) {
        var t = this;
        r.login(function(a) {
            a ? "20003" == a.errCode ? t.login(e) : t.exitGame(a.errCode, a.errMsg, !0) : (t.checkLoginOnShow = !0, 
            l.onLogin(function() {
                f.onLogin(function() {
                    if (t.mainData.role.activities && 0 != t.mainData.role.activities.length) {
                        var a = S.getActivity("specialMatch");
                        a ? (y.data.base.aid = a.aid, D.activityInfo(a.aid, function(a, n) {
                            n && (t.mainData.role.bannerInfo = n), t.eventDispatcher.dispatchEventWith("onLogin"), 
                            i.invokeCallback(e);
                        })) : (t.eventDispatcher.dispatchEventWith("onLogin"), i.invokeCallback(e));
                    } else t.eventDispatcher.dispatchEventWith("onLogin"), i.invokeCallback(e);
                });
            }));
        });
    },
    reLogin: function() {
        var e = this;
        ++this.reloginNum > 2 && (r.clearLoginData(), this.reloginNum = 0), this.login(function() {
            "page/cover/cover" != i.getCurPage().route && e.gotoCover();
        });
    },
    onHide: function() {
        this.isShow = !1, this.uid > 0 && e.closeSocket();
    },
    onError: function(e) {
        i.reportAnalytics_catch_err(e);
    },
    shareConf: function(e, t, a, n) {
        var r = this, o = e && e.path ? e.path : "/page/login/login?friendCode=" + this.mainData.role.shareCode + "&compare=true", s = "normal", c = e && e.fromNum ? e.fromNum : "1_0";
        e && e.from && (o = o + "&from=" + (s = this.makeEnterType(e.from))), c && (o = o + "&fromNum=" + c);
        var h = "";
        e && "cut" != e.imageUrl && (h = e.imageUrl ? e.imageUrl : this.shareManager.getNormImage()), 
        v.shareStats("friend", s, c, function() {});
        var l = function(e) {
            console.info("分享成功回调:", e, "shareSuccess = ", !!r.shareSuccess), r.shareSuccess && (r.shareSuccess = void 0, 
            t || r.hasSharedWidhReward() || r.gainShare(), i.invokeCallback(a, e));
        };
        this.shareSuccess = l;
        return {
            title: e && e.title ? e.title : "本群头脑段位排行在此，看看你能排第几？",
            path: o,
            imageUrl: h,
            fail: function(e) {
                console.warn("分享失败回调:", e, i.getServerTime()), r.shareSuccess = void 0, i.invokeCallback(n, e);
            },
            success: l
        };
    },
    gainShare: function() {
        var e = this;
        p.gainShare(function(t, a) {
            if (t) ; else {
                e.setLastShareTime(!1);
                var n = e.mainData.role.gold, r = Math.abs(a.gold - n);
                i.ShowConfirm("分享奖励", "金币奖励 +" + r, null), e.updateGold(a.gold), e.eventDispatcher.dispatchEventWith("shareTextUpdate");
            }
        });
    },
    exitGame: function(t, a) {
        var n = this, o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (!this.isExitGame) {
            this.shareSuccess = void 0, e.closeSocket(), this.uid = 0, this.isExitGame = !0, 
            20015 != t && 20016 != t && t != s.ExitCode.SessionExpire || r.clearLoginData();
            var h = "";
            if (a && t != s.ExitCode.RequestErr) h = a; else switch (t) {
              case s.ExitCode.EdgeOut:
                h = "您已在其它设备登录";
                break;

              case s.ExitCode.Maintaining:
                h = "服务器开启维护模式，请稍后登录";
                break;

              case s.ExitCode.NewVersion:
                h = "版本更新，请完全关闭微信后再重新登录";
                break;

              case s.ExitCode.UserErr:
                h = "用户数据需要更新，请重新登录";
                break;

              case s.ExitCode.Unauthorized:
                h = "登录信息已过期。";
                break;

              case s.ExitCode.RequestErr:
                h = c.RunMode != c.RunModeType.Prod && a && -1 != a.indexOf("url not in domain list") ? "测试环境：请开启[调试模式]" : "你似乎已断开与互联网的连接。";
                break;

              default:
                h = "你似乎已断开与互联网的连接。";
            }
            var l = i.getCurPage(), u = l.onUnload.bind(l);
            l.onUnload = function() {
                i.invokeCallback(u), n.reLogin(), n.isExitGame = !1;
            };
            wx.showModal({
                title: "提示",
                content: h,
                showCancel: o,
                confirmText: "重新登录",
                success: function(e) {
                    e.confirm ? (l.onUnload = u.bind(l), n.isExitGame = !1, n.reLogin()) : e.cancel && (o ? (l.onUnload = u.bind(l), 
                    n.isExitGame = !1) : (l.onUnload = u.bind(l), n.isExitGame = !1, n.reLogin()));
                }.bind(this)
            });
        }
    },
    isNewUser: function() {
        return this.mainData.role.level <= 1 && this.mainData.role.exp <= 1;
    },
    isBeginnerTestUser: function() {
        return this.mainData.role.roomNum < 1 && this.mainData.role.level <= 1;
    },
    checkScope: function(e, t) {
        try {
            "function" == typeof wx.getSetting ? wx.getSetting({
                success: function(a) {
                    t(a && a.authSetting ? !!a.authSetting[e] : !1);
                },
                fail: function() {
                    t(!1);
                }
            }) : t(!1);
        } catch (e) {
            t(!1), i.reportAnalytics_Try(e);
        }
    },
    setUserInfo: function(e, a) {
        var n = this;
        if (e && e.userInfo && !this.mainData.role.nameIllegal) {
            var r = e.userInfo;
            this.mainData.role.unionId && this.mainData.role.userInfo.nickName == r.nickName && this.mainData.role.userInfo.avatarUrl == r.avatarUrl && this.mainData.role.userInfo.city == r.city ? i.invokeCallback(a) : (this.mainData.role.userInfo = r, 
            t.post(s.MessageHead.SetUserInfo, {
                params: {
                    encryptedData: e.encryptedData,
                    iv: e.iv,
                    userInfo: e.userInfo
                },
                success: function(e) {
                    n.mainData.role.unionId = e.unionId, i.invokeCallback(a);
                },
                fail: function(e) {
                    i.invokeCallback(a, e);
                }
            }));
        } else i.invokeCallback(a);
    },
    refreshUserInfo: function(e) {
        var t = this;
        wx.getUserInfo({
            lang: "zh_CN",
            success: function(a) {
                t.setUserInfo(a, e);
            },
            fail: function(t) {
                console.warn("获取用户信息失败。-", t.errMsg), e();
            }
        });
    },
    updateGold: function(e) {
        this.mainData.role.gold = Math.max(0, e), this.eventDispatcher.dispatchEventWith("goldUpdate");
    },
    updateDiamond: function(e) {
        this.mainData.role.diamond = Math.max(0, e), this.eventDispatcher.dispatchEventWith("diamondUpdate");
    },
    updateMindRoll: function(e) {
        this.mainData.role.mindRoll = Math.max(0, e), this.eventDispatcher.dispatchEventWith("goldMindRoll");
    },
    showCode: function() {
        wx.previewImage({
            urls: [ "https://question-resource-wscdn.hortorgames.com/image/ui/code.png?v=0.1.07" ],
            fail: function(e) {
                console.log("previewImage err", e);
            },
            success: function(e) {
                console.log("previewImage success", e);
            }
        });
    },
    gotoCover: function(e, t) {
        if (!this.isExitGame) {
            for (var a = getCurrentPages(), n = 0, r = !1, o = a.length - 1; o >= 0; o--) {
                if ("page/cover/cover" == a[o].route) {
                    r = !0;
                    break;
                }
                n++;
            }
            r ? a.length > 1 ? wx.navigateBack({
                delta: n,
                success: function() {
                    setTimeout(function() {
                        i.invokeCallback(e);
                    }, 300);
                },
                fail: t
            }) : setTimeout(function() {
                i.invokeCallback(e);
            }, 300) : wx.reLaunch({
                url: "/page/cover/cover",
                success: function() {
                    setTimeout(function() {
                        i.invokeCallback(e);
                    }, 300);
                },
                fail: t
            });
        }
    },
    gotoShop: function(e) {
        if (!this.isExitGame) {
            var t = "/page/market/market".concat(e ? "?pageIndex=" + e : ""), a = i.getCurPage();
            "/page/cover/cover" == a.route ? wx.navigateTo({
                url: t
            }) : "page/market/market" != a.route && this.gotoCover(function() {
                setTimeout(function() {
                    wx.navigateTo({
                        url: t
                    });
                }, 500);
            }, function() {});
        }
    },
    gotoHeadFrame: function() {
        if (!this.isExitGame) {
            var e = i.getCurPage();
            "/page/cover/cover" == e.route ? wx.navigateTo({
                url: "/page/head_frame/head_frame"
            }) : "page/head_frame/head_frame" != e.route && this.gotoCover(function() {
                setTimeout(function() {
                    wx.navigateTo({
                        url: "/page/head_frame/head_frame"
                    });
                }, 500);
            }, function() {});
        }
    },
    gotoKnow: function() {
        if (!this.isExitGame) {
            var e = i.getCurPage();
            "/page/cover/cover" == e.route ? wx.navigateTo({
                url: "/page/know/know"
            }) : "page/know/know" != e.route && this.gotoCover(function() {
                setTimeout(function() {
                    wx.navigateTo({
                        url: "/page/know/know"
                    });
                }, 500);
            }, function() {});
        }
    },
    gotoPVE: function(e, t) {
        if (!this.isExitGame) {
            var a = i.getCurPage();
            "/page/cover/cover" == a.route ? wx.navigateTo({
                url: "/page/pve/pve",
                success: e,
                fail: t
            }) : "page/pve/pve" != a.route && this.gotoCover(function() {
                setTimeout(function() {
                    wx.navigateTo({
                        url: "/page/pve/pve",
                        success: e,
                        fail: t
                    });
                }, 200);
            }, function() {});
        }
    },
    initShareTimeWhenLogin: function() {
        this.setLastShareTime(!0);
    },
    getPerShareMaxNum: function() {
        return this.mainData.role.gameConf ? this.mainData.role.gameConf.shareDayTimes : 1;
    },
    setLastShareTime: function(e) {
        if (e) i.setStorageSyncByDay("shareTimes", this.mainData.role.perShareNum, 1); else {
            var t = ~~i.getStorageSync("shareTimes");
            i.setStorageSyncByDay("shareTimes", t + 1, 1);
        }
    },
    hasSharedWidhReward: function() {
        return ~~i.getStorageSync("shareTimes") >= this.getPerShareMaxNum();
    },
    getShareRewardNum: function() {
        var e = this.mainData.role.curMatch - 1, t = i.GetMatchInfo(e);
        return t.fee || (t = i.GetMatchInfo(this.mainData.role.curMatch)), t.fee || 0;
    },
    getShareRewardText: function() {
        if (this.hasSharedWidhReward()) return "";
        var e = this.getShareRewardNum();
        if (e) {
            var t = e;
            if (t <= 0) return "分享到微信群，可获得";
            Math.max(1, this.getPerShareMaxNum());
            return "分享到微信群，可获得" + t;
        }
        return "";
    },
    getShareReward: function() {
        if (this.hasSharedWidhReward()) return 0;
        var e = this.mainData.role.curMatch - 1, t = i.GetMatchInfo(e);
        t.fee || (t = i.GetMatchInfo(this.mainData.role.curMatch));
        var a = t.fee;
        return a || 0;
    },
    formatUserCups: function(e) {
        if (e && e.cups) {
            var t = [];
            for (var a in e.cups) e.cups[a] > 0 && t.push({
                id: a
            });
            if (t.length > 0) return t;
        }
        return null;
    },
    updateFightData: function(e) {
        if (!e) return !1;
        if (0 != e.addGold && this.updateGold(e.gold), 1 == e.isWin && (this.mainData.role.winRoom += 1), 
        this.mainData.role.roomNum += 1, e.addExp > 0 && (this.mainData.role.exp = e.exp, 
        this.mainData.role.level != e.level && (this.mainData.role.maxExp = e.maxExp, this.mainData.role.level = e.level)), 
        e.itemInfo && e.itemInfo.itemId > 0 && e.itemInfo.itemNum > 0 && g.addItem(e.itemInfo.itemId, e.itemInfo.itemNum), 
        e.activityAddTicket && this.mainData.role.bannerInfo && this.mainData.role.bannerInfo.player && (this.mainData.role.bannerInfo.player.ticket || (this.mainData.role.bannerInfo.player.ticket = 0), 
        this.mainData.role.bannerInfo.player.ticket += e.activityAddTicket), 1 == e.fightType) if (300014 == e.matchID) this.mainData.role.curMatch = e.selfMatch, 
        i.GetMatchInfo(e.matchID).star = e.star, this.eventDispatcher.dispatchEventWith("lastStageUpdate"); else if (e.beforeMatch != e.selfMatch) this.mainData.role.curMatch = e.selfMatch, 
        i.GetMatchInfo(e.selfMatch).satr = 0, this.eventDispatcher.dispatchEventWith("stageAllClean"); else {
            this.mainData.role.curMatch = e.selfMatch;
            var t = i.GetMatchInfo(e.selfMatch);
            e.beforeStar > e.star ? (t.star = e.star, this.eventDispatcher.dispatchEventWith("stageSubStar")) : e.beforeStar < e.star ? (t.star = e.star, 
            this.eventDispatcher.dispatchEventWith("stageAddStar")) : (t.star = e.star, this.eventDispatcher.dispatchEventWith("stageSynchronize"));
        }
    },
    showPVEModal: function(e, t) {
        i.invokeCallback(t);
    },
    addMail: function(e) {
        if (e && this.uid > 0 && this.mainData.role.mails) {
            var t = e.id, a = !1, i = !0, n = !1, r = void 0;
            try {
                for (var o, s = this.mainData.role.mails[Symbol.iterator](); !(i = (o = s.next()).done); i = !0) o.value.id == t && (a = !0);
            } catch (e) {
                n = !0, r = e;
            } finally {
                try {
                    !i && s.return && s.return();
                } finally {
                    if (n) throw r;
                }
            }
            a || (this.mainData.role.mails.push(e), this.mainData.role.mails.sort(function(e, t) {
                return e.CreatedAt - t.CreatedAt;
            }));
        }
    },
    removeMail: function(e) {
        if (e && this.uid && this.mainData.role.mails) for (var t = this.mainData.role.mails.length; t--; ) this.mainData.role.mails[t].id == e && this.mainData.role.mails.splice(t, 1);
    },
    addMailList: function(e) {
        if (e && this.uid && this.mainData.role.mails) {
            var t = !0, a = !1, i = void 0;
            try {
                for (var n, r = e[Symbol.iterator](); !(t = (n = r.next()).done); t = !0) {
                    var o = n.value;
                    this.addMail(o);
                }
            } catch (e) {
                a = !0, i = e;
            } finally {
                try {
                    !t && r.return && r.return();
                } finally {
                    if (a) throw i;
                }
            }
        }
    },
    getCurBankGold: function() {
        if (this.mainData.role && this.mainData.role.bankInfo) {
            var e = i.getServerTime() / 1e3, t = this.mainData.role.bankInfo.lastBankTime, a = Math.max(e - t, 0), n = Math.ceil(this.mainData.role.bankInfo.bankCap / this.mainData.role.bankInfo.bankIncome);
            return n *= this.mainData.role.bankInfo.bankPeriod, this.mainData.role.fbdTime < e && (this.mainData.role.fbdTime += 86400, 
            this.mainData.role.bankDoubleNum = 0), a >= n ? this.mainData.role.bankInfo.bankCap : Math.floor(a / this.mainData.role.bankInfo.bankPeriod) * this.mainData.role.bankInfo.bankIncome;
        }
    },
    checkFuncOpen: function(e) {
        if (!this.uid) return !1;
        if (this.mainData.role.level < s.unlockLevel[e]) return !1;
        switch (e) {
          case s.funcType.groupChallenge:
            return !!this.getGameConf(s.gameConf.groupChallenge);

          case s.funcType.cash:
            return !!this.getGameConf(s.gameConf.cash);

          case s.funcType.iosQz:
            return !!this.getGameConf(s.gameConf.iosQz);

          default:
            return !0;
        }
    },
    getSeasonEndDeltaTime: function() {
        try {
            var e = 1e3 * this.mainData.role.seasonInfo.endTime, t = i.getServerTime();
            return t > e ? e + 1e3 * this.mainData.role.allSeeds.baseConf.seasonSetupDur - t : 0;
        } catch (e) {
            return 0;
        }
    },
    aesDecrypt: function(e) {
        try {
            var e = w.util.base64ToBytes(e), t = w.util.base64ToBytes(this.aeskey), a = w.util.base64ToBytes(this.aeskey), i = new w.mode.CBC(w.pad.pkcs7), n = w.AES.decrypt(e, t, {
                asBpytes: !0,
                iv: a,
                mode: i
            });
            return JSON.parse(n);
        } catch (e) {
            return null;
        }
    },
    initAESKey: function() {
        var e = w.util.randomBytes(24);
        this.aeskey = w.util.bytesToBase64(e);
    },
    getGameConf: function(e) {
        try {
            return this.mainData.role.gameConf[e];
        } catch (e) {
            return 0;
        }
    },
    setGameConf: function(e, t) {
        this.mainData && this.mainData.role && this.mainData.role.gameConf && (this.mainData.role.gameConf[e] = t);
    },
    gotoTNCJ: function(e) {
        wx.navigateToMiniProgram && wx.navigateToMiniProgram({
            appId: "wx42e2437205706adc",
            path: "?channel=" + e,
            success: function(e) {
                messageNet.markStatsEx({
                    event: s.event_point.click_link,
                    keyword1: "头脑吃鸡"
                }), i.reportAnalytics_debug_log("头脑吃鸡");
            },
            fail: function(e) {}
        });
    },
    isOnSale: function() {
        if (this.mainData.role.saleTime) {
            var e = i.getServerTimeBaseSecond(), t = this.mainData.role.saleTime[0], a = this.mainData.role.saleTime[1];
            if (e >= t && e < a) return !0;
        }
        return !1;
    },
    onCheckSysAndVersion: function() {
        var e = this.systemInfo, t = e.system.toLowerCase().indexOf("ios") >= 0, a = e.version, i = "6.5.9";
        return t || (i = "6.5.10"), !!(parseFloat(a) >= parseFloat(i));
    }
};

App(C);