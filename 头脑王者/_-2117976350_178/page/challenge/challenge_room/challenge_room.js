var t = require("./../../../util/ChallengeRoomDataManager.js"), e = require("./../../../util/util.js"), a = require("../template/liveConsts.js"), i = require("state/ChallengeStatusReady.js"), n = getApp();

Page({
    data: {
        sharePromptViewVisible: !1,
        audienceView: {
            visible: !1
        }
    },
    onLoad: function(a) {
        e.showShareMenu(), this.intoWithOnLoad = !0, this.dontLeave = !1, e.setNavigationBarTitle(t.curRoom.name || "群比赛");
    },
    refreshState: function() {
        switch (t.curRoom.status) {
          case a.ChallengeStatus.ChallengeStatusNon:
          case a.ChallengeStatus.ChallengeStatusReady:
          case a.ChallengeStatus.ChallengeStatusChallenge:
            this.stateChange("ChallengeStatusReady");
            break;

          case a.ChallengeStatus.ChallengeStatusRun:
          case a.ChallengeStatus.ChallengeStatusEnd:
          case a.ChallengeStatus.ChallengeStatusExpired:
        }
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        this.intoWithOnLoad = !1, t.request_flushChallenge(t.curRoom.id, function(i, n) {
            if (i) e.ShowConfirm("提示", i.errMsg, function() {
                wx.navigateBack({
                    delta: 1
                });
            }); else {
                var s = {
                    roomData: t.curRoom
                };
                a.setData(s), a.refreshState();
            }
        }), this.checkCountDown();
    },
    checkCountDown: function() {
        var t = this;
        this.waitBattleTimeId && (clearTimeout(this.waitBattleTimeId), this.waitBattleTimeId = void 0, 
        this.setData({
            sharePromptViewVisible: !1
        })), this.waitBattleTimeId = setTimeout(function() {
            t.setData({
                sharePromptViewVisible: !0
            });
        }, 1e4);
    },
    stateChange: function(t) {
        this.curState && this.curState.clearData();
        var a = null;
        switch (t) {
          case "ChallengeStatusReady":
            a = new i(this);
            break;

          default:
            a = new StateNone(this);
        }
        this.curState && this.curState.end(a), this.curState = a, e.log("curState:" + t), 
        this.curState.init(), this.curState.update();
    },
    onHide: function() {
        this.curState && (this.curState.end(), this.curState = null);
    },
    onUnload: function() {
        this.curState && (this.curState.end(), this.curState = null), this.dontLeave ? e.log("~~~~~离开擂台房间但不提交退房间请求") : t.request_challengeLeave(t.curRoom.id, function(t, a) {
            t ? e.ShowConfirm("提示", "退出擂台操作失败，请稍后重试", function() {}) : n.mainData.role.challengeID = 0;
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    btn_close_clicked: function(t) {
        this.setData({
            sharePromptViewVisible: !1
        });
    },
    onShareAppMessage: function() {
        var t = this, e = n.shareManager.getChallengeShareData(n.mainData.role.shareCode);
        return n.shareConf(e, !0, function() {
            t.setData({
                sharePromptViewVisible: !1
            });
        });
    }
});