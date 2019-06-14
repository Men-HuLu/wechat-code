var e = require("./../../net/bankNet.js"), t = require("./../../net/itemNet.js"), a = require("./../../net/roleNet.js"), i = require("./../../net/shopNet.js"), n = require("./../../net/messageNet.js"), o = require("./../../net/cash/loginNet.js"), r = require("./../../net/settingNet.js"), s = require("./../../net/specialNet.js"), l = require("./../../data/SpecialData.js"), c = require("./../../net/connectNotify.js"), h = require("./../../const/notifyConsts.js"), d = require("./../../util/util.js"), u = require("./../../const/consts.js"), m = require("./../../const/modeConsts.js"), f = require("./../../util/LoginManager.js"), g = require("./../../util/RoomDataManager.js"), p = require("./../../template/liveExpiredView.js"), v = require("./../../util/DailyChallengeManager.js"), w = require("./template/BeginnerTestViewController.js"), b = require("./template/SeasonReward.js"), k = require("./template/SettingViewController.js"), T = require("./template/NoticeController.js"), S = require("./template/DailyRewardView.js"), D = require("./template/SubscribeGuide.js"), C = require("./template/OfflineMatch.js"), I = require("./template/CoverBanner.js"), y = require("./../../data/ItemsManager.js"), _ = require("./../../util/ChallengeRoomDataManager.js"), P = require("./../../net/groupNet.js"), L = require("./../../net/fightNet.js"), R = require("./../../data/MainData.js"), A = require("./../../data/ScoreWallData.js"), B = require("./../../net/rewardNet"), N = (require("./GoldAniDisplayItem.js"), 
require("../pvr/template/PvrController.js")), V = require("./template/dailyTask.js"), x = require("../templatePageController.js"), M = require("./../../util/daliyTask/DailyTaskNotifiyView.js"), O = require("../../util/daliyTask/DailyTaskData.js"), U = require("../../net/dailyTask.js"), E = require("../../util/ActivityManager.js"), q = require("./../../libs/hortor/config.js"), j = getApp(), G = {
    data: {
        cashEntranceUrl: "https://question-resource-wscdn.hortorgames.com/image/new_skin/home/btn_home_cashgame.png",
        isGM: !1,
        gmCommand: null,
        showNewUser: !1,
        liveShareBtnVisible: !1,
        bankShareViewVisible: !1,
        subscribeBarVisible: !1,
        subscribeViewAni: "",
        noticeData: "",
        goldInBank: 0,
        fullTime: "00:00:00",
        newKnowledgeCount: 0,
        newItemCount: 0,
        knowledgePromptVisible: !0,
        itemPromptVisible: !0,
        liveExpiredViewData: {
            title: "",
            visible: !1
        },
        dailyTaskData: {
            visible: !1,
            data: {}
        },
        function_switch: {
            goods: !1,
            shop: !1,
            challenge: !0,
            bank: !1,
            knowledge: !1,
            ugc: !1,
            friends_ranking: !1,
            live: !1,
            cash: !1,
            groupChallenge: !1,
            daliyChallenge: !1
        },
        roleInfo: {
            userInfo: {},
            gold: 0,
            level: 0,
            exp: 0,
            maxExp: 0
        },
        mask_live_show: !1,
        mask_challenge_show: !1,
        mask_cash_show: !1,
        subscribeReward: {
            visible: !1
        },
        bcReward: {
            visible: !1
        },
        kingsNum: 0,
        kingsReward: 0,
        matchStats: 0,
        matchScale: 1,
        contestStatusTip: "",
        contestTime: "",
        contestCash: "",
        isShowContestTimeAni: !1
    },
    onLoad: function(e) {
        console.log("[cover] onLoad", e), this.initCross(), this.createCross(), this.setLogind();
        var t = "头脑王者";
        m.RunMode != m.RunModeType.Prod && (t += m.RunMode), d.setNavigationBarTitle(t), 
        this.scrollTop = 0, this.contestTimeOutId = -1, d.showShareMenu(), j.eventDispatcher.addEventListener("onLogin", this.onLogin, this), 
        j.eventDispatcher.addEventListener("onShowLogin", this.onShowLogin, this), j.eventDispatcher.addEventListener("onRefreshBanner", this.onRefreshBanner, this), 
        j.eventDispatcher.addEventListener("goldUpdate", this.onGoldUpdate, this), j.eventDispatcher.addEventListener("diamondUpdate", this.onDiamondUpdate, this), 
        j.eventDispatcher.addEventListener("onHasNewItem", this.onHasNewItem, this), j.eventDispatcher.addEventListener("refreshIntegralWallEntry", this.onRefreshIntegralWallEntry, this), 
        c.register(h.ActionDonatePay, this.onActionDonatePay, this), c.register(h.ActionNewMail, this.onActionNewMail, this), 
        c.register(h.ActionBCReward, this.onActionBCReward, this), c.register(h.ActionGameConf, this.onActionGameConf, this), 
        c.register(h.ActionSubscribed, this.onActionSubscribed, this), c.register(h.ActionActivityUpdate, this.onActionActivityUpdate, this), 
        c.register("specialLiveLeaveRoom", this.onSpecialLiveLeaveRoom, this), N.onCoverLoad(this), 
        this.checkPay(), this.checkPlayerNameIllegal(), this.checkLoginMsg(), this.checkPivilege();
    },
    onReady: function() {
        this.enterWithUrl();
    },
    onShow: function() {
        if (this.liveExpiredView || (this.liveExpiredView = new p(this)), this.beginnerTestViewController || (this.beginnerTestViewController = new w(this)), 
        this.dailyRewardView || (this.dailyRewardView = new S(this)), this.coverBanner || (this.coverBanner = new I(this)), 
        this.noticeController || (this.noticeController = new T(this)), this.seasonReward || (this.seasonReward = new b(this)), 
        this.settingViewController || (this.settingViewController = new k(this)), this.dailyTaskNotifiyView || (this.dailyTaskNotifiyView = new M(this)), 
        this.refreshUI(), j.uid > 0 ? (this.getStatsNum(), this.getContestStatus(), f.checkResult(!1, function() {}), 
        this.beginnerTestViewController.onShow(), this.dailyRewardView.onShow(), this.noticeController.onShow(), 
        this.seasonReward.onShow(), this.coverBanner.onShow(), this.checkBucang(), this.checkPay(), 
        this.dailyTaskNotifiyView.onShow(), this.refreshShareTest()) : j.login(), j.hasNewVer && wx.getUpdateManager) {
            var e = wx.getUpdateManager();
            j.hasNewVer = !1, wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启头脑王者？",
                success: function(t) {
                    t.confirm && e.applyUpdate();
                }
            });
        }
        this.gotoCash = !1, d.setPageData(this, {
            bankShining: j.mainData.bankShining
        }), j.eventDispatcher.dispatchEventWith("onPageShow", "cover"), this.refreshOnsaleStauts(), 
        this.ad && this.ad.start && this.ad.start();
    },
    refreshOnsaleStauts: function() {
        var e = this;
        if (j.mainData.role.saleTime) {
            clearTimeout(this.refreshOnSaleTime);
            var t = d.getServerTimeBaseSecond(), a = j.mainData.role.saleTime, i = a[0] > t ? a[0] : a[1] > t ? a[1] : 0;
            if (i > 0) {
                var n = 1e3 * (i - t);
                console.log(n + "毫秒后刷新"), this.refreshOnSaleTime = setTimeout(function() {
                    var t = {};
                    t["roleInfo.onsale"] = j.isOnSale(), d.setPageData(e, t), e.refreshOnsaleStauts_diamond();
                }, n);
            }
        }
    },
    onHide: function() {
        j.eventDispatcher.dispatchEventWith("onPageHide", "cover"), clearInterval(this.bankTimer), 
        clearTimeout(this.refreshOnSaleTime), this.bankTimer = void 0, this.seasonReward.onHide(), 
        this.playSubscribeViewAni(!1), this.platformOrderTimeout && (clearTimeout(this.platformOrderTimeout), 
        this.platformOrderTimeout = void 0), j.mainData.bankShining = !1, d.setPageData(this, {
            bankShining: j.mainData.bankShining
        }), this.coverBanner.onHide(), this.dailyTaskNotifiyView.onHide(), this.ad && this.ad.stop && this.ad.stop();
    },
    onUnload: function() {
        this.isUnload = !0, j.eventDispatcher.removeEventListener("onLogin", this.onLogin, this), 
        j.eventDispatcher.removeEventListener("onShowLogin", this.onShowLogin, this), j.eventDispatcher.removeEventListener("onRefreshBanner", this.onRefreshBanner, this), 
        j.eventDispatcher.removeEventListener("goldUpdate", this.onGoldUpdate, this), j.eventDispatcher.removeEventListener("diamondUpdate", this.onDiamondUpdate, this), 
        j.eventDispatcher.removeEventListener("onHasNewItem", this.onHasNewItem, this), 
        j.eventDispatcher.removeEventListener("hideIntegralWallNewGame", this.onRefreshIntegralWallEntry, this), 
        c.remove(h.ActionDonatePay, this.onActionDonatePay), c.remove(h.ActionNewMail, this.onActionNewMail), 
        c.remove(h.ActionBCReward, this.onActionBCReward), c.remove(h.ActionGameConf, this.onActionGameConf), 
        c.remove(h.ActionSubscribed, this.onActionSubscribed), c.remove(h.ActionActivityUpdate, this.onActionActivityUpdate), 
        c.remove("specialLiveLeaveRoom", this.onSpecialLiveLeaveRoom, this), this.seasonReward.onUnload(), 
        this.noticeController.onUnload(), N.onCoverUnLoad(this), clearTimeout(this.goldAniTimer), 
        this.goldAniTimer = void 0, clearTimeout(this.btnUnlockTimer), this.btnUnlockTimer = void 0, 
        clearInterval(this.bankTimer), this.bankTimer = void 0, clearInterval(this.contestTimeOutId), 
        this.contestTimeOutId = void 0, this.coverBanner.onUnload(), this.dailyTaskNotifiyView.onUnload(), 
        this.ad && this.ad.stop && this.ad.stop();
    },
    onShareAppMessage: function(e) {
        var t = this;
        if (e && e.target) {
            if ("specialLiveFight" == e.target.id) {
                var a = j.shareManager.getSpecialLiveShareData({
                    shareCode: j.mainData.role.shareCode,
                    isWinnerInLive: !0
                });
                return j.shareConf(a, !0, function() {
                    g.shareToSpecialLive(function(e) {
                        t.btnLock = !1, e && d.ShowConfirm(e.errCode, e.errMsg, function() {});
                    });
                });
            }
            if ("liveFight" == e.target.id) {
                var i = j.shareManager.getPvPShareData({
                    shareCode: j.mainData.role.shareCode
                });
                return j.shareConf(i, !0, function() {
                    g.shareToLive(function(e) {
                        t.btnLock = !1, e && d.ShowConfirm(e.errCode, e.errMsg, function() {});
                    });
                });
            }
            if ("bank" == e.target.id) {
                var n = j.shareManager.getCompareShareData("bank");
                return j.shareConf(n, !0, function() {
                    d.setPageData(t, {
                        bankShareViewVisible: !1
                    }), t.gainBank(!0, function() {
                        t.btnUnlock();
                    });
                });
            }
            if ("seasonReward" == e.target.id) {
                var o = j.mainData.role.seasonInfo, r = this.seasonReward.selfRank;
                if (r) {
                    var s = j.shareManager.getSeasonShareData(o.seasonName, r.rank, r.matchName);
                    return j.shareConf(s);
                }
                var l = j.shareManager.getCompareShareData("cover");
                return j.shareConf(l);
            }
        }
        var c = j.shareManager.getCompareShareData("cover");
        return j.shareConf(c);
    },
    checkBucang: function() {
        !(j.mainData.role.mails && j.mainData.role.mails.length > 0) || this.data.bcReward && this.data.bcReward.visible || this.showBucangView(j.mainData.role.mails[0]);
    },
    showBucangView: function(e) {
        var t = {
            id: e.id,
            title: e.title,
            content: e.content,
            type: "bcReward",
            visible: !0,
            items: []
        };
        if (e.attachments) for (var a = 0; a < e.attachments.length; a += 2) {
            var i = {};
            i.itemId = e.attachments[a], i.itemNum = e.attachments[a + 1];
            var n = j.mainData.role.allSeeds.itemConfs[i.itemId];
            i.name = n ? n.name : "", t.items.push(i);
        }
        d.setPageData(this, {
            bcReward: t
        });
    },
    onActionNewMail: function(e, t) {
        if (t) if (this.data.bcReward && this.data.bcReward.visible) {
            var a = t[0];
            a = JSON.parse(a), j.addMail(a[0]);
        } else {
            var i = t[0];
            i = JSON.parse(i), this.showBucangView(i[0]);
        }
    },
    onBucangViewBtn: function(e) {
        var t = this, a = this.data.bcReward;
        B.gainBc(function(e, i) {
            if (e) d.ShowConfirm("", e.errMsg, function() {}), e.errCode != u.ExitCode.RequestErr && (j.removeMail(a.id), 
            t.checkBucang()); else {
                if (i && i.items) for (var n = 0; n < i.items.length; n++) {
                    var o = i.items[n];
                    y.addItem(o.itemId, o.itemNum);
                }
                j.removeMail(a.id), t.checkBucang();
            }
        }), d.setPageData(this, {
            bcReward: {
                visible: !1
            }
        });
    },
    getStatsNum: function() {
        this.request_matchstates();
    },
    request_matchstates: function() {
        var e = this;
        j.uid && n.matchStats(function(t, a) {
            if (!t && a) {
                var i = 0;
                for (var n in a) i += parseInt(a[n]);
                d.setPageData(e, {
                    matchStats: Math.ceil(i)
                });
            }
        });
    },
    getContestStatus: function() {
        this.request_conteststates();
    },
    getCashEntranceImage: function(e) {
        return "https://question-resource-wscdn.hortorgames.com/image/cash/title/img_cover_" + (e || "normal") + ".png";
    },
    request_conteststates: function() {
        var e = this;
        j.uid && (clearInterval(this.contestTimeOutId), d.setPageData(this, {
            isShowContestTimeAni: !1
        }), o.getContestStatus(function(t, a) {
            if (t) ; else if (a) {
                var i = a.running, n = a.nextTime, o = a.cash;
                e.contestCash = o;
                var r = "";
                if (r = o <= 9999900 ? "本期奖金" + o / 100 + "元" : "本期奖金" + o / 100 / 1e4 + "万元", e.cashEntranceUrl = e.getCashEntranceImage(a.title), 
                e.cashEntranceUrl != e.data.cashEntranceUrl) {
                    var s = {};
                    s.cashEntranceUrl = e.getCashEntranceImage(a.title), d.setPageData(e, s);
                }
                if (i) e.data.contestStatusTip = "进行中", d.setPageData(e, {
                    contestStatusTip: e.data.contestStatusTip,
                    contestCash: r,
                    contestTime: "",
                    isShowTime: !1
                }); else if (e.data.contestStatusTip = "  倒计时", n > 0) {
                    d.setPageData(e, {
                        contestCash: r
                    });
                    var l = d.getServerTimeBaseSecond(), c = n - l;
                    c > 0 ? e.contestTimeOutId = setInterval(function() {
                        if (e.isUnload) clearInterval(e.contestTimeOutId); else if (--c <= 600 && (e.data.isShowContestTimeAni || (e.data.isShowContestTimeAni = !0, 
                        d.setPageData(e, {
                            isShowContestTimeAni: e.data.isShowContestTimeAni
                        }))), c <= 0) clearInterval(e.contestTimeOutId), e.contestTimeOutId = void 0, e.data.contestStatusTip = "进行中", 
                        c <= -1800 && (e.data.contestStatusTip = "已结束", e.showCashToastEnd = !1), d.setPageData(e, {
                            contestStatusTip: e.data.contestStatusTip,
                            contestCash: r,
                            contestTime: "",
                            isShowTime: !1
                        }); else {
                            var t = new Date(1e3 * n), a = new Date(d.getServerTime());
                            t.getDate(), a.getDate();
                            if (c <= 172800) {
                                if (e.data.contestStatusTip = "  倒计时", e.contestTime = d.formatTime(c), d.setPageData(e, {
                                    contestStatusTip: e.data.contestStatusTip,
                                    contestTime: e.contestTime,
                                    isShowTime: !0
                                }), c < 180 && !e.showCashToastEnd) {
                                    e.showCashToastEnd = !0;
                                    var i = d.getCurPage();
                                    "page/fight/fight" != i.route && "page/dailyChallenge/fight/dailyChallengeFight" != i.route && "page/cash/main/main" != i.route && "page/cash/home/home" != i.route && wx.showModal({
                                        title: "提醒",
                                        content: "现金大奖赛3分钟后开始！",
                                        showCancel: !0,
                                        cancelText: "关闭",
                                        confirmText: "参赛",
                                        success: function(t) {
                                            t.confirm ? (j.gotoCover(function() {
                                                setTimeout(function() {
                                                    e.onTapCash();
                                                }, 500);
                                            }), d.reportAnalytics_debug_log("同意进入现金赛")) : t.cancel && d.reportAnalytics_debug_log("关闭现金赛提示");
                                        }
                                    });
                                }
                            } else e.data.contestStatusTip = "暂无比赛", d.setPageData(e, {
                                contestStatusTip: e.data.contestStatusTip,
                                contestTime: "",
                                contestCash: "",
                                isShowTime: !1
                            });
                        }
                    }, 1e3) : (e.contestTimeOutId && clearInterval(e.contestTimeOutId), e.contestTimeOutId = void 0, 
                    e.data.contestStatusTip = "已结束", d.setPageData(e, {
                        contestStatusTip: e.data.contestStatusTip,
                        contestCash: r,
                        contestTime: "",
                        isShowTime: !1
                    }));
                } else e.data.contestStatusTip = "暂无比赛", d.setPageData(e, {
                    contestStatusTip: e.data.contestStatusTip,
                    contestTime: "",
                    contestCash: "",
                    isShowTime: !1
                });
            }
        }));
    },
    btnUnlock: function() {
        var e = this;
        this.btnUnlockTimer = setTimeout(function() {
            e.btnLock = !1;
        }, 500);
    },
    refreshUI: function() {
        var e = {};
        e = this.refreshRoleInfo(e), e = this.refreshSwitch(e), e = this.refreshNewItem(e), 
        j.uid > 0 ? (e.showNewUser = j.isNewUser(), this.refreshCurBankGold(), this.bankTimer || (this.bankTimer = setInterval(this.refreshCurBankGold.bind(this), 1e3)), 
        e.liveShareBtnVisible = !g.isActivate(), j.mainData.role.subscribedReward ? this.playSubscribeViewAni(!1) : j.mainData.role.isSubscribed ? (this.showSubscribeRewardView(), 
        this.playSubscribeViewAni(!1)) : this.playSubscribeViewAni(j.getGameConf(u.gameConf.subscribed)), 
        e.bannerZhihu = 1 == j.mainData.role.seasonInfo.seasonId, e.showFilledRect = this.checkFilledRect()) : (e.linkImg = "", 
        e.showNewUser = !1, e.liveShareBtnVisible = !1, e.bannerZhihu = !1, this.playSubscribeViewAni(!1)), 
        e.isIOS = j.mainData.isIOS, d.setPageData(this, e);
    },
    refreshSwitch: function(e) {
        return e.function_switch = {
            goods: j.checkFuncOpen(u.funcType.goods),
            shop: j.checkFuncOpen(u.funcType.shop),
            challenge: j.checkFuncOpen(u.funcType.challenge),
            bank: j.checkFuncOpen(u.funcType.bank),
            knowledge: j.checkFuncOpen(u.funcType.knowledge),
            friends_ranking: j.checkFuncOpen(u.funcType.friends_ranking),
            live: j.checkFuncOpen(u.funcType.live),
            groupChallenge: !1,
            cash: j.checkFuncOpen(u.funcType.cash),
            daliyChallenge: j.checkFuncOpen(u.funcType.daliyChallenge),
            iosQz: j.checkFuncOpen(u.funcType.iosQz)
        }, e.showFilledRect = this.checkFilledRect(), e;
    },
    onHasNewItem: function() {
        var e = this.refreshNewItem({});
        e = this.refreshSwitch(e), d.setPageData(this, e);
    },
    onRefreshIntegralWallEntry: function() {
        var e = A.hasNewReward(), t = this.hasNewGame(A.data.tasks), a = {};
        a["integral_wall_data.hasNewReward"] = e, a["integral_wall_data.hasNewGame"] = t, 
        this.setData(a);
    },
    refreshNewItem: function(e) {
        try {
            e.newKnowledgeCount = y.newKnowledgeCount, e.newItemCount = y.newItemCount;
            var t = j.mainData.windowHeight / j.mainData.dpr, a = 1600 / j.mainData.dpr, i = 1400 / j.mainData.dpr, n = this.scrollTop + t < i, o = this.scrollTop + t < a;
            e.knowledgePromptVisible = n && e.newKnowledgeCount > 0, e.itemPromptVisible = o && e.newItemCount > 0;
        } catch (e) {
            d.reportAnalytics_Try(e);
        }
        return e;
    },
    onLogin: function() {
        this.btnLock = !1, this.refreshUI(), this.beginnerTestViewController.onShow(), this.dailyRewardView.onShow(), 
        this.noticeController.onShow(), this.seasonReward.onShow(), this.checkBucang(), 
        this.checkPay(), this.checkPlayerNameIllegal(), this.checkLoginMsg(), this.coverBanner.refreshBanner();
    },
    onShowLogin: function() {
        j.uid > 0 && (this.beginnerTestViewController.onShow(), this.dailyRewardView.onShow(), 
        this.noticeController.onShow(), this.seasonReward.onShow(), this.checkBucang(), 
        this.checkPay(), this.checkCash(), this.checkPlayerNameIllegal(), this.checkLoginMsg(), 
        this.coverBanner.refreshBanner());
    },
    onRefreshBanner: function() {
        this.coverBanner.refreshBanner();
    },
    onGoldUpdate: function() {
        var e = this.refreshRoleInfo({});
        d.setPageData(this, e);
    },
    onDiamondUpdate: function() {
        var e = this.refreshRoleInfo({});
        d.setPageData(this, e);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    callback_command_input: function(e) {
        d.setPageData(this, {
            gmCommand: e.detail.value
        });
    },
    btn_command_exec: function(e) {
        var a = this;
        t.exec(j.mainData.role.uid, this.data.gmCommand, function(e, t) {
            e || (d.ShowToast("添加道具成功，刷新游戏确认。"), "reset" == a.data.gmCommand && d.clearStorageSync());
        });
    },
    callback_mode_gm: function(e) {
        u.SuperMode && d.setPageData(this, {
            isGM: !this.data.isGM
        });
    },
    btn_code_clicked: function() {
        var e = this;
        this.btnLock || (this.btnLock = !0, j.mainData.user_to_detail = j.mainData.role, 
        wx.navigateTo({
            url: "../../page/user_detail/user_detail",
            complete: function() {
                e.btnUnlock();
            }
        }));
    },
    onActionSubscribed: function() {
        j.mainData.role.isSubscribed = !0, this.showSubscribeRewardView(), this.playSubscribeViewAni(!1);
    },
    getSubscribed: function(e) {
        var t = this;
        j.mainData.role.isSubscribed || a.getSubscribed(e, function(e, a) {
            t.subscribeLock = !1, !e && a && (j.mainData.role.isSubscribed = a.isSubscribed, 
            a.isSubscribed && (t.showSubscribeRewardView(), t.playSubscribeViewAni(!1)));
        });
    },
    gainSubscribed: function() {
        var e = this;
        B.gainSubscribed(function(t, a) {
            if (!t && a && (j.mainData.role.subscribedReward = !0, e.playSubscribeViewAni(!1), 
            a.items && a.items[0])) {
                y.addItem(a.items[0].itemId, a.items[0].itemNum);
                var i = e.refreshSwitch({});
                d.setPageData(e, i);
            }
        });
    },
    playSubscribeViewAni: function(e) {
        if (e) {
            var t = wx.createAnimation();
            t.right("-40rpx").step({
                timingFunction: "ease-in",
                duration: 500
            }), d.setPageData(this, {
                subscribeBarVisible: !0,
                subscribeViewAni: t.export()
            });
        } else {
            var a = wx.createAnimation();
            a.right("-317rpx").step({
                timingFunction: "ease-in",
                duration: 500
            }), d.setPageData(this, {
                subscribeBarVisible: !0,
                subscribeViewAni: a.export()
            });
        }
    },
    onTapSubscribeView: function() {
        this.subscribeGuide = new D(this), this.subscribeGuide_show(), n.markStats(u.event_point.click_Subscribe);
        var e = !d.getStorageSync("SubscribeClick");
        this.getSubscribed(e), d.setStorageSync("SubscribeClick", !0);
    },
    showSubscribeRewardView: function() {
        var e = {
            subscribeReward: {
                title: "关注奖励",
                content: "恭喜您获得关注奖励",
                visible: !0
            }
        };
        d.setPageData(this, e);
    },
    onTapSubscribeRewardViewBtn: function(e) {
        this.gainSubscribed(), d.setPageData(this, {
            subscribeReward: {
                visible: !1
            }
        });
    },
    refreshCurBankGold: function() {
        if (j.mainData.role && j.mainData.role.bankInfo && !this.isUnload) {
            var e = d.getServerTime() / 1e3, t = j.mainData.role.bankInfo.lastBankTime, a = Math.max(e - t, 0), i = Math.ceil(j.mainData.role.bankInfo.bankCap / j.mainData.role.bankInfo.bankIncome);
            if (i *= j.mainData.role.bankInfo.bankPeriod, j.mainData.role.fbdTime < Date.now() / 1e3 && (j.mainData.role.fbdTime += 86400, 
            j.mainData.role.bankDoubleNum = 0), a >= i) d.setPageData(this, {
                goldInBank: j.mainData.role.bankInfo.bankCap,
                fullTime: "00:00:00"
            }); else {
                var n = Math.floor(a / j.mainData.role.bankInfo.bankPeriod), o = i - a;
                d.setPageData(this, {
                    goldInBank: n * j.mainData.role.bankInfo.bankIncome,
                    fullTime: d.formatTime(o)
                });
            }
        } else clearInterval(this.bankTimer);
    },
    btn_bank_clicked: function(e) {
        var t = this;
        if (!this.btnLock) if (this.data.function_switch.bank) try {
            if (this.refreshCurBankGold(), this.data.goldInBank > 0) {
                if (this.btnLock = !0, j.getGameConf("bankDouble") && j.mainData.role.bankInfo.bankCap == this.data.goldInBank && j.mainData.role.bankDoubleNum < j.mainData.role.allSeeds.shareConf.bankDoubleNum) return void d.setPageData(this, {
                    bankShareViewVisible: !0
                });
                this.gainBank(!1, function() {
                    t.btnUnlock();
                });
            }
        } catch (e) {
            d.reportAnalytics_Try(e);
        } else {
            var a = u.unlockLevel[u.funcType.bank];
            a > 0 && j.mainData.role.level < a ? d.ShowToast("需要个人等级达到" + a + "级。") : d.ShowToast("该功能暂不开放。");
        }
    },
    gainBank: function(t, a) {
        var i = this;
        e.gainBank(t, function(e, n) {
            if (e) d.ShowToast("收取王者币失败"); else {
                var o = t ? 2 * j.mainData.role.bankInfo.bankCap : n.gold - j.mainData.role.gold;
                d.ShowToast("王者币+" + o), j.mainData.role.gold = n.gold, j.mainData.role.bankInfo.lastBankTime = n.lastBankTime, 
                j.mainData.role.fbdTime = n.fbdTime, j.mainData.role.bankDoubleNum = n.bankDoubleNum, 
                d.setPageData(i, {
                    goldInBank: 0,
                    bankShining: !1,
                    "roleInfo.gold": n.gold,
                    "roleInfo.bankInfo.lastBankTime": n.lastBankTime
                }), i.refreshCurBankGold();
            }
            a();
        });
    },
    onTapBankShareViewCloseBtn: function() {
        var e = this;
        d.setPageData(this, {
            bankShareViewVisible: !1
        }), this.gainBank(!1, function() {
            e.btnUnlock();
        });
    },
    onTapRewardEXViewBtn: function(e) {
        var t = this;
        switch (e.currentTarget.dataset.type) {
          case "platformOrder":
            i.gainOrder(j.uid, this.orderIds, function(e, a) {
                if (e) d.ShowToast(e.errMsg); else {
                    j.mainData.role.hadPlatOrder = a.hadPlatOrder;
                    var i = !0, n = !1, o = void 0;
                    try {
                        for (var r, s = a.items[Symbol.iterator](); !(i = (r = s.next()).done); i = !0) {
                            var l = r.value;
                            y.addItem(l.itemId, l.itemNum);
                        }
                    } catch (e) {
                        n = !0, o = e;
                    } finally {
                        try {
                            !i && s.return && s.return();
                        } finally {
                            if (n) throw o;
                        }
                    }
                    var c = {
                        rewardEXData: {
                            visible: !1
                        }
                    };
                    c = t.refreshRoleInfo(c), c = t.refreshSwitch(c), t.orderIds = void 0, d.setPageData(t, c), 
                    t.checkPay();
                }
            });
            break;

          case "bcReward":
            this.onBucangViewBtn(null);
            break;

          case "dailyTaskReward":
            O.refresh(), d.setPageData(this, {
                rewardEXData: {
                    visible: !1
                }
            });
            break;

          default:
            d.setPageData(this, {
                rewardEXData: {
                    visible: !1
                }
            });
        }
    },
    checkPay: function() {
        var e = this;
        j.mainData.role.hadPlatOrder && i.platformOrder(j.uid, function(t, a) {
            if (!t) {
                j.mainData.role.hadPlatOrder = a.hadPlatOrder, e.orderIds = "";
                var i = [];
                e.orderItems = [];
                for (var n in a.orders) {
                    i.push(n);
                    var o = a.orders[n];
                    e.addPayItem(e.orderItems, o.itemId, o.itemNum);
                }
                e.orderIds = i.join(","), e.orderIds && d.setPageData(e, {
                    rewardEXData: {
                        type: "platformOrder",
                        title: "领取物品",
                        content: "感谢你的打赏，以下是赠予你的礼物，请查收。",
                        items: e.orderItems,
                        visible: !0
                    }
                });
            }
        });
    },
    addPayItem: function(e, t, a) {
        var i = j.mainData.role.allSeeds.itemConfs[t], n = void 0, o = !0, r = !1, s = void 0;
        try {
            for (var l, c = e[Symbol.iterator](); !(o = (l = c.next()).done); o = !0) {
                var h = l.value;
                if (h.itemId == t) {
                    h.itemNum += a, n = h;
                    break;
                }
            }
        } catch (e) {
            r = !0, s = e;
        } finally {
            try {
                !o && c.return && c.return();
            } finally {
                if (r) throw s;
            }
        }
        n || (n = {
            name: i.name,
            itemId: t,
            itemNum: a
        }, e.push(n));
    },
    onTapSettingBtn: function(e) {
        this.settingViewController.show(function() {});
    },
    setLogind: function() {
        var e = this;
        j.wallSDK.setLogind(j.mainData.role.openId, j.mainData.role.userInfo.gender, ""), 
        j.wallSDK.logOpenTaskPanel(), j.wallSDK.getTasks({
            success: function(t) {
                t.tasks.length > 0 ? (d.log("获取积分墙到数据", t), A.data.tasks = t.tasks, a.getWallInfo(function(t, a) {
                    t ? d.ShowToast("获取数据失败，请稍后重试") : (A.data.wallInfo = a.info, A.refreshInfo(), e.onRefreshIntegralWallEntry());
                })) : d.log("没有任务");
            },
            fail: function(e) {
                d.log("获取积分墙任务失败.", e);
            }
        });
    },
    hasNewGame: function(e) {
        if (!e) return !1;
        var t = d.getStorageSync("integral_wall");
        if (!t) return !0;
        for (var a = 0; a < e.length; a++) if (!t["" + e[a].taskId]) return !0;
        return !1;
    },
    initCross: function() {
        q.gameId = "tnwz", q.gameVersion = m.ClientVer, q.env = m.RunMode == m.RunModeType.Prod ? "Prod" : "Test", 
        q.openId = j.mainData.role.openId, q.sex = j.mainData.role.userInfo.gender, j.crossSDK.init(q);
    },
    createCross: function() {
        var e = this, t = j.systemInfo.SDKVersion;
        this.canShowAd = d.compareVersion(t, "2.0.7") < 0, this.ad = j.crossSDK.createAd({
            adsId: "woGX0pXOay",
            gameId: "tnwz",
            success: this.refreshAD.bind(this),
            fail: function(t) {
                console.log(t), d.setPageData(e, {
                    linkImg: ""
                });
            }
        }), this.ad.onChange(this.refreshAD.bind(this));
    },
    refreshAD: function(e) {
        if (j.isNewUser()) d.setPageData(this, {
            linkImg: ""
        }); else try {
            var t = this.ad.getGoGameParams(), a = {};
            a.linkImg = e.gif_info.gif_url, a.linkAppId = t.appId, a.linkPath = t.path, t.extraData && (a.linkExtraData = t.extraData), 
            d.setPageData(this, a);
        } catch (e) {
            d.setPageData(this, {
                linkImg: ""
            });
        }
    },
    onTapLinkBtn: function() {
        this.canShowAd ? this.ad.show() : (this.ad.manualClick(), this.ad.reset());
    },
    checkCash: function() {
        var e = {};
        e["function_switch.cash"] = j.getGameConf(u.gameConf.cash), d.setPageData(this, e);
    },
    onTapCash: function() {
        if (!this.btnLock) if (this.data.function_switch.cash) this.btnLock = !0, this.request_Cash_getAppInfo(); else {
            var e = u.unlockLevel[u.funcType.cash];
            e > 0 && j.mainData.role.level < e ? d.ShowToast("需要个人等级达到" + e + "级。") : d.ShowToast("该功能暂不开放。");
        }
    },
    onBindscroll: function(e) {
        this.scrollTop = ~~e.detail.scrollTop;
        var t = this.refreshNewItem({});
        d.setPageData(this, t);
    },
    request_Cash_getAppInfo: function() {
        var e = this;
        r.getAppInfo(function(t, a) {
            t ? (console.log("getAppInfo err:", t), e.btnUnlock()) : (console.log("getAppInfo ok:", a), 
            j.cashLoginParam = a, e.gotoCash || (e.gotoCash = !0, wx.navigateTo({
                url: "/page/cash/home/home",
                complete: function() {
                    e.btnUnlock();
                }
            })));
        });
    },
    onTapItemRP: function(e) {
        var t = j.mainData.windowHeight / j.mainData.dpr, a = 1800 / j.mainData.dpr - t;
        d.setPageData(this, {
            scrollTop: a
        });
    },
    onTapKnowledgeRP: function(e) {
        var t = j.mainData.windowHeight / j.mainData.dpr, a = 1600 / j.mainData.dpr - t;
        d.setPageData(this, {
            scrollTop: a
        });
    },
    onCashReload: function(e, t) {
        this.getContestStatus();
    },
    checkPlayerNameIllegal: function() {
        try {
            j.mainData.role.nameIllegal && d.ShowConfirm("", j.mainData.role.nameIllegalReason, function() {});
        } catch (e) {
            d.reportAnalytics_Try(e);
        }
    },
    checkLoginMsg: function() {
        try {
            j.mainData.role.message && (d.ShowConfirm("", j.mainData.role.message, function() {}), 
            j.mainData.role.message = "");
        } catch (e) {
            d.reportAnalytics_Try(e);
        }
    },
    btn_know_clicked: function(e) {
        var t = this;
        if (!this.btnLock) if (this.data.function_switch.knowledge) this.btnLock = !0, wx.navigateTo({
            url: "../../page/know/know",
            complete: function() {
                t.btnUnlock();
            }
        }); else {
            var a = u.unlockLevel[u.funcType.knowledge];
            a > 0 && j.mainData.role.level < a ? d.ShowToast("需要个人等级达到" + a + "级。") : d.ShowToast("该功能暂不开放。");
        }
    },
    btn_items_clicked: function(e) {
        var t = this;
        if (!this.btnLock) if (this.data.function_switch.goods) this.btnLock = !0, wx.navigateTo({
            url: "../../page/items/items",
            complete: function() {
                t.btnUnlock();
            }
        }); else {
            var a = u.unlockLevel[u.funcType.goods];
            a > 0 && j.mainData.role.level < a ? d.ShowToast("需要个人等级达到" + a + "级。") : d.ShowToast("该功能暂不开放。");
        }
    },
    btn_avatar_clicked: function(e) {
        var t = this;
        this.btnLock || (this.btnLock = !0, j.mainData.user_to_detail = j.mainData.role, 
        wx.navigateTo({
            url: "../../page/head_frame/head_frame",
            complete: function() {
                t.btnUnlock();
            }
        }));
    },
    btn_shop_clicked: function(e) {
        var t = this;
        if (!this.btnLock) if (this.data.function_switch.shop) this.btnLock = !0, wx.navigateTo({
            url: "../../page/market/market",
            complete: function() {
                t.btnUnlock();
            }
        }); else {
            var a = u.unlockLevel[u.funcType.shop];
            a > 0 && j.mainData.role.level < a ? d.ShowToast("需要个人等级达到" + a + "级。") : d.ShowToast("该功能暂不开放。");
        }
    },
    btn_friends_ranking_clicked: function(e) {
        var t = this;
        if (!this.btnLock && 0 != j.uid) if (this.data.function_switch.friends_ranking) {
            this.btnLock = !0;
            var a = j.getSeasonEndDeltaTime();
            console.log("deltaTime:", a), a <= 0 ? wx.navigateTo({
                url: "/page/rank_friends/rank_friends",
                fail: function(e) {
                    console.log(e);
                },
                complete: function() {
                    console.log("navigateTo rank ok"), t.btnUnlock();
                }
            }) : (d.ShowConfirm("提醒", "排位赛结算中，剩余时间还有" + d.formatTime_mm_ss(Math.floor(a / 1e3))), 
            this.btnLock = !1);
        } else {
            var i = u.unlockLevel[u.funcType.friends_ranking];
            i > 0 && j.mainData.role.level < i ? d.ShowToast("需要个人等级达到" + i + "级。") : d.ShowToast("该功能暂不开放。");
        }
    },
    btn_live_clicked: function(e) {
        var t = this;
        if (!this.btnLock) if (this.data.function_switch.live) this.btnLock = !0, g.coverToLive(function(e) {
            e && g.clearRoomData(), d.setPageData(t, {
                liveShareBtnVisible: !g.isActivate()
            }), t.btnLock = !1;
        }), d.setPageData(this, {
            mask_live_show: !1
        }); else {
            var a = u.unlockLevel[u.funcType.live];
            a > 0 && j.mainData.role.level < a ? d.ShowToast("需要个人等级达到" + a + "级。") : d.ShowToast("该功能暂不开放。");
        }
    },
    btn_groupChallenge_clicked: function(e) {
        var t = this;
        if (!this.btnLock) if (this.data.function_switch.groupChallenge) this.btnLock = !0, 
        wx.navigateTo({
            url: "/page/challenge/challenge_roomlist/challenge_roomlist",
            complete: function() {
                t.btnUnlock();
            }
        }); else {
            var a = u.unlockLevel[u.funcType.groupChallenge];
            a > 0 && j.mainData.role.level < a ? d.ShowToast("需要个人等级达到" + a + "级。") : d.ShowToast("该功能暂不开放。");
        }
    },
    form_submit: function(e) {
        if (e && e.detail && e.detail.formId && "the formId is a mock one" != e.detail.formId) {
            var t = ~~d.getStorageSync(u.StorageKey.FormTimes);
            console.log("form_submit:", e.detail.formId, "times", t), t < u.MaxFormId && n.recordForm(e.detail.formId, function(e, a) {
                d.setStorageSyncByDay(u.StorageKey.FormTimes, t + 1, 1);
            });
        }
    },
    onTapDailyChallenge: function() {
        var e = this;
        if (!this.btnLock) if (this.data.function_switch.daliyChallenge) this.btnLock = !0, 
        v.loadData(function(t) {
            e.btnLock = !1, t ? d.ShowConfirm(t.errCode, t.errMsg, function() {}) : wx.navigateTo({
                url: "/page/dailyChallenge/home/dailyChallengeHome"
            });
        }); else {
            var t = u.unlockLevel[u.funcType.daliyChallenge];
            t > 0 && j.mainData.role.level < t ? d.ShowToast("需要个人等级达到" + t + "级。") : d.ShowToast("该功能暂不开放。");
        }
    },
    setUpserInfo: function() {
        d.setPageData(this, {
            "roleInfo.userInfo": j.mainData.role.userInfo,
            "roleInfo.headId": j.mainData.role.headId
        });
    },
    btn_challenge_clicked: function(e) {
        var t = this;
        if (!this.btnLock && 0 != j.uid) {
            this.btnLock = !0, this.data.showNewUser && n.markStats(u.event_point.click_new_guide);
            var a = j.getSeasonEndDeltaTime();
            a <= 0 ? wx.navigateTo({
                url: "../../page/pve/pve",
                complete: function() {
                    t.btnUnlock();
                }
            }) : (d.ShowConfirm("提醒", "排位赛结算中，剩余时间还有" + d.formatTime_mm_ss(Math.floor(a / 1e3))), 
            this.btnLock = !1);
        }
    },
    onActionGameConf: function(e, t) {
        var a = this.refreshSwitch({});
        d.setPageData(this, a), this.coverBanner.refreshBanner();
    },
    onActionDonatePay: function(e, t) {
        j.mainData.role.hadPlatOrder = !0, this.checkPay();
    },
    newHeadFrameCount: function() {
        var e = d.getStorageSync("newHeadFrame"), t = 0;
        if (e) for (var a in e) e[a] && (t += 1);
        return t;
    },
    refreshRoleInfo: function(e) {
        if (j.uid > 0) {
            var t = d.getShopClosedDesc();
            e["roleInfo.hasNewHeadFrame"] = this.newHeadFrameCount() > 0, e["roleInfo.bankInfo"] = j.mainData.role.bankInfo, 
            e["roleInfo.headId"] = j.mainData.role.headId, e["roleInfo.userInfo"] = j.mainData.role.userInfo, 
            e["roleInfo.gold"] = j.mainData.role.gold, e["roleInfo.diamond"] = ~~j.mainData.role.diamond, 
            e["roleInfo.exp"] = j.mainData.role.exp, e["roleInfo.level"] = j.mainData.role.level, 
            e["roleInfo.maxExp"] = j.mainData.role.maxExp, e["roleInfo.userInfo.nickName"] = j.mainData.role.userInfo.nickName, 
            e["roleInfo.onsale"] = j.isOnSale() && 0 == t.length;
        }
        return e;
    },
    onTapDailyTask: function(e) {
        var t = this;
        this.btnLock || (this.btnLock = !0, 1 !== O.dailyTasks.status ? (x.showTemplatePage(this, V, u.TemplatePages.DailyTask), 
        this.btnUnlock()) : U.getReward(function(e, a) {
            if (t.btnUnlock(), e) e.errCode == u.ExitCode.RequestErr ? getApp().exitGame(e.errCode) : (d.ShowToast(e.errMsg), 
            O.refresh()); else {
                var i = [];
                for (var n in a.rewards) {
                    var o = a.rewards[n], r = y.getItemDetail(o.itemId);
                    i.push({
                        name: r.name,
                        itemId: o.itemId,
                        itemNum: o.itemNum
                    }), y.addItem(o.itemId, o.itemNum);
                }
                d.setPageData(t, {
                    rewardEXData: {
                        type: "dailyTaskReward",
                        title: "领取物品",
                        content: "",
                        items: i,
                        visible: !0
                    }
                }), O.refresh();
            }
        }));
    },
    checkPivilege: function() {
        j.checkPivilege && (a.loginPivilege(j.channel, 1, function(e, t) {
            if (!e && t.items && t.items[0]) {
                var a = t.items[0], i = j.mainData.role.allSeeds.itemConfs[a.itemId].name;
                y.addItem(a.itemId, a.itemNum), d.ShowConfirm("公众号特权奖励", "获得" + i + "×" + a.itemNum + "，请明日继续努力！", function() {});
            }
        }), j.checkPivilege = !1);
    },
    onSpecialLiveLeaveRoom: function() {
        var e = {};
        e.liveShareBtnVisible = !0, d.setPageData(this, e);
    },
    onActionActivityUpdate: function(e, t) {
        t && (E.processActivities({
            activities: [ t ]
        }), E.refresBannerData());
    },
    refreshShareTest: function() {
        j.needGotoSP && (j.needGotoSP = !1, d.invokeCallback(this.gotoSpecial));
        var e = E.getActivity("shareTest");
        if (e) {
            var t = {};
            t.shareTestType = e.subType, d.setPageData(this, t);
        } else {
            var a = {};
            a.shareTestType = "", d.setPageData(this, a);
        }
    },
    enterMarkStats: function(e) {
        e.channel ? n.markStatsChannel(u.event_point.enter_Channel, e.channel) : e.from && e.fromNum && n.markStatsEnterWithShare(u.event_point.enter_Share, e.from, e.fromNum);
    },
    enterDailyChallengeHome: function(e) {
        if (!j.isBeginnerTestUser() && e.dailyChallenge && j.mainData.role.level >= 3) return console.log("dailyChallengeHome"), 
        wx.navigateTo({
            url: "/page/dailyChallenge/home/dailyChallengeHome"
        }), !0;
    },
    enterCash: function(e) {
        if (e.cashGame && j.getGameConf(u.gameConf.cash)) return R.goldenHouse.baseInfo.enterWithCash = !0, 
        R.goldenHouse.baseInfo.enterWithCashCode = !!e.invitationCode, e.friendCode == j.mainData.role.shareCode && (R.goldenHouse.baseInfo.enterWithCashCode = !1), 
        wx.navigateTo({
            url: "/page/cash/home/home"
        }), !0;
    },
    enterGroupChallenge: function(e) {
        if (e.challenge && j.getGameConf(u.gameConf.groupChallenge)) return _.enterWithChallenge = !0, 
        wx.navigateTo({
            url: "/page/challenge/challenge_roomlist/challenge_roomlist"
        }), !0;
    },
    enterPVR: function(e) {
        if (e.roomIdPvr && e.friendCode) {
            var t = e.roomIdPvr, a = e.friendCode;
            return N.enterWithUrl_pvr(t, a), !0;
        }
    },
    enterLiveFight: function(e) {
        var t = this;
        if (e.liveFight && e.friendCode) return L.findRoomID(e.friendCode, function(a, i) {
            if (a) console.log("查找roomId出错", a); else if (i.isExpired || 0 == i.roomId) e.friendCode != j.mainData.role.shareCode ? t.liveExpiredView && t.liveExpiredView.show(i.nickName ? i.nickName : "发起者", !1) : g.clearRoomData(); else {
                var n = g.getData();
                i.roomId != n.roomId && n.roomId && g.isActivate() ? wx.showModal({
                    title: "提示",
                    content: "你已经在一场好友对战中，是否放弃此对战并加入新的对战？",
                    showCancel: !0,
                    confirmText: "加入",
                    complete: function(e) {
                        e.confirm && g.urlToLive(i.roomId, function(e) {
                            e && d.ShowConfirm(e.errCode, e.errMsg, function() {});
                        });
                    }
                }) : g.urlToLive(i.roomId, function(e) {
                    e && d.ShowConfirm(e.errCode, e.errMsg, function() {});
                });
            }
        }), !0;
    },
    enterSpecialLiveFight: function(e) {
        var t = this;
        if (e.specialLiveFight && e.friendCode) return this.request_matchSpecial(null), 
        L.findRoomID(e.friendCode, function(a, i) {
            if (a) console.log("查找roomId出错", a); else if (i.isExpired || 0 == i.roomId) e.friendCode != j.mainData.role.shareCode ? t.liveExpiredView && t.liveExpiredView.show(i.nickName ? i.nickName : "发起者", !0) : g.clearRoomData(); else {
                var n = g.getData();
                i.roomId != n.roomId && n.roomId && g.isActivate() ? wx.showModal({
                    title: "提示",
                    content: "你已经在一场好友对战中，是否放弃此对战并加入新的对战？",
                    showCancel: !0,
                    confirmText: "加入",
                    complete: function(e) {
                        e.confirm && g.urlToSpecialLive(i.roomId, function(e) {
                            e && d.ShowConfirm(e.errCode, e.errMsg, function() {});
                        });
                    }
                }) : g.urlToSpecialLive(i.roomId, function(e) {
                    e && d.ShowConfirm(e.errCode, e.errMsg, function() {});
                });
            }
        }), !0;
    },
    enterCompare: function(e) {
        var t = this;
        if (!j.isBeginnerTestUser() && e.friendCode && j.mainData.loginArgs.shareTicket && (j.mainData.loginArgs.compare || !j.mainData.touchedShareCode[j.mainData.loginArgs.shareTicket])) return wx.getShareInfo({
            shareTicket: j.mainData.loginArgs.shareTicket,
            success: function(a) {
                P.joinGroup(e.friendCode, a.encryptedData, a.iv, function(a, i) {
                    a || i && e.compare && t.aboutCompare(i, e);
                }), j.mainData.loginArgs.shareTicket = null;
            },
            fail: function(a) {
                console.log("fail res:", a), e.compare && t.aboutCompare(null, e);
            },
            complete: function() {}
        }), !0;
    },
    enterAboutCompare: function(e) {
        if (!j.isBeginnerTestUser() && e.compare) return this.aboutCompare(null, e), !0;
    },
    request_matchSpecial: function(e) {
        var t = this;
        s.specialMatch(u.subTypeOfSpeical.commission, function(a, i) {
            a ? console.warn("获取线下活动的基本信息失败") : (l.aidOffline = i.aid, t.refreshZjwBanner(), 
            d.invokeCallback(e));
        });
    },
    enterSpecial: function(e) {
        return e.friendCode && e.specialMatch ? (this.ctrl_gotoSpecial && this.ctrl_gotoSpecial(e), 
        !0) : e.specialMatch ? (this.gotoSpecial && this.gotoSpecial(), !0) : e.channel && e.channel.endsWith("specialMatch") ? (this.gotoSpecial && this.gotoSpecial(), 
        !0) : void 0;
    },
    enterZjwSpecial: function(e) {
        var t = this, a = function(e) {
            j.mainData.role.bannerInfo && j.mainData.role.bannerInfo.base.subType == u.subTypeOfSpeical.commission ? (l.data.base.aid = j.mainData.role.bannerInfo.base.aid, 
            d.invokeCallback(e)) : t.request_matchSpecial(function() {
                ~~l.aidOffline > 0 ? (l.data.base.aid = l.aidOffline, d.invokeCallback(e)) : d.log("~~~没有aidOffline");
            });
        };
        return e.friendCode && e.specialMatchZjw ? (a(function() {
            d.invokeCallback(t.ctrl_gotoOfflineSpecial, e);
        }), !0) : e.channel && e.channel.endsWith("specialMatchZjw") ? (a(function() {
            d.log("准备进入中纪委专题赛"), d.invokeCallback(t.gotoOfflineSpecial);
        }), !0) : void 0;
    },
    enterShareTest: function(e) {
        if (e.shareTest) try {
            var t = j.mainData.role.activities;
            if (!t) return !1;
            for (var a = 0; a < t.length; a++) if ("shareTest" === t[a].typeName) return wx.navigateTo({
                url: "/page/shareTest/shareTest"
            }), !0;
        } catch (e) {}
        return !1;
    },
    enterWithUrl: function() {
        var e = this, t = j.enterOptions;
        j.enterOptions = void 0, t && setTimeout(function() {
            e.enterMarkStats(t), e.enterDailyChallengeHome(t) || e.enterCash(t) || e.enterGroupChallenge(t) || e.enterPVR(t) || e.enterSpecialLiveFight(t) || e.enterLiveFight(t) || e.enterZjwSpecial(t) || e.enterSpecial(t) || e.enterAboutCompare(t) || e.enterShareTest(t) || e.enterCompare(t);
        }, 1e3);
    },
    aboutCompare: function(e, t) {
        e && e.groupId ? wx.navigateTo({
            url: "/page/compare_to_group/compare_to_group?groupId=" + e.groupId + "&groupName=" + e.name + "&openGId=" + e.openGId
        }) : this.compareOneByOne(t);
    },
    compareOneByOne: function(e) {
        e.friendCode && e.friendCode != j.mainData.role.shareCode ? wx.navigateTo({
            url: "/page/compare_to_friend/compare_to_friend"
        }) : (j.mainData.user_to_detail = j.mainData.role, wx.navigateTo({
            url: "/page/user_detail/user_detail"
        }));
    },
    onTapShareTest: function() {
        wx.navigateTo({
            url: "/page/shareTest/shareTest"
        });
    },
    onTapGameClub: function() {},
    onTapRightwrong: function() {},
    onTapIntegralWall: function() {
        var e = this;
        this.btnLock || (this.btnLock = !0, wx.navigateTo({
            url: "../../page/integral_wall/integral_wall",
            complete: function() {
                e.btnUnlock();
            }
        }));
    },
    onTapBeginnerGiftContextEntry: function() {
        var e = this.selectComponent("#beginnerGiftContentView");
        e && e.show();
    },
    onTapBtnTryToBuy: function() {
        var e = this.selectComponent("#beginnerGiftView");
        e && e.tempClose();
    },
    onBeginnerGiftVisibleChanged: function(e) {
        var t = {};
        t.showFilledRect = !e.detail.visible, d.setPageData(this, t);
    },
    onTapZjwEntry: function() {
        l.data.aid = l.aidOffline, this.gotoOfflineSpecial();
    },
    refreshZjwBanner: function() {
        if (l.aidOffline > 0 && (!j.mainData.role.bannerInfo || j.mainData.role.bannerInfo.base.subType != u.subTypeOfSpeical.commission)) {
            var e = {};
            e.isZjwQrCode = !0, d.setPageData(this, e), this.offlineMatch || (this.offlineMatch = new C(this));
        }
    },
    checkFilledRect: function() {
        return !!j.mainData.isIOS && !j.getGameConf("iosQz");
    }
};

Page(G);