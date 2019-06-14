var t = require("./../../util/Tween.js"), a = require("./../../data/ScoreWallData.js"), n = require("./../../net/roleNet.js"), e = require("./../../util/util.js"), o = getApp();

Page({
    data: {},
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        var t = this;
        this.setAin(), o.wallSDK.setCanvasId("horwall_canvas"), o.wallSDK.logOpenTaskPanel(), 
        o.wallSDK.getTasks({
            success: function(s) {
                e.log("获取积分墙到数据", s), 0 == s.tasks.length || (a.data.tasks = s.tasks, t.saveGameIds(s.tasks), 
                t.btnLock = !0, n.getWallInfo(function(n, s) {
                    setTimeout(function() {
                        t.btnLock = !1;
                    }, 200), n ? e.ShowToast("获取数据失败，请稍后重试") : (a.data.wallInfo = s.info, a.refreshInfo(), 
                    t.refreshView(), o.eventDispatcher.dispatchEventWith("refreshIntegralWallEntry"));
                }));
            },
            fail: function(t) {
                e.log("获取积分墙任务失败.", t), e.ShowToast("获取数据失败，请稍后重试");
            }
        });
    },
    saveGameIds: function(t) {
        if (t) {
            for (var a = {}, n = 0; n < t.length; n++) a["" + t[n].taskId] = !0;
            e.setStorageSync("integral_wall", a);
        }
    },
    setAin: function() {
        var a = this, n = t.fastGet("integral_wall");
        this.setData({
            ani_list: wx.createAnimation().export()
        }), n.wait(300), n.call(function() {
            var t = wx.createAnimation({
                timingFunction: "ease-out",
                duration: 600
            });
            t.translate3d(0, 0, 0).step();
            var n = {};
            n.ani_list = t.export(), a.setData(n);
        });
    },
    refreshView: function() {
        var t = {};
        t.gameList = a.data.tasks, this.setData(t);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onItemTap: function(t) {
        var s = this;
        if (!this.btnLock) {
            this.btnLock = !0;
            var i = t.currentTarget.dataset.id;
            console.log(i);
            for (var l = 0; l < a.data.tasks.length; l++) !function(t) {
                var l = a.data.tasks[t];
                l.taskId == i && (1 == l.customState ? n.gainWallAward(l.taskId, function(t, n) {
                    setTimeout(function() {
                        s.btnLock = !1;
                    }, 200), t ? e.ShowToast(t.errMsg) : (a.data.wallInfo["" + l.taskId] = 1, a.refreshInfo(), 
                    s.refreshView(), o.updateGold(n.gold), e.ShowToast("金币+" + n.addGold), o.eventDispatcher.dispatchEventWith("refreshIntegralWallEntry"));
                }) : o.wallSDK.goTask(i, {
                    success: function() {
                        console.log("去做任务了"), s.btnLock = !1;
                    },
                    fail: function(t) {
                        console.log("做任务失败.", t), s.btnLock = !1;
                    }
                }));
            }(l);
        }
    }
});