var t = require("./../../net/wsconnect.js"), e = require("./../../net/connectNotify.js"), n = require("./../../const/notifyConsts.js"), o = require("./../../util/RoomDataManager.js"), a = require("./../../util/util.js"), r = (require("./../../const/consts.js"), 
require("./../../util/EmojiSelectController.js")), s = require("./../../util/EmojiController.js"), c = (require("./../../util/LoginManager.js"), 
require("./../../util/Tween.js")), l = {
    emojiSelectController: null,
    data: {
        timeStr: "00:00",
        rightButtonStatus: 0,
        showRewardPicker: !1,
        propInfo: {
            name: "点击选择奖品",
            num: 0,
            img: null,
            callback_clicked: "btn_reward_clicked"
        },
        rewards: [ {
            pid: 1,
            name: "王者币",
            num: 20,
            img: null
        }, {
            pid: 2,
            name: "王者币",
            num: 20,
            img: null
        }, {
            pid: 3,
            name: "王者币",
            num: 20,
            img: null
        }, {
            pid: 4,
            name: "王者币",
            num: 20,
            img: null
        }, {
            pid: 5,
            name: "王者币",
            num: 20,
            img: null
        }, {
            pid: 6,
            name: "王者币",
            num: 20,
            img: null
        }, {
            pid: 7,
            name: "王者币",
            num: 20,
            img: null
        }, {
            pid: 8,
            name: "王者币",
            num: 20,
            img: null
        }, {
            pid: 9,
            name: "王者币",
            num: 20,
            img: null
        } ],
        roomInfo: {},
        viewType: 1,
        btnType: 1,
        btnLabel: "",
        message: "",
        userInfo: {},
        rivalUser: {},
        wsconnectBreaking: !1,
        aniFlower: null,
        aniAvartar: null,
        aniBtn1: null,
        aniBtn2: null,
        aniBtn3: null,
        knowledgeSwitch: !0,
        difficulty: 2,
        diffMenuOpen: !1,
        labelDiffMenuItem: "",
        diffMenuTitles: [ "简单", "普通", "困难" ],
        isZjw: !1
    },
    getLabelDiffMenuItem: function(t) {
        return t < 1 && i > 3 ? "..." : this.data.diffMenuTitles[t - 1];
    },
    btn_rewardPicker_clicked: function(t) {
        this.setData({
            showRewardPicker: !this.data.showRewardPicker
        }), console.log("showRewardPicker = " + this.data.showRewardPicker);
    },
    btn_reward_clicked: function(t) {
        this.data.roomInfo.userInfo.nickName && this.data.roomInfo.userInfo.uid == h.mainData.role.uid && this.setData({
            showRewardPicker: !this.data.showRewardPicker
        });
    },
    reward_list_item_clicked: function(t) {
        var e = t.currentTarget.dataset.rewardId, i = !0, n = !1, o = void 0;
        try {
            for (var a, r = this.data.rewards[Symbol.iterator](); !(i = (a = r.next()).done); i = !0) {
                var s = a.value;
                if (s.pid == e) {
                    this.setData({
                        propInfo: s
                    });
                    break;
                }
            }
        } catch (t) {
            n = !0, o = t;
        } finally {
            try {
                !i && r.return && r.return();
            } finally {
                if (n) throw o;
            }
        }
        this.setData({
            showRewardPicker: !this.data.showRewardPicker
        }), console.log("showRewardPicker = " + this.data.showRewardPicker);
    },
    btn_leaveRoom_clicked: function(t) {
        wx.showModal({
            title: "提示",
            content: "是否放弃对战并离开房间？",
            showCancel: !0,
            confirmText: "确定",
            success: function(t) {
                t.confirm && o.leaveRoom(function() {
                    wx.navigateBack();
                });
            }
        });
    },
    btn_player_become_third: function(t) {
        var e = this;
        console.log("btn_player_become_third", this.btnLock), this.btnLock || (this.btnLock = !0, 
        o.inviteChange(function() {
            e.btnLock = !1, e.emojiSelectController.refreshEmotioVisible();
        }));
    },
    btn_third_become_master: function(t) {},
    btn_third_become_rival: function(t) {
        var e = this;
        console.log("btn_third_become_rival", this.btnLock), this.btnLock || (this.btnLock = !0, 
        o.obChange(function() {
            e.btnLock = !1, e.emojiSelectController.refreshEmotioVisible();
        }));
    },
    btn_start_clicked: function(t) {
        var e = this;
        if (console.log("btn_start_clicked", this.btnLock), !this.btnLock) switch (this.data.btnType) {
          case 1:
            1 != this.data.roomInfo.status ? a.ShowToast("等待选手上场") : 1 == this.data.roomInfo.status ? (this.btnLock = !0, 
            o.beginFight(function(t) {
                t && a.ShowConfirm(t.errCode, t.errMsg, function() {}), e.btnLock = !1;
            })) : a.ShowToast("对手正在准备中");
            break;

          case 2:
            break;

          case -1:
            console.log("开新房间"), this.btnLock = !0;
            var i = o.getData().isZjw;
            o.leaveRoom(function() {
                e.btnLock = !1, o.initRoom(-1, function(t) {
                    t ? a.ShowConfirm(t.errCode, t.errMsg, function() {
                        wx.navigateBack();
                    }) : (o.flagZjw(i), e.refreshRoomSetting(), e.emojiSelectController.refreshEmotioVisible());
                });
            });
        }
    },
    btn_knowledge_switch_clicked: function() {
        var t = o.getData();
        t.knowledgeSwitch = 0 == t.knowledgeSwitch ? 1 : 0;
        var e = {};
        e.knowledgeSwitch = !t.knowledgeSwitch, this.setData(e), o.roomSetting();
    },
    btn_diff_menu_clicked: function() {
        var t = {};
        t.diffMenuOpen = !this.data.diffMenuOpen, this.setData(t);
    },
    item_diff_clicked: function(t) {
        var e = t.currentTarget.dataset.index;
        if (o.getData().difficulty = e, e != this.data.difficulty) {
            var i = {};
            i.difficulty = e, i.diffMenuOpen = !1, i.labelDiffMenuItem = this.getLabelDiffMenuItem(e), 
            this.setData(i), o.roomSetting();
        }
    },
    getViewTypeBase: function(t, e, i) {
        return t && t.nickName && t.uid == i ? 1 : e && e.nickName && e.uid == i ? 2 : 3;
    },
    getViewType: function(t, e) {
        return this.getViewTypeBase(t, e, h.mainData.role.uid);
    },
    onLoad: function(t) {
        o.inLiving = !0, a.showShareMenu(), this.userEmojiController = new s(this, "userEmoji", !0, !0), 
        this.rivalEmojiController = new s(this, "rivalEmoji", !1, !1), this.emojiSelectController = new r(this, this.userEmojiController), 
        this.emojiSelectController.setVisible(!1), this.register(), a.setNavigationBarTitle(o.getData().isZjw ? "竞答对战" : "好友对战");
    },
    register: function() {
        e.register(n.ActionFightInviteInto, this.onActionFightInviteInto, this), e.register(n.ActionFightInviteBegin, this.onActionFightInviteBegin, this), 
        e.register(n.ActionFightInviteChange, this.onActionFightInviteChange, this), e.register(n.ActionPlayerLogout, this.onPlayerLogout, this), 
        e.register(n.ActionFightSendEmot, this.onActionFightSendEmot, this), e.register(n.socketClose, this.onSocketClose, this), 
        e.register(n.socketOpen, this.onSocketOpen, this), e.register(n.ActionLiveRoomSetting, this.onActionLiveRoomSetting, this), 
        h.eventDispatcher.addEventListener("onRoomDataChanged", this.onRoomDataChanged, this), 
        h.eventDispatcher.addEventListener("onLiveFightBegin", this.onLiveFightBegin, this);
    },
    onUnload: function() {
        o.inLiving = !1, o.getData().isZjw && o.leaveRoom(function() {
            e.receive("specialLiveLeaveRoom", null);
        }), this.stopTimer(), c.removeTweens("live"), e.remove(n.ActionFightInviteInto, this.onActionFightInviteInto), 
        e.remove(n.ActionFightInviteBegin, this.onActionFightInviteBegin), e.remove(n.ActionFightInviteChange, this.onActionFightInviteChange), 
        e.remove(n.ActionPlayerLogout, this.onPlayerLogout), e.remove(n.socketClose, this.onSocketClose), 
        e.remove(n.socketOpen, this.onSocketOpen), e.remove(n.ActionFightSendEmot, this.onActionFightSendEmot), 
        e.remove(n.ActionLiveRoomSetting, this.onActionLiveRoomSetting, this), h.eventDispatcher.removeEventListener("onRoomDataChanged", this.onRoomDataChanged, this), 
        h.eventDispatcher.removeEventListener("onLiveFightBegin", this.onLiveFightBegin, this), 
        h.eventDispatcher.removeEventListener("onRoomMasterLogout", this.onRoomMasterLogout, this);
    },
    onActionLiveRoomSetting: function(t, e) {
        var i = o.getData();
        i.roomId == e.roomId && (i.difficulty = e.difficulty, i.knowledgeSwitch = e.knowledgeSwitch, 
        this.refreshRoomSetting());
    },
    refreshRoomSetting: function() {
        var t = o.getData(), e = {};
        e.knowledgeSwitch = !t.knowledgeSwitch, e.difficulty = t.difficulty, e.diffMenuOpen = !1, 
        e.labelDiffMenuItem = this.getLabelDiffMenuItem(t.difficulty), e.isZjw = t.isZjw, 
        this.setData(e);
    },
    onSocketClose: function(t, e) {
        console.log("推送 长连接中断瞬间"), this.setData({
            wsconnectBreaking: !0
        });
    },
    onSocketOpen: function(t, e) {
        console.log("推送 长连接开启瞬间"), this.setData({
            wsconnectBreaking: !1
        });
    },
    onActionFightSendEmot: function(t, e) {
        if (e) {
            var i = this.data.viewType;
            1 == i ? this.data.userInfo.uid == e.uid ? this.userEmojiController.showFace(e.emotID) : this.data.rivalUser.uid == e.uid && this.rivalEmojiController.showFace(e.emotID) : 2 == i ? this.data.userInfo.uid == e.uid ? this.rivalEmojiController.showFace(e.emotID) : this.data.rivalUser.uid == e.uid && this.userEmojiController.showFace(e.emotID) : this.data.userInfo.uid == e.uid ? this.userEmojiController.showFace(e.emotID) : this.data.rivalUser.uid == e.uid && this.rivalEmojiController.showFace(e.emotID);
        }
    },
    showErr: function(t) {
        wx.showModal({
            title: t.errCode,
            content: t.errMsg,
            showCancel: !1,
            confirmText: "确定",
            success: function() {
                o.leaveRoom(), wx.navigateBack();
            }
        });
    },
    refreshRoom: function() {
        var e = o.getData();
        this.emojiSelectController.setRoomId(e.roomId);
        var i = this.getViewType(e.userInfo, e.rivalUser), n = 0;
        2 == i ? n = 1 : 3 != i || e.rivalUser.nickName || (n = 2), console.log("进入房间时我的身份:" + i);
        var a = this.getBtnType(e, i), r = this.getBtnLabel(a), s = {};
        s.nickName = e.userInfo.nickName || "", s.avatarUrl = e.userInfo.avatarUrl, s.uid = e.userInfo.uid, 
        s.headId = e.userInfo.headId;
        var c = {};
        c.nickName = e.rivalUser.nickName || "", c.avatarUrl = e.rivalUser.avatarUrl, c.uid = e.rivalUser.uid, 
        c.headId = e.rivalUser.headId;
        var l = wx.createAnimation();
        this.setData({
            type: "live",
            roomInfo: e,
            userInfo: s,
            rivalUser: c,
            viewType: i,
            message: this.getLabel(e),
            btnType: a,
            btnLabel: r,
            rightButtonStatus: n,
            wsconnectBreaking: !t.socketOpen,
            aniRightUser: l.export()
        });
    },
    getBtnType: function(t, e) {
        if (-1 == t.status) return -1;
        switch (e) {
          case 1:
            return 1 == t.status ? 1 : 0;

          case 2:
            return 2;

          case 3:
            return -1;
        }
        return -1;
    },
    getBtnLabel: function(t) {
        switch (t) {
          case -1:
            return "新开一场";

          case 0:
            return "";

          case 1:
            return "开始对战";

          case 2:
            return "选择围观";
        }
    },
    getLabel: function(t) {
        switch (t.status) {
          case 0:
            return "等待对手加入...";

          case 1:
            return 2 == o.getData().viewType ? "等待发起者开始" : "";

          case 2:
            return "等待对手再来一局...";

          case 3:
            return "";

          case -1:
            return "该房间已过期";
        }
    },
    onPlayerLogout: function(t, e) {
        var i = o.getData();
        if (!(i.roomId <= 0)) switch (this.getViewTypeBase(i.userInfo, i.rivalUser, e)) {
          case 1:
            return;

          case 2:
            a.ShowToast("挑战者离开了");
        }
    },
    onRoomMasterLogout: function(t) {
        this.stopTimer(), a.ShowConfirm("", t.data + "放弃了对战。", function() {
            h.gotoCover();
        });
    },
    onActionFightInviteChange: function(t, e) {
        h.mainData.role.uid != e.userInfo.uid && (1 == e.dir ? a.ShowToast("挑战者" + e.userInfo.nickName + "突然认怂了") : 2 == e.dir && a.ShowToast("围观者" + e.userInfo.nickName + "上场参赛了"));
    },
    onActionFightInviteBegin: function(t, e) {},
    onActionFightInviteInto: function(t, e) {
        switch (e.viewType) {
          case 1:
            a.ShowToast("发起者 " + e.userInfo.nickName + " 进来了"), console.log("发起者 " + e.userInfo.nickName + " 进来了");
            break;

          case 2:
            a.ShowToast("挑战者 " + e.userInfo.nickName + " 进来了"), console.log("挑战者 " + e.userInfo.nickName + " 进来了");
            break;

          case 3:
            a.ShowToast("围观者 " + e.userInfo.nickName + " 进来了"), console.log("围观者 " + e.userInfo.nickName + " 进来了");
        }
    },
    onRoomDataChanged: function() {
        console.log("[live onRoomDataChanged]:", o.isActivate()), this.refreshRoom(), this.refreshTimeStr(), 
        this.startTimer(), this.playEnterAni();
    },
    onReady: function() {},
    onShow: function() {
        o.inLiving = !0, this.refreshRoomSetting(), this.refreshRoom(), this.startTimer(), 
        this.playEnterAni(), h.eventDispatcher.addEventListener("onRoomMasterLogout", this.onRoomMasterLogout, this);
    },
    onHide: function() {
        o.inLiving = !1, h.eventDispatcher.removeEventListener("onRoomMasterLogout", this.onRoomMasterLogout, this), 
        this.stopTimer();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var e = o.getViewType(), i = o.getData(), n = 1 == e ? h.mainData.role.shareCode : i.creatorCode, a = null;
        return a = i.isZjw ? h.shareManager.getSpecialLiveShareData({
            shareCode: n,
            isWinnerInLive: 1 == this.data.viewType
        }) : h.shareManager.getPvPShareData({
            shareCode: n,
            isWinnerInLive: 1 == this.data.viewType
        }), h.shareConf(a, !0);
    },
    onTapAvatarEmoji: function() {
        this.emojiSelectController.setVisible(!0);
    },
    onTapWifiBtn: function() {
        var t = this;
        this.wifiBtnLock || (this.wifiBtnLock = !0, setTimeout(function() {
            t.wifiBtnLock = !1;
        }, 5e3));
    },
    onLiveFightBegin: function() {
        var t = 3 == o.getViewType() ? "ob" : "live";
        wx.navigateTo({
            url: "/page/fight/fight?fightType=" + t
        });
    },
    onRoomExpired: function() {
        a.ShowConfirm("", "本次对战已经过期。", function() {
            o.leaveRoom(function() {});
        });
    },
    startTimer: function() {
        var t = this;
        this.refreshTimeStr(), o.refreshStatue(!0), o.isActivate() ? (clearTimeout(this.timer), 
        this.timer = setTimeout(function() {
            t.startTimer();
        }, 1e3)) : (this.stopTimer(), this.preActivate && this.onRoomExpired()), this.preActivate = o.isActivate();
    },
    refreshTimeStr: function() {
        var t = o.getData(), e = a.getServerTime(), i = "00:00";
        t.expiredAt && t.expiredAt > e / 1e3 && (i = a.formatTime_mm_ss(t.expiredAt - e / 1e3)), 
        this.setData({
            timeStr: i
        });
    },
    stopTimer: function() {
        clearTimeout(this.timer);
    },
    playEnterAni: function() {
        var t = this;
        if (!this.enterAniIsPlay) {
            this.enterAniIsPlay = !0;
            var e = c.fastGet("live");
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
            }), e.wait(500), e.call(function() {
                var e = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-in"
                });
                e.bottom("-140rpx").opacity(1).step(), t.setData({
                    aniMainFlag: e.export()
                });
            }), e.wait(250), e.call(function() {
                var e = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                e.scale(1).opacity(1).step(), t.setData({
                    aniBtn1: e.export()
                });
            }), e.wait(250), e.call(function() {
                var e = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                e.scale(1).opacity(1).step(), t.setData({
                    aniBtn2: e.export()
                });
            }), e.wait(250), e.call(function() {
                var e = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                e.scale(1).opacity(1).step(), t.setData({
                    aniBtn3: e.export()
                });
            }), e.wait(250), e.call(function() {
                var e = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                e.scale(1).opacity(1).step(), t.setData({
                    aniAudience: e.export()
                });
            }), e.wait(250), e.call(function() {
                var e = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                e.opacity(1).step(), t.setData({
                    aniMsg: e.export()
                });
            }), e.wait(250), e.call(function() {
                var e = wx.createAnimation({
                    duration: 200,
                    timingFunction: "ease-out"
                });
                e.opacity(1).step(), t.setData({
                    timeAni: e.export()
                });
            }), e.call(function() {
                var e = o.getData();
                switch (t.getViewType(e.userInfo, e.rivalUser)) {
                  case 1:
                  case 2:
                    t.emojiSelectController.setVisible(!0);
                    break;

                  case 3:
                    t.emojiSelectController.setVisible(!1);
                }
            });
        }
    }
}, h = getApp();

Page(l);