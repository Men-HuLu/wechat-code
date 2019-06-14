function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), n = (require("./../net/connectNotify.js"), require("./../const/notifyConsts.js"), 
require("./../net/fightNet.js")), i = require("./../net/challengeNet.js"), r = (require("./../util/util.js"), 
getApp()), o = function() {
    function o() {
        e(this, o);
    }
    return t(o, [ {
        key: "init",
        value: function(e) {
            r = e, this.setEmptyData(), this.register();
        }
    }, {
        key: "setEmptyData",
        value: function() {
            var e = {
                roomId: 0,
                userInfo: {},
                rivalUser: {},
                viewNum: 0,
                fee: 0
            };
            r.mainData.roomData = e;
        }
    }, {
        key: "getData",
        value: function() {
            return r.mainData.roomData || this.setEmptyData(), r.mainData.roomData;
        }
    }, {
        key: "setRoomId",
        value: function(e) {
            this.getData().roomId = e;
        }
    }, {
        key: "setType",
        value: function(e) {
            this.getData().type = e;
        }
    }, {
        key: "setData",
        value: function(e, t) {
            e = e || {};
            var n = null;
            if (t) r.mainData.roomData = e, n = r.mainData.roomData; else {
                n = this.getData();
                for (var i in e) n[i] = e[i];
            }
            return 2 == e.status && (n.rivalIsFight = !0, n.userIsFight = !0), n.rivalUser && n.rivalUser.uid == r.uid && "无名氏" == n.rivalUser.nickName ? n.rivalUser.nickName = "我" : n.userInfo && n.userInfo.uid == r.uid && "无名氏" == n.userInfo.nickName && (n.userInfo.nickName = "我"), 
            n;
        }
    }, {
        key: "getViewTypeBase",
        value: function(e) {
            var t = this.getData();
            return t.userInfo && t.userInfo.uid == e ? 1 : t.rivalUser && t.rivalUser.uid == e ? 2 : 3;
        }
    }, {
        key: "getViewType",
        value: function() {
            return this.getViewTypeBase(r.mainData.role.uid);
        }
    }, {
        key: "intoRoom",
        value: function(e) {
            e = e || {}, this.setData(e, !0);
            var t = this.getViewType();
            this.setType(3 == t ? "obChallenge" : "challenge");
        }
    }, {
        key: "removeRegister",
        value: function() {}
    }, {
        key: "register",
        value: function() {}
    }, {
        key: "leaveRoom",
        value: function() {
            this.setEmptyData();
        }
    }, {
        key: "leaveRoom",
        value: function() {
            this.curRoom = null;
        }
    }, {
        key: "setMemberList",
        value: function(e) {
            this.curRoom.members || (this.curRoom.members = []), this.curRoom.members = e;
        }
    }, {
        key: "addMember",
        value: function(e) {
            if (this.curRoom.members || (this.curRoom.members = []), e) {
                for (var t = !1, n = 0; n < this.curRoom.members.length; n++) if (this.curRoom.members[n].uid == e.uid) {
                    t = !0;
                    break;
                }
                t || this.curRoom.members.push(e);
            }
        }
    }, {
        key: "removeMember",
        value: function(e) {
            if (this.curRoom.members && this.curRoom.members.length > 0) for (var t = 0; t < this.curRoom.members.length; t++) if (this.curRoom.members[t].uid == e.uid) {
                this.curRoom.members.splice(t, 1);
                break;
            }
        }
    }, {
        key: "upDateMemberData",
        value: function(e) {
            for (var t = 0; t < this.curRoom.members.length; t++) this.curRoom.members[t].uid == e.uid && (this.curRoom.members[t] = e);
        }
    }, {
        key: "request_getRoomList",
        value: function(e, t, n) {
            var r = this;
            i.challengeList(e, t, function(e, t) {
                e ? n(e, void 0) : t && (r.roomList = t, n(void 0, t));
            });
        }
    }, {
        key: "request_getRoomListAsy",
        value: function(e, t, n) {
            var i = this;
            this.challengeLeaving ? this.timeInterval_getRoomListAsy || (this.timeInterval_getRoomListAsy = setInterval(function() {
                i.challengeLeaving || (clearInterval(i.timeInterval_getRoomListAsy), i.timeInterval_getRoomListAsy = void 0, 
                i.request_getRoomList(e, t, n));
            }, 200)) : this.request_getRoomList(e, t, n);
        }
    }, {
        key: "request_challengeJoin",
        value: function(e, t, n, o) {
            var a = this;
            i.challengeJoin(e, t, n, function(e, t) {
                e ? o(e, void 0) : t && (r.mainData.role.challengeID = 0, a.curRoom = t.challengeInfo, 
                o(void 0, t));
            });
        }
    }, {
        key: "request_challengeLeave",
        value: function(e, t) {
            var n = this;
            this.challengeLeaving = !0, i.challengeLeave(e, function(e, i) {
                n.challengeLeaving = !1, e ? t(e, void 0) : i && (r.mainData.role.challengeID = 0, 
                n.curRoom = null, t(void 0, i));
            });
        }
    }, {
        key: "request_challenge",
        value: function(e, t) {
            var n = this;
            i.challenge(e, function(e, i) {
                if (e) t(e, void 0); else if (i) {
                    var r = n.curRoom.members;
                    n.curRoom = i.challengeInfo, n.curRoom.members = r, t(void 0, i);
                }
            });
        }
    }, {
        key: "request_flushChallenge",
        value: function(e, t) {
            var n = this;
            i.flushChallenge(e, function(e, i) {
                e ? t(e, void 0) : i && (n.curRoom = i, t(void 0, i));
            });
        }
    }, {
        key: "request_challengeRank",
        value: function(e, t, n) {
            var r = this;
            this.curRoomIdFromRank = e, i.challengeRank(e, t, function(e, t) {
                e ? n(e, void 0) : t && (r.curRoomRankList = t, n(void 0, t));
            });
        }
    }, {
        key: "request_beginFight",
        value: function(e, t, i, r) {
            var o = this;
            n.beginFight(e, 0, t, i, function(e, t) {
                e ? r(e, void 0) : t && (o.setData(t, !0), r(void 0, t));
            });
        }
    }, {
        key: "iAmWinner",
        value: function() {
            return this.curRoom.curWinner == r.uid && r.uid > 0;
        }
    }, {
        key: "iAmChallenger",
        value: function() {
            return this.curRoom.curChallenger == r.uid && r.uid > 0;
        }
    }, {
        key: "iAmAudience",
        value: function() {
            return !this.iAmWinner() && !this.iAmChallenger();
        }
    }, {
        key: "getWinnerInfo",
        value: function() {
            return this.getMemberInfo(this.curRoom.curWinner);
        }
    }, {
        key: "getChallengerInfo",
        value: function() {
            return this.getMemberInfo(this.curRoom.curChallenger);
        }
    }, {
        key: "getMyInfo",
        value: function() {
            return this.getMemberInfo(r.uid);
        }
    }, {
        key: "getMemberInfo",
        value: function(e) {
            if (this.curRoom && this.curRoom.members) for (var t = 0; t < this.curRoom.members.length; t++) {
                var n = this.curRoom.members[t];
                if (n.uid == e) return n;
            }
            return {};
        }
    }, {
        key: "getChallengeResultWaitDur",
        value: function() {
            return r && r.mainData.role.allSeeds && r.mainData.role.allSeeds.challengeConf ? r.mainData.role.allSeeds.challengeConf.challengeResultWaitDur : 0;
        }
    }, {
        key: "getrChallengeWaitDur",
        value: function() {
            return r && r.mainData.role.allSeeds && r.mainData.role.allSeeds.challengeConf ? r.mainData.role.allSeeds.challengeConf.challengeWaitDur : 0;
        }
    }, {
        key: "isChallengeStatusReady",
        value: function() {
            return 2 == this.curRoom.status;
        }
    }, {
        key: "isChallengeStatusChallenge",
        value: function() {
            return 3 == this.curRoom.status;
        }
    }, {
        key: "isChallengeStatusRunning",
        value: function() {
            return this.curRoom.status >= 4;
        }
    }, {
        key: "getShareText",
        value: function(e) {
            var t = Math.floor(Math.random() * this.shareText.length);
            return e + this.shareText[t];
        }
    }, {
        key: "getShareGroupText",
        value: function(e, t) {
            var n = Math.floor(Math.random() * this.shareGroupText.length);
            return e + "创建了" + t + "房间，" + this.shareGroupText[n];
        }
    }, {
        key: "roomList",
        get: function() {
            return this._roomList || (this._roomList = {}), this._roomList;
        },
        set: function(e) {
            this._roomList = e;
        }
    }, {
        key: "curRoomRankList",
        get: function() {
            return this._curRoomRankList || [];
        },
        set: function(e) {
            this._curRoomRankList = e;
        }
    }, {
        key: "curRoom",
        get: function() {
            return this._curRoom || (this._curRoom = {}), this._curRoom;
        },
        set: function(e) {
            this._curRoom = e;
        }
    } ]), o;
}();

module.exports = new o();