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
}(), n = require("./../net/connectNotify.js"), i = require("./../const/notifyConsts.js"), o = require("./../const/modeConsts.js"), a = require("../util/util"), c = require("../net/myTunnel.js").tunnel, s = require("../data/SpecialData.js"), r = void 0, h = function() {
    function h() {
        e(this, h), this._debug = o.RunMode != o.RunModeType.Prod, this._heartbeatTimer = null, 
        this._lastHeartbeat = 0, this.socketOpen = !1, this.tunnel = new c("wsconnect"), 
        this.tunnel.onMessage = this.onSocketMessage.bind(this), this.tunnel.onBreak = this.onBreak.bind(this), 
        this.tunnel.onOpen = this.onSocketOpen.bind(this), this.tunnel.onReopen = this.onSocketReconnect.bind(this), 
        this.tunnel.onError = this.onSocketErr.bind(this);
    }
    return t(h, [ {
        key: "init",
        value: function(e) {
            r = e, this.wsUrl = o.NetURL[o.RunMode].wsURL, this.register();
        }
    }, {
        key: "updateURL",
        value: function(e) {
            e.ws && (this.wsUrl = e.ws);
        }
    }, {
        key: "connectServer",
        value: function() {
            this.tunnel.connect(this.wsUrl);
        }
    }, {
        key: "reconnectServer",
        value: function() {
            this.closeSocket(), this.connectServer();
        }
    }, {
        key: "closeSocket",
        value: function() {
            this.socketOpen = !1, this.tunnel.close(), clearTimeout(this._heartbeatTimer), clearTimeout(this._heartbeatTimerTimeout);
        }
    }, {
        key: "send",
        value: function(e) {
            this.socketOpen && this.tunnel.send(e);
        }
    }, {
        key: "socketOpenHandler",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
            this.socketOpen = !0, this.send(JSON.stringify({
                action: 99,
                token: r.token,
                from_uid: r.uid,
                reconn: e
            }), function(e) {}), n.receive(i.socketOpen, ""), this.nextHeartbeat();
        }
    }, {
        key: "onSocketOpen",
        value: function() {
            this.socketOpenHandler(0);
        }
    }, {
        key: "onSocketReconnect",
        value: function() {
            this.socketOpenHandler(1);
        }
    }, {
        key: "onSocketMessage",
        value: function(e) {
            var t = JSON.parse(e);
            this._debug && 1 != t.action && console.info("收到服务器内容：", e);
            var n = this.handlers[t.action];
            a.invokeCallback(n, t.action, t.values);
        }
    }, {
        key: "onBreak",
        value: function() {
            this.socketOpen = !1, clearTimeout(this._heartbeatTimer), clearTimeout(this._heartbeatTimerTimeout), 
            n.receive(i.socketClose, ""), o.RunMode != o.RunModeType.Prod && o.RunMode != o.RunModeType.Test && a.ShowToast("", "连接断开", function() {});
        }
    }, {
        key: "onSocketErr",
        value: function(e) {
            this.socketOpen = !1, clearTimeout(this._heartbeatTimer), clearTimeout(this._heartbeatTimerTimeout);
        }
    }, {
        key: "nextHeartbeat",
        value: function() {
            var e = this;
            clearTimeout(this._heartbeatTimer), clearTimeout(this._heartbeatTimerTimeout), this._heartbeatTimer = setTimeout(function() {
                e.send(JSON.stringify({
                    action: 1,
                    token: r.token,
                    from_uid: r.uid
                }), function(e) {}), e._heartbeatTimerTimeout = setTimeout(function() {
                    console.log("[socket][wsconnect] heartbeatTimeout"), e.reconnectServer();
                }, 4e3);
            }, 1e4);
        }
    }, {
        key: "on",
        value: function(e, t) {
            this.handlers = this.handlers || {}, this.handlers[e] = t;
        }
    }, {
        key: "register",
        value: function() {
            this.on(i.hearbeat, this.onHearBeat.bind(this)), this.on(i.ActionGameConf, this.onGameConf.bind(this)), 
            this.on(i.ActionGameBoard, this.onGameBoard.bind(this)), this.on(i.ActionFightNotify, this.onFightNotify.bind(this)), 
            this.on(i.ActionFightAnswer, this.onFightAnswer.bind(this)), this.on(i.ActionPlayerLogout, this.onPlayerLogout.bind(this)), 
            this.on(i.ActionPlayerEdgeOut, this.onPlayerEdgeOut.bind(this)), this.on(i.ActionFightOut, this.onFightOut.bind(this)), 
            this.on(i.ActionFightInviteInto, this.onFightInviteInto.bind(this)), this.on(i.ActionFightInviteBegin, this.onFightInviteBegin.bind(this)), 
            this.on(i.ActionFightInviteAgain, this.onFightInviteAgain.bind(this)), this.on(i.ActionFightInviteChange, this.onFightInviteChange.bind(this)), 
            this.on(i.ActionFightSendEmot, this.onActionFightSendEmot.bind(this)), this.on(i.ActionDonatePay, this.onActionDonatePay.bind(this)), 
            this.on(i.ActionBCReward, this.onActionBCReward.bind(this)), this.on(i.ActionIsBanned, this.onActionIsBanned.bind(this)), 
            this.on(i.ActionNewMail, this.onActionNewMail.bind(this)), this.on(i.ActionPlayerNameIllegal, this.onActionPlayerNameIllegal.bind(this)), 
            this.on(i.ActionChallengeInfoBase, this.onActionChallengeInfoBase.bind(this)), this.on(i.ActionChallengeInfoMembers, this.onActionChallengeInfoMembers.bind(this)), 
            this.on(i.ActionFightFriendRoomExpried, this.onActionFightFriendRoomExpried.bind(this)), 
            this.on(i.ActionSubscribed, this.onActionSubscribed.bind(this)), this.on(i.ActionActivityUpdate, this.onActionActivityUpdate.bind(this)), 
            this.on(i.ActionTaskUpdate, this.onActionTaskUpdate.bind(this)), this.on(i.ActionTicketFormFriend, this.onActionTicketFormFriend.bind(this)), 
            this.on(i.ActionLiveRoomSetting, this.onActionLiveRoomSetting.bind(this));
        }
    }, {
        key: "onActionLiveRoomSetting",
        value: function(e, t) {
            var o = JSON.parse(t[0]);
            a.log("onActionLiveRoomSetting:", o), n.receive(i.ActionLiveRoomSetting, o);
        }
    }, {
        key: "onActionTicketFormFriend",
        value: function(e, t) {
            var n = JSON.parse(t[0]);
            a.log("data.ticket:", s.data.player.ticket, "/addTicket:", n.addTicket), s.ticket.ticketFromFriend.unshift(n);
        }
    }, {
        key: "onActionTaskUpdate",
        value: function(e, t) {
            n.receive(i.ActionTaskUpdate, t);
        }
    }, {
        key: "onActionActivityUpdate",
        value: function(e, t) {
            a.setServerTime(t[1]), n.receive(i.ActionActivityUpdate, JSON.parse(t[0]));
        }
    }, {
        key: "onActionChallengeInfoMembers",
        value: function(e, t) {
            n.receive(i.ActionChallengeInfoMembers, JSON.parse(t[0]));
        }
    }, {
        key: "onActionChallengeInfoBase",
        value: function(e, t) {
            n.receive(i.ActionChallengeInfoBase, JSON.parse(t[0]));
        }
    }, {
        key: "onHearBeat",
        value: function(e, t) {
            this._lastHeartbeat = Date.now(), this.nextHeartbeat();
        }
    }, {
        key: "onGameConf",
        value: function(e, t) {
            try {
                var o = JSON.parse(t[0]);
                o && (r.mainData.serverConfs = t, r.mainData.role.gameConf = o, 1 == o.runMode ? r.exitGame(e) : 0 == o.runMode && n.receive(i.ActionGameConf, t));
            } catch (e) {}
        }
    }, {
        key: "onActionIsBanned",
        value: function(e, t) {
            r.exitGame(e, t[0]);
        }
    }, {
        key: "onGameBoard",
        value: function(e, t) {
            n.receive(i.ActionGameBoard, t);
        }
    }, {
        key: "onPlayerEdgeOut",
        value: function(e, t) {
            r.exitGame(e);
        }
    }, {
        key: "onFightNotify",
        value: function(e, t) {
            try {
                var o = JSON.parse(t[0]);
                n.receive(i.ActionFightNotify, o);
            } catch (e) {}
        }
    }, {
        key: "onFightAnswer",
        value: function(e, t) {
            try {
                var o = JSON.parse(t[0]);
                n.receive(i.ActionFightAnswer, o);
            } catch (e) {}
        }
    }, {
        key: "onPlayerLogout",
        value: function(e, t) {
            try {
                n.receive(i.ActionPlayerLogout, t[0]);
            } catch (e) {}
        }
    }, {
        key: "onFightInviteInto",
        value: function(e, t) {
            try {
                var o = JSON.parse(t[0]);
                n.receive(i.ActionFightInviteInto, o);
            } catch (e) {}
        }
    }, {
        key: "onFightInviteBegin",
        value: function(e, t) {
            n.receive(i.ActionFightInviteBegin, t[0]);
        }
    }, {
        key: "onFightInviteAgain",
        value: function(e, t) {
            var o = t[0];
            n.receive(i.ActionFightInviteAgain, o);
        }
    }, {
        key: "onFightInviteChange",
        value: function(e, t) {
            var o = JSON.parse(t[0]);
            n.receive(i.ActionFightInviteChange, o);
        }
    }, {
        key: "onFightOut",
        value: function(e, t) {
            var o = t[0];
            n.receive(i.ActionFightOut, o);
        }
    }, {
        key: "onActionFightSendEmot",
        value: function(e, t) {
            var o = JSON.parse(t[0]);
            n.receive(i.ActionFightSendEmot, o);
        }
    }, {
        key: "onActionDonatePay",
        value: function(e, t) {
            n.receive(i.ActionDonatePay, t);
        }
    }, {
        key: "onActionBCReward",
        value: function(e, t) {
            n.receive(i.ActionBCReward, t);
        }
    }, {
        key: "onActionNewMail",
        value: function(e, t) {
            n.receive(i.ActionNewMail, t);
        }
    }, {
        key: "onActionPlayerNameIllegal",
        value: function(e, t) {
            try {
                var n = JSON.parse(t[0]);
                r.mainData.role.onActionPlayerNameIllegal = !0, r.mainData.role.userInfo.nickName = n.name, 
                r.mainData.role.userInfo.avatarUrl = a.getWechatUrlBySize(n.avatarUrl), a.ShowConfirm("", n.reason, function() {});
            } catch (e) {
                a.reportAnalytics_Try(e);
            }
        }
    }, {
        key: "onActionFightFriendRoomExpried",
        value: function(e, t) {
            n.receive(i.ActionFightFriendRoomExpried, t[0]);
        }
    }, {
        key: "onActionSubscribed",
        value: function(e, t) {
            n.receive(i.ActionSubscribed, t);
        }
    } ]), h;
}();

module.exports = new h();