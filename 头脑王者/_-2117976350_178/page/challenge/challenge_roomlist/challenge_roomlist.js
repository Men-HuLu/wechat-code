var t = require("./../../../util/ChallengeRoomDataManager.js"), e = require("./../../../util/util.js"), o = require("./../../../const/consts.js"), a = require("./../../../net/challengeNet.js"), n = getApp();

Page({
    data: {
        start: 1,
        len: 100,
        max: 100,
        loading: !0,
        roomList: []
    },
    onLoad: function(t) {
        e.showShareMenu();
    },
    onReady: function() {},
    onShow: function() {
        var o = this;
        n.mainData.loginArgs.shareTicket && t.enterWithChallenge ? (t.enterWithChallenge = !1, 
        wx.getShareInfo({
            shareTicket: n.mainData.loginArgs.shareTicket,
            success: function(t) {
                e.log("链接卡片信息解析成功：encryptedData：", t.encryptedData, "/iv", t.iv), o.joinRoom(null, t.encryptedData, t.iv);
            },
            fail: function(t) {
                e.log("链接卡片信息解析失败，app.mainData.role.challengeID = ", n.mainData.role.challengeID), 
                n.mainData.role.challengeID > 0 ? o.joinRoom(n.mainData.role.challengeID) : o.getRoomList();
            },
            complete: function() {
                n.mainData.loginArgs.shareTicket = null;
            }
        })) : n.mainData.role.challengeID > 0 ? this.joinRoom(n.mainData.role.challengeID) : this.getRoomList();
    },
    joinRoom: function(a, i, r) {
        var s = this;
        t.request_challengeJoin(a, i, r, function(t, l) {
            if (t) switch (t.errCode) {
              case 60113:
                s.askLeaveRoom(a, i, r, function(t) {
                    s.joinRoom(null, i, r);
                }, function(t) {
                    s.getRoomList();
                });
                break;

              case 60110:
              case 60190:
                e.ShowConfirm("提示", t.errMsg, function() {
                    n.mainData.role.challengeID = 0, s.getRoomList();
                });
                break;

              case o.ExitCode.SessionExpire:
                n.exitGame(t.errCode, t.errMsg);
            } else 0 == l.code ? wx.navigateTo({
                url: "/page/challenge/challenge_room/challenge_room"
            }) : (e.ShowToast("进入房间异常，请稍后重试。"), s.getRoomList());
        });
    },
    askLeaveRoom: function(t, o, i, r, s) {
        wx.showModal({
            title: "提示",
            content: "你已经在一场群比赛中，是否放弃此对战并加入新的对战？",
            showCancel: !0,
            confirmText: "加入",
            complete: function(t) {
                t.confirm ? a.challengeLeave(n.mainData.role.challengeID, function(t, o) {
                    t ? e.ShowConfirm("提示", "操作失败，请稍后重试", function() {
                        s && s();
                    }) : r && r();
                }) : t.cancel && s && s();
            }
        });
    },
    getRoomList: function() {
        var o = this;
        t.request_getRoomListAsy(this.data.start, this.data.len, function(a, n) {
            if (a) e.ShowConfirm("提示", a.errMsg, function() {
                wx.navigateBack({
                    delta: 1
                });
            }); else {
                t.roomList.max && (o.data.max = t.roomList.max), t.roomList.list && t.roomList.list.length;
                var i = {};
                i.loading = !1, i.roomList = t.roomList.list, o.setData(i);
            }
        });
    },
    removeRoomById: function(e) {
        if (t.roomList.list && t.roomList.list.length > 0) for (var o = 0; o < t.roomList.list.length; o++) if (t.roomList.list[o].id == e) {
            t.roomList.list.splice(o, 1);
            break;
        }
    },
    onRoomlistItem_TapRank: function(o) {
        var a = this;
        if (!this.btnLock) {
            this.btnLock = !0;
            var n = o.currentTarget.dataset.id;
            t.request_challengeRank(n, !1, function(t, o) {
                t ? (e.ShowConfirm("提示", t.errMsg, function() {}), a.btnLock = !1) : wx.navigateTo({
                    url: "/page/challenge/challenge_rank/challenge_rank",
                    complete: function() {
                        setTimeout(function() {
                            a.btnLock = !1;
                        }, 500);
                    }
                });
            });
        }
    },
    onTapRoomItem: function(t) {
        var e = this;
        if (!this.btnLock) {
            this.btnLock = !0;
            var o = t.currentTarget.dataset.id;
            this.joinRoom(o), setTimeout(function() {
                e.btnLock = !1;
            }, 500);
        }
    },
    onRreviousPageRoomList: function(t) {
        this.data.start > 1 && (this.data.start -= this.data.len, this.onPageBtnState(), 
        this.getRoomList());
    },
    onNextPageRoomList: function(t) {
        this.data.max > this.data.start - 1 + this.data.len && (this.data.start += this.data.len, 
        this.onPageBtnState(), this.getRoomList());
    },
    onPageBtnState: function() {},
    onHide: function() {},
    onUnload: function() {
        this.btnLock = !1;
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var o = n.mainData.role.shareCode;
        if (t && t.target && "createRoom" == t.target.id) {
            var a = n.shareManager.getChallengeShareData(o);
            return n.shareConf(a, !0, function() {
                e.ShowConfirm("", "由于微信新的分享政策的影响，群对战创建失败", function() {});
            });
        }
        var i = n.shareManager.getChallengeShareData(n.mainData.role.shareCode);
        return n.shareConf(i, !0);
    }
});