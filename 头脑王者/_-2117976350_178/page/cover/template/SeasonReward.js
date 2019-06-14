function e(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

var a = function() {
    function e(e, a) {
        for (var t = 0; t < a.length; t++) {
            var n = a[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(a, t, n) {
        return t && e(a.prototype, t), n && e(a, n), a;
    };
}(), t = require("./../../../util/util.js"), n = require("./../../../net/rankNet.js"), i = require("./../../../net/roleNet.js"), s = require("./../../../util/Tween.js"), r = require("./../../../data/ItemsManager.js"), o = getApp(), c = function() {
    function c(a) {
        var n = this;
        e(this, c), this.page = a, t.setPageData(this.page, {
            seasonRewardData: {
                list: [],
                visible: !1,
                rewardViewVisible: !1,
                rewardSubViewVisible: !1,
                nextViewVisible: !1,
                subjectVisible: !1,
                tierVisible: !1,
                trophyVisible: !1,
                awardGold: 500,
                seasonImgSrc: "",
                nextSeasonImgSrc: "",
                itemImgSrc: "",
                headIdIconSrc: "",
                cupImgSrc: "",
                avatarUrl: o.mainData.role.userInfo.avatarUrl,
                nickName: o.mainData.role.userInfo.nickName
            }
        }), this.page.seasonReward_onTapGetBtn = function() {
            n.btnLock_getBtn || (n.btnLock_getBtn = !0, i.GetSeasonReward(function(e, a) {
                if (n.btnLock_getBtn = !1, e) t.setPageData(n.page, {
                    "seasonRewardData.visible": !1
                }); else if (a) {
                    var i = a.seasonInfo ? a.seasonInfo.openTime : 0, s = a.seasonInfo ? a.seasonInfo.endTime : 0, c = t.formatTime_yymmdd(i), d = t.formatTime_yymmdd(s);
                    n.nextSeasonTime = c + "--" + d, n.rewardData = {
                        seasonInfo: {
                            seasonId: 1,
                            seasonName: "第二个赛季",
                            seasonDes: "我是第二个赛季",
                            openTime: 1513785600,
                            endTime: 1517241600
                        },
                        items: [ {
                            itemId: 2e5,
                            itemNum: 3e4
                        }, {
                            itemId: 201004,
                            itemNum: 2
                        }, {
                            itemId: 201006,
                            itemNum: 1
                        } ],
                        curMatch: 300010,
                        matchStar: 0,
                        headId: 205005,
                        cupId: 206001,
                        oldGold: 1678199,
                        convertGold: 1679,
                        awardGold: 500,
                        gold: 32179
                    }, n.rewardData = a, r.addItem(n.rewardData.items[0].itemId, n.rewardData.items[0].itemNum), 
                    o.mainData.role.seasonInfo = n.rewardData.seasonInfo, o.mainData.role.headId = n.rewardData.headId || o.mainData.role.headId, 
                    o.mainData.role.gold = n.rewardData.gold, o.mainData.role.curMatch = 300001;
                    var l = !0, u = !1, m = void 0;
                    try {
                        for (var w, p = o.mainData.role.matchInfo[Symbol.iterator](); !(l = (w = p.next()).done); l = !0) w.value.star = 0;
                    } catch (e) {
                        u = !0, m = e;
                    } finally {
                        try {
                            !l && p.return && p.return();
                        } finally {
                            if (u) throw m;
                        }
                    }
                    n.rewardData.cupId && (o.mainData.role.cups || (o.mainData.role.cups = {}), o.mainData.role.cups[n.rewardData.cupId] = 1), 
                    n.getReward(), n.page.coverBanner.refreshBanner();
                }
            }));
        }, this.page.seasonReward_onTapGetBtn2 = function() {
            n.getReward();
        }, this.page.seasonReward_onTapGetBtn3 = function() {
            n.page.refreshUI(), t.setPageData(n.page, {
                "seasonRewardData.visible": !1
            });
        };
    }
    return a(c, [ {
        key: "onShow",
        value: function() {
            var e = this;
            if (o.uid && o.mainData.role.seasonInfo) try {
                var a = o.mainData.role.allSeeds.baseConf.seasonSetupDur, i = o.mainData.role.seasonInfo.endTime, s = t.getServerTime();
                if (1e3 * (i + a) < s) clearTimeout(this.timeout), t.setPageData(this.page, {
                    "seasonRewardData.visible": !0,
                    "seasonRewardData.seasonImgSrc": "https://question-resource-wscdn.hortorgames.com/image/new_skin/season/img_bg_season_" + o.mainData.role.seasonInfo.seasonId + "_account.png"
                }), n.seasonWorldMatch(function(a, n) {
                    if (a) console.warn("seasonWorldMatch err", a); else if (n && n.list) {
                        e.selfRank = n.self;
                        var i = !1, s = !0, r = !1, c = void 0;
                        try {
                            for (var d, l = n.list[Symbol.iterator](); !(s = (d = l.next()).done); s = !0) {
                                var u = d.value, m = Math.floor(u.score / 100);
                                m > 300014 && (m = 300014), u.matchName = t.GetMatchInfo(m).name, u.star = u.score - 100 * m, 
                                u.uid == o.mainData.role.uid && (u.nickName = "我", u.itsMe = !0, i = u.rank <= 3);
                            }
                        } catch (a) {
                            r = !0, c = a;
                        } finally {
                            try {
                                !s && l.return && l.return();
                            } finally {
                                if (r) throw c;
                            }
                        }
                        var w = [];
                        w.push(n.list[0]), w.push(n.list[1]), w.push(n.list[2]);
                        var p = Math.floor(n.self.score / 100);
                        p > 300014 && (p = 300014), n.self.matchName = t.GetMatchInfo(p).name, n.self.star = n.self.score - 100 * p, 
                        n.self.nickName = "我", n.self.itsMe = !0, i || w.push(n.self), t.setPageData(e.page, {
                            "seasonRewardData.list": w
                        });
                    }
                }); else {
                    var r = 1e3 * (i + a) - s;
                    r < 36e5 && (clearTimeout(this.timeout), this.timeout = setTimeout(function() {
                        e.onShow();
                    }, r));
                }
            } catch (e) {
                console.error("try catch", e), t.reportAnalytics_Try(e);
            } else t.setPageData(this.page, {
                "seasonRewardData.visible": !1
            });
        }
    }, {
        key: "onHide",
        value: function() {
            clearTimeout(this.timeout);
        }
    }, {
        key: "getReward",
        value: function() {
            this.btnLock_getBtn2 || (this.mainViewOut || (this.playMainViewOutAni(), this.mainViewOut = !0), 
            this.rewardData.cupId > 0 && !this.cup_get ? (this.playGetCpuAni(), this.cup_get = !0) : this.rewardData.headId > 0 && !this.head_get ? (this.playGetHeadAni(), 
            this.head_get = !0) : this.rewardData.items && this.rewardData.items[0] && !this.item_get ? (this.playGetItemAni(), 
            this.item_get = !0) : this.item_get && !this.showNext ? (this.playEndAni(), this.showNext = !0) : (this.btnLock_getBtn2 = !1, 
            this.page.refreshUI(), t.setPageData(this.page, {
                "seasonRewardData.visible": !1
            })));
        }
    }, {
        key: "onUnload",
        value: function() {}
    }, {
        key: "playMainViewOutAni",
        value: function() {
            var e = wx.createAnimation();
            e.opacity(0).step({
                timingFunction: "ease-in",
                duration: 300
            });
            var a = wx.createAnimation();
            a.opacity(1).step({
                timingFunction: "ease-in",
                duration: 300
            }), t.setPageData(this.page, {
                "seasonRewardData.mainViewAni": e.export(),
                "seasonRewardData.rewardViewAni": a.export(),
                headId: o.mainData.role.seasonInfo.headId
            });
        }
    }, {
        key: "playGetCpuAni",
        value: function() {
            var e = wx.createAnimation();
            e.scale(1.3).opacity(1).step({
                timingFunction: "ease-in",
                duration: 300
            }), e.scale(1).step({
                timingFunction: "ease-out",
                duration: 150
            });
            var a = wx.createAnimation();
            a.scale(1, 1).step({
                timingFunction: "ease-in",
                duration: 150
            });
            var n = wx.createAnimation();
            n.scale(1, 1).step({
                timingFunction: "ease-in",
                duration: 150
            });
            var i = wx.createAnimation();
            i.scale(1).step({
                timingFunction: "ease-in",
                duration: 200
            }), t.setPageData(this.page, {
                "seasonRewardData.rewardViewVisible": !0,
                "seasonRewardData.rewardSubViewVisible": !0,
                "seasonRewardData.trophyVisible": !0,
                "seasonRewardData.cupImgSrc": "https://question-resource-wscdn.hortorgames.com/image/new_skin/icon/trophy/" + this.rewardData.cupId + ".png",
                "seasonRewardData.rewardDesc": "恭喜获得本赛季全球第" + this.selfRank.rank + "名",
                "seasonRewardData.trophyAni": e.export(),
                "seasonRewardData.titleImgAni": a.export(),
                "seasonRewardData.titleLabelAni": n.export(),
                "seasonRewardData.getBtn2Ani": i.export()
            });
        }
    }, {
        key: "playGetHeadAni",
        value: function() {
            var e = this, a = s.fastGet("headTween");
            this.rewardData.cupId > 0 && (this.btnLock_getBtn2 = !0, a.call(function() {
                var a = wx.createAnimation();
                a.scale(0).opacity(0).step({
                    timingFunction: "ease-in",
                    duration: 150
                });
                var n = wx.createAnimation();
                n.scale(0, 1).step({
                    timingFunction: "ease-in",
                    duration: 150
                });
                var i = wx.createAnimation();
                i.scale(0, 1).step({
                    timingFunction: "ease-in",
                    duration: 150
                });
                var s = wx.createAnimation();
                s.scale(0).step({
                    timingFunction: "ease-in",
                    duration: 200
                }), t.setPageData(e.page, {
                    "seasonRewardData.trophyVisible": !0,
                    "seasonRewardData.trophyAni": a.export(),
                    "seasonRewardData.titleImgAni": n.export(),
                    "seasonRewardData.titleLabelAni": i.export(),
                    "seasonRewardData.getBtn2Ani": s.export()
                });
            }), a.wait(300), a.call(function() {
                e.btnLock_getBtn2 = !1;
            })), a.call(function() {
                var a = wx.createAnimation();
                a.scale(1.3).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 300
                }), a.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 150
                });
                var n = wx.createAnimation();
                n.scale(1, 1).step({
                    timingFunction: "ease-in",
                    duration: 150
                });
                var i = wx.createAnimation();
                i.scale(1, 1).step({
                    timingFunction: "ease-in",
                    duration: 150
                });
                var s = wx.createAnimation();
                s.scale(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                }), t.setPageData(e.page, {
                    "seasonRewardData.rewardViewVisible": !0,
                    "seasonRewardData.rewardSubViewVisible": !0,
                    "seasonRewardData.trophyVisible": !1,
                    "seasonRewardData.tierVisible": !0,
                    "seasonRewardData.headIdIconSrc": "https://question-resource-wscdn.hortorgames.com/image/new_skin/icon/tiers/" + e.rewardData.headId + ".png",
                    "seasonRewardData.rewardDesc": "恭喜获得" + t.GetMatchInfo(e.rewardData.curMatch).name + "头像框",
                    "seasonRewardData.tierAni": a.export(),
                    "seasonRewardData.titleImgAni": n.export(),
                    "seasonRewardData.titleLabelAni": i.export(),
                    "seasonRewardData.getBtn2Ani": s.export()
                });
            });
        }
    }, {
        key: "playGetItemAni",
        value: function() {
            var e = this, a = s.fastGet("rewardTween");
            this.rewardData.headId > 0 && (this.btnLock_getBtn2 = !0, a.call(function() {
                var a = wx.createAnimation();
                a.scale(.6).opacity(1).top("-44rpx").step({
                    timingFunction: "ease-in",
                    duration: 500
                });
                var n = wx.createAnimation();
                n.scale(0, 1).step({
                    timingFunction: "ease-in",
                    duration: 150
                });
                var i = wx.createAnimation();
                i.scale(0, 1).step({
                    timingFunction: "ease-in",
                    duration: 150
                });
                var s = wx.createAnimation();
                s.scale(0).step({
                    timingFunction: "ease-in",
                    duration: 200
                }), t.setPageData(e.page, {
                    "seasonRewardData.tierAni": a.export(),
                    "seasonRewardData.titleImgAni": n.export(),
                    "seasonRewardData.titleLabelAni": i.export(),
                    "seasonRewardData.getBtn2Ani": s.export()
                });
            }), a.wait(500), a.call(function() {
                t.setPageData(e.page, {
                    "seasonRewardData.headId": e.rewardData.headId
                });
            }), a.wait(150), a.call(function() {
                e.btnLock_getBtn2 = !1;
            })), a.call(function() {
                var a = wx.createAnimation();
                a.scale(1.3).opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 300
                }), a.scale(1).step({
                    timingFunction: "ease-out",
                    duration: 150
                });
                var n = wx.createAnimation();
                n.scale(1, 1).step({
                    timingFunction: "ease-in",
                    duration: 150
                });
                var i = wx.createAnimation();
                i.scale(1, 1).step({
                    timingFunction: "ease-in",
                    duration: 150
                });
                var s = wx.createAnimation();
                s.scale(1).step({
                    timingFunction: "ease-in",
                    duration: 200
                }), t.setPageData(e.page, {
                    "seasonRewardData.rewardViewVisible": !0,
                    "seasonRewardData.rewardSubViewVisible": !0,
                    "seasonRewardData.trophyVisible": !1,
                    "seasonRewardData.tierVisible": !1,
                    "seasonRewardData.subjectVisible": !0,
                    "seasonRewardData.itemImgSrc": "https://question-resource-wscdn.hortorgames.com/image/new_skin/icon/icon_items/" + e.rewardData.items[0].itemId + ".png",
                    "seasonRewardData.itemNum": e.rewardData.items[0].itemNum,
                    "seasonRewardData.rewardDesc": "恭喜获得该段位奖励",
                    "seasonRewardData.itemAni": a.export(),
                    "seasonRewardData.titleImgAni": n.export(),
                    "seasonRewardData.titleLabelAni": i.export(),
                    "seasonRewardData.getBtn2Ani": s.export()
                });
            });
        }
    }, {
        key: "playEndAni",
        value: function() {
            var e = this, a = s.fastGet("showNext");
            a.call(function() {
                var a = wx.createAnimation();
                a.scale(0).step({
                    timingFunction: "ease-in",
                    duration: 150
                });
                var n = wx.createAnimation();
                n.scale(0, 1).step({
                    timingFunction: "ease-in",
                    duration: 150
                });
                var i = wx.createAnimation();
                i.scale(0, 1).step({
                    timingFunction: "ease-in",
                    duration: 150
                });
                var s = wx.createAnimation();
                s.scale(0).step({
                    timingFunction: "ease-in",
                    duration: 200
                }), t.setPageData(e.page, {
                    "seasonRewardData.itemAni": a.export(),
                    "seasonRewardData.titleImgAni": n.export(),
                    "seasonRewardData.titleLabelAni": i.export(),
                    "seasonRewardData.getBtn2Ani": s.export()
                });
            }), a.wait(200), a.call(function() {
                e.btnLock_getBtn2 = !1;
            }), a.call(function() {
                var a = wx.createAnimation();
                a.opacity(1).step({
                    timingFunction: "ease-in",
                    duration: 300
                }), t.setPageData(e.page, {
                    "seasonRewardData.nextViewAni": a.export(),
                    "seasonRewardData.nextSeasonImgSrc": "https://question-resource-wscdn.hortorgames.com/image/new_skin/season/img_bg_season_" + e.rewardData.seasonInfo.seasonId + "_2.png",
                    "seasonRewardData.rewardViewVisible": !0,
                    "seasonRewardData.nextViewVisible": !0,
                    "seasonRewardData.nextSeasonTime": e.nextSeasonTime
                });
            }), a.wait(function() {
                t.setPageData(e.page, {
                    "seasonRewardData.rewardSubViewVisible": !1
                });
            });
        }
    } ]), c;
}();

module.exports = c;