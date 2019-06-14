var t = require("./../../../util/Tween.js"), i = require("../template/customEase.js"), e = require("./../../../util/util.js"), n = require("./../../../net/rollerNet.js"), a = require("./../../../data/ItemsManager.js"), r = require("./../../../util/daliyTask/DailyTaskNotifiyView.js"), o = getApp();

Page({
    data: {
        rewardGrids: [],
        indexHightlight: -1,
        reward: null,
        oneCost: 0,
        mindRoll: 0
    },
    onLoad: function(t) {
        this.dailyTaskNotifiyView = new r(this), e.addSound(this, "turn", "https://question-resource-wscdn.hortorgames.com/image/media/dailyChallenge/turn.mp3?v=2", !1), 
        e.addSound(this, "prize", "https://question-resource-wscdn.hortorgames.com/image/media/dailyChallenge/prize.wav", !1), 
        this.idxBase = 0, this.gridWidth = 4, this.gridHeight = 5, this.map = this.getGridMap(), 
        this.rollDuration = 1e4;
    },
    initGrids: function(t) {
        t || (t = [ {
            itemId: 2e5,
            itemNum: 1e3
        }, {
            itemId: 203003,
            itemNum: 1
        }, {
            itemId: 203004,
            itemNum: 1
        }, {
            itemId: 204001,
            itemNum: 1
        }, {
            itemId: 2e5,
            itemNum: 1e3
        }, {
            itemId: 203003,
            itemNum: 1
        }, {
            itemId: 203004,
            itemNum: 1
        }, {
            itemId: 204001,
            itemNum: 1
        }, {
            itemId: 2e5,
            itemNum: 1e3
        }, {
            itemId: 203003,
            itemNum: 1
        }, {
            itemId: 203004,
            itemNum: 1
        }, {
            itemId: 204001,
            itemNum: 1
        }, {
            itemId: 203004,
            itemNum: 1
        }, {
            itemId: 204001,
            itemNum: 1
        } ]);
        for (var i = [], e = 0; e < this.gridHeight; e++) for (var n = 0; n < this.gridWidth; n++) {
            var a = e * this.gridWidth + n, r = this.map["" + a], o = t[r = r >= 0 ? r : -1];
            console.log(""), i.push({
                idx: r,
                visible: 0 == e || 0 == n || e == this.gridHeight - 1 || n == this.gridWidth - 1,
                data: o
            });
        }
        var s = {};
        s.rewardGrids = i, this.setData(s);
    },
    buildCell: function(t, i) {
        return t ? {
            idx: i,
            visible: !0,
            data: t
        } : {
            idx: i,
            visible: !1,
            data: {}
        };
    },
    getCellDataFromList: function(t, i, e) {
        if (i <= 0) return this.buildCell(t[e], e);
        if (i >= this.gridHeight - 1) {
            var n = 2 * (this.gridHeight - 2), a = this.gridWidth + n + e;
            return this.buildCell(t[a], a);
        }
        if (e > 0 && e < this.gridWidth - 1) return this.buildCell(null, -1);
        var r = this.gridWidth + 2 * (i - 1);
        return this.buildCell(t[r + e], r + e);
    },
    getGridMap: function() {
        return {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            7: 4,
            11: 5,
            15: 6,
            19: 7,
            18: 8,
            17: 9,
            16: 10,
            12: 11,
            8: 12,
            4: 13
        };
    },
    getGridIndex: function(t) {
        for (var i in this.map) if (this.map[i] == t) return i;
        return 0;
    },
    onReady: function() {},
    onShow: function() {
        this.dailyTaskNotifiyView.onShow(), this.tryGetRollerList(this.setRollerList);
    },
    forkRollerList: function() {
        var t = {
            mindRoll: 100,
            oneCost: 1
        };
        this.setRollerList(t);
    },
    tryGetRollerList: function(t) {
        n.rollerList(function(i, e) {
            i || t && t(e);
        });
    },
    setRollerList: function(t) {
        this.initGrids(t.items), o.mainData.role.mindRoll = t.mindRoll;
        var i = {};
        i.mindRoll = t.mindRoll, i.oneCost = t.oneCost, this.setData(i);
    },
    onHide: function() {
        this.dailyTaskNotifiyView.onHide();
    },
    onUnload: function() {
        e.destoryAudio(this), t.removeTweens("luckywheel"), this.dailyTaskNotifiyView.onUnload();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onTabBtnBegin: function() {
        this.btnLock || (this.btnLock = !0, this.tryRun(this.run));
    },
    forkRun: function() {
        var t = {
            hitIndex: 5,
            mindRoll: 99
        };
        this.run(t);
    },
    tryRun: function(t) {
        var i = this;
        o.mainData.role.mindRoll < this.data.oneCost ? (e.ShowConfirm("提示", "幸运草不足", function() {}), 
        this.btnLock = !1) : n.rollerRoll(function(e, n) {
            e ? i.btnLock = !1 : t && t(n);
        });
    },
    playRunAni: function(n) {
        var a = this, r = i(.45, .25, 0, .93), o = t.fastGet("luckywheel", !0), s = n.hitIndex, d = this.idxBase, l = 14 - d + 56 + s, u = {};
        u.indexHightlight = this.idxBase, this.setData(u);
        var m = e.getServerTime();
        o.update(function(t) {
            var i = r(t), n = d + Math.ceil(l * i);
            n %= 14;
            if (a.data.indexHightlight != n) {
                var o = a.index;
                a.index || a.audio_playEff("turn", "sound_eff");
                var s = a.getGridIndex(n), u = e.getServerTime();
                o - s != 0 && e.getServerTime() - m > 150 && (a.audio_playEff("turn", "sound_eff"), 
                m = u), a.index = a.getGridIndex(n);
                var c = {};
                c.indexHightlight = n, c.reward = a.data.rewardGrids[a.index], a.setData(c);
            }
        }, this.rollDuration);
    },
    playCostAni: function(i) {
        var e = this, n = t.fastGet("tweenCost", !0);
        n.update(function(t) {
            var n = e.data.oneCost - t * e.data.oneCost, a = i.mindRoll + n, r = {};
            r.mindRoll = Math.ceil(a), e.setData(r);
        }, 400), n.wait(400), n.call(function() {
            var t = wx.createAnimation();
            t.opacity(0).translate3d(0, 0, 0).step({
                timingFunction: "step-start",
                duration: 100
            });
            var i = {};
            i.ani_oneCost = t.export(), e.setData(i);
        }), n.wait(100), n.call(function() {
            var t = wx.createAnimation();
            t.opacity(1).translate3d(0, "-20px", 0).step({
                timingFunction: "ease-in",
                duration: 200
            });
            var i = {};
            i.ani_oneCost = t.export(), e.setData(i);
        }), n.wait(200), n.call(function() {
            var t = wx.createAnimation();
            t.opacity(0).translate3d(0, "-30px", 0).step({
                timingFunction: "ease-out",
                duration: 200,
                delay: 200
            });
            var i = {};
            i.ani_oneCost = t.export(), e.setData(i);
        });
    },
    run: function(i) {
        var e = this;
        o.mainData.role.mindRoll = i.mindRoll;
        var n = this.getGridIndex(this.idxBase), r = t.fastGet("luckywheelAll");
        r.call(function() {
            var t = wx.createAnimation();
            t.opacity(0).step({
                timingFunction: "step-start",
                duration: 100
            });
            var i = wx.createAnimation();
            i.scale(1.2).step({
                timingFunction: "step-in",
                duration: 200
            }), i.scale(0).step({
                timingFunction: "step-in",
                duration: 300
            });
            var a = {};
            a["rewardGrids[" + n + "].ani_base"] = t.export(), a.ani_btnBegin = i.export(), 
            e.setData(a);
        }), r.wait(100), r.call(function() {
            var t = wx.createAnimation();
            t.opacity(1).step({
                timingFunction: "ease-in",
                duration: 600
            });
            var i = {};
            i["rewardGrids[" + n + "].ani_base"] = t.export(), e.setData(i);
        }), r.wait(600), r.call(function() {
            var t = wx.createAnimation();
            t.opacity(0).step({
                timingFunction: "step-end",
                duration: 400
            });
            var i = {};
            i["rewardGrids[" + n + "].ani_base"] = t.export(), e.setData(i);
        }), r.wait(400), r.call(function() {
            e.playRunAni(i), e.playCostAni(i);
        }), r.wait(this.rollDuration + 50), r.call(function() {
            var t = {};
            t["rewardGrids[" + e.index + "].brightness"] = !0, e.setData(t);
        }), r.wait(500), r.call(function() {
            var t = wx.createAnimation();
            t.scale(.8).step({
                timingFunction: "ease-out",
                duration: 200
            }), t.scale(1.2).step({
                timingFunction: "ease-out",
                duration: 200
            }), t.scale(1).step({
                timingFunction: "ease-out",
                duration: 100
            });
            var i = {};
            i.ani_center = t.export(), e.setData(i);
        }), r.wait(700), r.call(function() {
            e.audio_playEff("prize", "sound_eff"), e.idxBase = e.data.indexHightlight;
            for (var t = [], n = 0; n < i.items.length; n++) {
                var r = {
                    itemId: i.items[n].itemId,
                    itemNum: i.items[n].itemNum
                }, s = o.mainData.role.allSeeds.itemConfs["" + r.itemId];
                r.name = s.name, t.push(r), a.addItem(i.items[n].itemId, i.items[n].itemNum);
            }
            var d = {};
            d.curReward = {
                reward: e.data.reward,
                items: t
            }, d.indexHightlight = -1, d.reward = null, d["rewardGrids[" + e.index + "].brightness"] = !1, 
            e.setData(d);
        });
    },
    onTapRewardDetailClosed: function() {
        var i = this, e = t.fastGet("luckywheelAll");
        e.call(function() {
            var t = wx.createAnimation();
            t.scale(1.2).step({
                timingFunction: "step-in",
                duration: 200
            }), t.scale(1).step({
                timingFunction: "step-out",
                duration: 300
            });
            var e = {};
            e.curReward = null, e.ani_btnBegin = t.export(), i.setData(e);
        }), e.wait(500), e.call(function() {
            i.btnLock = !1;
        });
    }
});