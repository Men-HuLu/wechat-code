var t = require("./../../net/fightNet.js"), e = require("./../../net/messageNet.js"), a = require("./../../util/PVERoomDataManager.js"), i = require("./../../util/util.js"), n = require("./../../const/consts.js"), o = require("./../../util/Tween.js"), r = require("./template/PvrController.js"), s = getApp();

Page({
    data: {
        textStatus: ".",
        itsMe: !1,
        myRanking: 0,
        roomInfo: null,
        textExpireTime: "",
        userInfo: null,
        rivalUser: null
    },
    roomId: 0,
    needSendOutFight: !0,
    onLoad: function(t) {
        r.pvrLoad = !0, setTimeout(function() {
            r.pvrLoad = !1;
        }, 2e3), i.showShareMenu(), r.roomInfo ? this.initSkin() : wx.navigateBack();
    },
    initSkin: function() {
        var t = this, e = 0;
        if (r.roomInfo.list) for (var a = 0; a < r.roomInfo.list.length; a++) {
            var n = r.roomInfo.list[a];
            n.rivalUser.uid == s.uid && (e = a + 1), n.rivalUser.nickName = i.formatNameBase(n.rivalUser.nickName, 8, null);
        }
        var o = this.getTextStatus(r.roomInfo), u = r.itsMe(), l = {
            textStatus: o,
            itsMe: u,
            myRanking: e,
            roomInfo: r.roomInfo
        };
        this.setData(l), o || u || this.goFight();
        var c = i.getServerTimeBaseSecond();
        Math.max(0, r.roomInfo.expireTime - c) > 0 && !r.roomInfo.expire && (this.timeFlag_countDown && (clearInterval(this.timeFlag_countDown), 
        this.timeFlag_countDown = void 0), this.timeFlag_countDown = setInterval(function() {
            var e = i.getServerTimeBaseSecond(), a = Math.max(0, r.roomInfo.expireTime - e), n = {
                textExpireTime: i.formatTime(a)
            };
            t.setData(n), a <= 0 && (clearInterval(t.timeFlag_countDown), t.timeFlag_countDown = void 0, 
            r.roomInfo.expire = !0, t.initSkin());
        }, 1e3));
    },
    getTextStatus: function(t) {
        var e = null;
        return r.itsMe() ? e = null : t.expire ? e = "房间已过期" : t.isFull ? e = "房间已满" : t.had && (e = "您已完成挑战"), 
        e;
    },
    matchShare: function(e) {
        var a = this;
        t.matchShare(r.roomIdPvr, r.friendCode, function(t, n) {
            if (t) 70024 == t.errCode ? s.exitGame(t.errCode, t.errMsg) : (console.log(t.errMsg), 
            r.shareRoomInfo(function() {
                a.initSkin();
            })); else {
                a.roomId = n.roomId;
                var o = {
                    roomId: n.roomId,
                    userInfo: {
                        uid: s.mainData.role.uid,
                        nickName: s.mainData.role.userInfo.nickName,
                        avatarUrl: s.mainData.role.userInfo.avatarUrl,
                        city: i.getCity(s.mainData.role.userInfo.province, s.mainData.role.userInfo.city),
                        level: s.mainData.role.level,
                        headId: s.mainData.role.headId
                    },
                    rivalUser: n.rivalUser
                };
                a.setData(o), e && e();
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        r.pvrLoad || setTimeout(function() {
            i.log("从战斗回来，roomid:" + r.roomInfo, "friendCode:" + r.friendCode), r.shareRoomInfo(function() {
                t.initSkin(), r.makeMyShareImage();
            });
        }, 1e3);
    },
    onHide: function() {
        this.timeFlag_countDown && (clearInterval(this.timeFlag_countDown), this.timeFlag_countDown = void 0);
    },
    onUnload: function() {
        o.removeTweens("pvr"), this.needSendOutFight && this.sendOutFight();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var e = r.makeMyShareTitle();
        return s.shareConf(e);
    },
    goFight: function(t) {
        var i = this;
        e.markStats(n.event_point.click_pvr), this.matchShare(function() {
            i.needSendOutFight = !1;
            a.setData({
                roomId: i.data.roomId,
                userInfo: i.data.userInfo,
                rivalUser: i.data.rivalUser,
                city: i.data.userInfo.city,
                type: "pvr"
            }, !1);
            a.fixPVEAvatarUrl(), i.playEnterAni(), setTimeout(function() {
                wx.navigateTo({
                    url: "../../page/fight/fight?fightType=pvr"
                });
            }, 3e3);
        });
    },
    sendOutFight: function() {
        t.outFight(0, this.roomId, function(t, e) {
            s.mainData.role.roomID = 0;
        });
    },
    onBtnBackClicked: function() {
        wx.navigateBack({
            delta: 1
        });
    },
    playEnterAni: function() {
        var t = this;
        if (!this.enterAniIsPlay) {
            this.enterAniIsPlay = !0;
            var e = o.fastGet("pvr");
            e.wait(800), e.call(function() {
                var e = wx.createAnimation({
                    duration: 400
                });
                e.scale(1).opacity(1).step(), t.setData({
                    aniFlower: e.export()
                });
            }), e.wait(500), e.call(function() {
                var e = wx.createAnimation({
                    duration: 400
                }).width("100%").step().export();
                t.setData({
                    aniAvartar: e
                });
            }), e.wait(250), e.call(function() {
                var e = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                e.opacity(1).step(), t.setData({
                    aniMsg: e.export()
                });
            }), e.wait(400), e.call(function() {
                var e = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                e.opacity(0).step(), t.setData({
                    aniMsg: e.export()
                });
            }), e.wait(250), e.call(function() {
                var e = wx.createAnimation({
                    duration: 300
                }).width("650px").step().export();
                t.setData({
                    aniAvartar: e
                });
            }), e.wait(350), e.call(function() {
                var e = wx.createAnimation({
                    duration: 300
                });
                e.scale(.5).opacity(0).step(), t.setData({
                    aniFlower: e.export()
                });
            });
        }
    }
});