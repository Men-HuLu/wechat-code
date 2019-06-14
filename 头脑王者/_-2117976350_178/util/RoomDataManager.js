function i(i, t) {
    if (!(i instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function i(i, t) {
        for (var e = 0; e < t.length; e++) {
            var o = t[e];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(i, o.key, o);
        }
    }
    return function(t, e, o) {
        return e && i(t.prototype, e), o && i(t, o), t;
    };
}(), e = require("./../net/connectNotify.js"), o = require("./../const/notifyConsts.js"), a = require("./../net/fightNet.js"), n = require("./../util/util.js"), s = (require("./../data/SpecialData"), 
void 0), r = function() {
    function r() {
        i(this, r), this.inLiving = !1, this.clearRoomData();
    }
    return t(r, [ {
        key: "init",
        value: function(i) {
            s = i, this.register();
        }
    }, {
        key: "clearRoomData",
        value: function() {
            this.roomData = {
                roomId: 0,
                userInfo: {},
                rivalUser: {},
                viewNum: 0,
                fee: 0,
                isFighting: !1,
                viewType: 0,
                creatorCode: "",
                knowledgeSwitch: 0,
                difficulty: 2,
                isZjw: !1
            };
        }
    }, {
        key: "getData",
        value: function() {
            return this.roomData;
        }
    }, {
        key: "isActivate",
        value: function() {
            return this.roomData.roomId > 0 && this.roomData.expiredAt > n.getServerTime() / 1e3;
        }
    }, {
        key: "refreshType",
        value: function(i) {
            this.roomData.viewType = this.getViewType(), this.roomData.type = 3 == this.roomData.viewType ? "ob" : "live";
        }
    }, {
        key: "setRivalUser",
        value: function(i) {
            var t = this.roomData;
            t.rivalUser = n.assign({}, i), t.rivalUser.uid == s.uid && "无名氏" == t.rivalUser.nickName && (t.rivalUser.nickName = "我");
        }
    }, {
        key: "setUserInfo",
        value: function(i) {
            var t = this.roomData;
            t.userInfo = n.assign({}, i), t.userInfo.uid == s.uid && "无名氏" == t.userInfo.nickName && (t.userInfo.nickName = "我");
        }
    }, {
        key: "refreshStatue",
        value: function(i) {
            var t = this.roomData, e = t.status;
            0 == t.roomId || t.expiredAt && t.expiredAt < n.getServerTime() / 1e3 ? t.status = -1 : t.userInfo.uid && t.rivalUser.uid ? t.isFighting ? t.status = 2 : t.status = 1 : t.status = 0, 
            e != t.status && i && s.eventDispatcher.dispatchEventWith("onRoomDataChanged");
        }
    }, {
        key: "invite",
        value: function(i) {
            var t = this.roomData;
            switch (i.viewType) {
              case 1:
                this.setUserInfo(i.userInfo), this.clearFightFlag();
                break;

              case 2:
                this.setRivalUser(i.userInfo), this.clearFightFlag();
                break;

              case 3:
                t.viewNum += 1;
            }
            this.refreshStatue(), s.eventDispatcher.dispatchEventWith("onRoomDataChanged");
        }
    }, {
        key: "inviteChange",
        value: function(i) {
            var t = this;
            this.isActivate() && 2 == this.roomData.viewType ? a.changeRole(this.roomData.roomId, function(e, o) {
                e || (t.roomData.viewNum += 1, t.setRivalUser({}), t.clearFightFlag(), t.refreshType(), 
                t.refreshStatue(), s.eventDispatcher.dispatchEventWith("onRoomDataChanged")), n.invokeCallback(i, e);
            }) : n.invokeCallback(i);
        }
    }, {
        key: "obChange",
        value: function(i) {
            var t = this;
            console.log("obChange viewType", this.roomData.viewType), this.isActivate() && 3 == this.roomData.viewType ? a.changeRole(this.roomData.roomId, function(e, o) {
                e || (t.roomData.viewNum -= 1, t.setRivalUser({
                    nickName: s.mainData.role.userInfo.nickName,
                    avatarUrl: n.getWechatUrlBySize(s.mainData.role.userInfo.avatarUrl),
                    uid: s.mainData.role.uid,
                    level: s.mainData.role.level
                }), t.clearFightFlag(), t.refreshType(), t.refreshStatue(), s.eventDispatcher.dispatchEventWith("onRoomDataChanged")), 
                n.invokeCallback(i, e);
            }) : n.invokeCallback(i);
        }
    }, {
        key: "againFight",
        value: function(i) {
            var t = this;
            this.isActivate() && i == this.roomData.rivalUser.uid && a.againFight(this.roomData.roomId, function() {
                t.clearFightFlag(), t.refreshStatue(), s.eventDispatcher.dispatchEventWith("onRoomDataChanged");
            });
        }
    }, {
        key: "beginFight",
        value: function(i) {
            var t = this;
            if (this.isActivate() && 1 == this.roomData.viewType) {
                var e = this.roomData.difficulty, o = this.roomData.knowledgeSwitch;
                a.beginFight(this.roomData.roomId, this.roomData.isZjw ? 1 : 0, e, o, function(e, o) {
                    e || (t.roomData.isFighting = !0, t.roomData.expiredAt = n.getServerTime() / 1e3 + 600, 
                    t.refreshStatue(), s.eventDispatcher.dispatchEventWith("onRoomDataChanged"), s.eventDispatcher.dispatchEventWith("onLiveFightBegin")), 
                    n.invokeCallback(i, e);
                });
            }
        }
    }, {
        key: "clearFightFlag",
        value: function() {
            this.roomData.isFighting = !1;
        }
    }, {
        key: "getViewTypeBase",
        value: function(i) {
            var t = this.roomData;
            return t.userInfo && t.userInfo.uid == i ? 1 : t.rivalUser && t.rivalUser.uid == i ? 2 : 3;
        }
    }, {
        key: "getViewType",
        value: function() {
            return this.getViewTypeBase(s.uid);
        }
    }, {
        key: "setRoomData",
        value: function(i) {
            if (!i) return this.clearRoomData(), void s.eventDispatcher.dispatchEventWith("onRoomDataChanged");
            n.assign(this.roomData, i), this.roomData.isFighting = 2 == i.status, this.setUserInfo(i.userInfo), 
            this.setRivalUser(i.rivalUser), this.refreshType(), s.eventDispatcher.dispatchEventWith("onRoomDataChanged");
        }
    }, {
        key: "roomSetting",
        value: function(i) {
            var t = this.getData();
            a.roomSetting(t.roomId, t.difficulty, t.knowledgeSwitch, function(i, t) {
                i && n.ShowToast(i.errMsg);
            });
        }
    }, {
        key: "initRoom",
        value: function(i, t) {
            var e = this;
            a.intoRoom(i, function(i, o) {
                i ? 70024 == i.errCode ? (s.exitGame(i.errCode, i.errMsg), n.invokeCallback(t)) : n.invokeCallback(t, i) : (e.setRoomData(o), 
                n.invokeCallback(t));
            });
        }
    }, {
        key: "removeRegister",
        value: function() {
            e.remove(o.ActionFightInviteInto, this.onActionFightInviteInto, this), e.remove(o.ActionFightInviteBegin, this.onActionFightInviteBegin, this), 
            e.remove(o.ActionFightInviteChange, this.onActionFightInviteChange, this), e.remove(o.ActionFightInviteAgain, this.onFightInviteAgain, this), 
            e.remove(o.ActionPlayerLogout, this.onPlayerLogout, this), e.remove(o.ActionFightOut, this.onFightOut, this), 
            e.remove(o.ActionFightFriendRoomExpried, this.onActionFightFriendRoomExpried, this);
        }
    }, {
        key: "register",
        value: function() {
            e.register(o.ActionFightInviteInto, this.onActionFightInviteInto, this), e.register(o.ActionFightInviteBegin, this.onActionFightInviteBegin, this), 
            e.register(o.ActionFightInviteChange, this.onActionFightInviteChange, this), e.register(o.ActionFightInviteAgain, this.onFightInviteAgain, this), 
            e.register(o.ActionPlayerLogout, this.onPlayerLogout, this), e.register(o.ActionFightOut, this.onFightOut, this), 
            e.register(o.ActionFightFriendRoomExpried, this.onActionFightFriendRoomExpried, this);
        }
    }, {
        key: "leaveRoom",
        value: function(i) {
            var t = this;
            if (!this.roomData.roomId) return this.clearRoomData(), void n.invokeCallback(i);
            a.leaveRoom(this.roomData.roomId, function(e, o) {
                t.clearRoomData(), n.invokeCallback(i);
            });
        }
    }, {
        key: "onActionFightInviteInto",
        value: function(i, t) {
            var e = this;
            this.isActivate() && (this.invite(t), 2 != t.viewType || this.inLiving || 1 == this.getViewType() && wx.showModal({
                title: "报告",
                content: "挑战者" + t.userInfo.nickName + "已经应邀加入了对战",
                showCancel: !1,
                confirmText: "回到房间",
                complete: function(i) {
                    i.confirm && e.gotoLive(!1);
                }
            }));
        }
    }, {
        key: "onActionFightInviteBegin",
        value: function(i, t) {
            this.roomData.expiredAt = t, this.refreshStatue(), s.eventDispatcher.dispatchEventWith("onRoomDataChanged"), 
            this.isActivate() && this.gotoLive(!0);
        }
    }, {
        key: "onActionFightInviteChange",
        value: function(i, t) {
            if (this.isActivate() && s.uid != t.userInfo.uid) {
                var e = t.dir;
                if (t) switch (e) {
                  case 1:
                    this.roomData.viewNum += 1, this.setRivalUser({}), this.clearFightFlag(), this.refreshType(), 
                    this.refreshStatue(), s.eventDispatcher.dispatchEventWith("onRoomDataChanged");
                    break;

                  case 2:
                    this.roomData.viewNum -= 1, this.setRivalUser(t.userInfo), this.clearFightFlag(), 
                    this.refreshType(), this.refreshStatue(), s.eventDispatcher.dispatchEventWith("onRoomDataChanged");
                }
            }
        }
    }, {
        key: "onPlayerLogout",
        value: function(i, t) {
            if (this.isActivate()) {
                var e = t;
                this.roomData.userInfo.uid == e ? (this.clearFightFlag(), this.leaveRoom(), s.eventDispatcher.dispatchEventWith("onRoomMasterLogout", this.roomData.userInfo.nickName)) : this.roomData.rivalUser.uid == e ? (this.setRivalUser({}), 
                this.clearFightFlag(), s.eventDispatcher.dispatchEventWith("onRoomDataChanged")) : (this.roomData.viewNum -= 1, 
                this.roomData.viewNum = Math.max(0, this.roomData.viewNum), s.eventDispatcher.dispatchEventWith("onRoomDataChanged")), 
                this.refreshStatue();
            }
        }
    }, {
        key: "onFightInviteAgain",
        value: function(i, t) {
            this.isActivate() && (this.clearFightFlag(), this.refreshStatue(!0));
        }
    }, {
        key: "onFightOut",
        value: function(i, t) {
            this.isActivate() && (this.clearFightFlag(), this.refreshStatue(!0));
        }
    }, {
        key: "onActionFightFriendRoomExpried",
        value: function(i, t) {
            this.roomData.expiredAt = t, this.refreshStatue(!0);
        }
    }, {
        key: "gotoLive",
        value: function(i) {
            var t = this;
            if (!s.isExitGame && this.isActivate()) {
                if (this.needFightNow = i, this.inLiving && i) return this.roomData.isFighting = !0, 
                void s.eventDispatcher.dispatchEventWith("onLiveFightBegin");
                s.gotoCover(function() {
                    t.coverToLive(function(e) {
                        !e && i && (t.roomData.isFighting = !0, s.eventDispatcher.dispatchEventWith("onLiveFightBegin"));
                    });
                }, function() {});
            }
        }
    }, {
        key: "checkExpired",
        value: function(i, t) {
            a.IsExpiredRoom(i, function(i, e) {
                i ? n.invokeCallback(t, i) : n.invokeCallback(t, null, e.isExpired);
            });
        }
    }, {
        key: "coverToLive",
        value: function(i) {
            var t = this;
            this.isActivate() ? this.checkExpired(this.roomData.roomId, function(e, o) {
                if (e || o) return t.clearRoomData(), void n.invokeCallback(i, e);
                setTimeout(function() {
                    wx.navigateTo({
                        url: "/page/live/live",
                        success: function() {
                            n.invokeCallback(i);
                        },
                        fail: function(i) {
                            console.log(i);
                        }
                    }, 300);
                });
            }) : this.initRoom(-1, function(e) {
                e ? t.clearRoomData() : wx.navigateTo({
                    url: "/page/live/live",
                    success: function() {
                        setTimeout(function() {
                            n.invokeCallback(i);
                        }, 300);
                    }
                });
            });
        }
    }, {
        key: "spacialToLive",
        value: function(i) {
            var t = this, e = function() {
                t.initRoom(-1, function(e) {
                    e ? n.invokeCallback(i, e) : (t.flagZjw(!0), wx.navigateTo({
                        url: "/page/live/live",
                        success: function() {
                            setTimeout(function() {
                                n.invokeCallback(i);
                            }, 300);
                        }
                    }));
                });
            };
            this.isActivate() ? this.roomData.isZjw ? this.checkExpired(this.roomData.roomId, function(e, o) {
                if (e || o) return t.clearRoomData(), void n.invokeCallback(i, e);
                setTimeout(function() {
                    wx.navigateTo({
                        url: "/page/live/live",
                        success: function() {
                            n.invokeCallback(i);
                        },
                        fail: function(i) {
                            console.log(i);
                        }
                    }, 300);
                });
            }) : this.leaveRoom(function() {
                e();
            }) : e();
        }
    }, {
        key: "shareToLive",
        value: function(i) {
            this.initRoom(-1, function(t) {
                t ? n.invokeCallback(i, t) : setTimeout(function() {
                    wx.navigateTo({
                        url: "/page/live/live",
                        success: function() {
                            n.invokeCallback(i);
                        }
                    });
                }, 300);
            });
        }
    }, {
        key: "shareToSpecialLive",
        value: function(i) {
            var t = this;
            this.initRoom(-1, function(e) {
                e ? n.invokeCallback(i, e) : (t.flagZjw(!0), setTimeout(function() {
                    wx.navigateTo({
                        url: "/page/live/live",
                        success: function() {
                            n.invokeCallback(i);
                        }
                    });
                }, 300));
            });
        }
    }, {
        key: "urlToLive",
        value: function(i, t) {
            this.initRoom(i, function(i) {
                i ? n.invokeCallback(t, i) : setTimeout(function() {
                    wx.navigateTo({
                        url: "/page/live/live",
                        success: function() {
                            n.invokeCallback(t);
                        }
                    });
                }, 300);
            });
        }
    }, {
        key: "urlToSpecialLive",
        value: function(i, t) {
            var e = this;
            this.initRoom(i, function(i) {
                i ? n.invokeCallback(t, i) : (e.flagZjw(!0), setTimeout(function() {
                    wx.navigateTo({
                        url: "/page/live/live",
                        success: function() {
                            n.invokeCallback(t);
                        }
                    });
                }, 300));
            });
        }
    }, {
        key: "onLogin",
        value: function(i) {
            var t = this;
            if (this.clearRoomData(), s.mainData.role.dropRoomID) {
                var e = s.mainData.role.dropRoomID;
                s.mainData.role.dropRoomID = 0, this.checkExpired(e, function(o, a) {
                    o || a || t.initRoom(e, function() {}), n.invokeCallback(i);
                });
            } else n.invokeCallback(i);
        }
    }, {
        key: "flagZjw",
        value: function(i) {
            this.roomData.isZjw = i;
        }
    } ]), r;
}();

module.exports = new r();