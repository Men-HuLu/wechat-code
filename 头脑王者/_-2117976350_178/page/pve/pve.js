require("./../../net/fightNet.js");

var t = require("./../../util/Tween.js"), a = require("./../../util/util.js"), e = (require("./../../net/wsconnect.js"), 
require("./../../net/messageNet.js")), i = (require("./../../net/connectNotify.js"), 
require("./../../const/consts")), n = (require("./../../const/notifyConsts.js"), 
require("./../../util/PVERoomDataManager.js")), r = require("./../../util/LoginManager.js"), o = require("./../../data/ItemsManager.js"), s = require("./../../net/itemNet.js"), c = require("./template/PveWatchdogController.js"), u = getApp(), l = "https://question-resource-wscdn.hortorgames.com/image/new_skin/challenge/icon_star_default.png", h = "https://question-resource-wscdn.hortorgames.com/image/new_skin/challenge/icon_star_white.png", d = {
    data: {
        showHelp: !1,
        isNewUser: !1,
        roleInfo: {
            userInfo: {}
        },
        pvePickerViewData: {
            dataSource: [],
            matchStats: [],
            scrollTop: 99999,
            hasLock: !1,
            callback_item_clicked: "callback_pve_item_clicked"
        },
        curStage: {},
        btn_code_clicked: "btn_code_clicked",
        showGuideArrow: !1,
        seasonId: 0
    },
    onLoad: function(t) {
        var e = this;
        a.showShareMenu(), u.eventDispatcher.addEventListener("stageAllClean", this.onStageAllClean, this), 
        u.eventDispatcher.addEventListener("goldUpdate", this.onGoldUpdate, this), u.eventDispatcher.addEventListener("stageAddStar", this.onAddStar, this), 
        u.eventDispatcher.addEventListener("stageSubStar", this.onSubStar, this), u.eventDispatcher.addEventListener("lastStageUpdate", this.onLastStageUpdate, this), 
        u.eventDispatcher.addEventListener("stageSynchronize", this.onStageSynchronize, this), 
        this.pveWatchdogController = new c(this);
        var i = {};
        i = this.refreshStageData(i), i = this.refreshRole(i), this.setData(i), setTimeout(function() {
            e.setData({
                "pvePickerViewData.scrollTop": 99999,
                resVer: u.mainData.role.resVer
            });
        }, 500);
    },
    onUnload: function() {
        n.setEmptyData(), u.eventDispatcher.removeEventListener("stageAllCLean", this.onStageAllClean, this), 
        u.eventDispatcher.removeEventListener("goldUpdate", this.onGoldUpdate, this), u.eventDispatcher.removeEventListener("stageAddStar", this.onAddStar, this), 
        u.eventDispatcher.removeEventListener("stageSubStar", this.onSubStar, this), u.eventDispatcher.removeEventListener("lastStageUpdate", this.onLastStageUpdate, this), 
        u.eventDispatcher.removeEventListener("stageSynchronize", this.onStageSynchronize, this), 
        a.hideLoading(), clearTimeout(this.buffTimer), this.ad && this.ad.stop && this.ad.stop();
    },
    onStageSynchronize: function() {
        var t = {};
        t = this.refreshStageData(t), this.setData(t);
    },
    onLastStageUpdate: function() {
        var t = {};
        t = this.refreshStageData(t), this.setData(t), this.isShow ? this.playLastStageUpdate() : this.needPlay = this.playLastStageUpdate.bind(this);
    },
    onAddStar: function() {
        this.isShow ? this.playAddStar() : this.needPlay = this.playAddStar.bind(this);
    },
    playAddStar: function() {
        var t = this, a = {};
        a = this.refreshStageData(a);
        var e = this.getMatchInfo(u.mainData.role.curMatch);
        if (e) {
            var i = Math.max(0, e.item.star - 1), n = e.item.starGroup[i];
            n.src = "", n.animation = "", n.lightAni = "", a["pvePickerViewData.dataSource[" + e.itemIndex + "].starGroup[" + i + "]"] = n, 
            this.setData(a), setTimeout(function() {
                t._playAddStar(e.itemIndex, i);
            }, 500);
        }
    },
    _playAddStar: function(t, a) {
        var e = this, i = u.mainData.role.matchInfo[t], n = i.starGroup[a];
        n.src = l, n.animation = "addStar", n.lightAni = "addStar";
        var r = {};
        r["pvePickerViewData.dataSource[" + t + "]"] = i, this.setData(r), setTimeout(function() {
            var n = i.starGroup[a];
            n.src = l, n.animation = "", n.lightAni = "";
            var r = {};
            r["pvePickerViewData.dataSource[" + t + "]"] = i, e.setData(r);
        }, 900);
    },
    onSubStar: function() {
        this.isShow ? this.playSubStar() : this.needPlay = this.playSubStar.bind(this);
    },
    playSubStar: function() {
        var t = this, a = {};
        a = this.refreshStageData(a);
        var e = this.getMatchInfo(u.mainData.role.curMatch);
        if (e) {
            var i = Math.max(0, e.item.star), n = e.item.starGroup[i];
            n.src = l, n.animation = "", n.lightAni = "", a["pvePickerViewData.dataSource[" + e.itemIndex + "].starGroup[" + i + "]"] = n, 
            this.setData(a), setTimeout(function() {
                t._playSubStar();
            }, 500);
        }
    },
    _playSubStar: function() {
        var t = this, a = this.getMatchInfo(u.mainData.role.curMatch);
        if (a) {
            var e = a.item, i = a.itemIndex, n = Math.max(0, a.item.star), r = e.starGroup[n];
            r.src = l, r.animation = "subStar", r.lightAni = "subStar";
            var o = {};
            o["pvePickerViewData.dataSource[" + i + "]"] = e, this.setData(o), setTimeout(function() {
                var a = e.starGroup[n];
                a.src = "", a.animation = "", a.lightAni = "";
                var r = {};
                r["pvePickerViewData.dataSource[" + i + "]"] = e, t.setData(r);
            }, 900);
        }
    },
    onStageAllClean: function() {
        this.isShow ? this.playAllClear() : this.needPlay = this.playAllClear.bind(this);
    },
    playAllClear: function() {
        var e = this, i = {}, n = (i = this.refreshStageData(i))["pvePickerViewData.dataSource"];
        n.splice(-1, 1);
        for (var r = n[n.length - 2], o = 0; o < r.starGroup.length; o++) r.starGroup[o].src = o == r.num - 1 ? "" : l;
        i["pvePickerViewData.dataSource"] = n, this.setData(i);
        var s = u.mainData.role.matchInfo.length, c = n.length - 2, h = n[n.length - 2], d = h.num - 1, f = c + 1, m = f + 1, v = m >= s - 1;
        if (f >= 5 && !v) {
            var p = a.getStorageSync("newHeadFrame");
            (p = p || {})["" + (205001 + f - 5)] = !0, a.setStorageSync("newHeadFrame", p), 
            a.ShowToast("解锁新头像框");
        }
        setTimeout(function() {
            var a = t.fastGet("allClear");
            a.call(function() {
                e._playAddStar(c, d);
            }), a.wait(1e3);
            for (var i = 0; i < h.num; i++) !function(t) {
                a.call(function() {
                    e.playWhiteStar(c, t);
                }), a.wait(500);
            }(i);
            -1 != f && (a.call(function() {
                e.playUnlock(f);
            }), a.wait(1e3)), -1 != m && a.call(function() {
                e.playNewLock(m);
            }), v && a.call(function() {
                e.playHideLock();
            }), a.call(function() {
                setTimeout(function() {
                    e.setData({
                        "pvePickerViewData.scrollTop": e.data.pvePickerViewData.scrollTop + 1
                    });
                }, 500);
            });
        }, 500);
    },
    onGoldUpdate: function() {
        this.setData({
            roleInfo: u.mainData.role
        });
    },
    refreshStageData: function(t) {
        for (var a = [], e = u.mainData.role.matchInfo.length, i = 0; i < e; i++) {
            var n = u.mainData.role.matchInfo[i];
            u.mainData.role.curMatch > n.id && (n.star = n.num);
            for (var r = [], o = 0; o < n.num; o++) {
                var s = "";
                u.mainData.role.curMatch > n.id ? s = h : u.mainData.role.curMatch == n.id && o < n.star && (s = l), 
                r.push({
                    index: o,
                    src: s
                });
            }
            if (n.starGroup = r, a.push(n), u.mainData.role.curMatch < n.id) {
                n.lock = !0, t["pvePickerViewData.showQMark"] = e - 1 > i;
                break;
            }
            n.lock = !1;
        }
        return t["pvePickerViewData.dataSource"] = a, t;
    },
    refreshRole: function(t) {
        var e = a.assign({}, u.mainData.role), i = u.mainData.role.seasonInfo ? u.mainData.role.seasonInfo.seasonId : 0, n = u.mainData.role.seasonInfo ? u.mainData.role.seasonInfo.openTime : 0, r = u.mainData.role.seasonInfo ? u.mainData.role.seasonInfo.endTime : 0, o = a.formatTime_yymmdd(n) + "--" + a.formatTime_yymmdd(r);
        return t.roleInfo = e, t.seasonId = i, t.seasonTime = o, t;
    },
    playLastStageUpdate: function() {
        var t = {}, a = u.mainData.role.matchInfo.length - 1;
        t["pvePickerViewData.dataSource[" + a + "]"] = u.mainData.role.matchInfo[a], this.setData(t);
    },
    playHideLock: function() {
        this.setData({
            "pvePickerViewData.showQMark": !1
        });
    },
    playUnlock: function(t) {
        var a = this, e = u.mainData.role.matchInfo[t];
        e.lockAni = "lockAni", e.bannerAni = "bannerAni";
        var i = {};
        i["pvePickerViewData.dataSource[" + t + "]"] = e, this.setData(i), setTimeout(function() {
            e.lockAni = "", e.bannerAni = "";
            var i = {};
            i["pvePickerViewData.dataSource[" + t + "]"] = e, a.setData(i);
        }, 1e3);
    },
    playNewLock: function(t) {
        var a = u.mainData.role.matchInfo[t], e = {};
        e["pvePickerViewData.dataSource[" + t + "]"] = a, this.setData(e);
    },
    playWhiteStar: function(t, a) {
        var e = this, i = u.mainData.role.matchInfo[t];
        if (i && i.starGroup && i.starGroup[a]) {
            var n = i.starGroup[a];
            n.src = l, n.animation = "allClearStar", n.lightAni = "allClearStar";
            var r = {};
            r["pvePickerViewData.dataSource[" + t + "]"] = i, this.setData(r), setTimeout(function() {
                i.starGroup[a].src = h;
                var n = {};
                n["pvePickerViewData.dataSource[" + t + "]"] = i, e.setData(n);
            }, 400), setTimeout(function() {
                var n = i.starGroup[a];
                n.animation = "", n.lightAni = "";
                var r = {};
                r["pvePickerViewData.dataSource[" + t + "]"] = i, e.setData(r);
            }, 750);
        }
    },
    callback_pve_item_clicked: function(t) {
        var a = this;
        if (!this.btnLock) {
            this.data.isNewUser && e.markStats(i.event_point.click_new_to_pve);
            var n = t.currentTarget.dataset.stageId, o = !0, s = !1, c = void 0;
            try {
                for (var l, h = this.data.pvePickerViewData.dataSource[Symbol.iterator](); !(o = (l = h.next()).done); o = !0) {
                    var d = l.value;
                    if (d && d.id == n) {
                        if (d.lock) return;
                        this.setData({
                            curStage: d
                        });
                    }
                }
            } catch (t) {
                s = !0, c = t;
            } finally {
                try {
                    !o && h.return && h.return();
                } finally {
                    if (s) throw c;
                }
            }
            this.btnLock = !0, r.checkResult(!1, function() {
                a.data.curStage.fee <= u.mainData.role.gold ? (a.setRoomData(a.data.curStage.id, a.data.curStage.fee), 
                wx.navigateTo({
                    url: "../../page/fight/fight?fightType=pve",
                    complete: function() {
                        setTimeout(function() {
                            a.btnLock = !1;
                        }, 500);
                    }
                })) : (a.btnLock = !1, a.pveWatchdogController.onPveGateClicked(a.data.curStage.id));
            });
        }
    },
    setRoomData: function(t, e) {
        n.setData({
            type: "pve",
            matchId: t,
            fee: e,
            userInfo: {
                uid: u.mainData.role.uid,
                nickName: u.mainData.role.userInfo.nickName,
                avatarUrl: u.mainData.role.userInfo.avatarUrl,
                level: u.mainData.role.level,
                city: a.getCity(u.mainData.role.userInfo.province, u.mainData.role.userInfo.city),
                headId: u.mainData.role.headId,
                cups: u.mainData.role.cups
            }
        }, !0);
    },
    onReady: function() {
        this.createCross();
    },
    onShow: function() {
        this.isShow = !0, this.needPlay && (this.needPlay(), this.needPlay = null), this.startBuffTimer(), 
        this.startBackgroundPositionTimeout();
        var t = {
            isNewUser: u.isNewUser(),
            showGuideArrow: u.isNewUser()
        };
        t = this.refreshRole(t), t = this.refreshBuff(t), this.setData(t), u.getSeasonEndDeltaTime() > 0 && wx.navigateBack(), 
        this.ad && this.ad.start && this.ad.start();
    },
    startBackgroundPositionTimeout: function() {
        var t = this;
        this.backgroundPositionTimeout || (this.backgroundPosition || (this.backgroundPosition = {}), 
        this.backgroundPosition.x = a.randomInt(-u.systemInfo.windowWidth, 0), this.backgroundPosition.y = a.randomInt(-u.systemInfo.windowHeight, 0), 
        this.setData({
            backgroundPosition: this.backgroundPosition.x + "px, " + this.backgroundPosition.y + "px"
        }), this.backgroundPositionTimeout = setTimeout(function() {
            t.backgroundPositionTimeout = void 0, t.startBackgroundPositionTimeout();
        }, 1e4));
    },
    clearBackgroundPositionTimeout: function() {
        this.backgroundPositionTimeout && (clearTimeout(this.backgroundPositionTimeout), 
        this.backgroundPositionTimeout = void 0);
    },
    onHide: function() {
        this.isShow = !1, clearTimeout(this.buffTimer), this.clearBackgroundPositionTimeout(), 
        this.backgroundPositionInterval && (clearInterval(this.backgroundPositionInterval), 
        this.backgroundPositionInterval = void 0), this.ad && this.ad.stop && this.ad.stop();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var a = this;
        if (t && t.target && "noMoneyShare" == t.target.id) {
            var e = u.shareManager.getCompareShareData("pve");
            return u.shareConf(e, !1, function() {
                var t = {};
                t["pveWatchdog.visible"] = !1, a.setData(t);
            });
        }
        var i = u.shareManager.getCompareShareData("pve");
        return u.shareConf(i);
    },
    btn_code_clicked: function() {
        wx.navigateTo({
            url: "/page/qrCode/qrCode"
        });
    },
    onTapTestBtn: function() {},
    btn_close_clicked: function() {
        this.setData({
            showHelp: !1
        });
    },
    btn_help_clicked: function() {
        wx.navigateTo({
            url: "pve_season_detail/pve_season_detail"
        });
    },
    onTapWifiBtn: function() {
        var t = this;
        this.wifiBtnLock || (this.wifiBtnLock = !0, setTimeout(function() {
            t.wifiBtnLock = !1;
        }, 5e3));
    },
    onTapBuffBtn: function(t) {
        console.log(t);
        try {
            var a = t.currentTarget.dataset.buffId, e = 203e3 + parseInt(a), i = o.getItemDetail(e);
            i.num > 0 ? (i.callback_back_clicked = "callback_back_clicked", i.callback_use_clicked = "callback_use_clicked", 
            this.setData({
                buffItemSelected: i
            })) : (i.callback_back_clicked = "callback_back_clicked_buy", i.callback_use_clicked = "callback_use_clicked_buy", 
            this.setData({
                buyBuffItemSelected: i,
                canBuy: u.mainData.role.level >= 3
            }));
        } catch (t) {}
    },
    refreshBuff: function(t) {
        var e = u.mainData.role.buff ? u.mainData.role.buff : {}, i = e[1];
        t.buffActivate1 = !!i, t.buffText1 = i || "";
        var n = e[3];
        t.buffActivate3 = !!n, t.buffText3 = n || "";
        var r = e[5];
        t.buffActivate5 = !!r, t.buffText5 = r || "";
        var o = a.getServerTime(), s = 1e3 * ~~e[2], c = s > o;
        t.buffActivate2 = c, t.buffText2 = c ? a.formatTime_mm_ss((s - o) / 1e3) : "";
        var l = 1e3 * ~~e[4], h = l > o;
        return t.buffActivate4 = h, t.buffText4 = h ? a.formatTime_mm_ss((l - o) / 1e3) : "", 
        t;
    },
    startBuffTimer: function() {
        var t = this;
        this.buffTimer = setTimeout(function() {
            if (0 != u.uid) {
                var a = t.refreshBuff({});
                t.setData(a), t.startBuffTimer();
            }
        }, 1e3);
    },
    getMatchInfo: function(t) {
        for (var a = 0; a < u.mainData.role.matchInfo.length; a++) {
            var e = u.mainData.role.matchInfo[a];
            if (t == e.id && e.starGroup) return {
                item: e,
                itemIndex: a
            };
        }
    },
    callback_back_clicked: function() {
        this.setData({
            buffItemSelected: null
        });
    },
    callback_use_clicked: function() {
        if (this.data && this.data.buffItemSelected) {
            var t = this.data.buffItemSelected;
            s.use(t.id, function(e, n) {
                if (e) a.ShowToast("物品使用失败"); else {
                    o.subItem(t.id, 1);
                    switch (t.typeId) {
                      case i.ItemType.buff:
                        a.ShowToast("使用成功"), u.mainData.role.buff || (u.mainData.role.buff = {}), u.mainData.role.buff["" + t.selfId] = n.Buff.curVal;
                    }
                }
            }), this.setData({
                buffItemSelected: null
            });
        }
    },
    callback_use_clicked_buy: function() {
        this.buyBuff_btn || (this.buyBuff_btn = !0, u.gotoShop(2));
    },
    callback_back_clicked_buy: function() {
        this.buyBuff_btn = !1, this.setData({
            buyBuffItemSelected: null
        });
    },
    createCross: function() {
        var t = this, e = u.systemInfo.SDKVersion;
        this.canShowAd = a.compareVersion(e, "2.0.7") < 0, this.ad = u.crossSDK.createAd({
            adsId: "abB7Kg7o9j",
            gameId: "tnwz",
            success: this.refreshAD.bind(this),
            fail: function(e) {
                console.log(e), a.setPageData(t, {
                    linkImg: ""
                });
            }
        }), this.ad.onChange(this.refreshAD.bind(this));
    },
    refreshAD: function(t) {
        try {
            var e = this.ad.getGoGameParams(), i = {};
            i.linkImg = t.gif_info.gif_url, i.linkAppId = e.appId, i.linkPath = e.path, e.extraData && (i.linkExtraData = e.extraData), 
            a.setPageData(this, i);
        } catch (t) {
            a.setPageData(this, {
                linkImg: ""
            });
        }
    },
    onTapLinkBtn: function() {
        this.canShowAd ? this.ad.show() : (this.ad.manualClick(), this.ad.reset());
    }
};

Page(d);