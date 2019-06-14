var t = require("./../../net/friendNet.js"), e = require("./../../net/settingNet.js"), a = (require("./../../net/connectNotify.js"), 
require("./../../const/notifyConsts.js"), require("./../../const/modeConsts.js")), n = require("./../../util/util.js"), i = require("./../../const/consts.js"), s = (require("./../../util/PVERoomDataManager.js"), 
require("./../../util/Tween.js")), o = require("./../../data/ItemsManager.js"), r = getApp();

Page({
    data: {
        screenWidth: 100,
        screenHeight: 603,
        roleInfo: null,
        killedQuestions: 0,
        shareRewardText: "",
        settingViewVisible: !1,
        grid9_panel: i.Grid9_panel,
        forbiddenPush: !1,
        soundOff: !1,
        settingOpacity: 0,
        showWeb: !1,
        cups: null,
        myUID: 0
    },
    btn_back_clicked: function(t) {
        wx.navigateBack();
    },
    initCupsResource: function(t) {
        this.setData({
            cups: r.formatUserCups(t)
        });
    },
    setUser: function(t) {
        var e = this;
        if (t) {
            var a = t, i = {};
            if (i.roleInfo = a, t.scoreStats) {
                var o = t.scoreStats[1], c = t.scoreStats[2], u = t.scoreStats[3], d = t.scoreStats[4], f = t.scoreStats[5], l = t.scoreStats[6];
                o = o || 0, c = c || 0, u = u || 0, d = d || 0, f = f || 0, l = l || 0, a.userInfo ? (i.roleInfo.userInfo = n.assign({}, i.roleInfo.userInfo), 
                i.roleInfo.userInfo.nickName = a.userInfo.nickName) : (a.userInfo = {}, a.userInfo.nickName = a.nickName, 
                a.userInfo.avatarUrl = a.avatarUrl), this.initCupsResource(t), i.killedQuestions = t.rightNum;
                var h = 750 / this.data.screenWidth, m = 110 / h, p = 70 / h, g = this.data.screenWidth / 2, w = wx.createCanvasContext("myCanvas");
                w.setFillStyle("#7AFBFF"), w.setStrokeStyle("#7AFBFF"), w.setGlobalAlpha(.5), w.beginPath();
                for (var D = {
                    "-90": u,
                    "-30": d,
                    30: f,
                    90: l,
                    150: c,
                    210: o
                }, v = -90; v < 270; v += 60) {
                    var x = Math.PI / 180 * v, b = m * (Math.min(100, D[v + ""]) / 100), I = g + (b += p) * Math.cos(x), S = 120.5 + b * Math.sin(x);
                    w.lineTo(I, S);
                }
                console.log("-----------"), w.fill(), w.stroke(), w.draw();
            }
            var k = r.getShareRewardText(), T = n.GetMatchInfo(a.curMatch), _ = t.winRoom || 0, y = t.roomNum || 0, F = 0;
            0 != y && (F = _ / y), i.matchName = T.name, i.shareRewardText = k || "", i.winningRate = (100 * F).toFixed(0) + "%", 
            this.setData(i);
            var P = s.fastGet("user_detail");
            P.wait(1e3), P.call(function() {
                var t = wx.createAnimation({
                    duration: 300,
                    timingFunction: "ease-out"
                });
                t.translate3d(0, "0px", 0).opacity(1).step(), e.setData({
                    aniHead: t.export()
                });
            }), this.data.cups && (P.wait(400), P.call(function() {
                var t = wx.createAnimation({
                    duration: 300,
                    timingFunction: "ease-out"
                });
                t.right("16rpx").step(), e.setData({
                    aniCups: t.export()
                });
            })), P.wait(400), P.call(function() {
                var t = wx.createAnimation({
                    duration: 300,
                    timingFunction: "ease-out"
                });
                t.opacity(1).step(), e.setData({
                    aniWeb: t.export()
                });
            }), P.wait(400), P.call(function() {
                var t = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                t.opacity(1).scale(1).step(), e.setData({
                    showWeb: !0,
                    aniField1: t.export()
                });
            }), P.wait(200), P.call(function() {
                var t = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                t.opacity(1).scale(1).step(), e.setData({
                    aniField2: t.export()
                });
            }), P.wait(200), P.call(function() {
                var t = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                t.opacity(1).scale(1).step(), e.setData({
                    aniField3: t.export()
                });
            }), P.wait(200), P.call(function() {
                var t = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                t.translate3d(0, 0, 0).step(), e.setData({
                    anifoot: t.export()
                });
            });
        }
    },
    onLoad: function(e) {
        var i = this;
        n.showShareMenu(), r.eventDispatcher.addEventListener("shareTextUpdate", this.onShareTextUpdate, this), 
        this.setData({
            screenWidth: r.systemInfo.windowWidth,
            screenHeight: r.systemInfo.windowHeight,
            myUID: r.mainData.role.uid
        });
        var s = n.assign({}, r.mainData.user_to_detail || r.mainData.role);
        s.uid != r.mainData.role.uid ? (this.setUser(s), t.findFriend(s.uid, function(t, e) {
            t ? console.warn(t) : e && i.setUser(e);
        })) : this.setUser(r.mainData.role), n.setNavigationBarTitle("头脑王者" + a.ClientVer);
    },
    onShareTextUpdate: function() {
        this.setData({
            shareRewardText: this.shared ? "" : r.getShareRewardText()
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        s.removeTweens("user_detail"), r.eventDispatcher.removeEventListener("shareTextUpdate", this.onShareTextUpdate, this);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        this.shared = !0;
        var e = r.shareManager.getCompareShareData("user_detail");
        return r.shareConf(e);
    },
    btn_code_clicked: function() {
        wx.navigateTo({
            url: "/page/qrCode/qrCode"
        });
    },
    onTapSettingBtn: function(t) {
        try {
            var e = r.mainData.role.settingsInfo || {};
            this.setData({
                forbiddenPush: e.forbiddenPush,
                soundOff: e.soundOff,
                settingViewVisible: !0,
                settingOpacity: 1
            });
        } catch (t) {
            n.reportAnalytics_Try(t);
        }
    },
    onTapSettingViewCloseBtn: function(t) {
        var a = this, n = r.mainData.role.settingsInfo || {};
        this.data.forbiddenPush == n.forbiddenPush && this.data.soundOff == n.soundOff || e.setting(this.data.forbiddenPush, this.data.soundOff, function() {
            r.mainData.role.settingsInfo || (r.mainData.role.settingsInfo = {}), r.mainData.role.settingsInfo.soundOff = a.data.soundOff, 
            r.mainData.role.settingsInfo.forbiddenPush = a.data.forbiddenPush;
        }), this.setData({
            settingOpacity: 0
        }), setTimeout(function() {
            a.setData({
                settingViewVisible: !1
            });
        }, 300);
    },
    onTapSettingView_pushBtn: function(t) {
        this.data.forbiddenPush = !this.data.forbiddenPush, this.setData({
            forbiddenPush: this.data.forbiddenPush
        });
    },
    onTapSettingView_soundBtn: function(t) {
        this.data.soundOff = !this.data.soundOff, this.setData({
            soundOff: this.data.soundOff
        });
    },
    btn_cup_clicked: function(t) {
        var e = t.currentTarget.dataset.id, a = o.getItemDetail(e);
        a.num = 1, a.callback_back_clicked = "callback_back_clicked", this.setData({
            selectedItem: a
        });
    },
    callback_back_clicked: function() {
        this.setData({
            selectedItem: null
        });
    }
});