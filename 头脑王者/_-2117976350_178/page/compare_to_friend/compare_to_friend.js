var t = require("./../../net/friendNet.js"), e = (require("./../../net/connectNotify.js"), 
require("./../../const/notifyConsts.js"), require("./../../util/util.js")), a = (require("./../../util/PVERoomDataManager.js"), 
require("./../../util/Tween.js")), n = getApp();

Page({
    data: {
        x: 0,
        y: 0,
        hidden: !0,
        status: 0,
        scopping: !0,
        roleInfo: null,
        rivalUser: null,
        killedQuestions: 0,
        killedQuestions_rival: 0,
        winRatio_user: 0,
        winRatio_rival: 0,
        shareRewardText: "",
        aniFeild: [ null, null, null, null ],
        showSharp1: !1,
        showSharp2: !1
    },
    btn_back_clicked: function(t) {
        wx.navigateBack();
    },
    start: function(t) {
        this.setData({
            hidden: !1,
            x: t.touches[0].x,
            y: t.touches[0].y
        });
    },
    move: function(t) {
        this.setData({
            x: t.touches[0].x,
            y: t.touches[0].y
        });
    },
    end: function(t) {
        this.setData({
            hidden: !0
        });
    },
    setUser: function(t, a, n) {
        var i = a, s = 0;
        if (a.scoreStats) {
            var r = a.scoreStats[1], o = a.scoreStats[2], u = a.scoreStats[3], h = a.scoreStats[4], c = a.scoreStats[5], l = a.scoreStats[6];
            r = r || 0, o = o || 0, u = u || 0, h = h || 0, c = c || 0, l = l || 0, i.userInfo || (i.userInfo = {}, 
            i.userInfo.nickName = i.nickName, i.userInfo.avatarUrl = i.avatarUrl), s = a.rightNum;
            var d = 750 / this.screenWidth, f = 110 / d, v = 70 / d, m = this.screenWidth / 2, w = wx.createCanvasContext(t);
            w.setFillStyle(n), w.setStrokeStyle(n), w.setGlobalAlpha(.4), w.beginPath();
            for (var p = {
                "-90": u,
                "-30": h,
                30: c,
                90: l,
                150: o,
                210: r
            }, x = -90; x < 270; x += 60) {
                var S = Math.PI / 180 * x, D = f * (Math.min(100, p[x + ""]) / 100), g = m + (D += v) * Math.cos(S), _ = 120.5 + D * Math.sin(S);
                w.lineTo(g, _);
            }
            w.fill(), w.stroke(), w.draw();
        }
        return i.matchName = e.GetMatchInfo(i.curMatch).name, {
            user: i,
            killedQuestions: s
        };
    },
    onLoad: function(t) {
        var i = this;
        e.showShareMenu(), n.eventDispatcher.addEventListener("shareTextUpdate", this.onShareTextUpdate, this), 
        this.setData({
            status: 2,
            shareRewardText: n.getShareRewardText()
        }), this.init(t);
        var s = a.fastGet("compare_to_friend");
        s.wait(500);
        for (var r = 0; r < 4; r++) !function(t) {
            s.wait(100), s.call(function() {
                var e = wx.createAnimation({
                    timingFunction: "ease-out",
                    duration: 300
                });
                e.translate3d(0, 0, 0).step();
                var a = {};
                a["aniFeild[" + t + "]"] = e.export(), i.setData(a);
            });
        }(r);
        s.wait(200), s.call(function() {
            var t = wx.createAnimation({
                timingFunction: "ease-out",
                duration: 300
            });
            t.translate3d(0, 0, 0).step();
            var e = {
                ani_foot: t.export()
            };
            i.setData(e);
        }), s.wait(300), s.call(function() {
            var t = wx.createAnimation({
                timingFunction: "ease-in",
                duration: 300
            });
            t.scale(1).opacity(1).rotate(0).step();
            var e = {
                ani_web: t.export()
            };
            i.setData(e);
        }), s.wait(800), s.call(function() {
            var t = {
                showSharp1: !0
            };
            i.setData(t);
        }), s.wait(500), s.call(function() {
            var t = {
                showSharp2: !0
            };
            i.setData(t);
        });
    },
    onShareTextUpdate: function() {
        this.setData({
            shareRewardText: this.shared ? "" : n.getShareRewardText()
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        a.removeTweens("compare_to_friend"), n.eventDispatcher.removeEventListener("shareTextUpdate", this.onShareTextUpdate, this);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        this.shared = !0;
        var e = n.shareManager.getCompareShareData("compare_to_friend");
        return n.shareConf(e);
    },
    init: function(e) {
        var a = this;
        this.screenWidth = n.systemInfo.windowWidth, this.screenHeight = n.systemInfo.windowHeight;
        var i = this.setUser("myCanvas", n.mainData.role, "#2EDAFE");
        this.setData({
            roleInfo: i.user,
            killedQuestions: i.killedQuestions,
            winRatio_user: 0 == i.user.roomNum ? 0 : (100 * i.user.winRoom / i.user.roomNum).toFixed(1)
        }), t.friendDetail(n.mainData.loginArgs.friendCode, function(t, e) {
            if (!t && e) {
                var n = a.setUser("myCanvas2", e, "#FF205A");
                a.setData({
                    rivalUser: n.user,
                    killedQuestions_rival: n.killedQuestions,
                    winRatio_rival: 0 == n.user.roomNum ? 0 : (100 * n.user.winRoom / n.user.roomNum).toFixed(1)
                });
            }
        });
    }
});